import { InventoryHistoryTabs } from "@/components/InventoryHistoryTabs";
import { StockGraph } from "@/components/StockGraph";
import { useMaterial } from "../../hooks";
import MaterialHistoryItem from "./MaterialHistoryItem";
import { useMaterialHistory } from "./hooks";

export default function MaterialHistory() {
  const material = useMaterial();

  const { query } = useMaterialHistory();

  return (
    <InventoryHistoryTabs
      historyTab={
        <MaterialHistoryItem
          history={query.data!}
          stockUnit={material.stockLevel.stockUnit}
          createdAt={material.createdAt}
        />
      }
      visualizationTab={<StockGraph {...material} />}
    />
  );
}
