import { HistoryDecoration } from "@/components/HistoryDecoration";
import { type ProductGetHistoryOutput } from "@/types";
import { getStockUnitTextAbbrev } from "@/utils";
import { Box, Flex, Icon, Stack, Tag, Text } from "@chakra-ui/react";
import { InventoryAdjustmentType, type StockUnit } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import { ArrowRight } from "tabler-icons-react";

// Define eventMappings outside the component
const eventMappings = {
  [InventoryAdjustmentType.INCREASE]: {
    colorScheme: "emerald",
    adjustmentSign: "+",
  },
  [InventoryAdjustmentType.DECREASE]: {
    colorScheme: "red",
    adjustmentSign: "-",
  },
  [InventoryAdjustmentType.SET]: { colorScheme: "sky", adjustmentSign: "" },
};

// Render title function
function renderTitle(event: ProductGetHistoryOutput[0], stockUnit: StockUnit) {
  const { adjustmentType } = event.changeType;
  const { colorScheme, adjustmentSign } = eventMappings[adjustmentType] || {
    colorScheme: "sky",
    adjustmentSign: "",
  };

  return (
    <Flex alignItems="center" gap={2} justifyContent="space-between">
      <Text fontWeight="semibold">{event.changeType.name}</Text>
      <Tag colorScheme={colorScheme}>
        {adjustmentSign}
        {Number(event.inventoryLog.quantityChange)}{" "}
        {getStockUnitTextAbbrev(
          Number(event.inventoryLog.quantityChange),
          stockUnit
        )}
        .
      </Tag>
    </Flex>
  );
}

export default function ProductHistoryItem({
  history,
  stockUnit,
  createdAt,
}: {
  history: ProductGetHistoryOutput;
  stockUnit: StockUnit;
  createdAt: Date;
}) {
  return (
    <Stack spacing={0} pl={5}>
      {history?.map((event) => (
        <Box
          key={event.changeTypeId}
          role="group"
          position="relative"
          fontSize="sm"
          pb={4}
        >
          <HistoryDecoration />
          <Box
            p={2}
            rounded="lg"
            outline="1px solid"
            outlineColor="transparent"
            transition="150ms ease-in-out"
            _hover={{
              bg: "slate.100",
              outlineColor: "slate.200",
            }}
          >
            {renderTitle(event, stockUnit)}
            <Flex alignItems="center" gap={2}>
              <Text>
                {Number(event.inventoryLog.previousQuantity)}{" "}
                {getStockUnitTextAbbrev(
                  Number(event.inventoryLog.previousQuantity),
                  stockUnit
                )}
                .
              </Text>
              <Icon as={ArrowRight} strokeWidth={3} color="slate.500" />
              <Text fontWeight="semibold">
                {Number(event.inventoryLog.newQuantity)}{" "}
                {getStockUnitTextAbbrev(
                  Number(event.inventoryLog.newQuantity),
                  stockUnit
                )}
                .
              </Text>
            </Flex>
            {event.inventoryLog.notes && (
              <Text
                my={1}
                px={2}
                py={1}
                w="fit-content"
                border="1px solid"
                borderColor="sky.200"
                rounded="md"
                color="sky.700"
                bg="sky.100"
                fontSize="xs"
              >
                {event.inventoryLog.notes}
              </Text>
            )}
            <Text color="slate.500" fontSize="xs">
              {formatDistanceToNowStrict(event.inventoryLog.timestamp)} ago
            </Text>
          </Box>
        </Box>
      ))}
      <Box position="relative" fontSize="sm">
        <HistoryDecoration hideBar />
        <Box
          p={2}
          rounded="lg"
          outline="1px solid"
          outlineColor="transparent"
          transition="150ms ease-in-out"
          _hover={{
            bg: "slate.100",
            outlineColor: "slate.200",
          }}
        >
          <Text fontWeight="semibold">Created by you</Text>
          <Text color="slate.500" fontSize="xs">
            {formatDistanceToNowStrict(createdAt)} ago
          </Text>
        </Box>
      </Box>
    </Stack>
  );
}
