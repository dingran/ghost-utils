import { AuthProvider } from '@/lib/auth';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@/components/MDXComponents';
import React, { useEffect } from 'react';
import Router from 'next/router';
import * as Fathom from 'fathom-client';

// Record a pageview when route changes
Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

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
          <Component {...pageProps} />
        </MDXProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
export default App;
