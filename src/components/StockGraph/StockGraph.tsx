import { type materialGetAllStockUpdatesFilteredSchema } from "@/schemas";
import { type MaterialGetAllOutputSingle } from "@/types";
import { api } from "@/utils/api";
import {
  Box,
  HStack,
  Spinner,
  Stack,
  Text,
  useRadio,
  useRadioGroup,
  useToken,
  type UseRadioProps,
} from "@chakra-ui/react";
import {
  endOfDay,
  format,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { type z } from "zod";

type FilterType = z.infer<
  typeof materialGetAllStockUpdatesFilteredSchema
>["filter"];

export default function StockGraph(material: MaterialGetAllOutputSingle) {
  const [filter, setFilter] = React.useState<FilterType>("1M");

  const [lineColor, fillColor, referenceLineColor] = useToken("colors", [
    "sky.500",
    "sky.200",
    "orange.500",
  ]);

  const { data } = api.material.getAllStockUpdatesFiltered.useQuery({
    id: material.id,
    filter,
  });

  if (!data) {
    return <Spinner />;
  }

  const chartData = data.map((log) => ({
    name: format(log.stockRecord.createdAt, "MMM. dd, yyyy 'at' h:mm a"),
    Stock: Number(log.stockRecord.stock),
  }));

  const total = chartData.reduce((sum, item) => sum + item.Stock, 0);
  const average = total / chartData.length;

  return (
    <Stack>
      <FilterGroup filter={filter} setFilter={setFilter} />
      <Box h={72} w="full">
        <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
          <AreaChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} width={30} />
            <Tooltip
              contentStyle={{
                fontSize: 12,
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="center"
              wrapperStyle={{
                marginTop: -8,
                fontSize: 14,
                fontWeight: 600,
              }}
            />
            <ReferenceLine
              y={average}
              // label={{ value: "Average", position: "left" }}
              stroke={referenceLineColor}
              strokeDasharray="4 4"
            />
            <Area
              type="monotone"
              dataKey="Stock"
              stroke={lineColor}
              strokeWidth={2}
              fill={fillColor}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  );
}

function FilterCard(props: UseRadioProps & { children: React.ReactNode }) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" flex={1}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        fontWeight="semibold"
        _checked={{
          bg: "sky.500",
          color: "white",
          borderColor: "sky.500",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={4}
        py={1}
        textAlign="center"
      >
        {props.children}
      </Box>
    </Box>
  );
}

function FilterGroup({
  filter,
  setFilter,
}: {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}) {
  const options: FilterType[] = ["1D", "5D", "1M", "6M", "1Y", "YTD"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "filter",
    defaultValue: "1M",
    value: filter,
    onChange: (val) => setFilter(val as FilterType),
  });

  const group = getRootProps();

  const getDateRangeText = (filter: FilterType): string => {
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

  return (
    <Stack>
      <Box
        border="1px solid"
        borderColor="slate.200"
        w="fit-content"
        rounded="md"
        px={2}
        py={1}
      >
        <Text color="slate.500" fontSize="sm" fontWeight="semibold">
          {dateRangeText}
        </Text>
      </Box>
      <HStack {...group} overflowX="scroll" pb={4}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <FilterCard key={value} {...radio}>
              {value}
            </FilterCard>
          );
        })}
      </HStack>
    </Stack>
  );
}
