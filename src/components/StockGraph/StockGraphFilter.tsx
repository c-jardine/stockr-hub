import { type MaterialStockFilterType } from "@/types";
import {
  Box,
  HStack,
  Stack,
  Text,
  useRadio,
  useRadioGroup,
  type UseRadioProps,
} from "@chakra-ui/react";
import React from "react";
import { useStockFilterGroup } from "./hooks";

export default function StockGraphFilter({
  filter,
  setFilter,
}: {
  filter: MaterialStockFilterType;
  setFilter: React.Dispatch<React.SetStateAction<MaterialStockFilterType>>;
}) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "filter",
    defaultValue: "1M",
    value: filter,
    onChange: (val) => setFilter(val as MaterialStockFilterType),
  });

  const group = getRootProps();

  const { options, dateRangeText } = useStockFilterGroup(filter);

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
