import { StockAdjustmentTypesSettings } from "@/features/settings";
import { RootLayout } from "@/layouts/RootLayout";
import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Settings() {
  return (
    <RootLayout title="Settings">
      <Stack spacing={4} mx="auto" py={8} maxW="lg" w="full">
        <Text as="h2" fontSize="lg" fontWeight="semibold">
          Business information
        </Text>
        <Stack spacing={8}>
          <FormControl>
            <FormLabel>Business name</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Logo</FormLabel>
            <HStack>
              <Avatar bg="sky.300" boxSize={16} />
              <Button variant="outline">Choose file</Button>
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel>Website</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Industry</FormLabel>
            <Input />
          </FormControl>
        </Stack>
        <StockAdjustmentTypesSettings />
      </Stack>
    </RootLayout>
  );
}
