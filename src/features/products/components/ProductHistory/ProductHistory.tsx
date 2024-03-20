import { InventoryHistoryTabs } from "@/components/InventoryHistoryTabs";
import { StockGraph } from "@/components/StockGraph";
import useProduct from "../../hooks/useProduct";
import ProductHistoryItem from "./HistoryItem";
import { useProductHistory } from "./hooks";

export default function ProductHistory() {
  const product = useProduct();

  const { query } = useProductHistory();

  return (
    <InventoryHistoryTabs
      historyTab={
        <ProductHistoryItem
          history={query.data!}
          stockUnit={product.stockLevel.stockUnit}
          createdAt={product.createdAt}
        />
      }
      visualizationTab={<StockGraph {...product} />}
    />
  );
}
