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
} from '@chakra-ui/react';

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
        const key = site.apiKey;
        const nchar = 8;
        const apiKeyStr = `****${key.slice(Math.max(key.length - nchar, 0))}`;
        return (
          <Box as='tr' key={site.id}>
            <Td>{site.name}</Td>
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
      <Table
        w='full'
        size='md'
        borderRadius={8}
        boxShadow='0px 4px 10px rgba(0, 0, 0, 0.05)'
      >
        <Thead bgColor='gray.50'>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Ghost API Url and Admin Key</Th>
            <Th>Date Added</Th>
            <Th></Th>
          </Tr>
        </Thead>
        {/* <TableSkeleton></TableSkeleton> */}
        {sites ? <TableContent sites={sites} /> : <TableSkeleton />}
      </Table>
    </Box>
  );
};

export default SiteTable;
