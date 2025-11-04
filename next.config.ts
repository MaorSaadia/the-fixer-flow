import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent trailing slash redirects
  trailingSlash: false,
  skipTrailingSlashRedirect: true,

  // Optimize for production
  poweredByHeader: false,

  // Enable static optimization
  reactStrictMode: true,

  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
