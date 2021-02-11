import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import axios from 'axios';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  useDisclosure,
  HStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

import * as db from '@/lib/db';
import { useAuth } from '@/lib/auth';

import { useState } from 'react';
import { startsWithHttp, validUrl, reachUrl } from '@/utils/urltest';

const AddSiteModal = ({ children }) => {
  const toast = useToast();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors, getValues } = useForm({
    mode: 'onTouched',
  });
  const [apiValidated, setApiValidated] = useState(false);

  const onCreateSite = async ({ name, url, apiKey, apiUrl }) => {
    const uid = auth.user.uid;
    const token = auth.user.token;
    const newSite = {
      authorId: uid,
      createdAt: new Date().toISOString(),
      name,
      url,
      apiKey,
      apiUrl,
      previewRatio: parseFloat(previewRatio),
    };

    let siteId = null;
    try {
      ({ id: siteId } = await db.createSite(newSite));

      mutate(['/api/auth/sites', token]);

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
        duration: 15000,
        isClosable: true,
      });
    }

    try {
      const resp = await axios.get(`/api/auth/ghostwebhooks?siteId=${siteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: 'Success! 🎉',
        description:
          "We've added webhooks to sync your post updates with preview.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Warning 😢',
        description: `We were not able to add webhooks. But your preview should still work, it's just slower.\n (${err.name}: ${err.message}.)`,
        status: 'warning',
        duration: 15000,
        isClosable: true,
      });
    }
  };

  const validateApiKey = async (apiKey) => {
    console.log('validating apikey');
    const apiUrl = getValues('apiUrl');
    console.log(apiUrl, apiKey);
    if (apiUrl && apiKey) {
      const res = await fetch(
        `/api/ghostApiTest?apiUrl=${apiUrl}&apiKey=${apiKey}`,
        {
          method: 'GET',
        }
      );
      console.log(res.status);
      if (res.status !== 200) {
        setApiValidated(false);
        return false;
      }

      setApiValidated(true);
      return true;
    }

    setApiValidated(false);
    return false;
  };

  return (
    <>
      <Button
        id='add-site-modal-button'
        onClick={() => {
          setApiValidated(false);
          onOpen();
        }}
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
        <ModalContent
          as='form'
          onSubmit={handleSubmit((formData) => {
            onCreateSite(formData);
            onClose();
          })}
        >
          <ModalHeader fontWeight='bold'>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                id='site-input'
                placeholder='My site'
                name='name'
                ref={register({ required: true })}
              />
              {errors.name && (
                <FormErrorMessage>{'Name is required'}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={errors.url}>
              <FormLabel>Website Url</FormLabel>
              <Input
                id='link-input'
                placeholder='https://example.com'
                name='url'
                ref={register({
                  required: true,
                  validate: {
                    validUrl,
                    startsWithHttp,
                    // reachUrl,
                  },
                })}
              />
              {errors.url?.type === 'required' && (
                <FormErrorMessage>{'Website Url is required'}</FormErrorMessage>
              )}
              {errors.url?.type === 'startsWithHttp' && (
                <FormErrorMessage>
                  {'Remember to add https:// or http://'}
                </FormErrorMessage>
              )}
              {errors.url?.type === 'validUrl' && (
                <FormErrorMessage>
                  {'The provided is not a valid url'}
                </FormErrorMessage>
              )}
              {errors.url?.type === 'reachUrl' && (
                <FormErrorMessage>
                  {'The provide url is not reachable.'}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={errors.apiUrl}>
              <FormLabel>Ghost API Url</FormLabel>
              <Input
                id='api-url-input'
                placeholder='https://example.ghost.io'
                name='apiUrl'
                ref={register({
                  required: true,
                  validate: {
                    validUrl,
                    startsWithHttp,
                    // reachUrl,
                  },
                })}
              />

              {errors.apiUrl?.type === 'required' && (
                <FormErrorMessage>
                  {'Ghost API Url is required'}
                </FormErrorMessage>
              )}
              {errors.apiUrl?.type === 'startsWithHttp' && (
                <FormErrorMessage>
                  {'Remember to add https:// or http://'}
                </FormErrorMessage>
              )}
              {errors.apiUrl?.type === 'validUrl' && (
                <FormErrorMessage>
                  {'The provided is not a valid url'}
                </FormErrorMessage>
              )}
              {errors.apiUrl?.type === 'reachUrl' && (
                <FormErrorMessage>
                  {'The provide url is not reachable.'}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={errors.apiKey}>
              <FormLabel>Ghost Admin API Key</FormLabel>
              <Input
                id='api-input'
                placeholder=''
                name='apiKey'
                ref={register({
                  required: true,
                  validate: {
                    length89: (str) => str.length === 89,
                    format: (str) => {
                      const parts = str.split(':');
                      if (parts.length !== 2) return false;
                      if (parts[0].length !== 24 || parts[1].length !== 64)
                        return false;
                      return true;
                    },
                    validateApiKey,
                  },
                })}
              />
              {errors.apiKey?.type === 'required' && (
                <FormErrorMessage>
                  {'Ghost Admin API Key is required'}
                </FormErrorMessage>
              )}
              {errors.apiKey?.type === 'length89' && (
                <FormErrorMessage>
                  {'Ghost Admin API Key should have 89 characters'}
                </FormErrorMessage>
              )}
              {errors.apiKey?.type === 'format' && (
                <FormErrorMessage>
                  {
                    'Ghost Admin API Key should have have the following format {A}:{B}, where A is 24 hex characters and B is 64 hex characters'
                  }
                </FormErrorMessage>
              )}
              {errors.apiKey?.type === 'validateApiKey' && (
                <FormErrorMessage>
                  {
                    'Ghost API test call failed, please double check API Key and Url and try again'
                  }
                </FormErrorMessage>
              )}
              {!errors.apiKey && apiValidated ? (
                <FormHelperText color='green'>
                  Ghost Admin API key and url works! 🎉{' '}
                </FormHelperText>
              ) : null}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button onClick={onClose} fontWeight='medium'>
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
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
