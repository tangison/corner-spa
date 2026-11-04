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
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
