import { z } from 'zod';
import { LoginFormSchema } from './auth.schema';

export type LoginPayload = z.infer<typeof LoginFormSchema>;

export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface LogoutPayload {
  refresh_token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface RefreshTokenPayload {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}
