import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  HStack,
  Flex,
  Link,
  Avatar,
  Icon,
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const Navbar = ({ children }) => {
  const { user } = useAuth();

  return (
    <Flex bgColor='brand.50' borderTop='5px solid' borderTopColor='gray.500'>
      <Flex
        align='center'
        justifyContent='space-between'
        w='full'
        maxW='950px'
        m='0 auto'
        my={4}
      >
        <Flex>
          <Box>Logo</Box>
        </Flex>
        <HStack>
          <Box>FAQ</Box>
          <Button>Login</Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
