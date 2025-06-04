import { env } from '@/env';
import { auth } from './auth';
import type { CreateClientConfig } from './openapi/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  auth: async () => {
    const session = await auth();
    return session?.accessToken;
  },
  baseUrl: env.NEXT_PUBLIC_API_URL,
});
