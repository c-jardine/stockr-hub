import {
  type MaterialGetFilteredStockUpdates,
  type MaterialStockFilterType,
} from "@/types";
import { api } from "@/utils/api";
import { useToken } from "@chakra-ui/react";
import { format, isSameDay } from "date-fns";
import React from "react";

export default function useStockGraph(id: string) {
  const [filter, setFilter] = React.useState<MaterialStockFilterType>("1M");

  const [lineColor, fillColor, referenceLineColor] = useToken("colors", [
    "sky.500",
    "sky.200",
    "orange.500",
  ]);

  const { data } = api.material.getAllStockUpdatesFiltered.useQuery({
    id,
    filter,
  });

  // Helper function to get data ready for the graph. For days with multiple
  // stock updates, filters out all but the last update for the day.
  const preprocessData = (data: MaterialGetFilteredStockUpdates) => {
    const filteredData: MaterialGetFilteredStockUpdates = [];
    let lastRecordDate: Date | null = null;

    data.forEach((record, index) => {
      const currentRecordDate = record.stockRecord.createdAt;
      const nextRecord = data[index + 1];
      const isLastItem = index === data.length - 1;

      if (isLastItem) {
        filteredData.push(record);
        return;
      }

      if (nextRecord) {
        const nextRecordDate = nextRecord.stockRecord.createdAt;
        if (!isSameDay(currentRecordDate, nextRecordDate)) {
          filteredData.push(record);
        } else if (
          lastRecordDate &&
          !isSameDay(lastRecordDate, currentRecordDate)
        ) {
          filteredData.push(record);
        }
        lastRecordDate = currentRecordDate;
      }
    });

    return filteredData;
  };

  const chartData = !data
    ? []
    : preprocessData(data).map((item) => ({
        createdAt: format(
          item.stockRecord.createdAt,
          "MMM. dd, yyyy 'at' h:mm a"
        ),
        stock: Number(item.stockRecord.stock),
      }));

  const total = chartData.reduce((sum, item) => sum + item.stock, 0);
  const average = total / chartData.length;

  return {
    chartData,
    average,
    filter,
    setFilter,
    colors: {
      lineColor,
      fillColor,
      referenceLineColor,
    },
  };
}
