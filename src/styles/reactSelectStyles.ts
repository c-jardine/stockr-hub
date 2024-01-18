import { type Option } from '@/components/Select';
import { type ChakraStylesConfig } from 'chakra-react-select';

export const selectStyles: ChakraStylesConfig<Option, false> = {
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
  }),
  option: (base) => ({
    ...base,
    fontSize: 'sm',
    _selected: {
      bg: 'emerald.600',
      color: 'white',
    },
    _focus: {
      bg: 'slate.100',
    },
  }),
};
export const multiSelectStyles: ChakraStylesConfig<Option, true> = {};
