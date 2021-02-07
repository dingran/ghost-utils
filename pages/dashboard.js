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
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import PageShell from '@/components/PageShell';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import Router from 'next/router';
import AddSiteModal from '@/components/AddSiteModal';
import SiteTable from '@/components/SiteTable';

import ReactJson from 'react-json-view';

const SettingsCard = ({ title, children }) => (
  <Box
    flexBasis='40%'
    backgroundColor='white'
    mt={8}
    borderRadius={[0, 8, 8]}
    boxShadow='0px 4px 10px rgba(0, 0, 0, 0.05)'
  >
    <Flex
      backgroundColor='gray.50'
      borderTopLeftRadius={[0, 8, 8]}
      borderTopRightRadius={[0, 8, 8]}
      borderBottom='1px solid'
      borderBottomColor='gray.200'
      px={6}
      py={4}
    >
      <Flex justify='space-between' align='center' w='full'>
        <Text
          textTransform='uppercase'
          fontSize='xs'
          color='gray.500'
          fontWeight='medium'
          mt={1}
        >
          {title}
        </Text>
      </Flex>
    </Flex>
    <Flex direction='column' p={6}>
      {children}
    </Flex>
  </Box>
);

const Dashboard = () => {
  const { user, loading } = useAuth();
  if (!loading && !user) {
    Router.push('/');
  }

  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  if (!data) {
    return null; //TODO add skeleton when data is not ready
  }

  return (
    <>
      <SiteTable sites={data.sites} />
      {user ? (
        <>
          <NextBreadcrumb
            pageName='Dashboard'
            pagePath='dashboard'
          ></NextBreadcrumb>
          <Flex direction='row' justify='space-evenly'>
            <SettingsCard title='Sites'>
              <Grid
                templateColumns='repeat(5, 1fr)'
                gap={1}
                alignItems='center'
              >
                <GridItem colSpan={3}>Site Name 1</GridItem>
                <GridItem colStart={4} colEnd={6}>
                  <Button>Details</Button>
                </GridItem>

                <GridItem colSpan={3} bg='tomato'>
                  Site Name 1
                </GridItem>
                <GridItem colStart={4} colEnd={6} bg='papayawhip'>
                  <Button>Details</Button>
                </GridItem>

                <GridItem colSpan={3} bg='tomato'>
                  Site Name 1
                </GridItem>
                <GridItem colStart={4} colEnd={6} bg='papayawhip'>
                  <Button>Details</Button>
                </GridItem>
                {/* <Box w='100%' h='10' bg='blue.500' />
                <Box w='100%' h='10' bg='blue.500' />
                <Box w='100%' h='10' bg='blue.500' />
                <Box w='100%' h='10' bg='blue.500' />
                <Box w='100%' h='10' bg='blue.500' /> */}
              </Grid>
              <AddSiteModal>Add a New Site</AddSiteModal>
            </SettingsCard>

            <SettingsCard title='Details'></SettingsCard>
          </Flex>
        </>
      ) : null}
    </>
  );
};

const DashboardPage = () => (
  <PageShell>
    <Dashboard />
  </PageShell>
);

export default DashboardPage;
