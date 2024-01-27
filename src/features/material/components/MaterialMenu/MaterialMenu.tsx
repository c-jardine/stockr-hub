import { Icon, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { Dots } from 'tabler-icons-react';
import { EditMaterialCategories } from '..';

export default function MaterialMenu() {
  return (
    <Menu>
      <MenuButton>
        <IconButton
          icon={<Icon as={Dots} boxSize={4} />}
          aria-label='Materials menu'
          variant='outline'
          rounded='full'
        />
      </MenuButton>
      <MenuList>
        <EditMaterialCategories />
      </MenuList>
    </Menu>
  );
}
