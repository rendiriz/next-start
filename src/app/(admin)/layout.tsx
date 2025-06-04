import { AuthProvider } from '@/domains/auth/auth.provider';

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
