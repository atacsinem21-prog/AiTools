import { NextResponse, type NextRequest } from "next/server";

const locales = ["tr", "en"];

function detectLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (acceptLanguage.includes("tr")) return "tr";
  return "en";
}

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    const hasLocale = locales.some(
      (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    );

    // Skip internal and static paths to avoid edge runtime issues.
    if (
      hasLocale ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/_vercel") ||
      pathname === "/favicon.ico" ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  } catch {
    // Never block requests if middleware fails unexpectedly.
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/:path*"],
};
