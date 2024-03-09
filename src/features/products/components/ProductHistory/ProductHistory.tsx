import { StockGraph } from "@/components/StockGraph";
import { type ProductGetAllOutputSingle } from "@/types";
import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ProductHistoryItem from "./HistoryItem";
import { useProductHistory } from "./hooks";

export default function ProductHistory(props: ProductGetAllOutputSingle) {
  const { query } = useProductHistory(props.id);

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
              stockUnit={props.stockLevel.stockUnit}
              createdAt={props.createdAt}
            />
          </TabPanel>
          <TabPanel>
            <StockGraph {...props} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}
