import {
  SettingsForm,
  StockAdjustmentTypesSettings,
} from "@/features/settings";
import { RootLayout } from "@/layouts/RootLayout";
import { Stack } from "@chakra-ui/react";

export default function Settings() {
  return (
    <RootLayout title="Settings">
      <Stack spacing={4} mx="auto" py={8} maxW="lg" w="full">
        <SettingsForm />
        <StockAdjustmentTypesSettings />
      </Stack>
    </RootLayout>
  );
}
