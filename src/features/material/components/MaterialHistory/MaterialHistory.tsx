import {
  InventoryGraph,
  InventoryHistoryItem,
  InventoryHistoryTabs,
} from "@/components/InventoryHistory";
import { useMaterialHistory } from "./hooks";

export default function MaterialHistory() {
  const { material, query } = useMaterialHistory();

  return (
    <InventoryHistoryTabs
      historyTab={
        <InventoryHistoryItem
          history={query.data!}
          stockUnit={material.stockLevel.stockUnit}
          createdAt={material.createdAt}
        />
      }
      visualizationTab={<InventoryGraph {...material} />}
    />
  );
}
