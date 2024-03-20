import { CategoryTags } from "@/components/CategoryTags";
import { DataDisplay } from "@/components/DataDisplay";
import { DrawerHeader } from "@/components/DrawerHeader";
import { formatCurrency, getIsLowStock, getStockUnitTextAbbrev } from "@/utils";
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
import { DeleteMaterial, UpdateMaterialDrawer } from "..";
import { useMaterial } from "../../hooks";
import { MaterialHistory } from "../MaterialHistory";

export default function MaterialViewerDrawer() {
  const material = useMaterial();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { stockLevel } = material;
  const stock = Number(stockLevel.stock);
  const minStock = Number(stockLevel.minStock);
  const costPerUnit = Number(material.costPerUnit);

  const isLowStock = getIsLowStock(stock, minStock);

  function renderDrawerTrigger() {
    return (
      <Link
        onClick={onOpen}
        color={isLowStock ? "red.500" : "unset"}
        fontWeight="semibold"
      >
        {material.name}
      </Link>
    );
  }

  function renderDrawerHeader() {
    return (
      <DrawerHeader.Base>
        <DrawerHeader.CloseButton icon={ChevronLeft} />
        <DrawerHeader.Content>
          <DrawerHeader.Title>{material.name}</DrawerHeader.Title>
          <DrawerHeader.Details>
            <CategoryTags
              categories={material.categories}
              routePrefix="/materials"
            />
          </DrawerHeader.Details>
        </DrawerHeader.Content>
      </DrawerHeader.Base>
    );
  }

  // Data for the stock level text.
  const stockLevelText = `${stock} ${getStockUnitTextAbbrev(
    stock,
    stockLevel.stockUnit
  )}.`;

  // Data for the unit cost text.
  const unitCostText = `${formatCurrency(costPerUnit)} /${
    stockLevel.stockUnit.abbreviationSingular
  }.`;

  // Data for the vendor text.
  const vendorText = material.vendor.name;

  // Data for the min stock text.
  const minStockText = `${
    minStock
      ? `${minStock} ${getStockUnitTextAbbrev(minStock, stockLevel.stockUnit)}`
      : "—"
  }`;

  function renderDrawerBody() {
    return (
      <DrawerBody>
        <Stack spacing={8}>
          <Stack>
            <Text fontSize="lg" fontWeight="bold">
              Details
            </Text>
            <SimpleGrid columns={3} gap={4}>
              <DataDisplay
                label="Stock Level"
                value={stockLevelText}
                isHighlighted={isLowStock}
              />
              <DataDisplay label="Unit Cost" value={unitCostText} />
              <DataDisplay label="Vendor" value={vendorText} />
              <DataDisplay label="Min. Stock" value={minStockText} />
            </SimpleGrid>
          </Stack>

          <MaterialHistory />
        </Stack>
      </DrawerBody>
    );
  }

  function renderDrawerFooter() {
    return (
      <DrawerFooter gap={4}>
        <DeleteMaterial />
        <UpdateMaterialDrawer buttonLabel="Edit details" />
      </DrawerFooter>
    );
  }

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
