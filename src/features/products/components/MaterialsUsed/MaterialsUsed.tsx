import { UpdateMaterialDrawer } from "@/features/material";
import { MaterialContext } from "@/features/material/contexts";
import { type ProductGetAllOutputSingle } from "@/types";
import { formatCurrency, getStockUnitTextAbbrev } from "@/utils";
import {
  Box,
  HStack,
  Stack,
  StackDivider,
  Text,
  Tooltip,
  type TextProps,
} from "@chakra-ui/react";
import React from "react";
import useProduct from "../../hooks/useProduct";

/**
 * A component that shows information about the materials used for the given
 * product.
 */
export default function MaterialsUsed() {
  const { materials, batchSize } = useProduct();

  // Render helper function for the component.
  function renderMaterialInfo({
    material,
    quantity,
  }: ProductGetAllOutputSingle["materials"][0]) {
    const { stockLevel, costPerUnit } = material;

    // Data for the amount of stock used.
    const decimal = new Intl.NumberFormat("en-US", {
      style: "decimal",
      maximumFractionDigits: 2,
    });
    const stockUsed = Number(quantity) / batchSize;
    const stockUsedUnit = getStockUnitTextAbbrev(
      stockUsed,
      stockLevel.stockUnit
    );

    // Data for how many of this product can be created with the material's
    // stock.
    const enoughFor = Math.floor(
      Number(stockLevel.stock) / (Number(quantity) / batchSize)
    );
    const enoughForUnit = getStockUnitTextAbbrev(
      enoughFor,
      stockLevel.stockUnit
    );

    // Data for the material's stock level.
    const currentStock = Number(stockLevel.stock);
    const currentStockUnit = getStockUnitTextAbbrev(
      currentStock,
      stockLevel.stockUnit
    );

    // Data for the material's cost per individual unit.
    const unitCost = (Number(costPerUnit) * Number(quantity)) / batchSize;
    const unitCostText = formatCurrency(unitCost);

    return (
      <MaterialContext.Provider value={material}>
        <Box key={material.id} fontSize="sm">
          <UpdateMaterialDrawer />
          <HStack
            divider={<StackDivider border="none">&bull;</StackDivider>}
            alignItems="flex-start"
          >
            <Text color="slate.500" letterSpacing="wide">
              {decimal.format(stockUsed)} {stockUsedUnit}. used
            </Text>
            <Tooltip label={`Enough for ${enoughFor} ${enoughForUnit}`}>
              <EnoughForTooltip>
                {currentStock} {currentStockUnit}. available
              </EnoughForTooltip>
            </Tooltip>
            <Text color="slate.500" letterSpacing="wide">
              {unitCostText} /unit
            </Text>
          </HStack>
        </Box>
      </MaterialContext.Provider>
    );
  }

  // The rendered component.
  return (
    <Stack>
      <Text fontSize="lg" fontWeight="bold">
        Materials Used (per Unit)
      </Text>
      {materials.length === 0 && (
        <Text mt={-2} fontSize="sm" fontStyle="italic">
          This product doesn't use any materials.
        </Text>
      )}
      {materials.map(renderMaterialInfo)}
    </Stack>
  );
}

// A custom tooltip.
const EnoughForTooltip = React.forwardRef<HTMLDivElement, TextProps>(
  ({ children }, ref) => (
    <Text ref={ref} color="slate.500" letterSpacing="wide">
      {children}
    </Text>
  )
);
