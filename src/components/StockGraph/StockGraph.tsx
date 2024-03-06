import { type MaterialGetAllOutputSingle } from "@/types";
import { getStockDifference, getStockUnitTextAbbrev } from "@/utils";
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";
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
import { TrendingDown, TrendingUp } from "tabler-icons-react";
import { StockGraphInfo } from ".";
import { useStockGraph } from "./hooks";

export default function StockGraph(material: MaterialGetAllOutputSingle) {
  const { chartData, average, filter, setFilter, colors } = useStockGraph(
    material.id
  );

  const { percentageDifference } = getStockDifference(
    Number(chartData[0]?.stock),
    Number(chartData[chartData.length - 1]?.stock)
  );

  const isPositive = percentageDifference >= 0;

  function RenderTrend() {
    return (
      <Flex
        px={2}
        py={1}
        rounded="md"
        gap={2}
        alignItems="center"
        border="1px solid"
        borderColor={isPositive ? "emerald.200" : "red.200"}
        bg={isPositive ? "emerald.100" : "red.100"}
        w="fit-content"
      >
        <Text
          color={isPositive ? "emerald.400" : "red.400"}
          fontSize="sm"
          fontWeight={500}
        >
          {isNaN(percentageDifference) ? 0 : percentageDifference}%
        </Text>
        <Icon
          as={isPositive ? TrendingUp : TrendingDown}
          strokeWidth={3}
          boxSize={5}
          color={isPositive ? "emerald.500" : "red.500"}
        />
      </Flex>
    );
  }

  return (
    <Stack>
      <StockGraphInfo
        filter={filter}
        setFilter={setFilter}
        trend={chartData.length > 0 && <RenderTrend />}
      />
      {chartData.length === 0 && (
        <Text fontStyle="italic" textAlign="center">
          No data for the selected time period.
        </Text>
      )}
      {chartData.length > 0 && (
        <Box h={72} w="full">
          <ResponsiveContainer width="100%" height="100%" aspect={1.5}>
            <AreaChart width={500} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAt" fontSize={12} />
              <YAxis fontSize={12} width={30} />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                }}
                content={({ active, payload, label }) => {
                  if (active && payload?.length) {
                    return (
                      <Box
                        px={4}
                        py={2}
                        rounded="md"
                        border="1px solid"
                        borderColor="slate.300"
                        bg="white"
                        shadow="lg"
                      >
                        <Text fontSize="sm">
                          {format(label, "MMM. dd, yyyy")}
                        </Text>
                        <Box mt={2}>
                          {payload.map((item, index) => (
                            <Box
                              key={index}
                              pl={2}
                              borderLeft="4px solid"
                              borderColor="sky.500"
                            >
                              <Text
                                as="span"
                                fontSize="sm"
                                fontWeight="semibold"
                                textTransform="uppercase"
                              >
                                {item.value}{" "}
                                {getStockUnitTextAbbrev(
                                  Number(item.value),
                                  material.stockLevel.stockUnit
                                )}
                                . in stock
                              </Text>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    );
                  }
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
                stroke={colors.referenceLineColor}
                strokeDasharray="4 4"
              />
              <Area
                type="monotone"
                dataKey="stock"
                stroke={colors.lineColor}
                strokeWidth={2}
                fill={colors.fillColor}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Stack>
  );
}
