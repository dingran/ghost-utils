import React from 'react';
import NextLink from 'next/link';
import { Box, Button, Flex, Link, Avatar, Icon } from '@chakra-ui/react';

import Footer from './Footer';
import Navbar from './NavBar';

const inner = {
  m: '0 auto',
  maxW: '1040px',
  width: '100%',
  flexGrow: 1,
};

const DashboardShell = ({ children }) => {
  return (
    <Flex backgroundColor='gray.100' direction='column' minH='100vh'>
      <Navbar innerWidth={inner.maxW} />
      <Flex direction='column' {...inner}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default DashboardShell;
