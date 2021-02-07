import React from 'react';
import NextLink from 'next/link';
import { parseISO, format } from 'date-fns';
import ReactJson from 'react-json-view';
import EditSiteButton from '@/components/EditSiteButton';
import {
  Box,
  Button,
  Link,
  Skeleton,
  SkeletonText,
  Thead,
  Tbody,
  Table,
  Tr,
  Th,
  Td,
  Icon,
} from '@chakra-ui/react';
import { IoInformationCircleOutline } from 'react-icons/io5';

// import DeleteSiteButton from './DeleteSiteButton';

const SkeletonRow = ({ width }) => {
  const height = '12px';
  const Row = ({ width }) => (
    <Td>
      <Skeleton h={height} w={width} my={1} />
    </Td>
  );
  return (
    <Tr>
      <Row width={width} />
      <Row width={width} />
      <Row width={width} />
      <Row width={width} />
      <Row width={width} />
    </Tr>
  );
};

const TableSkeleton = () => (
  <Tbody>
    <SkeletonRow width='75px' />
    <SkeletonRow width='125px' />
    <SkeletonRow width='50px' />
    <SkeletonRow width='100px' />
    <SkeletonRow width='75px' />
  </Tbody>
);

const TableContent = ({ sites }) => {
  return (
    <Tbody>
      {sites.map((site, index) => {
        const nchar = 6;
        const apiKeyStr =
          site.apiKey.length > nchar
            ? `${site.apiKey.slice(0, nchar)}**`
            : site.apiKey;
        const siteIdStr =
          site.id.length > nchar ? `${site.id.slice(0, nchar)}**` : site.id;

        return (
          <Box as='tr' key={site.id}>
            <Td>
              <NextLink href='/site/[siteId]' as={`/site/${site.id}`} passHref>
                <Link id={`site-table-link-${index}`} fontWeight='medium'>
                  {siteIdStr}
                </Link>
              </NextLink>
            </Td>
            <Td>
              <Link href={site.url} isExternal>
                {site.url}
              </Link>
            </Td>
            <Td>{`${site.apiUrl} | ${apiKeyStr}`}</Td>
            <Td>{format(parseISO(site.createdAt), 'P')}</Td>

            <Td>
              <EditSiteButton siteId={site.id} />
            </Td>
          </Box>
        );
      })}
    </Tbody>
  );
};

const SiteTable = ({ sites }) => {
  return (
    <Box>
      {/* <ReactJson src={sites} / */}
      <Table w='full' size='md' boxShadow='md'>
        <Thead bgColor='gray.50' whiteSpace='nowrap'>
          <Tr>
            <Th>
              Id <IoInformationCircleOutline sx={{ display: 'inline' }} />
            </Th>
            <Th>Site Link</Th>
            <Th>Ghost API Url and Key</Th>
            <Th>Date Added</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        {/* <TableSkeleton></TableSkeleton> */}
        {sites ? <TableContent sites={sites} /> : <TableSkeleton />}
      </Table>
    </Box>
  );
};

export default SiteTable;
