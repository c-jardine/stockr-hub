import { type RouterOutputs } from '@/utils/api';
import {
  Box,
  Checkbox,
  Flex,
  Icon,
  IconButton,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  type CheckboxProps,
} from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';
import React from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'tabler-icons-react';
import { UpdateMaterial } from '.';

type MaterialsTableProps = {
  materials: RouterOutputs['material']['getAll'];
};

export default function MaterialsTable(props: MaterialsTableProps) {
  const { materials } = props;

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'name',
      desc: false,
    },
  ]);

  const columns = React.useMemo<
    ColumnDef<RouterOutputs['material']['getAll'][0]>[]
  >(
    () => [
      {
        id: 'select',
        enableResizing: false,
        enableSorting: false,
        size: 0,
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              isChecked: table.getIsAllRowsSelected(),
              isIndeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              isChecked: row.getIsSelected(),
              isDisabled: !row.getCanSelect(),
              isIndeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        accessorFn: (row) => row.itemDetails.name,
        id: 'name',
        header: 'Name',
        sortingFn: 'alphanumeric',
        cell: (info) => <UpdateMaterial {...info.cell.row.original} />,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.itemDetails.stock,
        id: 'stock',
        header: 'Stock',
        sortingFn: 'alphanumeric',
        cell: (info) => (
          <Text>
            {Number(info.getValue())}{' '}
            {Number(info.getValue()) === 1
              ? info.cell.row.original.itemDetails.stockUnit
                  .abbreviationSingular
              : info.cell.row.original.itemDetails.stockUnit.abbreviationPlural}
          </Text>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.itemDetails.minStock,
        id: 'minStock',
        header: 'Min. Stock',
        sortingFn: 'alphanumeric',
        cell: (info) => (
          <Text>
            {Number(info.getValue())}{' '}
            {Number(info.getValue()) === 1
              ? info.cell.row.original.itemDetails.stockUnit
                  .abbreviationSingular
              : info.cell.row.original.itemDetails.stockUnit.abbreviationPlural}
          </Text>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.itemDetails.costPerUnit,
        id: 'costPerUnit',
        header: 'Cost per unit',
        sortingFn: 'alphanumeric',
        cell: (info) => (
          <Text>
            ${Number(info.getValue())} /
            {info.cell.row.original.itemDetails.stockUnit.abbreviationSingular}
          </Text>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.vendor.name,
        id: 'vendor',
        header: 'Vendor',
        sortingFn: 'alphanumeric',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.categories,
        id: 'categories',
        header: 'Categories',
        enableSorting: false,
        cell: (info) => (
          <Flex>
            {info.cell.row.original.categories.map(({ category }) => (
              <Tag key={category.id} size='sm'>
                {category.name}
              </Tag>
            ))}
          </Flex>
        ),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const table = useReactTable({
    data: materials,
    columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: true,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      rowSelection,
    },
    initialState: {
      sorting: [
        {
          id: 'itemDetails.name',
          desc: false,
        },
      ],
    },
  });

  return (
    <>
      <TableContainer>
        <Table w={table.getTotalSize()}>
          <Thead
            color='slate.400'
            borderBottom='1px solid var(--chakra-colors-slate-200)'
          >
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  position='relative'
                  w={header.getSize()}
                  colSpan={header.colSpan}
                  py={0}
                >
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
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Text>

                    {/* Sorting indicator */}
                    <Box
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {{
                        asc: (
                          <Icon
                            as={ChevronUp}
                            boxSize={4}
                            strokeWidth={3}
                            p={0.5}
                            bg='slate.200'
                            color='slate.700'
                            rounded='md'
                            transition='150ms ease-in-out'
                            _groupHover={{ bg: 'slate.300' }}
                          />
                        ),
                        desc: (
                          <Icon
                            as={ChevronDown}
                            boxSize={4}
                            strokeWidth={3}
                            p={0.5}
                            bg='slate.200'
                            color='slate.700'
                            rounded='md'
                            transition='150ms ease-in-out'
                            _groupHover={{ bg: 'slate.300' }}
                          />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </Box>
                  </Flex>

                  {/* Column resizer */}
                  {header.column.getCanResize() && (
                    <Box
                      position='absolute'
                      role='group'
                      right={0}
                      top='50%'
                      rounded='lg'
                      bg={
                        header.column.getIsResizing()
                          ? 'slate.200'
                          : 'transparent'
                      }
                      transform='translateY(-50%)'
                      height={6}
                      p={1}
                      cursor='col-resize'
                      userSelect='none'
                      style={{
                        touchAction: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none',
                      }}
                      _hover={{
                        bg: 'slate.200',
                      }}
                      {...{
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                      }}
                    >
                      <Box
                        w='1px'
                        h='full'
                        bg={
                          header.column.getIsResizing()
                            ? 'slate.800'
                            : 'slate.300'
                        }
                        _groupHover={{ bg: 'slate.800' }}
                      />
                    </Box>
                  )}
                </Th>
              ))
            )}
          </Thead>

          <Tbody fontSize='sm'>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination buttons */}
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
    </>
  );
}

function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & CheckboxProps) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <Checkbox ref={ref} {...rest} />;
}
