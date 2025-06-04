// import 'server-only';
import { API_V1_ENDPOINTS } from '@/config/api';
import { serverApi } from '@/lib/api/api.server';
import type {
  LoginPayload,
  LoginResponse,
  LogoutPayload,
  LogoutResponse,
  RefreshTokenPayload,
  RefreshTokenResponse,
} from './auth.type';

export const login = (credentials: LoginPayload): Promise<LoginResponse> => {
  return serverApi.post(API_V1_ENDPOINTS.auth.login, credentials, { skipAuth: true });
};

export const logout = (body: LogoutPayload): Promise<LogoutResponse> => {
  return serverApi.post(API_V1_ENDPOINTS.auth.logout, body);
};

export const refreshToken = (
  body: RefreshTokenPayload,
): Promise<RefreshTokenResponse> => {
  return serverApi.post(API_V1_ENDPOINTS.auth.refreshToken, body);
};
