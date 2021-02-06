import React from 'react';
import NextLink from 'next/link';
import { Link, Flex, HStack } from '@chakra-ui/react';

const FooterLink = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <Link fontSize='sm' mr={4} fontWeight='medium' color='gray.500'>
        {children}
      </Link>
    </NextLink>
  );
};

const Footer = () => {
  return (
    <HStack spacing={8} mb={8} mt={24} justify='center'>
      <FooterLink href='/privacy'>Privacy</FooterLink>
      <FooterLink href='/terms'>Terms</FooterLink>
      <FooterLink href='/faq'>FAQ</FooterLink>
      <FooterLink href='/'>Home</FooterLink>
    </HStack>
  );
};

export default Footer;
