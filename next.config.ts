import type { NextConfig } from 'next';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPlugins = require('next-compose-plugins');

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    ppr: true,
    inlineCss: true,
    reactCompiler: true,
  },
};

export default withPlugins([], nextConfig);
