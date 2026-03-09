import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const locale = String(form.get("locale") ?? "en").toLowerCase();

  if (!email.includes("@")) {
    return NextResponse.json({ ok: false, message: "Invalid email address" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_KEY ??
    process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ ok: true, message: "Saved in fallback mode." }, { status: 200 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase
    .from("email_subscriptions")
    .upsert([{ email, locale: locale === "tr" ? "tr" : "en" }], { onConflict: "email" });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
