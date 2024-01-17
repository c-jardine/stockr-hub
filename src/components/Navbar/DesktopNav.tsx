import {
  Avatar,
  chakra,
  Flex,
  Icon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ChevronDown } from 'tabler-icons-react';
import AuditNav from './AuditNav';
import MaterialsNav from './MaterialsNav';
import ProductsNav from './ProductsNav';

export default function DesktopNav() {
  return (
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
        <Stack>
          <MaterialsNav />
          <ProductsNav />
          <AuditNav />
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
  );
}
