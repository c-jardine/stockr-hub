import { CategoryTags } from "@/components/CategoryTags";
import { DataDisplay } from "@/components/DataDisplay";
import { DrawerHeader } from "@/components/DrawerHeader";
import { getCostPerUnit, getIsLowStock, getStockUnitTextAbbrev } from "@/utils";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronLeft } from "tabler-icons-react";
import { MaterialsUsed } from "..";
import useProduct from "../../hooks/useProduct";
import { DeleteProduct } from "../DeleteProduct";
import { ProductHistory } from "../ProductHistory";
import { ProfitTable } from "../ProfitTable";
import { UpdateProductDrawer } from "../UpdateProductDrawer";
import { useViewProduct } from "./hooks";

/**
 * A component that renders a drawer that provides information about a product.
 */
export default function ProductViewerDrawer() {
  const product = useProduct();

  const {
    disclosure: { isOpen, onOpen, onClose },
  } = useViewProduct();

  // Helper function to clean up conditional styling.
  const isLowStock = getIsLowStock(
    Number(product.stockLevel.stock),
    Number(product.stockLevel.minStock)
  );

  // Render the drawer trigger.
  function renderDrawerTrigger() {
    return (
      <Link
        onClick={onOpen}
        color={isLowStock ? "red.500" : "unset"}
        fontWeight="semibold"
      >
        {product.name}
      </Link>
    );
  }

  // Render the drawer header.
  function renderDrawerHeader() {
    return (
      <DrawerHeader.Base>
        <DrawerHeader.CloseButton icon={ChevronLeft} />
        <DrawerHeader.Content>
          <DrawerHeader.Title>{product.name}</DrawerHeader.Title>
          <DrawerHeader.Details>
            <CategoryTags
              categories={product.categories}
              routePrefix="/products"
            />
          </DrawerHeader.Details>
        </DrawerHeader.Content>
      </DrawerHeader.Base>
    );
  }

  // Data for the stock level text.
  const stockLevelText = `${Number(
    product.stockLevel.stock
  )} ${getStockUnitTextAbbrev(
    Number(product.stockLevel.stock),
    product.stockLevel.stockUnit
  )}`;

  // Data for the batch size text.
  const batchSizeText = `${product.batchSize} ${getStockUnitTextAbbrev(
    Number(product.batchSize),
    product.stockLevel.stockUnit
  )}`;

  // Data for the unit cost text.
  const unitCostText = `$${getCostPerUnit(product)}`;

  // Data for the min stock text.
  const minStockText = `${
    product.stockLevel.minStock
      ? `${Number(product.stockLevel.minStock)} ${getStockUnitTextAbbrev(
          Number(product.stockLevel.minStock),
          product.stockLevel.stockUnit
        )}`
      : "-"
  }`;

  // Render the drawer body.
  function renderDrawerBody() {
    return (
      <DrawerBody>
        <Stack spacing={8}>
          <Stack>
            <Text fontSize="lg" fontWeight="bold">
              Details
            </Text>
            <SimpleGrid columns={4} gap={4}>
              <DataDisplay
                label="Stock"
                value={stockLevelText}
                isHighlighted={isLowStock}
              />
              <DataDisplay label="Batch Size" value={batchSizeText} />
              <DataDisplay label="Unit Cost" value={unitCostText} />
              <DataDisplay label="Min. Stock" value={minStockText} />
            </SimpleGrid>
          </Stack>
          <ProfitTable />
          <Stack>
            <Text fontSize="lg" fontWeight="bold">
              Materials Used (per Unit)
            </Text>
            {product.materials.length === 0 && (
              <Text mt={-2} fontSize="sm" fontStyle="italic">
                This product doesn't use any materials.
              </Text>
            )}
            <MaterialsUsed />
          </Stack>
          <ProductHistory />
        </Stack>
      </DrawerBody>
    );
  }

  // Render the drawer footer.
  function renderDrawerFooter() {
    return (
      <DrawerFooter gap={4}>
        <DeleteProduct />
        <UpdateProductDrawer buttonLabel="Edit details" />
      </DrawerFooter>
    );
  }

  // Render the component.
  return (
    <>
      {renderDrawerTrigger()}
      <Drawer isOpen={isOpen} onClose={onClose} size="md">
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
