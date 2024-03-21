import { DataDisplay } from "@/components/DataDisplay";
import {
  formatCurrency,
  getCostPerUnit,
  getIsLowStock,
  getStockUnitTextAbbrev,
} from "@/utils";
import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useProduct } from "../../hooks";

export default function ProductDetails() {
  const product = useProduct();

  const { stockLevel } = product;
  const stock = Number(stockLevel.stock);
  const minStock = Number(stockLevel.minStock);
  const costPerUnit = getCostPerUnit(product);
  const batchSize = Number(product.batchSize);

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

  const isLowStock = getIsLowStock(stock, minStock);

  return (
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
  );
}
