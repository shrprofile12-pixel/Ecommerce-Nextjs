import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co', // 🔐 Whitelists all Supabase storage buckets
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;