export interface Option {
  label: string;
  value: string;
}

export type GroupedOptions = {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
}[];
