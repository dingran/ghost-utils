import {
  Avatar,
  Heading,
  Box,
  Button,
  Flex,
  Text,
  Badge,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  Grid,
  GridItem,
} from '@chakra-ui/react';

import { useState } from 'react';
import useSWR from 'swr';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import PageShell from '@/components/PageShell';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import Router from 'next/router';
import AddSiteModal from '@/components/AddSiteModal';
import SiteTable from '@/components/SiteTable';

import ReactJson from 'react-json-view';

const DashboardHeader = () => (
  <Box>
    <Flex justifyContent='space-between'>
      <Heading mb={8}>My Sites</Heading>
      <AddSiteModal>+ Add Site</AddSiteModal>
    </Flex>
  </Box>
);

const SiteDetails = ({ site }) => {
  return (
    <Box>
      <ReactJson src={site} />
    </Box>
  );
};

const DashboardPage = () => {
  const { user, loading, getFreshToken } = useAuth();

  const [selectedSiteId, setSelectedSiteId] = useState(null);

  if (!loading && !user) {
    Router.push('/');
  }

  const { data, error } = useSWR(
    user ? ['/api/auth/sites', user.token] : null,
    fetcher
  );

  if (error) {
    console.log('error from useSWR', error);
    console.log(error.info.code);
    console.log('refreshing token');
    getFreshToken().then((token) => {
      console.log(token);
    });
  }

  return (
    <>
      {user ? (
        <PageShell>
          <NextBreadcrumb
            pageName='Dashboard'
            pagePath='dashboard'
          ></NextBreadcrumb>

          <DashboardHeader></DashboardHeader>
          <SiteTable
            sites={data?.sites}
            setSelectedSiteId={setSelectedSiteId}
          />
        </PageShell>
      ) : null}
    </>
  );
};

export default DashboardPage;
