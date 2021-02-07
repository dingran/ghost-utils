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

import useSWR from 'swr';
import { useAuth, getFreshToken } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import PageShell from '@/components/PageShell';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import Router from 'next/router';
import AddSiteModal from '@/components/AddSiteModal';
import SiteTable from '@/components/SiteTable';

import ReactJson from 'react-json-view';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  if (!loading && !user) {
    Router.push('/');
  }

  const { data } = useSWR(
    user ? ['/api/auth/sites', user.token] : null,
    fetcher
  );

  return (
    <>
      {user ? (
        <PageShell>
          <NextBreadcrumb
            pageName='Dashboard'
            pagePath='dashboard'
          ></NextBreadcrumb>
          <SiteTable sites={data?.sites} />
        </PageShell>
      ) : null}
    </>
  );
};

export default DashboardPage;
