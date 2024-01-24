import { useDisclosure } from '@chakra-ui/react';

export default function useViewProduct() {
  const disclosure = useDisclosure();

  return { disclosure };
}
