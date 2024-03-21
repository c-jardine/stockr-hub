import {
  InventoryGraph,
  InventoryHistoryItem,
  InventoryHistoryTabs,
} from "@/components/InventoryHistory";
import { useProductHistory } from "./hooks";

export default function ProductHistory() {
  const { product, query } = useProductHistory();

  return (
    <InventoryHistoryTabs
      historyTab={
        <InventoryHistoryItem
          history={query.data!}
          stockUnit={product.stockLevel.stockUnit}
          createdAt={product.createdAt}
        />
      }
      visualizationTab={<InventoryGraph {...product} />}
    />
  );
}
