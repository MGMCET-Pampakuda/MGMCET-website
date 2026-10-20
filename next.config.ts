import type { NextConfig } from "next";

const showDesignSystem = process.env.NEXT_PUBLIC_SHOW_DESIGN_SYSTEM === "true";

const pageExtensions = showDesignSystem
  ? ["dev.tsx", "tsx", "ts", "jsx", "js"]
  : ["tsx", "ts", "jsx", "js"];

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  pageExtensions,
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;