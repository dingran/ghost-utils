import Link from 'next/link';
import Image from 'next/image';
import { Box, Code, Heading } from '@chakra-ui/react';

const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    );
  }

  return <a target='_blank' rel='noopener noreferrer' {...props} />;
};

const MDXComponents = {
  Image,
  a: CustomLink,
  pre: (props) => <div {...props} />,
  // code: CodeBlock,
  inlineCode: Code,
  h1: (props) => <Heading as='h1' size='xl' mt={8} mb={4} {...props} />,
  h2: (props) => <Heading as='h2' size='lg' mt={6} mb={4} {...props} />,
  h3: (props) => <Heading as='h3' size='md' mt={4} mb={2} {...props} />,
  p: (props) => <Box mt={2} {...props}></Box>,
};

export default MDXComponents;
