import React from 'react';
import NextLink from 'next/link';
import { parseISO, format } from 'date-fns';
import ReactJson from 'react-json-view';
import { Box, Button, Link, Skeleton } from '@chakra-ui/react';
// import { Table, Tr, Th, Td } from './Table';
import { Table, Tr, Th, Td } from '@chakra-ui/react';

// import {
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
// } from '@chakra-ui/react';

// import DeleteSiteButton from './DeleteSiteButton';

const SkeletonRow = ({ width }) => (
  <Box as='tr'>
    <Td>
      <Skeleton height='10px' w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height='10px' w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height='10px' w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height='10px' w={width} my={4} />
    </Td>
  </Box>
);

const TableSkeleton = () => (
  <tbody>
    <SkeletonRow width='75px' />
    <SkeletonRow width='125px' />
    <SkeletonRow width='50px' />
    <SkeletonRow width='100px' />
    <SkeletonRow width='75px' />
  </tbody>
);

const TableContent = ({ sites }) => {
  return (
    <tbody>
      {sites.map((site, index) => (
        <Box as='tr' key={site.id}>
          <Td>
            <NextLink href='/site/[siteId]' as={`/site/${site.id}`} passHref>
              <Link id={`site-table-link-${index}`} fontWeight='medium'>
                {site.name}
              </Link>
            </NextLink>
          </Td>
          <Td>
            <Link href={site.url} isExternal>
              {site.url}
            </Link>
          </Td>
          <Td>
            <NextLink href='/site/[siteId]' as={`/site/${site.id}`} passHref>
              <Link color='blue.500' fontWeight='medium'>
                View Feedback
              </Link>
            </NextLink>
          </Td>
          <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
          <Td>
            {/* <DeleteSiteButton siteId={site.id} /> */}
            <Button>Delete</Button>
          </Td>
        </Box>
      ))}
    </tbody>
  );
};

const SiteTable = ({ sites }) => {
  return (
    <Box>
      {/* <ReactJson src={sites} / */}
      <Table w='full'>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Date Added</Th>
            <Th width='50px'>{''}</Th>
          </Tr>
        </thead>
        {sites ? <TableContent sites={sites} /> : <TableSkeleton />}
      </Table>
    </Box>
  );
};

export default SiteTable;
