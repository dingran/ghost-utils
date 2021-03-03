import Hero from '@/components/Hero';
import PageShell from '@/components/PageShell';
import Showcase from '@/components/Showcase';

export default function Home() {
  return (
    <>
      <PageShell>
        <Hero />
        <Showcase />
      </PageShell>
    </>
  );
}
