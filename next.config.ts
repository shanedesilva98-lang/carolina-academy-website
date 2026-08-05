import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Redirect strategy placeholder: map legacy carolinaacademy.lk URLs here
      // once the old site's URL structure is confirmed, e.g.:
      // { source: "/old-path", destination: "/new-path", permanent: true },
    ];
  },
};

export default nextConfig;
