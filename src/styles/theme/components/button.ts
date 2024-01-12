import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const solid = defineStyle({
  fontWeight: 'md',
  fontSize: 'sm',
});

const outline = defineStyle({
  fontWeight: 'md',
  fontSize: 'sm',
});

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    colorScheme: 'emerald',
  },
  variants: {
    solid,
    outline
  },
});
