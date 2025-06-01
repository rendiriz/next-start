import { auth } from '@/lib/auth';
import { ApiBase } from './api.base';

export class ApiServer extends ApiBase {
  protected async getAuthHeaders(): Promise<HeadersInit | null> {
    try {
      const session = await auth();
      if (!session?.accessToken) return null;
      return { Authorization: `Bearer ${session.accessToken}` };
    } catch (error) {
      console.error('Failed to get auth session:', error);
      return null;
    }
  }
}

export const serverApi = new ApiServer();
