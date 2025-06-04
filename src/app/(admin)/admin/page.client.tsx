'use client';

import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { getUsersUsersGetOptions } from '@/lib/openapi/@tanstack/react-query.gen';

export default function HomeClient() {
  const { data, error, isPending } = useQuery({
    ...getUsersUsersGetOptions({
      query: {
        limit: 1,
        offset: 0,
      },
    }),
  });

  if (isPending) return 'Loading...';
  if (error) return 'Error';

  return (
    <div>
      <Button>Click me</Button>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
