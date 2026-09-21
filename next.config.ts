import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // Fallback for some Next.js versions
    }
  }
};

export default nextConfig;
