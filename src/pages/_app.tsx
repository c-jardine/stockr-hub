import { type AppType } from 'next/app';

import { api } from '@/utils/api';

import '@/styles/globals.css';
import { theme } from '@/styles/theme';
import {
  Box,
  ChakraProvider,
  Flex,
  Icon,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { X } from 'tabler-icons-react';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: {
          position: 'bottom-right',
          render: (props) => (
            <Box
              position='relative'
              p={4}
              rounded='lg'
              bg='white'
              shadow='md'
              overflow='hidden'
              maxW='xs'
            >
              <Box
                position='absolute'
                top={0}
                left={0}
                w='full'
                h='4px'
                bg={props.status === 'success' ? 'green.500' : 'red.500'}
              />
              <Flex justifyContent='space-between' alignItems='center'>
                <Text fontWeight='semibold'>{props.title}</Text>
                <IconButton
                  icon={<Icon as={X} color='black' />}
                  aria-label='Close toast'
                  variant='ghost'
                  colorScheme='blackAlpha'
                  rounded='full'
                  size='sm'
                  onClick={() => props.onClose()}
                />
              </Flex>
              <Text mt={-1} fontSize='xs' color='slate.600'>
                {props.description}
              </Text>
            </Box>
          ),
        },
      }}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
