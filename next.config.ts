import type { NextConfig } from "next";

const showDesignSystem = process.env.NEXT_PUBLIC_SHOW_DESIGN_SYSTEM === "true";

const pageExtensions = showDesignSystem
  ? ["dev.tsx", "tsx", "ts", "jsx", "js"]
  : ["tsx", "ts", "jsx", "js"];

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true,
  pageExtensions,
  experimental: {
    agentFeedback: true,
    agentUpgrade: "security",
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