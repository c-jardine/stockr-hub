import { chakra, Stack, Text, VStack } from '@chakra-ui/react';
import { UserDropdown } from '../UserMenu';
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
          <chakra.span fontWeight='black' color='sky.600'>
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
        <UserDropdown />
      </Stack>
    </Stack>
  );
}
