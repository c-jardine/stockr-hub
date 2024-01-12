import {
  NumberInput as ChakraNumberInput,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  type InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import {
  type FieldError,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
  type UseFormRegister,
} from 'react-hook-form';
import { ChevronDown, ChevronUp } from 'tabler-icons-react';

type InputProps<TFormValues extends FieldValues> = {
  name: FieldPath<TFormValues>;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  error?: FieldError;
} & { label: string } & Omit<ChakraInputProps, 'name'>;

export default function NumberInput<TFormValues extends FieldValues>(
  props: InputProps<TFormValues>
) {
  const { label, name, register, rules, error, ...styles } = props;

  return (
    <FormControl isInvalid={!!error} {...styles}>
      <FormLabel>{label}</FormLabel>
      <ChakraNumberInput>
        <NumberInputField {...register(name, rules)} />
        <NumberInputStepper>
          <NumberIncrementStepper>
            <Icon as={ChevronUp} />
          </NumberIncrementStepper>
          <NumberDecrementStepper>
            <Icon as={ChevronDown} />
          </NumberDecrementStepper>
        </NumberInputStepper>
      </ChakraNumberInput>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
