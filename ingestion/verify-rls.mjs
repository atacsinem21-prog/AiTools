import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !ANON_KEY || !SERVICE_KEY) {
  console.error("Missing SUPABASE_URL, SUPABASE_ANON_KEY, or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

async function run() {
  const anon = createClient(SUPABASE_URL, ANON_KEY);
  const service = createClient(SUPABASE_URL, SERVICE_KEY);

  const anonInsertPayload = {
    name: "RLS Anon Test",
    description: "Anon insert policy test",
    website: "https://example.com",
    category: "productivity-ai",
    status: "pending",
  };

  const { error: anonInsertError } = await anon
    .from("tool_submissions")
    .insert([anonInsertPayload]);

  if (anonInsertError) {
    console.error("Anon insert FAILED:", anonInsertError.message);
  } else {
    console.log("Anon insert OK: tool_submissions");
  }

  const serviceTool = {
    name: "RLS Service Test Tool",
    slug: "rls-service-test-tool",
    description: "Service role upsert test",
    website: "https://example.com/service-test",
    category: "productivity-ai",
    source: "verification",
  };

  const { error: serviceUpsertError } = await service
    .from("tools")
    .upsert([serviceTool], { onConflict: "slug" });

  if (serviceUpsertError) {
    console.error("Service upsert FAILED:", serviceUpsertError.message);
  } else {
    console.log("Service upsert OK: tools");
  }

  const comparePayload = {
    slug: "rls-service-test-a-vs-b",
    left_tool_slug: "rls-a",
    right_tool_slug: "rls-b",
    score: 1,
    source: "verification",
  };

  const { error: compareUpsertError } = await service
    .from("compare_pairs")
    .upsert([comparePayload], { onConflict: "slug" });

  if (compareUpsertError) {
    console.error("Service upsert FAILED: compare_pairs:", compareUpsertError.message);
  } else {
    console.log("Service upsert OK: compare_pairs");
  }
}

run().catch((error) => {
  console.error("RLS verification failed:", error.message);
  process.exit(1);
});
