import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    ppr: true,
    inlineCss: true,
    reactCompiler: true,
  },
};

export default nextConfig;
