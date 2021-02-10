import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import axios from 'axios';

import {
  Box,
  Link,
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
import { FaEdit } from 'react-icons/fa';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

const EditSiteModal = ({ site }) => {
  const toast = useToast();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, register, errors, getValues } = useForm({
    mode: 'onTouched',
    defaultValues: {
      id: site.id,
      name: site.name,
      url: site.url,
      apiUrl: site.apiUrl,
      apiKey: site.apiKey,
      previewRatio: site.previewRatio || 0.4,
    },
  });
  const [apiValidated, setApiValidated] = useState(false);

  const onUpdateSite = async ({
    siteId,
    name,
    url,
    apiUrl,
    apiKey,
    previewRatio,
  }) => {
    const uid = auth.user.uid;
    const token = auth.user.token;
    const newSiteData = {
      authorId: uid,
      updatedAt: new Date().toISOString(),
      name,
      url,
      apiUrl,
      apiKey,
      previewRatio: parseFloat(previewRatio),
    };

    try {
      mutate(
        ['/api/auth/sites', token],
        async (data) => {
          const newSites = data.sites.map((site) => {
            if (site.id !== siteId) return site;
            const updated = { ...site, ...newSiteData };
            return updated;
          });
          return { sites: newSites };
        },
        false
      );

      await db.updateSite(siteId, newSiteData);

      toast({
        title: 'Success! 🎉',
        description: "We've updated your site.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Failed! 😢',
        description: `We were not able to update the site ${siteId}, due to ${err.name}: ${err.message}`,
        status: 'error',
        duration: 15000,
        isClosable: true,
      });
    } finally {
      mutate(['/api/auth/sites', token]); // trigger revalidation
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
      <Box color='gray.600'>
        <Link
          id='edit-site-modal-button'
          onClick={() => {
            setApiValidated(false);
            onOpen();
          }}
        >
          <FaEdit />
        </Link>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form'>
          <ModalHeader fontWeight='bold'>Edit Site Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isDisabled>
              <FormLabel>Site Id</FormLabel>
              <Input
                id='site-id'
                name='id'
                ref={register({ required: true })}
              />
            </FormControl>
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

            <FormControl isInvalid={errors.previewRatio}>
              <FormLabel>Preview Ratio</FormLabel>
              <Input
                id='ratio-input'
                placeholder='0.4 (default)'
                name='previewRatio'
                ref={register({ required: true, min: 0.0, max: 1.0 })}
              />
              {errors.previewRatio?.type === 'required' && (
                <FormErrorMessage>
                  {'previewRatio is required'}
                </FormErrorMessage>
              )}

              {(errors.previewRatio?.type === 'min' ||
                errors.previewRatio?.type === 'max') && (
                <FormErrorMessage>
                  {'previewRatio should be between 0.0 and 1.0'}
                </FormErrorMessage>
              )}
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
                onClick={handleSubmit((formData) => {
                  onUpdateSite({ ...formData, siteId: site.id });
                  onClose();
                })}
              >
                Update
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSiteModal;
