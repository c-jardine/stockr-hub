import { Stack } from "@chakra-ui/react";
import { ProductHistory } from "../ProductHistory";
import MaterialsUsed from "./MaterialsUsed";
import ProductDetails from "./ProductDetails";
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
