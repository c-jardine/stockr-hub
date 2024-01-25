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
import { Dots, Trash } from 'tabler-icons-react';
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
            onClick={onOpen}
            icon={<Icon as={Trash} boxSize={4} />}
            _hover={{
              bg: 'red.500',
              color: 'whiteAlpha.900'
            }}
            _focus={{
              bg: 'red.500',
              color: 'whiteAlpha.900'
            }}
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
