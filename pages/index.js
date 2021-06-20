import Hero from '@/components/Hero';
import PageShell from '@/components/PageShell';
import Showcase from '@/components/Showcase';
import { Heading } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <PageShell>
        <Heading display='inline' color='gray.500' size='lg'>
          Deprecation Notice: The new Ghost 4.0 offers this functionality
          natively, so you don't need this tool anymore. This tool will be
          deprecated on 6/30/2021. Thanks for your support!
        </Heading>
        <hr></hr>
        <Hero />
        <Showcase />
      </PageShell>
    </>
  );
}
