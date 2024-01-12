import { selectStyles } from '@/styles';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  type FormControlProps,
} from '@chakra-ui/react';
import { CreatableSelect as ReactCreatableSelect } from 'chakra-react-select';
import {
  Controller,
  type FieldError,
  type FieldPath,
  type FieldValues,
  type Merge,
  type UseControllerProps,
} from 'react-hook-form';
import { selectComponents } from './components';
import { type Option } from './types';

// Generic typing for component to work with react-hook-form.
type SelectProps<TFormValues extends FieldValues> =
  UseControllerProps<TFormValues> &
    FormControlProps & {
      label: string;
      name: FieldPath<TFormValues>;
      options: Option[];
      error?: Merge<FieldError, FieldError>;
    } & {
      onCreate: (inputValue: string) => void;
    };

/**
 * The select input component.
 *
 * @param props An object with the form field name, react-hook-form control,
 * and array of options to populate the select input with.
 *
 * @returns The select component.
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
 *       <CreatableSelect
 *         control={control}
 *         name="categories"
 *         options={options}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */
export default function CreatableSelect<TFormValues extends FieldValues>(
  props: SelectProps<TFormValues>
) {
  const { label, name, control, error, options, onCreate, ...styles } = props;

  return (
    <FormControl isInvalid={!!error} {...styles}>
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ReactCreatableSelect
            {...field}
            menuPlacement='auto'
            options={options}
            value={options.find((c) => c.value === field.value)}
            onChange={(selected) => field.onChange(selected?.value)}
            styles={selectStyles}
            components={selectComponents}
            onCreateOption={onCreate}
          />
        )}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
