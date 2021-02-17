import React from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import {
  Box,
  Button,
  Avatar,
  HStack,
  Flex,
  Link,
  Icon,
  SkeletonCircle,
  Stack,
  Center,
  Heading,
  Text,
  Divider,
} from '@chakra-ui/react';
import BMAC from '@/components/BMAC';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const Showcase = () => {
  return (
    <>
      <Divider></Divider>
      <Flex justify='space-between' align='center'>
        <NextLink href='/faq#what-are-some-examples' passHref>
          <Link>
            <Text fontSize='lg' fontWeight='bold' textDecor='underline'>
              👉 <span>&nbsp;&nbsp;</span>See who are already using Ghost
              Preview
            </Text>
          </Link>
        </NextLink>
        <Box mr={8}>
          <BMAC />
        </Box>
      </Flex>
      <Divider></Divider>
      <Box my={16}>
        <Center mb={8}>
          <Heading as='h2' size='lg'>
            <Link
              href='https://www.dingran.me/memberonly-preview-demo/'
              isExternal
            >
              Live Demo 🎉
              <ExternalLinkIcon w={6} mb={1} mx={2} />
            </Link>
          </Heading>
        </Center>
        <Box m='0 auto' boxShadow='lg'>
          <img src={require('../public/images/demo.webp')} />
        </Box>
      </Box>
      <Divider></Divider>
      {/* <Box mt={8}>
        <Center mb={8}>
          <Heading as='h2' size='lg'>
            Live Examples 👍
          </Heading>
        </Center>
        <Box boxShadow='lg' bgColor='gray.50' p={8}>
          <Flex
            direction={['column', 'column', 'row', 'row']}
            align='center'
            justifyContent='center'
          >
            <Box m={4} width='50%'>
              <Heading as='h4' size='md'>
                something
              </Heading>
            </Box>
            <Box m='0 auto' boxShadow='md' maxWidth='500px'>
              <img src={require('../public/images/demo.webp')} />
            </Box>
          </Flex>
        </Box>
      </Box> */}
    </>
  );
};

export default Showcase;
