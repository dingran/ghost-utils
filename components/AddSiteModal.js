import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';

import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const AddSiteModal = ({ children }) => {
  const toast = useToast();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onCreateSite = async ({ name, url }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
      settings: {
        icons: true,
        timestamp: true,
        ratings: false,
      },
    };

    try {
      const { id } = await createSite(newSite);

      mutate(
        ['/api/sites', auth.user.token],
        async (data) => ({
          sites: [{ id, ...newSite }, ...data.sites], //See "Mutate Based on Current Data" https://swr.vercel.app/docs/mutation
        }),
        false
      );

      toast({
        title: 'Success! 🎉',
        description: "We've added your site.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Failed! 😢',
        description: `We were not able to add you site, due to ${err.name}: ${err.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    onClose();
  };

  return (
    <>
      <Button
        id='add-site-modal-button'
        onClick={onOpen}
        backgroundColor='gray.900'
        color='white'
        fontWeight='medium'
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight='bold'>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                id='site-input'
                placeholder='My site'
                name='name'
                ref={register({
                  required: 'Required',
                })}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Website Url</FormLabel>
              <Input
                id='link-input'
                placeholder='https://example.com'
                name='url'
                ref={register({
                  required: 'Required',
                })}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Ghost Admin API Key</FormLabel>
              <Input
                id='api-input'
                placeholder=''
                name='api'
                ref={register({
                  required: 'Required',
                })}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Ghost API Url</FormLabel>
              <Input
                id='api-url-input'
                placeholder='https://example.ghost.io'
                name='url'
                ref={register({
                  required: 'Required',
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight='medium'>
              Cancel
            </Button>
            <Button
              id='create-site-button'
              backgroundColor='#99FFFE'
              color='#194D4C'
              fontWeight='medium'
              type='submit'
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
