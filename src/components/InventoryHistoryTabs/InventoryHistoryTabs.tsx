import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";

export default function InventoryHistoryTabs({
  historyTab,
  visualizationTab,
}: {
  historyTab: React.ReactNode;
  visualizationTab: React.ReactNode;
}) {
  return (
    <Stack>
      <Tabs>
        <TabList>
          <Tab fontSize={{ base: "xs", sm: "md" }}>History</Tab>
          <Tab fontSize={{ base: "xs", sm: "md" }}>Visualization</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{historyTab}</TabPanel>
          <TabPanel>{visualizationTab}</TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}
