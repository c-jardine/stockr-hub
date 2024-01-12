import { multiSelectStyles } from '@/styles';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import {
  Controller,
  type FieldError,
  type FieldPath,
  type FieldValues,
  type Merge,
  type UseControllerProps,
} from 'react-hook-form';
import { multiSelectComponents } from './components';

// Type for the a single select input option.
interface Option {
  label: string;
  value: number;
}

// Generic typing for component to work with react-hook-form.
type MultiSelectProps<TFormValues extends FieldValues> =
  UseControllerProps<TFormValues> & {
    label: string;
    name: FieldPath<TFormValues>;
    options: Option[];
    error?: Merge<FieldError, FieldError>;
  } & {
    onCreate: (inputValue: string) => void;
  };

/**
 * The multi-select input component.
 *
 * @param props An object with the form field name, react-hook-form control,
 * and array of options to populate the select input with.
 *
 * @returns The multi-select component.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control } = useForm<FormValues>();
 *
 *   const categories = [
 *     { label: 'Fragrance Oil', value: 1 },
 *     { label: 'Wax', value: 2 }
 *   ]
 *
 *   return (
 *     <form>
 *       <CreateableMultiSelect
 *         control={control}
 *         name="categories"
 *         options={options}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */
export default function CreatableMultiSelect<TFormValues extends FieldValues>(
  props: MultiSelectProps<TFormValues>
) {
  const { label, name, control, error, options, onCreate } = props;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <CreatableSelect
            {...field}
            isMulti
            menuPlacement='auto'
            options={options}
            value={options.filter(o => field.value?.includes(o.value))}
            // value={options.find((c) => c.value === field.value)}
            onChange={(e) => field.onChange(e.map((c) => c.value))}
            onCreateOption={onCreate}
            styles={multiSelectStyles}
            components={multiSelectComponents}
          />
        )}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
