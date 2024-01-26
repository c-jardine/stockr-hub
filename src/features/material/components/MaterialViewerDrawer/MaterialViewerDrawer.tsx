import { DataDisplay } from '@/components/DataDisplay';
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

  function renderDrawerTrigger() {
    return (
      <Link
        onClick={onOpen}
        color={isLowStock ? 'red.500' : 'unset'}
        fontWeight='semibold'
      >
        {props.name}
      </Link>
    );
  }

  function renderDrawerHeader() {
    return (
      <DrawerHeader.Base>
        <DrawerHeader.CloseButton icon={ChevronLeft} />
        <DrawerHeader.Content>
          <DrawerHeader.Title>{props.name}</DrawerHeader.Title>
          <DrawerHeader.Details>
            <Flex gap={1}>
              {props.categories.map(({ category }) => (
                <Tag key={category.id}>{category.name}</Tag>
              ))}
            </Flex>
          </DrawerHeader.Details>
        </DrawerHeader.Content>
      </DrawerHeader.Base>
    );
  }

  // Data for the stock level text.
  const stockLevelText = `${Number(
    props.stockLevel.stock
  )} ${getStockUnitTextAbbrev(
    Number(props.stockLevel.stock),
    props.stockLevel.stockUnit
  )}`;

  // Data for the unit cost text.
  const unitCostText = `$${Number(props.costPerUnit)} /
  ${props.stockLevel.stockUnit.abbreviationSingular}`;

  // Data for the vendor text.
  const vendorText = props.vendor.name;

  // Data for the min stock text.
  const minStockText = `${
    props.stockLevel.minStock
      ? `${Number(props.stockLevel.minStock)} ${getStockUnitTextAbbrev(
          Number(props.stockLevel.minStock),
          props.stockLevel.stockUnit
        )}`
      : '-'
  }`;

  function renderDrawerBody() {
    return (
      <DrawerBody>
        <Stack spacing={8}>
          <Stack>
            <Text fontSize='lg' fontWeight='bold'>
              Details
            </Text>
            <SimpleGrid columns={3} gap={4}>
              <DataDisplay
                label='Stock Level'
                value={stockLevelText}
                isHighlighted={isLowStock}
              />
              <DataDisplay label='Unit Cost' value={unitCostText} />
              <DataDisplay label='Vendor' value={vendorText} />
              <DataDisplay label='Min. Stock' value={minStockText} />
            </SimpleGrid>
          </Stack>
        </Stack>
      </DrawerBody>
    );
  }

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
      {renderDrawerTrigger()}
      <Drawer isOpen={isOpen} onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          {renderDrawerHeader()}
          {renderDrawerBody()}
          {renderDrawerFooter()}
        </DrawerContent>
      </Drawer>
    </>
  );
}
