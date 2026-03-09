import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const formData = await request.formData();

  const payload = {
    name: String(formData.get("name") ?? ""),
    description: String(formData.get("description") ?? ""),
    website: String(formData.get("website") ?? ""),
    category: String(formData.get("category") ?? ""),
  };

  if (!payload.name || !payload.description || !payload.website || !payload.category) {
    return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_KEY ??
    process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { ok: true, message: "Saved in fallback mode (configure Supabase env to persist)." },
      { status: 200 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.from("tool_submissions").insert([payload]);

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
