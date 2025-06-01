export interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
  retryCount?: number;
  maxRetries?: number;
  retryDelay?: number;
}

export interface ApiError {
  status: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
