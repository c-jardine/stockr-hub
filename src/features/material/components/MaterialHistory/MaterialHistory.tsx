import { StockGraph } from "@/components/StockGraph";
import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useMaterial } from "../../hooks";
import MaterialHistoryItem from "./MaterialHistoryItem";
import { useMaterialHistory } from "./hooks";

export default function MaterialHistory() {
  const material = useMaterial();

  const { query } = useMaterialHistory();

  return (
    <Stack>
      <Tabs>
        <TabList>
          <Tab fontSize={{ base: "xs", sm: "md" }}>History</Tab>
          <Tab fontSize={{ base: "xs", sm: "md" }}>Visualization</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MaterialHistoryItem
              history={query.data!}
              stockUnit={material.stockLevel.stockUnit}
              createdAt={material.createdAt}
            />
          </TabPanel>
          <TabPanel>
            <StockGraph {...material} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}
