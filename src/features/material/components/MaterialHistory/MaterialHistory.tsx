import {
  type MaterialGetAllOutputSingle,
  type MaterialGetHistoryOutput,
} from "@/types";
import { getStockUnitTextAbbrev } from "@/utils";
import { api } from "@/utils/api";
import {
  Box,
  Circle,
  Flex,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToken,
} from "@chakra-ui/react";
import { format, formatDistanceToNowStrict } from "date-fns";
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
import HistoryItem from "./HistoryItem";
import { useMaterialHistory } from "./hooks";

export default function MaterialHistory(props: MaterialGetAllOutputSingle) {
  const { query } = useMaterialHistory(props.id);

  const getStockDifference = (stock1: number, stock2: number): number =>
    Math.abs(stock1 - stock2);

  const renderText = (message: string, logType: string): JSX.Element => (
    <Text>
      {message}
      <Text as="span" fontWeight="semibold">
        {logType}
      </Text>
    </Text>
  );

  const getUnit = (stock: number): string =>
    getStockUnitTextAbbrev(stock, props.stockLevel.stockUnit);

  const getMessage = (
    history: MaterialGetHistoryOutput[0]
  ): React.ReactNode => {
    const logType = history.stockRecordType.name;
    const adjustedStock = Number(history.stockRecord.stock);
    const previousStock = Number(history.stockRecord.prevStock);

    switch (logType) {
      case "Supply Order":
        return renderText(
          `You received ${adjustedStock} ${getUnit(adjustedStock)}. in a `,
          "supply order"
        );

      case "Audit":
        if (previousStock === adjustedStock) {
          return renderText("No stock change in an ", "audit");
        }

        const stockDifference = getStockDifference(
          previousStock,
          adjustedStock
        );
        const action = previousStock > adjustedStock ? "removed" : "added";

        return renderText(
          `You ${action} ${stockDifference} ${getUnit(
            stockDifference
          )}. in an `,
          "audit"
        );

      case "Product Testing":
        const stockUsed = adjustedStock;
        return (
          <Text>
            You used {stockUsed} {getUnit(stockUsed)}. while testing
          </Text>
        );

      default:
        return <Text>{adjustedStock}</Text>;
    }
  };

  const getUpdatedStock = (history: MaterialGetHistoryOutput[0]): number => {
    const logType = history.stockRecordType.name;
    const adjustedStock = Number(history.stockRecord.stock);
    const previousStock = Number(history.stockRecord.prevStock);

    switch (logType) {
      case "Supply Order":
        return previousStock + adjustedStock;

      case "Audit":
        return adjustedStock;

      case "Product Testing":
        return previousStock - adjustedStock;

      default:
        return Number(props.stockLevel.stock);
    }
  };

  return (
    <Stack>
      <Tabs>
        <TabList>
          <Tab fontSize={{ base: "xs", sm: "md" }}>History</Tab>
          <Tab fontSize={{ base: "xs", sm: "md" }}>Supply Orders</Tab>
          <Tab fontSize={{ base: "xs", sm: "md" }}>Stock History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack spacing={0} pl={5}>
              {query.data?.map((event) => (
                <Box role="group" position="relative" fontSize="sm" pb={4}>
                  <Decoration />
                  <HistoryItem.Base>
                    <HistoryItem.Message>
                      {getMessage(event)}
                    </HistoryItem.Message>
                    <HistoryItem.StockLevel
                      previous={`${Number(
                        event.stockRecord.prevStock
                      )} ${getStockUnitTextAbbrev(
                        Number(event.stockRecord.prevStock),
                        props.stockLevel.stockUnit
                      )}.`}
                      new={`${getUpdatedStock(event)} ${getStockUnitTextAbbrev(
                        Number(getUpdatedStock(event)),
                        props.stockLevel.stockUnit
                      )}.`}
                    />
                    {event.stockRecord.notes && (
                      <HistoryItem.Notes>
                        {event.stockRecord.notes}
                      </HistoryItem.Notes>
                    )}
                    <HistoryItem.Date>
                      {formatDistanceToNowStrict(event.stockRecord.createdAt)}{" "}
                      ago
                    </HistoryItem.Date>
                  </HistoryItem.Base>
                </Box>
              ))}
              <Box position="relative" fontSize="sm">
                <Decoration hideBar />
                <HistoryItem.Base>
                  <HistoryItem.Message>Created by you</HistoryItem.Message>
                  <HistoryItem.Date>
                    {formatDistanceToNowStrict(props.createdAt)} ago
                  </HistoryItem.Date>
                </HistoryItem.Base>
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Text fontSize="sm" fontStyle="italic" textAlign="center">
              Feature coming soon!
            </Text>
          </TabPanel>
          <TabPanel>
            <StockChart {...props} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}

function StockChart(material: MaterialGetAllOutputSingle) {
  const [lineColor, fillColor, referenceLineColor] = useToken("colors", [
    "sky.500",
    "sky.200",
    "orange.500",
  ]);

  const { data } = api.material.getAllStockUpdates.useQuery({
    id: material.id,
  });

  if (!data) {
    return <Spinner />;
  }

  const chartData = data.map((log) => ({
    name: format(log.stockRecord.createdAt, "h:mm a"),
    Stock: Number(log.stockRecord.stock),
  }));

  const total = chartData.reduce((sum, item) => sum + item.Stock, 0);
  const average = total / chartData.length;

  return (
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
  );
}

function Decoration({ hideBar = false }) {
  return (
    <Flex position="absolute" top={3} left={-5} h="full">
      {!hideBar && (
        <Box
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          w="2px"
          h="full"
          bg="slate.300"
        />
      )}
      <Circle
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        size={3}
        bg="white"
        borderWidth={2}
        borderColor="slate.400"
        transition="200ms ease-in-out"
        _groupHover={{
          transform: "translateX(-50%) scale(1.2)",
        }}
      />
    </Flex>
  );
}
