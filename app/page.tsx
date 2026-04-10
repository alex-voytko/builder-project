import { BuilderPage } from '@/components/BuilderPage';
import { fetchBuilderPage } from '@/lib/builder';

export default async function Page() {
  const content = await fetchBuilderPage('/');

  return <BuilderPage content={content} />;
}
