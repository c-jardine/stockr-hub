import { Icon } from '@chakra-ui/react';
import {
  components,
  type GroupBase,
  type SelectComponentsConfig,
} from 'chakra-react-select';
import { ChevronDown } from 'tabler-icons-react';
import { type Option } from './types';

export const selectComponents: SelectComponentsConfig<
  Option,
  false,
  GroupBase<Option>
> = {
  DropdownIndicator: ({ children, ...props }) => (
    <components.DropdownIndicator {...props}>
      <Icon as={ChevronDown} boxSize={3} color='slate.900' />
      {children}
    </components.DropdownIndicator>
  ),
};

export const multiSelectComponents: SelectComponentsConfig<
  Option,
  true,
  GroupBase<Option>
> = {
  DropdownIndicator: ({ children, ...props }) => (
    <components.DropdownIndicator {...props}>
      <Icon as={ChevronDown} boxSize={3} color='slate.900' />
      {children}
    </components.DropdownIndicator>
  ),
};
