import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',      // Essential for generating the 'out' folder for IPFS
  images: {
    unoptimized: true,   // Required for GIF and PNG support on decentralized networks
  },
  trailingSlash: true,   // Optimizes URL routing within IPFS gateways
};

export default nextConfig;
