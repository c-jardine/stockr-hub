import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface NavLinkChild {
  label: string;
  href: string;
}

export default function NavLinkChild(props: NavLinkChild) {
  const router = useRouter();

  const isCurrentPage = router.asPath === props.href;

  return (
    <Flex
      as='a'
      href={props.href}
      pl={12}
      py={1}
      color={isCurrentPage ? 'slate.800' : 'slate.500'}
      bg='slate.100'
      fontSize='sm'
      fontWeight={isCurrentPage ? 'bold' : 'unset'}
      transition='150ms ease-in-out'
      _hover={{ color: 'black' }}
    >
      <Text>{props.label}</Text>
    </Flex>
  );
}
