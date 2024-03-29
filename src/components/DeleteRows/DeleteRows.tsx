// GenericCategoriesInput.jsx
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Icon,
  ScaleFade,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { Trash } from 'tabler-icons-react';

interface DeleteRowsProps {
  count: number;
  isVisible: boolean;
  onDeleteRows: () => void;
}

/**
 * A reusable component for deleting multiple table rows.
 */
export function DeleteRows({
  count,
  isVisible,
  onDeleteRows,
}: DeleteRowsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  return (
    <Box position='fixed' bottom={4} right={4}>
      <ScaleFade initialScale={0.8} in={isVisible}>
        <Button
          colorScheme='red'
          leftIcon={<Icon as={Trash} boxSize={4} />}
          onClick={onOpen}
        >
          Delete ({count})
        </Button>
        <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
          leastDestructiveRef={cancelRef}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Delete all</AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to delete{' '}
                <Text as='span' color='red.500' fontWeight='bold'>
                  {count}
                </Text>{' '}
                {count === 1 ? 'row' : 'rows'}?
              </AlertDialogBody>
              <AlertDialogFooter gap={2}>
                <Button colorScheme='red' onClick={onDeleteRows} ml={3}>
                  Delete
                </Button>
                <Button ref={cancelRef} variant='outline' onClick={onClose}>
                  Cancel
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </ScaleFade>
    </Box>
  );
}
