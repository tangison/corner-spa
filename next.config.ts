import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* Allow the Oryx Institute site to embed the spa full-screen at
     oryxinstitute.org/corner-spa. Never send X-Frame-Options DENY/SAMEORIGIN. */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://oryxinstitute.org https://www.oryxinstitute.org",
          },
        ],
      },
      {
        // Owner media and the vendored engine are content-addressed by name;
        // a year of immutable caching keeps repeat visits fast.
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/scrollcraft/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
