import { Stack } from "@chakra-ui/react";
import MaterialDetails from "./MaterialDetails";
import MaterialHistory from "./MaterialHistory";

export default function MaterialViewerDrawerBody() {
  return (
    <Stack spacing={8}>
      <MaterialDetails />
      <MaterialHistory />
    </Stack>
  );
}
