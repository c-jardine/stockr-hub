import { Box, Circle, Flex } from "@chakra-ui/react";

export default function HistoryDecoration({ hideBar = false }) {
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
