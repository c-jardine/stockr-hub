import { type MaterialStockFilterType } from "@/types";
import {
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  useRadio,
  useRadioGroup,
  type UseRadioProps,
} from "@chakra-ui/react";
import React from "react";
import { useStockGraphInfo } from "./hooks";

export default function StockGraphInfo({
  filter,
  setFilter,
  trend,
}: {
  filter: MaterialStockFilterType;
  setFilter: React.Dispatch<React.SetStateAction<MaterialStockFilterType>>;
  trend: React.ReactNode;
}) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "filter",
    defaultValue: "1M",
    value: filter,
    onChange: (val) => setFilter(val as MaterialStockFilterType),
  });

  const group = getRootProps();

  const { options, dateRangeText } = useStockGraphInfo(filter);

  return (
    <Stack>
      <Flex justifyContent="space-between" alignItems="center">
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
        {trend}
      </Flex>
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
