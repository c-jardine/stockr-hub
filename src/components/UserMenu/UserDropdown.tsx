import { api } from "@/utils/api";
import {
  Avatar,
  Divider,
  Flex,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  type FlexProps,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { ChevronDown } from "tabler-icons-react";

export default function UserDropdown() {
  const { data: userData } = api.user.getUser.useQuery();
  const { data: userPhotoData } = api.user.getProfilePhoto.useQuery();

  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Flex
          as="button"
          alignItems="center"
          gap={2}
          px={4}
          py={2}
          transition="150ms ease-in-out"
          _hover={{ bg: "sky.100" }}
          mb={4}
        >
          <Avatar
            bg="sky.300"
            boxSize={10}
            src={userPhotoData?.logoUrl ?? ""}
          ></Avatar>
          <Text fontSize={14} textAlign="left">
            {userData?.businessName ? userData.businessName : "Welcome back!"}
          </Text>
          <Icon as={ChevronDown} ml="auto" />
        </Flex>
      </PopoverTrigger>
      <PopoverContent mb={2}>
        <PopoverBody p={2}>
          <Stack>
            <MenuOption href="/settings">
              <Text>Settings</Text>
            </MenuOption>
            <MenuOption href="/account">
              <Text>Account</Text>
            </MenuOption>
            <Divider />
            <MenuOption href="/support">
              <Text>Support</Text>
            </MenuOption>
            <Divider />
            <MenuOption href="#" _hover={{ bg: "red.500", color: "white" }}>
              <Text>Sign out</Text>
            </MenuOption>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

interface MenuOptionProps extends FlexProps {
  href: string;
  children: React.ReactNode;
}
function MenuOption({ href, children, ...props }: MenuOptionProps) {
  return (
    <Flex
      as={NextLink}
      href={href}
      alignItems="center"
      gap={2}
      px={4}
      py={2}
      borderRadius="md"
      transition="150ms ease-in-out"
      _hover={{ bg: "slate.200" }}
      {...props}
    >
      {children}
    </Flex>
  );
}
