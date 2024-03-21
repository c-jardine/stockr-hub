import { type MaterialStockFilterType } from "@/types";
import {
  endOfDay,
  format,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";

export default function useInventoryGraphInfo(filter: MaterialStockFilterType) {
  const options: MaterialStockFilterType[] = [
    "1D",
    "5D",
    "1M",
    "6M",
    "1Y",
    "YTD",
  ];

  const getDateRangeText = (filter: MaterialStockFilterType): string => {
    const today = endOfDay(new Date()); // Ensures the range includes all of today
    let startDate: Date;

    switch (filter) {
      case "1D":
        return "Today";
      case "5D":
        startDate = subDays(today, 5);
        break;
      case "1M":
        startDate = subMonths(today, 1);
        break;
      case "6M":
        startDate = subMonths(today, 6);
        break;
      case "YTD":
        startDate = startOfYear(today);
        break;
      case "1Y":
        startDate = subYears(today, 1);
        break;
      default:
        return "";
    }

    // Format dates as "Mon. Day, Year"
    const formatString = "MM/dd/yy";
    return `${format(startDate, formatString)} - ${format(
      today,
      formatString
    )}`;
  };

  const dateRangeText = getDateRangeText(filter);

  return { options, dateRangeText };
}
