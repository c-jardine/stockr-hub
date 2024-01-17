import { Flex, Text } from '@chakra-ui/react';

interface NavLinkChild {
  label: string;
  href: string;
}

export default function NavLinkChild(props: NavLinkChild) {
  return (
    <Flex
      as='a'
      href={props.href}
      pl={12}
      py={1}
      color='slate.500'
      bg='slate.100'
      fontSize='sm'
      transition='150ms ease-in-out'
      _hover={{ color: 'black' }}
    >
      <Text>{props.label}</Text>
    </Flex>
  );
}
