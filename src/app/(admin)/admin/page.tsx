import { Button } from '@/components/ui/button';
import { getCategorysCategoriesGet } from '@/lib/openapi/sdk.gen';
import HomeClient from './page.client';

export default async function Home() {
  const categories = await getCategorysCategoriesGet({
    query: {
      limit: 1,
      offset: 0,
    },
  });

  return (
    <div>
      <Button>Click me</Button>

      <pre>{JSON.stringify(categories.data, null, 2)}</pre>

      <HomeClient />
    </div>
  );
}
