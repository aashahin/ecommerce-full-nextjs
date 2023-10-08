import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

export const defaultLocale = "ar";
const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale,
  localeDetection: false,
});

export default authMiddleware({
  beforeAuth(request) {
    return intlMiddleware(request);
  },

  // Ensure that locale-specific sign in pages are public
  publicRoutes: ["/", "/:locale/sign-in"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
