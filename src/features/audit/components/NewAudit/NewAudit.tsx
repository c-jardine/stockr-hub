import { selectComponents } from '@/components/Select/components';
import { selectStyles } from '@/styles';
import { Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Controller } from 'react-hook-form';
import { useNewAuditForm } from './hooks';

export default function NewAudit() {
  const {
    form: { control, setValue, handleSubmit },
    auditTypeOptions,
    categoryOptions,
    onSubmit,
  } = useNewAuditForm();

  return (
    <Stack as='form' id='new-audit-form' onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Type</FormLabel>
        <Controller
          control={control}
          name='type'
          render={({ field }) => (
            <Select
              {...field}
              value={auditTypeOptions?.find(
                (option) => option.value === field.value
              )}
              onChange={(data) => {
                if (data) {
                  field.onChange(data.value);
                  setValue('type', data.value);
                }
              }}
              options={auditTypeOptions}
              chakraStyles={selectStyles}
              components={selectComponents}
            />
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Controller
          control={control}
          name='category'
          render={({ field }) => (
            <Select
              {...field}
              value={categoryOptions.find(
                (option) => option.value === field.value
              )}
              onChange={(data) => {
                if (data) {
                  field.onChange(data.value);
                  setValue('category', data.value);
                }
              }}
              options={categoryOptions}
              chakraStyles={selectStyles}
              components={selectComponents}
            />
          )}
        />
      </FormControl>

      <Flex mt={4} gap={4} justifyContent='flex-end'>
        <Button variant='outline'>Cancel</Button>
        <Button type='submit' form='new-audit-form'>
          Create audit
        </Button>
      </Flex>
    </Stack>
  );
}
