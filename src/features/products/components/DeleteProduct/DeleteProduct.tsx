import { type ProductGetAllOutputSingle } from '@/types';
import {
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Dots } from 'tabler-icons-react';
import useDeleteProduct from './hooks/useDeleteProduct';

export default function DeleteProduct(props: ProductGetAllOutputSingle) {
  const {
    onDelete,
    disclosure: { isOpen, onOpen, onClose },
  } = useDeleteProduct(props);

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          variant='outline'
          colorScheme='black'
          pt={1}
        >
          <Icon as={Dots} />
        </MenuButton>
        <MenuList>
          <MenuItem
            color='red.500'
            fontSize='sm'
            fontWeight='700'
            onClick={onOpen}
          >
            Delete product
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete product</ModalHeader>
          <ModalBody>
            Are you sure you want to delete{' '}
            <Text as='span' fontWeight='semibold'>
              {props.name}
            </Text>
          </ModalBody>
          <ModalFooter gap={4}>
            <Button colorScheme='red' onClick={onDelete}>
              Delete
            </Button>
            <Button variant='outline' colorScheme='black' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
