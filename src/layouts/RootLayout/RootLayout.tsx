import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
  chakra,
} from '@chakra-ui/react';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Bell,
  ChevronDown,
  ClipboardList,
  Box as IconBox,
  Moon,
  Pencil,
  Search,
  Settings,
  type Icon as IconType,
} from 'tabler-icons-react';

const sora = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const Links: { label: string; icon: IconType; href: string }[] = [
  {
    label: 'Materials',
    icon: Pencil,
    href: '/materials',
  },
  {
    label: 'Products',
    icon: IconBox,
    href: '/products',
  },
  {
    label: 'Audit',
    icon: ClipboardList,
    href: '/audit',
  },
];

export interface RootLayoutProps {
  title: string;
  subtitle?: string;
  actionBar?: React.ReactNode;
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const router = useRouter();

  return (
    <Flex fontFamily={sora.style.fontFamily} h='100vh'>
      <Stack
        display={{ base: 'none', lg: 'flex' }}
        w='xs'
        h='full'
        overflowY='scroll'
        bg='white'
        spacing={0}
        alignItems='center'
        borderRight='1px solid'
        borderRightColor='slate.200'
      >
        <VStack h='88px' justifyContent='center'>
          <Text fontSize='2xl' textTransform='uppercase'>
            <chakra.span fontWeight='black' color='emerald.600'>
              Stockr
            </chakra.span>{' '}
            Hub
          </Text>
        </VStack>
        <Stack w='full' h='full' justifyContent='space-between'>
          <Stack py={8}>
            {Links.map((link) => (
              <Flex
                key={link.label}
                as='a'
                href={link.href}
                pl={6}
                py={2}
                alignItems='center'
                gap={4}
                borderLeft={`4px solid`}
                borderLeftColor={
                  router.asPath === link.href ? 'emerald.600' : 'transparent'
                }
                fontWeight={router.asPath === link.href ? 'semibold' : 'unset'}
                color={router.asPath === link.href ? 'emerald.600' : 'slate.500'}
                bg={router.asPath === link.href ? 'slate.100' : 'transparent'}
                transition='200ms ease-in-out'
                _hover={{
                  color: router.asPath === link.href ? 'emerald.600' : 'black',
                }}
              >
                <Icon
                  as={link.icon}
                  boxSize={5}
                  color={router.asPath === link.href ? 'emerald.600' : 'unset'}
                />{' '}
                <Text>{link.label}</Text>
              </Flex>
            ))}
          </Stack>
          <Flex
            as='button'
            alignItems='center'
            gap={2}
            mb={4}
            px={4}
            py={2}
            _hover={{ bg: 'emerald.100' }}
          >
            <Avatar bg='emerald.300' boxSize={10}></Avatar>
            <Text>Your Name</Text>
            <Icon as={ChevronDown} ml='auto' />
          </Flex>
        </Stack>
      </Stack>
      <Box position='relative' w='full' h='full' overflowY='scroll'>
        <Box position='sticky' top={0} mb={4} zIndex={100}>
          <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent='space-between'
            alignItems='center'
            p={4}
            shadow='0 2px 4px var(--chakra-colors-slate-200)'
            bg='white'
            h={20}
            backdropFilter='blur(24px)'
          >
            <hgroup>
              <Heading as='h1' fontSize='xl'>
                {props.title}
              </Heading>
              {props.subtitle && (
                <Text color='slate.500' fontSize='sm'>
                  {props.subtitle}
                </Text>
              )}
            </hgroup>
            <Flex gap={4}>
              {props.actionBar && props.actionBar}
              <HStack>
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
