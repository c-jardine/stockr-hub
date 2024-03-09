import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Plus } from "tabler-icons-react";
import StockAdjustmentTypesTabs from "./StockAdjustmentTypesTabs";

export default function StockAdjustmentTypesHeader() {
  return (
    <>
      <Flex mt={12} justifyContent="space-between" alignItems="center">
        <Text as="h2" fontSize="lg" fontWeight="semibold">
          Stock adjustment types
        </Text>
        <IconButton
          variant="outline"
          size='sm'
          icon={<Plus size={16} />}
          aria-label="New stock adjustment type"
        />
      </Flex>
      <Text mt={-4} color="slate.500" fontSize="sm">
        These types are used to keep log stock changes. Add or remove types to
        help you keep better track of your products and materials.
      </Text>
      <StockAdjustmentTypesTabs />
    </>
  );
}
