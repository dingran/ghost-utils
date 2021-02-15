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

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import PageShell from '@/components/PageShell';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import Router from 'next/router';
import AddSiteModal from '@/components/AddSiteModal';
import SiteTable from '@/components/SiteTable';

import { getSite } from '@/lib/db';
import { getUserSites } from '@/lib/db';

import ReactJson from 'react-json-view';

const DashboardHeader = () => (
  <Box>
    <Flex justifyContent='space-between'>
      <Heading mb={8}>My Sites</Heading>
      <AddSiteModal>Add Site</AddSiteModal>
    </Flex>
  </Box>
);

const EmptyState = () => {
  return (
    <Flex
      width='100%'
      bgColor='gray.50'
      borderRadius='8px'
      p={16}
      justify='center'
      align='center'
      direction='column'
    >
      <Heading size='lg' mb={2}>
        You haven’t added any sites.
      </Heading>
      <Text mb={4}>Let’s get started.</Text>
      <AddSiteModal>Add Your First Site</AddSiteModal>
    </Flex>
  );
};

const SiteDetails = ({ site }) => {
  if (!site) return null;
  return (
    <Box>
      {/* <ReactJson src={site} /> */}
      <Box>
        <Heading as='h3' size='md'>
          Instruction for site: {site.id}
        </Heading>
        <Text>Add the following line to Code Injection in Ghost</Text>
        {`<script src="https://ghutils.dingran.me/static/ghpreview.js" data-site="${site.id}" defer></script>`}
      </Box>
    </Box>
  );
};

const DashboardPage = () => {
  const { user, loading } = useAuth();

  const [selectedSiteId, setSelectedSiteId] = useState(null);

  if (!loading && !user) {
    Router.push('/');
  }

  const { data, error, isValidating } = useSWR(
    user ? ['/api/auth/sites', user.token] : null,
    fetcher
  );

  // if (error) {
  //   console.log('error from useSWR', error);
  //   console.log(error.info.code);
  //   console.log('refreshing token');
  //   getFreshToken().then((token) => {
  //     console.log(token);
  //   });
  // }

  const { data: siteData } = useSWR(
    user && selectedSiteId
      ? [`/api/auth/site/${selectedSiteId}`, user.token]
      : null,
    fetcher
  );

  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   console.log('calling getUserSites from useEffect');
  //   user &&
  //     getUserSites(user.uid).then((data) => {
  //       setData(data);
  //     });
  // }, [user]);

  // useEffect(() => {
  //   console.log('calling getSite from useEffect');
  //   selectedSiteId &&
  //     getSite(selectedSiteId).then((site) => {
  //       setSelectedSite(site);
  //     });
  // }, [selectedSiteId]);

  return (
    <>
      {user ? (
        <PageShell>
          <NextBreadcrumb
            pageName='Dashboard'
            pagePath='dashboard'
          ></NextBreadcrumb>

          {isValidating || data?.sites.length ? (
            <>
              <DashboardHeader></DashboardHeader>
              <SiteTable
                sites={data?.sites}
                setSelectedSiteId={setSelectedSiteId}
              />
              <SiteDetails site={siteData?.site}></SiteDetails>
            </>
          ) : (
            <EmptyState />
          )}
        </PageShell>
      ) : null}
    </>
  );
};

export default DashboardPage;
