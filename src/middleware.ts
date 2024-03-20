import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUrl } from "./lib/fetcher";
import { protectedAPIPath, protectedUIPath } from "./lib/protected-routes";

const checkMethod = (method: Set<string>, requestMethod: string) => {
  return method.has("*") || method.has(requestMethod);
};

export function middleware(request: NextRequest) {
  const apiKey =
    request.headers.get("x-api-key") ||
    request.cookies.get("api_key")?.value ||
    "";
  if (protectedUIPath.some((re) => re.test(request.nextUrl.pathname))) {
    if (apiKey !== process.env.API_ACCESS_KEY) {
      return NextResponse.redirect(getUrl("/login"), { status: 301 });
    }
  }

  if (
    protectedAPIPath.some(
      (re) =>
        re.path.test(request.nextUrl.pathname) &&
        checkMethod(re.method, request.method)
    )
  ) {
    if (apiKey !== process.env.API_ACCESS_KEY) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}
