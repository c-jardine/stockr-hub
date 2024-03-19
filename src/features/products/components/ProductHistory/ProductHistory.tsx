import { StockGraph } from "@/components/StockGraph";
import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import useProduct from "../../hooks/useProduct";
import ProductHistoryItem from "./HistoryItem";
import { useProductHistory } from "./hooks";

export default function ProductHistory() {
  const product = useProduct();

  const { query } = useProductHistory();

  return (
    <Stack>
      <Tabs>
        <TabList>
          <Tab fontSize={{ base: "xs", sm: "md" }}>History</Tab>
          <Tab fontSize={{ base: "xs", sm: "md" }}>Visualization</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProductHistoryItem
              history={query.data!}
              stockUnit={product.stockLevel.stockUnit}
              createdAt={product.createdAt}
            />
          </TabPanel>
          <TabPanel>
            <StockGraph {...product} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}
