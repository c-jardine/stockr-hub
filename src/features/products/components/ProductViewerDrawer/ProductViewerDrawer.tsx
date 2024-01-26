import { DataDisplay } from '@/components/DataDisplay';
import { DrawerHeader } from '@/components/DrawerHeader';
import { type ProductGetAllOutputSingle } from '@/types';
import { getCostPerUnit, getIsLowStock, getStockUnitTextAbbrev } from '@/utils';
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
import { MaterialsUsed } from '..';
import { DeleteProduct } from '../DeleteProduct';
import { ProfitTable } from '../ProfitTable';
import { UpdateProductDrawer } from '../UpdateProductDrawer';
import { useViewProduct } from './hooks';

/**
 * A component that renders a drawer that provides information about a product.
 */
export default function ProductViewerDrawer(props: ProductGetAllOutputSingle) {
  const {
    disclosure: { isOpen, onOpen, onClose },
  } = useViewProduct();

  // Helper function to clean up conditional styling.
  const isLowStock = getIsLowStock(
    Number(props.stockLevel.stock),
    Number(props.stockLevel.minStock)
  );

  // Render the drawer trigger.
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

  // Render the drawer header.
  function renderDrawerHeader() {
    return (
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
    );
  }

  // Data for the stock level text.
  const stockLevelText = `${Number(
    props.stockLevel.stock
  )} ${getStockUnitTextAbbrev(
    Number(props.stockLevel.stock),
    props.stockLevel.stockUnit
  )}`;

  // Data for the batch size text.
  const batchSizeText = `${props.batchSize} ${getStockUnitTextAbbrev(
    Number(props.batchSize),
    props.stockLevel.stockUnit
  )}`;

  // Data for the unit cost text.
  const unitCostText = `$${getCostPerUnit(props)}`;

  // Data for the min stock text.
  const minStockText = `${
    props.stockLevel.minStock
      ? `${Number(props.stockLevel.minStock)} ${getStockUnitTextAbbrev(
          Number(props.stockLevel.minStock),
          props.stockLevel.stockUnit
        )}`
      : '-'
  }`;

  // Render the drawer body.
  function renderDrawerBody() {
    return (
      <DrawerBody>
        <Stack spacing={8}>
          <Stack>
            <Text fontSize='lg' fontWeight='bold'>
              Details
            </Text>
            <SimpleGrid columns={4} gap={4}>
              <DataDisplay
                label='Stock'
                value={stockLevelText}
                isHighlighted={isLowStock}
              />
              <DataDisplay label='Batch Size' value={batchSizeText} />
              <DataDisplay label='Unit Cost' value={unitCostText} />
              <DataDisplay label='Min. Stock' value={minStockText} />
            </SimpleGrid>
          </Stack>
          <ProfitTable {...props} />
          <Stack>
            <Text fontSize='lg' fontWeight='bold'>
              Materials Used (per Unit)
            </Text>
            {props.materials.length === 0 && (
              <Text mt={-2} fontSize='sm' fontStyle='italic'>
                This product doesn't use any materials.
              </Text>
            )}
            <MaterialsUsed {...props} />
          </Stack>
        </Stack>
      </DrawerBody>
    );
  }

  // Render the drawer footer.
  function renderDrawerFooter() {
    return (
      <DrawerFooter gap={4}>
        <DeleteProduct {...props} />
        <UpdateProductDrawer {...props} buttonLabel='Edit details' />
      </DrawerFooter>
    );
  }

  // Render the component.
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
