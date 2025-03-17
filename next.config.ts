import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard", // Change this to your desired page
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
