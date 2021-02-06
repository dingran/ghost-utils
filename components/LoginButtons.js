import { Button, Flex } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { Github, Google, Twitter } from './icons';

const LoginButtons = () => {
  const auth = useAuth();

  return (
    <Flex direction={['column', 'row']}>
      <Button
        onClick={() => auth.signinWithTwitter()}
        leftIcon={<Twitter />}
        mt={4}
        mr={2}
        _active={{
          // bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        Continue with Twitter
      </Button>
      <Button
        onClick={() => auth.signinWithGoogle()}
        leftIcon={<Google />}
        mt={4}
        _active={{
          transform: 'scale(0.95)',
        }}
      >
        Continue with Google
      </Button>
    </Flex>
  );
};

export default LoginButtons;
