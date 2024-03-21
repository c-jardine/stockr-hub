import { Stack } from "@chakra-ui/react";
import MaterialsUsed from "./MaterialsUsed";
import ProductDetails from "./ProductDetails";
import ProductHistory from "./ProductHistory";
import ProfitTable from "./ProfitTable";

export default function ProductViewerDrawerBody() {
  return (
    <Stack spacing={8}>
      <ProductDetails />
      <ProfitTable />
      <MaterialsUsed />
      <ProductHistory />
    </Stack>
  );
}
