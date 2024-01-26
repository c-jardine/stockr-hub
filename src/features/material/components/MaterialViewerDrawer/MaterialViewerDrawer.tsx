import { DrawerHeader } from '@/components/DrawerHeader';
import { type MaterialGetAllOutputSingle } from '@/types';
import { getIsLowStock, getStockUnitTextAbbrev } from '@/utils';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Link,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { ChevronLeft } from 'tabler-icons-react';
import { DeleteMaterial, UpdateMaterialDrawer } from '..';
import { useViewMaterial } from './hooks';

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

  function renderDrawerFooter() {
    return (
      <DrawerFooter gap={4}>
        <DeleteMaterial {...props} />
        <UpdateMaterialDrawer {...props} buttonLabel='Edit details' />
      </DrawerFooter>
    );
  }

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
          <DrawerHeader.Base icon={ChevronLeft}>
            <DrawerHeader.Title>{props.name}</DrawerHeader.Title>
            <DrawerHeader.Details>
              <Flex gap={1}>
                {props.categories.map(({ category }) => (
                  <Tag key={category.id}>{category.name}</Tag>
                ))}
              </Flex>
            </DrawerHeader.Details>
          </DrawerHeader.Base>
          <DrawerBody>
            <Stack spacing={4}>
              <SimpleGrid columns={3} gap={4}>
                <Stack spacing={0}>
                  <Text color='slate.500' fontSize='sm'>
                    Stock Level
                  </Text>
                  <Text
                    fontSize='sm'
                    fontWeight={isLowStock ? 'semibold' : '500'}
                    color={isLowStock ? 'red.500' : 'unset'}
                  >
                    {Number(props.stockLevel.stock)}{' '}
                    {getStockUnitTextAbbrev(
                      Number(props.stockLevel.stock),
                      props.stockLevel.stockUnit
                    )}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text color='slate.500' fontSize='sm'>
                    Unit Cost
                  </Text>
                  <Text fontSize='sm' fontWeight='500'>
                    ${Number(props.costPerUnit)} /
                    {props.stockLevel.stockUnit.abbreviationSingular}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text color='slate.500' fontSize='sm'>
                    Vendor
                  </Text>
                  <Text fontSize='sm' fontWeight='500'>
                    {props.vendor.name}
                  </Text>
                </Stack>
                <Stack spacing={0}>
                  <Text color='slate.500' fontSize='sm'>
                    Min. Stock
                  </Text>
                  <Text fontSize='sm' fontWeight='500'>
                    {props.stockLevel.minStock
                      ? `${Number(
                          props.stockLevel.minStock
                        )} ${getStockUnitTextAbbrev(
                          Number(props.stockLevel.minStock),
                          props.stockLevel.stockUnit
                        )}`
                      : '-'}
                  </Text>
                </Stack>
              </SimpleGrid>
            </Stack>
          </DrawerBody>
          {renderDrawerFooter()}
        </DrawerContent>
      </Drawer>
    </>
  );
}
