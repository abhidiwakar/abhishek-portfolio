import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUrl } from "./lib/fetcher";

const cookieSecuredPaths = new Set([
  "/project/add",
  "/api/technologies",
  "/api/team",
]);

export function middleware(request: NextRequest) {
  if (cookieSecuredPaths.has(request.nextUrl.pathname)) {
    const apiKey = request.cookies.get("api_key");
    if (!apiKey || apiKey.value !== process.env.API_ACCESS_KEY) {
      return NextResponse.redirect(getUrl("/login"), { status: 301 });
    }
  }

  if (
    request.method === "POST" &&
    request.nextUrl.pathname === "/api/project"
  ) {
    const apiKey =
      request.headers.get("x-api-key") || request.cookies.get("api_key")?.value;
    if (apiKey !== process.env.API_ACCESS_KEY) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}