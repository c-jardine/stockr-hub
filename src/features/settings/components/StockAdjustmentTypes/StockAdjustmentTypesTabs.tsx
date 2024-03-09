import {
  Box,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { InventoryAdjustmentType } from "@prisma/client";
import { Dots, Edit, InfoCircle, Trash } from "tabler-icons-react";
import { useStockAdjustmentTypes } from "../../hooks";

export default function StockAdjustmentTypesTabs() {
  const { materialChangeTypesQuery, productChangeTypesQuery } =
    useStockAdjustmentTypes();

  return (
    <Tabs>
      <TabList>
        <Tab>Materials</Tab>
        <Tab>Products</Tab>
      </TabList>
      <TabPanels>
        <TabPanel px={0}>
          <Stack>
            {materialChangeTypesQuery.data?.map((material) => (
              <AdjustmentType
                key={material.id}
                name={material.name}
                changeType={material.adjustmentType}
                description={material.description}
              />
            ))}
          </Stack>
        </TabPanel>
        <TabPanel px={0}>
          <Stack>
            {productChangeTypesQuery.data?.map((product) => (
              <AdjustmentType
                key={product.id}
                name={product.name}
                changeType={product.adjustmentType}
                description={product.description}
              />
            ))}
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

interface AdjustmentType {
  name: string;
  changeType: string;
  description: string | null;
}
function AdjustmentType({ name, changeType, description }: AdjustmentType) {
  function getChangeType() {
    switch (changeType) {
      case InventoryAdjustmentType.INCREASE:
        return "Increase stock level";
      case InventoryAdjustmentType.DECREASE:
        return "Decrease stock level";
      case InventoryAdjustmentType.SET:
        return "Set stock level";
    }
  }
  return (
    <Flex justifyContent="space-between">
      <Box>
        <Flex wrap="nowrap">
          <Text fontWeight="semibold">{name}</Text>
          {description && (
            <Tooltip shouldWrapChildren label={description}>
              <Icon as={InfoCircle} />
            </Tooltip>
          )}
        </Flex>
        <Text color="slate.500" fontSize="sm">
          {getChangeType()}
        </Text>
      </Box>
      <Menu>
        <MenuButton
          as={IconButton}
          variant="outline"
          icon={<Icon as={Dots} />}
          aria-label={`Delete ${name}`}
        />
        <MenuList>
          <MenuItem icon={<Icon as={Edit} boxSize={4} />}>Edit</MenuItem>
          <MenuDivider />
          <MenuItem
            icon={<Icon as={Trash} boxSize={4} />}
            _hover={{
              bg: "red.500",
              color: "whiteAlpha.900",
            }}
            _focus={{
              bg: "red.500",
              color: "whiteAlpha.900",
            }}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
