import {
  Input as ChakraInput,
  FormControl,
  FormErrorMessage,
  FormLabel,
  type InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import {
  type FieldError,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
  type UseFormRegister,
} from 'react-hook-form';

type InputProps<TFormValues extends FieldValues> = {
  name: FieldPath<TFormValues>;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  error?: FieldError;
} & { label: string } & Omit<ChakraInputProps, 'name'>;

export default function Input<TFormValues extends FieldValues>(
  props: InputProps<TFormValues>
) {
  const { label, name, register, rules, error, ...styles } = props;

  return (
    <FormControl isInvalid={!!error} {...styles}>
      <FormLabel>{label}</FormLabel>
      <ChakraInput {...register(name, rules)} py={5} />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
