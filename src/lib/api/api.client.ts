import { getSession } from 'next-auth/react';
import { ApiBase } from './api.base';

export class ApiClient extends ApiBase {
  protected async getAuthHeaders(): Promise<HeadersInit | null> {
    try {
      const session = await getSession();
      if (!session?.accessToken) return null;
      return { Authorization: `Bearer ${session.accessToken}` };
    } catch (error) {
      console.error('Failed to get session:', error);
      return null;
    }
  }
}

export const clientApi = new ApiClient();
