'use client';

import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { getCategorysCategoriesGetOptions } from '@/lib/openapi/@tanstack/react-query.gen';

export default function HomePageClient() {
  const { data } = useQuery({
    ...getCategorysCategoriesGetOptions({
      query: {
        limit: 1,
        offset: 0,
      },
    }),
  });

  return (
    <div>
      <Button>Click me</Button>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
