import React from 'react';
import { useAuth } from '@/lib/auth';
import Hero from '@/components/Hero';
import PageShell from '@/components/PageShell';
import Showcase from '@/components/Showcase';

export default function Home() {
  const auth = useAuth();
  return (
    <>
      <PageShell>
        <Hero />
        <Showcase />
      </PageShell>
    </>
  );
}
