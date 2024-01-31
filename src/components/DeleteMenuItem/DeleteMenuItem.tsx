import { useAppStateContext } from '@/contexts/AppStateContext/AppStateContext';
import { Icon, MenuItem, type MenuItemProps } from '@chakra-ui/react';
import { Trash } from 'tabler-icons-react';

export default function DeleteMenuItem({ children, ...props }: MenuItemProps) {
  const appState = useAppStateContext();

  return (
    <MenuItem
      isDisabled={appState?.auditState.inProgress}
      icon={<Icon as={Trash} boxSize={4} />}
      _hover={{
        bg: 'red.500',
        color: 'whiteAlpha.900',
      }}
      _focus={{
        bg: 'red.500',
        color: 'whiteAlpha.900',
      }}
      {...props}
    >
      {children}
    </MenuItem>
  );
}
