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

// Define a type for the form props
type FormProps<TFormValues extends FieldValues> = {
  name: FieldPath<TFormValues>;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  error?: FieldError;
};

// Define a type for additional props
type AdditionalProps = {
  label?: string;
  isUpdating?: boolean;
};

// Define the InputProps type using intersection types
type InputProps<TFormValues extends FieldValues> = FormProps<TFormValues> &
  AdditionalProps &
  Omit<ChakraInputProps, 'name'>;

export default function NumberInput<TFormValues extends FieldValues>(
  props: InputProps<TFormValues>
) {
  const { label, name, register, rules, error, ...styles } = props;

  return (
    <FormControl isInvalid={!!error} {...styles}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraNumberInput>
        {styles.isDisabled ? (
          <NumberInputField name={name} value={props.value} fontSize='sm' />
        ) : (
          <NumberInputField {...register(name, rules)} fontSize='sm' />
        )}
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
