import { colors } from '@/styles/theme/colors';
import {
  Box,
  Center,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  useDisclosure,
  useRadio,
  useRadioGroup,
  type BoxProps,
  type UseRadioProps,
} from '@chakra-ui/react';
import { useController, useFormContext, type Path } from 'react-hook-form';

interface ColorPickerProps<TFormValues> {
  name: Path<TFormValues>;
}

export default function ColorPicker<
  TFormValues extends Record<string, string>
>({ name }: ColorPickerProps<TFormValues>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useFormContext<TFormValues>();

  function Swatch({
    bg,
    isSelected,
    ...props
  }: Omit<BoxProps, 'name' | 'bg'> & {
    bg: string;
    isSelected?: boolean;
  }) {
    return (
      <Box
        cursor='pointer'
        rounded='full'
        bg={bg}
        boxSize={8}
        outline='2px solid'
        outlineColor='white'
        outlineOffset={isSelected ? -4 : -2}
        transition='150ms ease-in-out'
        _hover={{
          outlineOffset: -4,
        }}
        _checked={{
          outlineOffset: -4,
        }}
        {...props}
      />
    );
  }

  function ColorInput(props: UseRadioProps) {
    const { getInputProps, getRadioProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getRadioProps();

    return (
      <Box as='label'>
        <input {...input} />
        <Swatch {...checkbox} bg={props.value ?? '#cbd5e1'} />
      </Box>
    );
  }

  function ColorList() {
    const { field } = useController({
      name,
      control: form.control,
    });

    // Custom change handler so popover closes after selection.
    function handleChange(value: string) {
      field.onChange(value);
      onClose();
    }

    const { getRootProps, getRadioProps } = useRadioGroup({
      ...field,
      onChange: handleChange,
    });
    const group = getRootProps();

    return (
      <SimpleGrid columns={5} gap={2} {...group}>
        {Object.entries(colors)
          .filter(
            ([key]) =>
              key !== 'black' &&
              key !== 'gray' &&
              key !== 'zinc' &&
              key !== 'neutral' &&
              key !== 'stone' &&
              key !== 'amber' &&
              key !== 'lime' &&
              key !== 'emerald' &&
              key !== 'teal' &&
              key !== 'sky' &&
              key !== 'blue'
          )
          .flatMap(([, color]) =>
            ['300']
              .map((key) => color[key as keyof typeof color])
              .filter(Boolean)
          )
          .map((color) => {
            const radio = getRadioProps({ value: color });
            return <ColorInput key={color} {...radio} />;
          })}
      </SimpleGrid>
    );
  }

  return (
    <Popover {...{ isOpen, onClose }} placement='right'>
      <PopoverTrigger>
        <Center boxSize={10} onClick={onOpen}>
          <Swatch bg={form.watch(name)} isSelected={isOpen} />
        </Center>
      </PopoverTrigger>
      <PopoverContent maxW={64} shadow='xl'>
        <PopoverArrow />
        <PopoverBody>
          <ColorList />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
