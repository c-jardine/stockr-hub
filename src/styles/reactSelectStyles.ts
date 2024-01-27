import { type Option } from '@/components/Select';
import { type ChakraStylesConfig } from 'chakra-react-select';

export const selectStyles: ChakraStylesConfig<Option, false> = {
  container: (base) => ({
    ...base,
    cursor: 'pointer',
  }),
  valueContainer: (base) => ({
    ...base,
    fontSize: 'sm',
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: 'sm',
  }),
  groupHeading: (base) => ({
    ...base,
    fontSize: 'xs',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    cursor: 'default',
  }),
  menuList: (base) => ({
    ...base,
    p: 2,
  }),
  option: (base) => ({
    ...base,
    fontSize: 'sm',
    rounded: 'md',
    _selected: {
      bg: 'sky.600',
      color: 'white',
    },
    _focus: {
      bg: 'slate.200',
    },
  }),
};
export const multiSelectStyles: ChakraStylesConfig<Option, true> = {
  container: (base) => ({
    ...base,
    cursor: 'pointer',
  }),
  valueContainer: (base) => ({
    ...base,
    fontSize: 'sm',
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: 'sm',
  }),
  groupHeading: (base) => ({
    ...base,
    fontSize: 'xs',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    cursor: 'default',
  }),
  menuList: (base) => ({
    ...base,
    p: 2,
  }),
  multiValueLabel: (base) => ({
    ...base,
    fontSize: 'xs',
  }),
  option: (base) => ({
    ...base,
    fontSize: 'sm',
    rounded: 'md',
    _selected: {
      bg: 'sky.600',
      color: 'white',
    },
    _focus: {
      bg: 'slate.200',
    },
  }),
};
