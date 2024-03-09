import { StockGraph } from "@/components/StockGraph";
import { type MaterialGetAllOutputSingle } from "@/types";
import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import MaterialHistoryItem from "./HistoryItem";
import { useMaterialHistory } from "./hooks";

export default function MaterialHistory(props: MaterialGetAllOutputSingle) {
  const { query } = useMaterialHistory(props.id);

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
