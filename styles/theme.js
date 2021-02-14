import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      '.cryptedmail:after': {
        content: `attr(data-name) "@" attr(data-domain) "." attr(data-tld);`,
      },
      a: {
        textDecor: 'underline',
      },
      'a:hover': {
        color: 'blue.500',
        textDecor: 'underline',
      },
      fonts: {
        heading: 'Georgia, serif',
        mono: 'Menlo, monospace',
      },
      'h1, h2, h3, h4, h5, h6': {
        mt: '1.5em',
        mb: '0.8em',
      },
      'ol, ul': {
        pl: '1.0em',
        pr: '1.0em',
        listStylePosition: 'inside',
      },
      'p, ul, ol, dl, blockquote': {
        mt: '1.0em',
        mb: '1.0em',
      },
      blockquote: {
        px: '1.0em',
        borderLeftColor: 'blue.200',
        borderLeftWidth: '3px',
        textColor: 'gray.400',
      },
      svg: {
        display: 'inline',
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
