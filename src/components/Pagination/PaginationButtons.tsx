import { Flex, Icon, IconButton } from '@chakra-ui/react';
import { type Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';

export type PaginationButtonsProps<T> = Table<T>;

export default function PaginationButtons<T>(table: PaginationButtonsProps<T>) {
  return (
    <Flex mt={4} gap={2} justifyContent='center'>
      <IconButton
        icon={<Icon as={ChevronLeft} />}
        aria-label='Previous page'
        size='sm'
        onClick={() => table.previousPage()}
        isDisabled={!table.getCanPreviousPage()}
      />
      <IconButton
        icon={<Icon as={ChevronRight} />}
        aria-label='Next page'
        size='sm'
        onClick={() => table.nextPage()}
        isDisabled={!table.getCanNextPage()}
      />
    </Flex>
  );
}
