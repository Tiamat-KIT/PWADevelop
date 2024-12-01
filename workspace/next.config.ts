import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.watchOptions = {
      pollIntervalMs: 3000,
    };
    return config;
  },
};

export default nextConfig;
