import { DesktopNav, MobileNav } from '@/components/Navbar';
import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  chakra,
} from '@chakra-ui/react';
import { Poppins } from 'next/font/google';
import React from 'react';
import { Bell, Moon, Search, Settings } from 'tabler-icons-react';

const sora = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export interface RootLayoutProps {
  title: string;
  subtitle?: string;
  actionBar?: React.ReactNode;
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <Flex fontFamily={sora.style.fontFamily} h='100vh'>
      <DesktopNav />
      <Box position='relative' w='full' h='full' overflowY='scroll'>
        <Box position='sticky' top={0} mb={4} zIndex={100}>
          <Flex
            justifyContent='space-between'
            alignItems='center'
            p={4}
            borderBottom='1px solid'
            borderColor='slate.200'
            bg='white'
            h={20}
            backdropFilter='blur(24px)'
          >
            <MobileNav />
            <chakra.hgroup display={{ base: 'none', lg: 'block' }}>
              <Heading as='h1' fontSize='xl'>
                {props.title}
              </Heading>
              {props.subtitle && (
                <Text color='slate.500' fontSize='sm'>
                  {props.subtitle}
                </Text>
              )}
            </chakra.hgroup>
            <Flex gap={4}>
              {props.actionBar && props.actionBar}
              <HStack display={{ base: 'none', lg: 'flex' }}>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={Search} />
                  </InputLeftElement>
                  <Input
                    rounded='full'
                    variant='filled'
                    bg='slate.100'
                    placeholder='Search...'
                  />
                </InputGroup>
                <Icon as={Bell} />
                <Icon as={Settings} />
                <Icon as={Moon} />
              </HStack>
            </Flex>
          </Flex>
        </Box>
        <Box>{props.children}</Box>
      </Box>
    </Flex>
  );
}
