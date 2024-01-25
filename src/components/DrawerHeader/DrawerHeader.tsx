import {
  DrawerHeader as ChakraDrawerHeader,
  Icon as ChakraIcon,
  DrawerCloseButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { X, type Icon } from 'tabler-icons-react';

function Base({ icon, children }: { icon?: Icon; children: React.ReactNode }) {
  return (
    <ChakraDrawerHeader display='flex' alignItems='flex-start'>
      <DrawerCloseButton position='relative'>
        <ChakraIcon
          as={icon ?? X}
          boxSize={8}
          color='slate.400'
          strokeWidth={1.5}
        />
      </DrawerCloseButton>
      <Stack mt={2}>{children}</Stack>
    </ChakraDrawerHeader>
  );
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
  Title,
  Details,
};

export default DrawerHeader;
