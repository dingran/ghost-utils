import React from 'react';
import NextLink from 'next/link';
import { Logo } from './icons';
import {
  Box,
  Button,
  Heading,
  Avatar,
  HStack,
  Flex,
  Link,
  Icon,
  SkeletonCircle,
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const WrappedLink = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <Link>{children}</Link>
    </NextLink>
  );
};

const Navbar = (props) => {
  const { user, loading } = useAuth();
  const innerWidth = props.innerWidth || '1040px';

  return (
    <Flex
      bgColor='white'
      borderTop='4px solid'
      borderTopColor='brand.300'
      boxShadow='base'
      px={[4, 8]}
      mb={[2, 8]}
      h='60px'
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
          <WrappedLink href='/'>
            <Logo color='gray.800' boxSize={7}></Logo>
          </WrappedLink>
          <WrappedLink href='/'>
            <Box fontSize='lg' fontWeight='bold'>
              Ghost Preview
            </Box>
          </WrappedLink>
        </HStack>
        <HStack spacing={6}>
          <WrappedLink href='/faq'>FAQ</WrappedLink>
          {loading ? <SkeletonCircle /> : null}
          {user ? (
            <WrappedLink href='/account'>
              <Avatar size='sm' src={user?.photoUrl} />
            </WrappedLink>
          ) : null}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
