import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
  tab: {
    p: 2,
    fontWeight: "semibold",
    transition: "150ms ease-in-out",
    _selected: {
      color: "black",
    },
    _hover: {
      borderColor: "black",
    },
  },
});

export const tabsTheme = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: "sky",
  },
  baseStyle,
});
