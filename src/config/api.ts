import { env } from '@/env';

export const API_URL = env.NEXT_PUBLIC_API_URL;

export const API_V1_ENDPOINTS = {
  auth: {
    login: '/v1/auth/login',
    logout: '/v1/auth/logout',
    refreshToken: '/v1/auth/refresh-token',
  },
  settings: {
    global: {
      base: '/v1/settings/global',
    },
  },
} as const;
