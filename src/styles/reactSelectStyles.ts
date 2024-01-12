import { type StylesConfig } from 'chakra-react-select';

interface Option {
  label: string;
  value: number;
}

export const selectStyles: StylesConfig<Option, false> = {};
export const multiSelectStyles: StylesConfig<Option, true> = {};
