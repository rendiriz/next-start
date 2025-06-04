'use client';

import { SessionProvider } from 'next-auth/react';

// import { AuthSessionHandler } from './auth-session-handler';

interface AuthProviderProps {
  readonly children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      {/* <AuthSessionHandler /> */}
      {children}
    </SessionProvider>
  );
}
