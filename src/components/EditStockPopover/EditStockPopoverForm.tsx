import { selectStyles } from '@/styles';
import { getStockUnitTextAbbrev } from '@/utils';
import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { type StockLevel, type StockUnit } from '@prisma/client';
import { Select } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { ArrowRight } from 'tabler-icons-react';
import { type Option } from '../Select';
import { selectComponents } from '../Select/components';

interface EditStockPopoverFormProps {
  stockLevel: StockLevel & { stockUnit: StockUnit };
  logTypeOptions: Option[];
  getUpdatedStock: () => number;
}

export default function EditStockPopoverForm({
  logTypeOptions,
  getUpdatedStock,
  ...item
}: EditStockPopoverFormProps) {
  const form = useFormContext();

  return (
    <Stack>
      <FormControl>
        <FormLabel>Type</FormLabel>
        <Controller
          control={form.control}
          name='changeTypeId'
          render={({ field }) => (
            <Select
              {...field}
              menuPlacement='auto'
              options={logTypeOptions}
              value={logTypeOptions?.find(
                (option) => option.value === field.value
              )}
              onChange={(data) => {
                if (data) {
                  field.onChange(data.value);
                  form.setValue('changeTypeId', data.value);
                }
              }}
              chakraStyles={selectStyles}
              components={selectComponents}
            />
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Quantity</FormLabel>
        <InputGroup>
          <NumberInput>
            <NumberInputField roundedRight='none'
              {...form.register('quantityChange', { valueAsNumber: true })}
            />
          </NumberInput>
          <InputRightAddon fontSize='sm'>
            {getStockUnitTextAbbrev(
              Number(item.stockLevel.stock),
              item.stockLevel.stockUnit
            )}
            .
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <Flex alignItems='center' gap={2}>
        <Text>
          {Number(item.stockLevel.stock)}{' '}
          {getStockUnitTextAbbrev(
            Number(item.stockLevel.stock),
            item.stockLevel.stockUnit
          )}
          .
        </Text>
        <Icon as={ArrowRight} strokeWidth={3} color='slate.500' />
        <Text fontWeight='semibold'>
          {getUpdatedStock()}{' '}
          {getStockUnitTextAbbrev(
            Number(item.stockLevel.stock),
            item.stockLevel.stockUnit
          )}
          .
        </Text>
      </Flex>
      <FormControl>
        <FormLabel>Notes</FormLabel>
        <Textarea {...form.register('notes')} />
      </FormControl>
    </Stack>
  );
}
