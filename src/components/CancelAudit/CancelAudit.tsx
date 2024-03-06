import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { Trash } from 'tabler-icons-react';

export default function CancelAudit({
  name,
  isIcon = false,
  onDelete,
}: {
  name: string;
  isIcon?: boolean;
  onDelete: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelBtnRef = React.useRef(null);

  return (
    <>
      {isIcon ? (
        <IconButton
          variant='outline'
          colorScheme='red'
          icon={<Icon as={Trash} />}
          aria-label={`Delete ${name} audit`}
          onClick={onOpen}
        />
      ) : (
        <Button variant='outline' onClick={onOpen}>
          Cancel
        </Button>
      )}
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelBtnRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Cancel {name} Audit</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to cancel this audit?
            </AlertDialogBody>
            <AlertDialogFooter gap={4}>
              <Button onClick={onDelete}>Cancel audit</Button>
              <Button ref={cancelBtnRef} variant='outline' onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
