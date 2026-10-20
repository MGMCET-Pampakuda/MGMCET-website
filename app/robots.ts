import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
