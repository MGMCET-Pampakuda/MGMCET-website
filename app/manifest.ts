import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: `${site.name} — AICTE Approved & KTU Affiliated engineering college in Pampakuda, Ernakulam, Kerala.`,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f3d2b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/brand/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
