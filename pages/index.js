import Head from 'next/head';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/auth';
import { Box } from '@chakra-ui/react';
import LoginButtons from '@/components/LoginButtons';
import AddSiteModal from '@/components/AddSiteModal';
import Navbar from '@/components/NavBar';
import PageShell from '@/components/PageShell';

export default function Home() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  const auth = useAuth();
  return (
    <>
      <PageShell></PageShell>
    </>
  );
}
