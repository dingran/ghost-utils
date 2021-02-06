import React from 'react';
import NextLink from 'next/link';
import { Logo } from './icons';
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

const Navbar = (props) => {
  const { user } = useAuth();
  const innerWidth = props.innerWidth || '1040px';

  return (
    <Flex
      bgColor='white'
      borderTop='5px solid'
      borderTopColor='brand.300'
      boxShadow='base'
      px={16}
    >
      <Flex
        align='center'
        justifyContent='space-between'
        w='full'
        maxW={innerWidth}
        m='0 auto'
        my={2}
      >
        <HStack spacing={4}>
          <Logo boxSize={8}></Logo>
          <Box>Member-Only Content Preview for Ghost</Box>
        </HStack>
        <HStack spacing={6}>
          <Box>FAQ</Box>
          <Button>Login</Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
