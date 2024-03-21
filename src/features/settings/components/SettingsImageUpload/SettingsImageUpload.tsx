import { api } from "@/utils/api";
import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { Camera } from "tabler-icons-react";
import { useSettingsImageUpload } from "./hooks";

export default function SettingsImageUpload() {
  const { data } = api.user.getProfilePhoto.useQuery();
  const fileInput = React.useRef<HTMLInputElement>(null);

  const { handleUpload, isUploading } = useSettingsImageUpload();

  return (
    <Button
      role="group"
      alignSelf="center"
      variant="unstyled"
      position="relative"
      w={32}
      h={32}
      onClick={() => fileInput.current?.click()}
    >
      <Box h="full" w="fit-content" rounded="full" overflow="hidden">
        {data?.logoUrl ? (
          <Image src={data.logoUrl} objectFit="cover" />
        ) : (
          <Avatar bg="sky.300" boxSize={32} />
        )}
        <AbsoluteCenter
          bg="whiteAlpha.500"
          w="full"
          h="full"
          rounded="full"
          opacity={0}
          transition="200ms cubic-bezier(.57,.21,.69,1.25)"
          _groupHover={{
            opacity: 1,
          }}
        />
      </Box>
      {!isUploading && (
        <Flex
          justifyContent="center"
          alignItems="center"
          position="absolute"
          bottom={0}
          right={0}
          rounded="full"
          bg="sky.500"
          outline="2.5px solid"
          outlineColor="white"
          w={8}
          h={8}
          transition="200ms cubic-bezier(.57,.21,.69,1.25)"
          _groupHover={{
            bg: "sky.400",
          }}
        >
          <Icon as={Camera} stroke="white" strokeWidth={2.5} boxSize={4} />
        </Flex>
      )}
      {isUploading && (
        <AbsoluteCenter
          display="flex"
          justifyContent="center"
          alignItems="center"
          rounded="full"
          bg="whiteAlpha.800"
          border="1px solid"
          borderColor="slate.100"
          w={16}
          h={16}
          shadow="lg"
        >
          <Spinner color="sky.500" />
        </AbsoluteCenter>
      )}
      <Input
        ref={fileInput}
        display="none"
        type="file"
        onChange={handleUpload}
        accept="image/png, image/jpeg"
      />
      {/* <Button
        variant="outline"
        disabled={isUploading || !file}
        isLoading={isUploading}
        onClick={handleUpload}
      >
        Submit
      </Button> */}
    </Button>
  );
}
