import { Icon, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { Dots } from 'tabler-icons-react';
import { EditProductCategories } from '..';

export default function ProductMenu() {
  return (
    <Menu>
      <MenuButton>
        <IconButton
          icon={<Icon as={Dots} boxSize={4} />}
          aria-label='Product menu'
          variant='outline'
          rounded='full'
        />
      </MenuButton>
      <MenuList>
        <EditProductCategories />
      </MenuList>
    </Menu>
  );
}
