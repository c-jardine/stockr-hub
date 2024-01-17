import { type MaterialGetAllOutputSingle } from '@/types';
import { getIsLowStock } from '@/utils';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { ChevronLeft } from 'tabler-icons-react';
import { DeleteMaterial, UpdateMaterialDrawer } from '.';
import { useViewMaterial } from '../hooks';

export default function MaterialViewerDrawer(
  props: MaterialGetAllOutputSingle
) {
  const {
    disclosure: { isOpen, onOpen, onClose },
  } = useViewMaterial();

  const isLowStock = getIsLowStock(
    Number(props.stockLevel.stock),
    Number(props.stockLevel.minStock)
  );

  return (
    <>
      <Link
        onClick={onOpen}
        color={isLowStock ? 'red.500' : 'unset'}
        fontWeight='semibold'
      >
        {props.name}
      </Link>
      <Drawer isOpen={isOpen} onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader display='flex' alignItems='flex-start'>
            <DrawerCloseButton position='relative'>
              <Icon
                as={ChevronLeft}
                boxSize={8}
                color='slate.400'
                strokeWidth={1.5}
              />
            </DrawerCloseButton>
            <Stack mt={2}>
              <Text as='h2' fontSize='xl' fontWeight='bold'>
                {props.name}
              </Text>
              <Flex gap={1}>
                {props.categories.map(({ category }) => (
                  <Tag key={category.id}>{category.name}</Tag>
                ))}
              </Flex>
            </Stack>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <SimpleGrid columns={3} gap={4}>
                <Stack spacing={0}>
                  <Text color='slate.500' fontSize='sm'>
                    Stock Level
                  </Text>
                  <Text fontSize='sm'>
                    {Number(props.stockLevel.stock)}{' '}
                    {props.stockLevel.stockUnit.abbreviationPlural}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text color='slate.500' fontSize='sm'>
                    Unit Cost
                  </Text>
                  <Text fontSize='sm'>
                    ${Number(props.costPerUnit)} /
                    {props.stockLevel.stockUnit.abbreviationSingular}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text color='slate.500' fontSize='sm'>
                    Min. Level
                  </Text>
                  <Text fontSize='sm'>
                    {Number(props.stockLevel.minStock)}{' '}
                    {props.stockLevel.stockUnit.abbreviationPlural}
                  </Text>
                </Stack>
              </SimpleGrid>
              <Stack spacing={0}>
                <Text color='slate.500' fontSize='sm'>
                  Vendor
                </Text>
                <Text fontSize='sm'>{props.vendor.name}</Text>
              </Stack>
              <Flex gap={4}>
                <UpdateMaterialDrawer {...props} buttonLabel='Edit details' />
                <DeleteMaterial {...props} />
              </Flex>
            </Stack>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
