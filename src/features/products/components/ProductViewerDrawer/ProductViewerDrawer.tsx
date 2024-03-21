import { CategoryTags } from "@/components/CategoryTags";
import { DataDisplay } from "@/components/DataDisplay";
import { DrawerHeader } from "@/components/DrawerHeader";
import {
  formatCurrency,
  getCostPerUnit,
  getIsLowStock,
  getStockUnitTextAbbrev,
} from "@/utils";
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
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeft } from "tabler-icons-react";
import { MaterialsUsed } from "..";
import useProduct from "../../hooks/useProduct";
import { DeleteProduct } from "../DeleteProduct";
import { ProductHistory } from "../ProductHistory";
import { ProfitTable } from "../ProfitTable";
import { UpdateProductDrawer } from "../UpdateProductDrawer";

/**
 * A component that renders a drawer that provides information about a product.
 */
export default function ProductViewerDrawer() {
  const product = useProduct();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { stockLevel } = product;
  const stock = Number(stockLevel.stock);
  const minStock = Number(stockLevel.minStock);
  const costPerUnit = getCostPerUnit(product);
  const batchSize = Number(product.batchSize);

  const isLowStock = getIsLowStock(stock, minStock);

  // Data for the stock level text.
  const stockLevelText = `${stock} ${getStockUnitTextAbbrev(
    stock,
    stockLevel.stockUnit
  )}.`;

  // Data for the batch size text.
  const batchSizeText = `${batchSize} ${getStockUnitTextAbbrev(
    batchSize,
    stockLevel.stockUnit
  )}.`;

  // Data for the unit cost text.
  const unitCostText = `${formatCurrency(costPerUnit)} /${
    stockLevel.stockUnit.abbreviationSingular
  }.`;

  // Data for the min stock text.
  const minStockText = `${
    minStock
      ? `${minStock} ${getStockUnitTextAbbrev(minStock, stockLevel.stockUnit)}`
      : "—"
  }`;

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
          <MaterialsUsed />
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
