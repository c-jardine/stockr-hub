import { type MaterialGetAllOutputSingle } from "@/types";
import { Box, Stack } from "@chakra-ui/react";
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
import { StockGraphFilter } from ".";
import { useStockGraph } from "./hooks";

export default function StockGraph(material: MaterialGetAllOutputSingle) {
  const { chartData, average, filter, setFilter, colors } = useStockGraph(
    material.id
  );

  return (
    <Stack>
      <StockGraphFilter filter={filter} setFilter={setFilter} />
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
    </Stack>
  );
}
