import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_KEY ??
  process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase env for compare generation.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const TOOL_SCAN_LIMIT = Number(process.env.COMPARE_TOOL_SCAN_LIMIT ?? 300);
const PAIR_LIMIT = Number(process.env.COMPARE_PAIR_LIMIT ?? 500);

function pairSlug(left, right) {
  return `${left}-vs-${right}`;
}

async function run() {
  const { data: rows, error } = await supabase
    .from("tools")
    .select("slug, category, created_at")
    .order("created_at", { ascending: false })
    .limit(Math.max(50, TOOL_SCAN_LIMIT));

  if (error) throw error;

  const byCategory = new Map();
  for (const row of rows ?? []) {
    const key = row.category || "productivity-ai";
    if (!byCategory.has(key)) byCategory.set(key, []);
    byCategory.get(key).push(row);
  }

  const pairs = [];
  for (const [category, items] of byCategory.entries()) {
    for (let i = 0; i < items.length; i += 1) {
      for (let j = i + 1; j < items.length; j += 1) {
        const left = items[i];
        const right = items[j];
        const slug = pairSlug(left.slug, right.slug);
        pairs.push({
          slug,
          left_tool_slug: left.slug,
          right_tool_slug: right.slug,
          score: Math.max(1, 100 - i - j),
          source: `auto:${category}`,
        });
        if (pairs.length >= Math.max(50, PAIR_LIMIT)) break;
      }
      if (pairs.length >= Math.max(50, PAIR_LIMIT)) break;
    }
  }

  if (pairs.length === 0) {
    console.log("No compare pairs generated.");
    return;
  }

  const { error: upsertError } = await supabase
    .from("compare_pairs")
    .upsert(pairs, { onConflict: "slug" });

  if (upsertError) {
    if (upsertError.message?.includes("compare_pairs")) {
      console.warn("compare_pairs table is missing. Run supabase/schema.sql and retry.");
      return;
    }
    throw upsertError;
  }
  console.log(`Generated/updated ${pairs.length} compare pairs.`);
}

run().catch((error) => {
  console.error("Compare generation failed:", error.message);
  process.exit(1);
});
