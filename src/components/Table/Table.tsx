import {
  Table as ChakraTable,
  Flex,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  flexRender,
  type Header,
  type Table as TanStackTable,
} from '@tanstack/react-table';
import { ColumnResizer } from '../ColumnResizer';
import { PaginationButtons } from '../Pagination';
import { SortingIndicator } from '../SortingIndicator';

export type TableProps<T> = TanStackTable<T>;
export type TableRowProps<T> = TanStackTable<T>;

export default function Table<T>(table: TableProps<T>) {
  // Helper function for rendering table rows.
  function renderTableRow({ getRowModel }: TableRowProps<T>) {
    return (
      <>
        {getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </>
    );
  }

  function renderHeaderContent(header: Header<T, unknown>) {
    return (
      <Flex
        role='group'
        justifyContent='space-between'
        alignItems='center'
        py={2}
        gap={4}
        cursor='pointer'
        {...{
          onClick: header.column.getToggleSortingHandler(),
        }}
      >
        <Text>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </Text>

        {/* Sorting indicator */}
        <SortingIndicator {...header.column} />
      </Flex>
    );
  }

  return (
    <>
      <TableContainer>
        <ChakraTable w={table.getTotalSize()}>
          <Thead
            color='slate.400'
            borderBottom='1px solid var(--chakra-colors-slate-200)'
          >
            <Tr>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    position='relative'
                    w={header.getSize()}
                    colSpan={header.colSpan}
                    py={0}
                  >
                    {renderHeaderContent(header)}

                    {/* Column resizer */}
                    {header.column.getCanResize() && (
                      <ColumnResizer {...header} />
                    )}
                  </Th>
                ))
              )}
            </Tr>
          </Thead>

          <Tbody fontSize='sm'>{renderTableRow(table)}</Tbody>
        </ChakraTable>
      </TableContainer>

      {/* Pagination buttons */}
      {table.getPageCount() > 1 && <PaginationButtons {...table} />}
    </>
  );
}
