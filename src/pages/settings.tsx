import {
  SettingsImageUpload,
  StockAdjustmentTypesSettings,
} from "@/features/settings";
import { RootLayout } from "@/layouts/RootLayout";
import { FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";

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
            <SettingsImageUpload />
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
