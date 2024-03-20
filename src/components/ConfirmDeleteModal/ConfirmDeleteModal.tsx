import {
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  type UseDisclosureProps,
} from "@chakra-ui/react";
import React from "react";
import { Dots } from "tabler-icons-react";
import { DeleteMenuItem } from "../DeleteMenuItem";

export default function ConfirmDeleteModal({
  name,
  onDelete,
  disclosure: { isOpen, onOpen, onClose },
}: {
  name: string;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
  disclosure: UseDisclosureProps;
}) {
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          variant="outline"
          colorScheme="black"
          pt={1}
        >
          <Icon as={Dots} />
        </MenuButton>
        <MenuList>
          <DeleteMenuItem onClick={onOpen}>Delete product</DeleteMenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen!} onClose={onClose!}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete product</ModalHeader>
          <ModalBody>
            Are you sure you want to delete{" "}
            <Text as="span" fontWeight="semibold">
              {name}
            </Text>
          </ModalBody>
          <ModalFooter gap={4}>
            <Button colorScheme="red" onClick={onDelete}>
              Delete
            </Button>
            <Button variant="outline" colorScheme="black" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
