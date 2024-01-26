import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  control: {
    p: 2,
    transition: '150ms ease-in-out',
    _hover: {
      bg: 'sky.100',
      borderColor: 'sky.500'
    }
  },
});

export const checkboxTheme = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'sky',
  },
  baseStyle,
});
