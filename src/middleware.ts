import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Target IPv6 address to block
const BLOCKED_IP = "2a06:98c0:3600::103";

export function middleware(request: NextRequest) {
  // Extract client IP address
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";

  if (clientIp === BLOCKED_IP) {
    return new NextResponse("Access Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
