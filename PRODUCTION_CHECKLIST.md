## Production Checklist

### 1) Supabase schema and RLS
- Open Supabase SQL Editor.
- Run `supabase/schema.sql`.
- Verify tables exist: `tools`, `tool_submissions`.
- Run local check:
  - `npm run verify:rls`

### 2) Ingestion test
- Run one-time ingestion:
  - `npm run ingest:once`
- Confirm output shows source counts and saved tool count.
- Optional scheduler:
  - `npm run ingest:cron`
- Manual compare generation:
  - `npm run compares:generate`
- Production scheduler (recommended):
  - Enable `.github/workflows/ingestion-cron.yml`
  - Add GitHub repo secrets:
    - `SUPABASE_URL`
    - `SUPABASE_SERVICE_ROLE_KEY`
    - `PRODUCTHUNT_TOKEN`
    - `GH_PAT`
    - `REDDIT_USER_AGENT`
    - `RSS_FEED_URLS`
  - Run once from Actions tab using `workflow_dispatch` and verify logs.

### 3) Environment variables
- Set production envs:
  - `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
  - `SUPABASE_URL=...`
  - `SUPABASE_ANON_KEY=...`
  - `SUPABASE_SERVICE_ROLE_KEY=...`
  - `PRODUCTHUNT_TOKEN=...`
  - `GH_TOKEN=...` (optional but recommended)
  - `REDDIT_USER_AGENT=global-ai-tools-bot/1.0`
  - `RSS_FEED_URLS=comma,separated,feed,urls`

### 4) Deploy on Vercel
- Install Vercel CLI and login:
  - `npm i -g vercel`
  - `vercel login`
- Deploy:
  - `vercel --prod`
- Add all env vars in Vercel Project Settings -> Environment Variables.

### 5) SEO launch
- Check:
  - `/sitemap.xml`
  - `/robots.txt`
  - `/en/compare/chatgpt-vs-claude`
  - canonical and hreflang tags on `tr` and `en` pages
- Add property in Google Search Console.
- Submit sitemap URL:
  - `https://your-domain.com/sitemap.xml`
- Request indexing for first 50 landing pages.

### 6) Post-launch growth
- Add internal links between tool, category and landing pages.
- Share initial pages on Reddit, X, Indie Hackers, Hacker News.
- Track impressions and indexing in Search Console weekly.
- Increase content throughput:
  - Tune ingestion limits via env vars:
    - `PRODUCTHUNT_FETCH_LIMIT`
    - `GITHUB_FETCH_LIMIT`
    - `REDDIT_FETCH_LIMIT`
    - `RSS_FETCH_LIMIT`
    - `COMPARE_TOOL_SCAN_LIMIT`
    - `COMPARE_PAIR_LIMIT`
