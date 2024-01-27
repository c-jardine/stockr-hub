import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const solid = defineStyle({
  fontWeight: '600',
  fontSize: 'sm',
  letterSpacing: 'wide',
});

const outline = defineStyle({
  fontWeight: '700',
  fontSize: 'sm',
  letterSpacing: 'wide',
  borderColor: 'slate.200',
  color: 'slate.700',
});

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    colorScheme: 'sky',
  },
  variants: {
    solid,
    outline,
  },
});
