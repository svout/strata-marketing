import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Product, Developers and Pricing are now sections of the one-page Home.
  // Old links (and anything search engines indexed) land on the right section.
  async redirects() {
    return [
      { source: "/product", destination: "/#product", permanent: true },
      { source: "/developers", destination: "/#developers", permanent: true },
      { source: "/pricing", destination: "/#pricing", permanent: true },
    ];
  },
  async headers() {
    return [
      // JSON endpoints are never search results, even if linked from elsewhere
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
    ];
  },
};

export default nextConfig;
