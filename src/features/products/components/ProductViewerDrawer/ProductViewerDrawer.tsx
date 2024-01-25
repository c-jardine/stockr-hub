import { type ProductGetAllOutputSingle } from '@/types';
import {
  getIsLowStock,
  getStockUnitTextAbbrev,
  roundTwoDecimals,
} from '@/utils';
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
import { MaterialsUsed } from '..';
import { DeleteProduct } from '../DeleteProduct';
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

  // Helper function for rendering sections of the product info grid.
  function renderProductInfo(
    label: string,
    value: string,
    isHighlighted = false
  ) {
    return (
      <Stack spacing={0}>
        <Text color='slate.500' fontSize='sm'>
          {label}
        </Text>
        <Text
          fontSize='sm'
          fontWeight={isHighlighted ? 'semibold' : '500'}
          color={isHighlighted ? 'red.500' : 'unset'}
        >
          {value}
        </Text>
      </Stack>
    );
  }

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
  const unitCostText = `$${roundTwoDecimals(
    props.materials.reduce((total, { material, ...rest }) => {
      return (
        total +
        (Number(material.costPerUnit) * Number(rest.quantity)) / props.batchSize
      );
    }, 0)
  )}`;

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
        <Stack spacing={4}>
          <SimpleGrid columns={3} gap={4}>
            {renderProductInfo('Stock Level', stockLevelText, isLowStock)}
            {renderProductInfo('Batch Size', batchSizeText)}
            {renderProductInfo('Unit Cost', unitCostText)}
            {renderProductInfo('Min. Stock', minStockText)}
          </SimpleGrid>
          <Flex gap={4}>
            <UpdateProductDrawer {...props} buttonLabel='Edit details' />
            <DeleteProduct {...props} />
          </Flex>
          <Stack spacing={4}>
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
    return <DrawerFooter></DrawerFooter>;
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
