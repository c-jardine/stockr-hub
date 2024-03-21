import { Stack } from "@chakra-ui/react";
import { MaterialHistory } from "../MaterialHistory";
import MaterialDetails from "./MaterialDetails";

export default function MaterialViewerDrawerBody() {
  return (
    <Stack spacing={8}>
      <MaterialDetails />
      <MaterialHistory />
    </Stack>
  );
}
