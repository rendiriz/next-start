import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import { login, logout, refreshToken } from '@/domains/auth/auth.repository.server';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        try {
          const response = await login({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          return {
            // TODO: change to real user
            id: 'response.user.id',
            email: 'response.user.email',
            name: 'response.user.name',
            image: 'response.user.image',
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            expiresAt: response.expires_at,
          };
        } catch {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          email: user.email,
          name: user.name,
          picture: user.image,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
        };
      }

      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }

      try {
        const response = await refreshToken({
          refresh_token: token.refreshToken!,
        });

        return {
          ...token,
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          expiresAt: response.expires_at,
          error: undefined,
        };
      } catch {
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      }
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.error = token.error;
        session.user = {
          id: token.sub!,
          email: token.email!,
          name: token.name!,
          image: token.picture!,
          emailVerified: null,
        };
      }
      return session;
    },
  },
  events: {
    async signOut(message: { token?: JWT | null; session?: unknown }) {
      if (message?.token?.refreshToken) {
        try {
          await logout({ refresh_token: message.token.refreshToken });
        } catch {
          throw new Error('Error during sign out');
        }
      }
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});
