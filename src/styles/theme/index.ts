import { extendTheme } from '@chakra-ui/react';
import { colors } from './colors';
import { buttonTheme, checkboxTheme } from './components';

export const theme = extendTheme({
  colors,
  components: {
    Button: buttonTheme,
    Checkbox: checkboxTheme,
  },
});
