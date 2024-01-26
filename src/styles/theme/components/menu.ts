import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    p: 2,
  },
  item: {
    fontSize: 'sm',
    fontWeight: 'medium',
    rounded: 'md',
    transition: '150ms ease-in-out',
    _hover: {
      bg: 'slate.200',
    },
    _focus: {
      bg: 'slate.200',
    },
  },
});

export const menuTheme = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'sky',
  },
  baseStyle,
});
