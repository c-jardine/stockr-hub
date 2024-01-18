import { extendTheme } from '@chakra-ui/react';
import { colors } from './colors';
import { buttonTheme, checkboxTheme } from './components';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        fontFamily: poppins.style.fontFamily
      }
    }
  },
  colors,
  components: {
    Button: buttonTheme,
    Checkbox: checkboxTheme,
  },
});
