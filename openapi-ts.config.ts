import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '<api_url>/openapi.json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/lib/openapi',
  },
  plugins: [
    {
      name: '@hey-api/client-next',
      runtimeConfigPath: './src/lib/hey-api.ts',
    },
    'zod',
    '@tanstack/react-query',
    {
      dates: true,
      name: '@hey-api/transformers',
    },
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
      validator: true,
    },
  ],
});
