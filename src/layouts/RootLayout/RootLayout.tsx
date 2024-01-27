import { DesktopNav, MobileNav } from '@/components/Navbar';
import {
  Box,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  chakra,
} from '@chakra-ui/react';
import React from 'react';
import { Search } from 'tabler-icons-react';

export interface RootLayoutProps {
  title: string;
  subtitle?: string;
  actionBar?: React.ReactNode;
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <Flex h='100vh'>
      <DesktopNav />
      <Box position='relative' w='full' h='full' overflowY='scroll'>
        <Box position='sticky' top={0} mb={4} zIndex={100}>
          <Flex
            alignItems='center'
            p={4}
            borderBottom='1px solid'
            borderColor='slate.200'
            bg='white'
            h={20}
            backdropFilter='blur(24px)'
            gap={4}
          >
            <MobileNav />
            <chakra.hgroup display={{ base: 'none', lg: 'block' }} w='33.33%'>
              <Heading as='h1' fontSize='xl'>
                {props.title}
              </Heading>
              {props.subtitle && (
                <Text color='slate.500' fontSize='sm'>
                  {props.subtitle}
                </Text>
              )}
            </chakra.hgroup>
            <InputGroup
              ml={{ base: 4, md: 0 }}
              w={{ base: 'full', lg: '33.33%' }}
            >
              <InputLeftElement pointerEvents='none'>
                <Icon as={Search} />
              </InputLeftElement>
              <Input
                rounded='full'
                variant='filled'
                bg='slate.100'
                w='full'
                fontSize='sm'
                placeholder='Search...'
              />
            </InputGroup>
            <Flex justifyContent='flex-end' w={{  lg: '33.33%' }}>
              {props.actionBar && props.actionBar}
            </Flex>
          </Flex>
        </Box>
        <Box>{props.children}</Box>
      </Box>
    </Flex>
  );
}
