import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const solid = defineStyle({
  fontWeight: '500',
  fontSize: 'sm',
});

const outline = defineStyle({
  fontWeight: '700',
  fontSize: 'sm',
  borderColor: 'slate.200',
  color: 'slate.700'
});

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    colorScheme: 'emerald',
  },
  variants: {
    solid,
    outline,
  },
});
