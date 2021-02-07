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

import { FaEdit } from 'react-icons/fa';

export default function EditSiteButton() {
  return (
    <Box color='gray.600'>
      <FaEdit />
    </Box>
  );
}
