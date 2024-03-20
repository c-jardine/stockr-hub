import { Avatar, Button, HStack, Input } from "@chakra-ui/react";
import { useSettingsImageUpload } from "./hooks";

export default function SettingsImageUpload() {
  const { handleFileChange, handleUpload, file, isUploading } =
    useSettingsImageUpload();

  return (
    <HStack>
      <Avatar bg="sky.300" boxSize={16} />
      <form onSubmit={handleUpload}>
        <Input
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
        <Button
          variant="outline"
          type="submit"
          disabled={isUploading || !file}
          isLoading={isUploading}
        >
          Submit
        </Button>
      </form>
    </HStack>
  );
}
