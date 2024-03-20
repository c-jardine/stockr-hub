import { formatCurrency, getNetProfit, getProfitMargin } from "@/utils";
import {
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useProduct from "../../hooks/useProduct";

const percent = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 2,
});

export default function ProfitTable() {
  const product = useProduct();
  const { retailPrice, wholesalePrice } = product;

  const { retailProfit, wholesaleProfit } = getNetProfit(product);
  const retailProfitText = formatCurrency(retailProfit);
  const wholesaleProfitText = formatCurrency(wholesaleProfit);

  const { retailMargin, wholesaleMargin } = getProfitMargin(product);
  const retailMarginText = percent.format(retailMargin);
  const wholesaleMarginText = percent.format(wholesaleMargin);

  return (
    <Stack>
      <Text fontSize="lg" fontWeight="bold">
        Profits and Margins
      </Text>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Price</Th>
              <Th>Profit</Th>
              <Th>Margin</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td
                pr={0}
                color="slate.700"
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="wider"
                textTransform="uppercase"
              >
                Retail
              </Td>
              <Td>{formatCurrency(Number(retailPrice))}</Td>
              <Td>{retailProfitText}</Td>
              <Td>{retailMarginText}</Td>
            </Tr>
            <Tr>
              <Td
                pr={0}
                color="slate.700"
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="wider"
                textTransform="uppercase"
              >
                Wholesale
              </Td>
              <Td>{formatCurrency(Number(wholesalePrice))}</Td>
              <Td>{wholesaleProfitText}</Td>
              <Td>{wholesaleMarginText}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
