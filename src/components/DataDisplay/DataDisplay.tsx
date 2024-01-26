import { Stack, Text } from '@chakra-ui/react';

export default function DataDisplay({
  label,
  value,
  isHighlighted = false,
}: {
  label: string;
  value: string;
  isHighlighted?: boolean;
}) {
  return (
    <Stack spacing={0}>
      <Text color='slate.500' fontSize='sm'>
        {label}
      </Text>
      <Text
        fontSize='sm'
        fontWeight={isHighlighted ? 'semibold' : '500'}
        color={isHighlighted ? 'red.500' : 'unset'}
      >
        {value}
      </Text>
    </Stack>
  );
}
