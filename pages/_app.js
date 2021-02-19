import { AuthProvider } from '@/lib/auth';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@/components/MDXComponents';
import React from 'react';
import { DefaultSeo } from 'next-seo';

const title =
  'Ghost Preview – Automatically add content preview for member-only posts on Ghost.';
const description =
  'Ghost Preview is one of the Ghost Utilities (Ghutils) that is built to make the blogging experience on Ghost platform better';

const SEO = {
  title,
  description,
  canonical: 'https://ghutils.dingran.me',
  openGraph: {
    site_name: 'Ghost Preview',
    type: 'website',
    locale: 'en_US',
    url: 'https://ghutils.dingran.me',
    title,
    description,
    images: [
      {
        url: 'https://ghutils.dingran.me/og.jpg',
        alt: title,
        width: 523,
        height: 274,
      },
    ],
  },
  twitter: {
    handle: '@ding_ran',
    site: '@ding_ran',
    cardType: 'summary_large_image',
  },
};

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <MDXProvider components={MDXComponents}>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </MDXProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
export default App;
