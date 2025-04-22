import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    basePath: '',
    assetPrefix: process.env.NODE_ENV === 'production' ? 'https://apexcode.top' : '',
};
export default nextConfig;
