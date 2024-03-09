import {
  Avatar,
  Box,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ChevronDown, Menu2 } from "tabler-icons-react";
import AuditNav from "./AuditNav";
import MaterialsNav from "./MaterialsNav";
import ProductsNav from "./ProductsNav";

export default function MobileNav() {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Box display={{ base: "flex", lg: "none" }}>
      <IconButton
        icon={<Icon as={Menu2} />}
        aria-label="Main menu"
        variant="outline"
        onClick={onToggle}
      />
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody px={0}>
            <Stack
              w="xs"
              h="full"
              overflowY="scroll"
              bg="white"
              spacing={0}
              alignItems="center"
              borderRight="1px solid"
              borderRightColor="slate.200"
            >
              <VStack h="88px" justifyContent="center">
                <Text fontSize="2xl" textTransform="uppercase">
                  <chakra.span fontWeight="black" color="sky.600">
                    Stockr
                  </chakra.span>{" "}
                  Hub
                </Text>
              </VStack>
              <Stack w="full" h="full" justifyContent="space-between">
                <Stack>
                  <MaterialsNav />
                  <ProductsNav />
                  <AuditNav />
                </Stack>
                <Flex
                  as="button"
                  alignItems="center"
                  gap={2}
                  mb={4}
                  px={4}
                  py={2}
                  _hover={{ bg: "sky.100" }}
                >
                  <Avatar bg="sky.300" boxSize={10}></Avatar>
                  <Text fontSize={14} textAlign="left">
                    The Midnight Emporium
                  </Text>
                  <Icon as={ChevronDown} ml="auto" />
                </Flex>
              </Stack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
