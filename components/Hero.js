import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Avatar,
  HStack,
  Flex,
  Link,
  Icon,
  SkeletonCircle,
  Heading,
  Text,
} from '@chakra-ui/react';
import LoginButtons from '@/components/LoginButtons';

const Hero = () => {
  return (
    <Flex
      flexDir={['column', 'column', 'column', 'row']}
      w='full'
      align='center'
      mb={8}
    >
      <Box mt={4} width='70%'>
        <Box mb={4}>
          <Heading display='inline' color='gray.800'>
            Automatically add{' '}
          </Heading>
          <Heading
            display='inline'
            bgGradient='linear(60deg,#f79533,#f37055,#ef4e7b,#a166ab,#5073b8,#1098ad,#07b39b,#6fba82)'
            bgClip='text'
          >
            content preview
          </Heading>
          <Heading display='inline' color='gray.700'>
            {' '}
            for member-only posts on Ghost
          </Heading>
        </Box>
        {/* <Text>Something</Text> */}
      </Box>
      <Box m='0 auto'>
        <LoginButtons></LoginButtons>
      </Box>
    </Flex>
  );
};

export default Hero;
