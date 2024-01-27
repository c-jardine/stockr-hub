import {
  DrawerHeader as ChakraDrawerHeader,
  Icon as ChakraIcon,
  DrawerCloseButton,
  Stack,
  Text,
  type CloseButtonProps,
} from '@chakra-ui/react';
import React from 'react';
import { X, type Icon } from 'tabler-icons-react';

function Base({ children }: { children: React.ReactNode }) {
  return (
    <ChakraDrawerHeader display='flex' alignItems='flex-start'>
      {children}
    </ChakraDrawerHeader>
  );
}

function CloseButton({ icon, ...props }: { icon?: Icon } & CloseButtonProps) {
  return (
    <DrawerCloseButton position='relative' {...props}>
      <ChakraIcon
        as={icon ?? X}
        boxSize={8}
        color='slate.400'
        strokeWidth={1.5}
      />
    </DrawerCloseButton>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return <Stack mt={2}>{children}</Stack>;
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <Text as='h2' fontSize='xl' fontWeight='bold'>
      {children}
    </Text>
  );
}

function Details({ children }: { children: React.ReactNode }) {
  return children;
}

const DrawerHeader = {
  Base,
  CloseButton,
  Content,
  Title,
  Details,
};

export default DrawerHeader;
