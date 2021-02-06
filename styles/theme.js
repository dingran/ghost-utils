import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      '.cryptedmail:after': {
        content: `attr(data-name) "@" attr(data-domain) "." attr(data-tld);`,
      },
      'a:hover': {
        color: 'blue.500',
        textDecor: 'underline',
      },
    },
  },
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  colors: {
    brand: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 800,
  },
});
export default theme;
