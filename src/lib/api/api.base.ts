/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from 'qs';
import { API_URL } from '@/config/api';
import { ApiError } from './api.error';
import { FetchOptions } from './api.type';

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_RETRY_DELAY = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export abstract class ApiBase {
  protected abstract getAuthHeaders(): Promise<HeadersInit | null>;

  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const {
      skipAuth = false,
      retryCount = 0,
      maxRetries = DEFAULT_MAX_RETRIES,
      retryDelay = DEFAULT_RETRY_DELAY,
      ...fetchOptions
    } = options;

    try {
      const authHeaders = skipAuth ? null : await this.getAuthHeaders();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...fetchOptions.headers,
      };

      const response = await fetch(`${API_URL}${endpoint}`, {
        ...fetchOptions,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new ApiError(
          response.status,
          errorData?.message || `API request failed: ${response.statusText}`,
          errorData,
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status >= 500 && retryCount < maxRetries) {
          await sleep(retryDelay * Math.pow(2, retryCount));
          return this.fetch<T>(endpoint, {
            ...options,
            retryCount: retryCount + 1,
            maxRetries,
            retryDelay,
          });
        }
        throw error;
      }

      throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
    }
  }

  async get<T>(
    endpoint: string,
    filter: Record<string, any> = {},
    options: FetchOptions = {},
  ): Promise<T> {
    const query = Object.keys(filter).length > 0 ? `?${qs.stringify(filter)}` : '';
    const finalEndpoint = `${endpoint}${query}`;
    return this.fetch<T>(finalEndpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data: any, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: any, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, { ...options, method: 'DELETE' });
  }
}
