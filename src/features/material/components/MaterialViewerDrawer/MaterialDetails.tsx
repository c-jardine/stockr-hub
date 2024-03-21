import { DataDisplay } from "@/components/DataDisplay";
import { formatCurrency, getIsLowStock, getStockUnitTextAbbrev } from "@/utils";
import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useMaterial } from "../../hooks";

export default function MaterialDetails() {
  const material = useMaterial();

  const { stockLevel } = material;
  const stock = Number(stockLevel.stock);
  const minStock = Number(stockLevel.minStock);
  const costPerUnit = Number(material.costPerUnit);

  const isLowStock = getIsLowStock(stock, minStock);

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

  return (
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
  );
}
