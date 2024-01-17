import { useDisclosure } from '@chakra-ui/react';

export default function useViewMaterial() {
  const disclosure = useDisclosure();

  return { disclosure };
}
