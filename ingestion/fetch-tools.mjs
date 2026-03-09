import dotenv from "dotenv";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import Parser from "rss-parser";

dotenv.config({ path: ".env.local" });
dotenv.config();

const PRODUCTHUNT_TOKEN = process.env.PRODUCTHUNT_TOKEN;
const GITHUB_TOKEN = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
const REDDIT_USER_AGENT = process.env.REDDIT_USER_AGENT ?? "global-ai-tools-bot/1.0";
const PRODUCTHUNT_FETCH_LIMIT = Number(process.env.PRODUCTHUNT_FETCH_LIMIT ?? 40);
const GITHUB_FETCH_LIMIT = Number(process.env.GITHUB_FETCH_LIMIT ?? 50);
const REDDIT_FETCH_LIMIT = Number(process.env.REDDIT_FETCH_LIMIT ?? 40);
const RSS_FETCH_LIMIT = Number(process.env.RSS_FETCH_LIMIT ?? 40);
const RSS_FEED_URLS = (process.env.RSS_FEED_URLS ?? "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_KEY ??
  process.env.SUPABASE_ANON_KEY;

const keywords = [
  "ai",
  "artificial",
  "gpt",
  "machine learning",
  "llm",
  "agent",
  "automation",
  "text-to-image",
  "text-to-video",
  "prompt",
  "neural",
  "copilot",
  "chatbot",
  "generative",
];
const parser = new Parser();

function isAITool(text = "") {
  const normalized = text.toLowerCase();
  return keywords.some((keyword) => normalized.includes(keyword));
}

function slugify(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

function detectCategory(text = "") {
  const value = text.toLowerCase();
  if (/(video|clip|movie|editing)/.test(value)) return "video-ai";
  if (/(marketing|seo|copy|ad|campaign)/.test(value)) return "marketing-ai";
  if (/(code|coding|developer|dev)/.test(value)) return "coding-ai";
  if (/(image|design|photo|art)/.test(value)) return "image-ai";
  return "productivity-ai";
}

function normalizeRecord(input, source) {
  const name = input.name?.trim();
  const description = input.tagline?.trim() ?? input.description?.trim() ?? "";
  const website = input.website?.trim() || input.url?.trim() || "";
  if (!name || !website) return null;

  const slug = slugify(input.slug || name);
  if (!slug) return null;

  return {
    name,
    slug,
    description,
    website,
    category: detectCategory(`${name} ${description}`),
    source,
  };
}

async function fetchProductHuntPosts() {
  if (!PRODUCTHUNT_TOKEN) {
    console.warn("PRODUCTHUNT_TOKEN is missing. Skipping fetch.");
    return [];
  }

  const query = `
  {
    posts(first: ${Math.max(1, PRODUCTHUNT_FETCH_LIMIT)}) {
      edges {
        node {
          id
          name
          tagline
          website
          slug
        }
      }
    }
  }
  `;

  const response = await axios.post(
    "https://api.producthunt.com/v2/api/graphql",
    { query },
    {
      headers: {
        Authorization: `Bearer ${PRODUCTHUNT_TOKEN}`,
      },
      timeout: 15000,
    }
  );

  const edges = response.data?.data?.posts?.edges ?? [];
  return edges
    .map((item) => normalizeRecord(item.node, "producthunt"))
    .filter(Boolean);
}

async function fetchGithubTools() {
  try {
    const response = await axios.get("https://api.github.com/search/repositories", {
      params: {
        q: "topic:ai stars:>50",
        sort: "updated",
        order: "desc",
        per_page: Math.max(1, Math.min(100, GITHUB_FETCH_LIMIT)),
      },
      headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : undefined,
      timeout: 15000,
    });

    const items = response.data?.items ?? [];
    return items
      .map((repo) =>
        normalizeRecord(
          {
            name: repo.name,
            slug: repo.name,
            tagline: repo.description ?? "",
            website: repo.homepage || repo.html_url,
          },
          "github"
        )
      )
      .filter(Boolean);
  } catch (error) {
    console.warn("GitHub fetch skipped:", error.response?.status ?? error.message);
    return [];
  }
}

async function fetchRedditTools() {
  const sources = [
    "artificial",
    "AItools",
    "machinelearning",
    "startups",
    "OpenAI",
    "singularity",
    "ChatGPT",
    "SideProject",
  ];
  const items = [];

  for (const subreddit of sources) {
    try {
      const response = await axios.get(`https://www.reddit.com/r/${subreddit}/new.json`, {
        params: { limit: Math.max(1, Math.min(100, REDDIT_FETCH_LIMIT)) },
        headers: { "User-Agent": REDDIT_USER_AGENT },
        timeout: 15000,
      });
      const posts = response.data?.data?.children ?? [];
      for (const post of posts) {
        const payload = post.data;
        const url = payload.url_overridden_by_dest || payload.url || "";
        items.push(
          normalizeRecord(
            {
              name: payload.title,
              slug: payload.id,
              tagline: payload.selftext || payload.title,
              website: url,
            },
            "reddit"
          )
        );
      }
    } catch (error) {
      console.warn(`Reddit fetch skipped for r/${subreddit}:`, error.response?.status ?? error.message);
    }
  }

  return items.filter(Boolean);
}

async function fetchRssTools() {
  const feeds = RSS_FEED_URLS.length > 0 ? RSS_FEED_URLS : [];
  const records = [];

  for (const feedUrl of feeds) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const entries = feed.items ?? [];
      for (const entry of entries.slice(0, Math.max(1, RSS_FETCH_LIMIT))) {
        records.push(
          normalizeRecord(
            {
              name: entry.title ?? "AI tool",
              slug: entry.guid ?? entry.id ?? entry.title,
              tagline: entry.contentSnippet ?? entry.content ?? "",
              website: entry.link ?? "",
            },
            "rss"
          )
        );
      }
    } catch (error) {
      console.warn(`RSS fetch skipped for ${feedUrl}:`, error.message);
    }
  }

  return records.filter(Boolean);
}

async function saveTool(tool) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.log("Missing Supabase key/url, printing payload instead:", tool.name);
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { error } = await supabase.from("tools").upsert(
    [
      {
        name: tool.name,
        slug: tool.slug,
        description: tool.description,
        website: tool.website,
        category: tool.category,
        source: tool.source,
      },
    ],
    { onConflict: "slug" }
  );

  if (error) {
    throw error;
  }
}

async function run() {
  const [productHuntItems, githubItems, redditItems, rssItems] = await Promise.all([
    fetchProductHuntPosts(),
    fetchGithubTools(),
    fetchRedditTools(),
    fetchRssTools(),
  ]);

  const merged = [...productHuntItems, ...githubItems, ...redditItems, ...rssItems];
  const aiItems = merged.filter((item) => isAITool(`${item.name} ${item.description}`));
  const uniqueBySlug = [...new Map(aiItems.map((item) => [item.slug, item])).values()];

  for (const item of uniqueBySlug) {
    await saveTool(item);
  }

  console.log(
    `Ingestion completed. Sources: PH=${productHuntItems.length}, GH=${githubItems.length}, Reddit=${redditItems.length}, RSS=${rssItems.length}. Saved ${uniqueBySlug.length} AI tools.`
  );
}

run().catch((error) => {
  console.error("Ingestion failed:", error.message);
  process.exitCode = 1;
});
