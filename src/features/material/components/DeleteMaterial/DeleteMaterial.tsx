import { type MaterialGetAllOutputSingle } from '@/types';
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
import { useDeleteMaterial } from './hooks';

export default function DeleteMaterial(props: MaterialGetAllOutputSingle) {
  const {
    onDelete,
    disclosure: { isOpen, onOpen, onClose },
  } = useDeleteMaterial(props);

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
              color: 'whiteAlpha.900',
            }}
            _focus={{
              bg: 'red.500',
              color: 'whiteAlpha.900',
            }}
          >
            Delete material
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete material</ModalHeader>
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
