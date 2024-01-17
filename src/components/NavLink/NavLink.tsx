import { Flex, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { type Icon as IconType } from 'tabler-icons-react';

export interface LinkProps {
  label: string;
  href: string;
  icon: IconType;
}

export default function NavLink(props: LinkProps) {
  const router = useRouter();

  return (
    <Flex
      key={props.label}
      as='a'
      href={props.href}
      pl={6}
      py={2}
      alignItems='center'
      gap={4}
      borderLeft='4px solid'
      borderLeftColor={
        router.asPath === props.href ? 'emerald.600' : 'transparent'
      }
      fontWeight={router.asPath === props.href ? 'semibold' : 'unset'}
      color={router.asPath === props.href ? 'emerald.600' : 'slate.500'}
      bg={router.asPath === props.href ? 'slate.100' : 'transparent'}
      transition='200ms ease-in-out'
      _hover={{
        color: router.asPath === props.href ? 'emerald.600' : 'black',
      }}
    >
      <Icon
        as={props.icon}
        boxSize={5}
        color={router.asPath === props.href ? 'emerald.600' : 'unset'}
      />{' '}
      <Text>{props.label}</Text>
    </Flex>
  );
}
