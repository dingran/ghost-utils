import { Button, Flex } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { Github, Google, Twitter } from './icons';
import { FcGoogle } from 'react-icons/fc';

const LoginButtons = () => {
  const { user } = useAuth();

  return (
    <Flex direction={['column', 'row']}>
      {/* <Button
        onClick={() => auth.signinWithTwitter()}
        leftIcon={<Twitter />}
        my={4}
        mx={2}
        _active={{
          // bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        Continue with Twitter
      </Button> */}
      <Button
        variant='solid'
        onClick={() => auth.signinWithGoogle()}
        leftIcon={<FcGoogle />}
        my={4}
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
