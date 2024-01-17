import {
  FormControl,
  FormLabel,
  Input,
  type BoxProps,
  type InputProps,
} from '@chakra-ui/react';

interface DisplayOnlyInputProps {
  isDisabled: boolean;
  label: string;
  value: InputProps['value'];
  styles?: BoxProps;
}

export default function DisplayOnlyInput({
  isDisabled = false,
  label,
  value,
  styles,
}: DisplayOnlyInputProps) {
  return (
    <FormControl isDisabled={isDisabled} {...styles}>
      <FormLabel>{label}</FormLabel>
      <Input value={value} />
    </FormControl>
  );
}
