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

import { useState, useEffect } from 'react';
import { startsWithHttp, validUrl, reachUrl } from '@/utils/urltest';
import { FaEdit } from 'react-icons/fa';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

const EditSiteModal = ({ site: siteToEdit }) => {
  const toast = useToast();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, register, errors, getValues, reset } = useForm({
    mode: 'onTouched',
    defaultValues: {
      id: siteToEdit.id,
      name: siteToEdit.name,
      previewRatio: siteToEdit.previewRatio || 0.4,
      maxLength: siteToEdit.maxLength || 10000,
    },
  });

  // useEffect(() => {
  //   db.getSite(siteToEdit.id).then((data) => {
  //     reset(data);
  //   });
  // }, [isOpen]); // calls on every Open of the modal

  const onUpdateSite = async ({ name, previewRatio, maxLength }) => {
    const token = auth.user.token;
    const newSiteData = {
      updatedAt: new Date().toISOString(),
      name,
      previewRatio: parseFloat(previewRatio),
    };

    if (maxLength) {
      newSiteData.maxLength = parseInt(maxLength);
    }

    try {
      mutate(
        ['/api/auth/sites', token],
        async (data) => {
          const newSites = data.sites.map((site) => {
            if (site.id !== siteToEdit.id) return site;
            const updated = { ...site, ...newSiteData };
            return updated;
          });
          return { sites: newSites };
        },
        false
      );

      await db.updateSite(siteToEdit.id, newSiteData);

      reset(newSiteData);

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
        description: `We were not able to update the site ${siteToEdit.id}, due to ${err.name}: ${err.message}`,
        status: 'error',
        duration: 15000,
        isClosable: true,
      });
    } finally {
      mutate(['/api/auth/sites', token]); // trigger revalidation
    }
  };

  return (
    <>
      <Box color='gray.600'>
        <Link
          id='edit-site-modal-button'
          onClick={() => {
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

            <FormControl isInvalid={errors.previewRatio}>
              <FormLabel>Preview Ratio</FormLabel>
              <Input
                id='ratio-input'
                placeholder='0.4 (default)'
                name='previewRatio'
                ref={register({
                  required: true,
                  min: 0.0,
                  max: 1.0,
                  validate: {
                    isNumber: (str) => !isNaN(parseFloat(str)),
                  },
                })}
              />

              {errors.previewRatio?.type === 'required' && (
                <FormErrorMessage>{'Required'}</FormErrorMessage>
              )}

              {errors.previewRatio?.type === 'isNumber' && (
                <FormErrorMessage>{'Should be a number'}</FormErrorMessage>
              )}

              {(errors.previewRatio?.type === 'min' ||
                errors.previewRatio?.type === 'max') && (
                <FormErrorMessage>
                  {'Should be between 0.0 and 1.0'}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errors.maxLength}>
              <FormLabel>Max Length (number of characters)</FormLabel>
              <Input
                id='ratio-input'
                placeholder='10000 (default)'
                name='maxLength'
                ref={register({
                  // required: true,
                  min: 500,
                  validate: {
                    isNumber: (str) => !str || !isNaN(parseInt(str)), // empty ok
                  },
                })}
              />
              {/* {errors.maxLength?.type === 'required' && (
                <FormErrorMessage>{'Required'}</FormErrorMessage>
              )} */}

              {errors.maxLength?.type === 'isNumber' && (
                <FormErrorMessage>{'Should be a number'}</FormErrorMessage>
              )}

              {errors.maxLength?.type === 'min' && (
                <FormErrorMessage>
                  {
                    'Should be greater than 500, this is the max number of characters to preview.'
                  }
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
                  onUpdateSite(formData);
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
