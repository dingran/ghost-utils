import React from 'react';
import NextLink from 'next/link';
import Router from 'next/router';
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
  useMediaQuery,
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
  const [largeScreen] = useMediaQuery('(min-width: 700px)');

  return (
    <Flex
      bgColor='white'
      borderTop='4px solid'
      borderTopColor='brand.500'
      boxShadow='base'
      px={[4, 8]}
      mb={[2, 8]}
      h='60px'
    >
      <Flex
        align='center'
        whiteSpace='nowrap' // ensure signle line
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
          {largeScreen ? (
            <WrappedLink href='/'>
              <Box fontSize='lg' fontWeight='bold'>
                Ghost Preview
              </Box>
            </WrappedLink>
          ) : null}
        </HStack>
        <HStack spacing={6}>
          <Link href='https://www.dingran.me/ghost-preview-setup/' isExternal>
            <Box fontWeight={600}> Set Up Instructions</Box>
          </Link>
          <WrappedLink href='/faq'>
            <Box fontWeight={600}> FAQ</Box>
          </WrappedLink>
          {user ? (
            <>
              <Button
                onClick={() => {
                  Router.push('/dashboard');
                }}
              >
                Dashboard
              </Button>
              <WrappedLink href='/account'>
                <Avatar size='sm' src={user?.photoUrl} />
              </WrappedLink>
            </>
          ) : null}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
