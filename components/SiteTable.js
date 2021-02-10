import React from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import * as db from '@/lib/db';
import { useAuth } from '@/lib/auth';
import NextLink from 'next/link';
import { parseISO, format } from 'date-fns';
import ReactJson from 'react-json-view';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
  HStack,
  Box,
  Button,
  Link,
  Skeleton,
  SkeletonText,
  Text,
  Thead,
  Tbody,
  Table,
  Tr,
  Th,
  Td,
  Icon,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import { IoInformationCircleOutline } from 'react-icons/io5';
import EditSiteModal from '@/components/EditSiteModal';
import DeleteSiteModal from '@/components/DeleteSiteModal';

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

const TableContent = ({ sites, setSelectedSiteId }) => {
  const onClickHandler = (siteId) => {
    setSelectedSiteId(siteId);
  };
  const defaultPreviewRatio = <Text color='gray.300'>0.4 (default)</Text>;
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
              <Link
                id={`site-table-link-${index}`}
                fontWeight='medium'
                onClick={() => {
                  onClickHandler(site.id);
                }}
              >
                {site.name}
              </Link>
            </Td>

            <Td>{siteIdStr}</Td>
            <Td>
              <Link href={site.url} isExternal>
                {site.url}
              </Link>
            </Td>
            <Td isNumeric>{site.previewRatio || defaultPreviewRatio}</Td>
            {/* <Td>{`${site.apiUrl} | ${apiKeyStr}`}</Td> */}
            <Td>{format(parseISO(site.updatedAt || site.createdAt), 'Pp')}</Td>

            <Td>
              <HStack spacing={4}>
                <EditSiteModal site={site} />
                <DeleteSiteModal siteId={site.id}>Delete</DeleteSiteModal>
              </HStack>
            </Td>
          </Box>
        );
      })}
    </Tbody>
  );
};

const SiteTable = ({ sites, setSelectedSiteId }) => {
  return (
    <Box>
      {/* <ReactJson src={sites} / */}
      <Table w='full' size='md' boxShadow='md'>
        <Thead bgColor='gray.50' whiteSpace='nowrap'>
          <Tr>
            <Th>Name </Th>
            <Th>Id </Th>
            <Th>Site Link</Th>
            <Th>Preview Ratio</Th>
            {/* <Th>Ghost API Url and Key</Th> */}
            <Th>Date Updated</Th>
            <Th></Th>
          </Tr>
        </Thead>
        {/* <TableSkeleton></TableSkeleton> */}
        {sites ? (
          <TableContent sites={sites} setSelectedSiteId={setSelectedSiteId} />
        ) : (
          <TableSkeleton />
        )}
      </Table>
    </Box>
  );
};

export default SiteTable;
