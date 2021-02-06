import Head from 'next/head';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/auth';
import { Flex, Box } from '@chakra-ui/react';
import Hero from '@/components/Hero';
import PageShell from '@/components/PageShell';
import Showcase from '@/components/Showcase';

export default function Home() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

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
