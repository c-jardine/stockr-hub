import { UpdateMaterialDrawer } from "@/features/material";
import { type ProductGetAllOutputSingle } from "@/types";
import { getStockUnitTextAbbrev, roundTwoDecimals } from "@/utils";
import {
  Box,
  HStack,
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
  const {
    materials,
    batchSize,
    stockLevel: { stockUnit },
  } = useProduct();

  // Render helper function for the component.
  function renderMaterialInfo({
    material,
    quantity,
  }: ProductGetAllOutputSingle["materials"][0]) {
    // Data for the amount of stock used.
    const stockUsed = roundTwoDecimals(Number(quantity) / batchSize);
    const stockUsedUnit = getStockUnitTextAbbrev(
      stockUsed,
      material.stockLevel.stockUnit
    );

    // Data for how many of this product can be created with the material's
    // stock.
    const enoughFor = Math.floor(
      Number(material.stockLevel.stock) / (Number(quantity) / batchSize)
    );
    const enoughForUnit = getStockUnitTextAbbrev(enoughFor, stockUnit);

    // Data for the material's stock level.
    const stockLevel = Number(material.stockLevel.stock);
    const stockLevelUnit = getStockUnitTextAbbrev(
      stockLevel,
      material.stockLevel.stockUnit
    );

    // Data for the material's cost per individual unit.
    const costPerUnit = roundTwoDecimals(
      (Number(material.costPerUnit) * Number(quantity)) / batchSize
    );

    return (
      <Box key={material.id} fontSize="sm">
        <UpdateMaterialDrawer />
        <HStack
          divider={<StackDivider border="none">&bull;</StackDivider>}
          alignItems="flex-start"
        >
          <Text color="slate.500" letterSpacing="wide">
            {stockUsed} {stockUsedUnit} used
          </Text>
          <Tooltip label={`Enough for ${enoughFor} ${enoughForUnit}`}>
            <EnoughForTooltip>
              {stockLevel} {stockLevelUnit} available
            </EnoughForTooltip>
          </Tooltip>
          <Text color="slate.500" letterSpacing="wide">
            ${costPerUnit} per unit
          </Text>
        </HStack>
      </Box>
    );
  }

  // The rendered component.
  return <>{materials.map(renderMaterialInfo)}</>;
}

// A custom tooltip.
const EnoughForTooltip = React.forwardRef<HTMLDivElement, TextProps>(
  ({ children }, ref) => (
    <Text ref={ref} color="slate.500" letterSpacing="wide">
      {children}
    </Text>
  )
);
