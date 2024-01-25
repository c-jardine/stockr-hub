import { extendTheme } from '@chakra-ui/react';
import { Poppins } from 'next/font/google';
import { colors } from './colors';
import { buttonTheme, checkboxTheme, menuTheme } from './components';

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const theme = extendTheme({
  styles: {
    global: {
      'html, body, h1, h2, h3, h4, h5, h6, th': {
        fontFamily: `${poppins.style.fontFamily} !important`,
      },
    },
  },
  colors,
  components: {
    Button: buttonTheme,
    Checkbox: checkboxTheme,
    Menu: menuTheme,
  },
});
