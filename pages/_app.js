import { AuthProvider } from '@/lib/auth';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@/components/MDXComponents';
import React, { useEffect } from 'react';
import Router from 'next/router';
import { DefaultSeo } from 'next-seo';
import * as Fathom from 'fathom-client';

// Record a pageview when route changes
Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

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
  // Initialize Fathom when the app loads
  useEffect(() => {
    Fathom.load('WUGXVMLD', {
      url: 'https://amphibian.dingran.me/script.js',
      includedDomains: ['ghutils.dingran.me'],
    });
  }, []);

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
