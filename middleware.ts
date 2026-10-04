import createMiddleware from "next-intl/middleware";

import { routing } from "@/src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, metadata image routes and static files.
  matcher: [
    "/((?!api|_next|_vercel|opengraph-image|twitter-image|.*\\..*).*)",
  ],
};
