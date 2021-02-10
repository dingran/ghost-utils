import React, { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
  Link,
  useToast,
  Box,
} from '@chakra-ui/react';

import { deleteSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { FaTrashAlt } from 'react-icons/fa';

const DeleteSiteModal = ({ siteId }) => {
  const [isOpen, setIsOpen] = useState();
  const toast = useToast();
  const cancelRef = useRef();
  const auth = useAuth();

  const onClose = () => setIsOpen(false);
  const onDelete = async () => {
    try {
      mutate(
        ['/api/auth/sites', auth.user.token],
        async (data) => {
          return {
            sites: data.sites.filter((site) => site.id !== siteId),
          };
        },
        false
      );

      await deleteSite(siteId);

      toast({
        title: 'Success! 🎉',
        description: "We've deleted your site.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Failed! 😢',
        description: `We were not able to delete the site ${siteId}, due to ${err.name}: ${err.message}`,
        status: 'error',
        duration: 15000,
        isClosable: true,
      });
    } finally {
      mutate(['/api/auth/sites', auth.user.token]); // trigger revalidation
    }

    onClose();
  };

  return (
    <>
      <Box color='gray.600'>
        <Link id='delete-site-modal-button' onClick={() => setIsOpen(true)}>
          <FaTrashAlt />
        </Link>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Site
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? This will deletel all info associated with the site.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              fontWeight='bold'
              colorScheme='red'
              onClick={onDelete}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteSiteModal;
