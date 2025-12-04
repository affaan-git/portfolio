import { NextResponse } from "next/server";

export function middleware() {
  return new NextResponse("Site offline for maintenance", {
    status: 503,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export const config = {
  matcher: "/:path*",
};
