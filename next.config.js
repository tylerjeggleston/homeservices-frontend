/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Long-term cache for all static assets (images, fonts, etc.)
        source: "/:path*\\.:ext(webp|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache Next.js static chunks
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
