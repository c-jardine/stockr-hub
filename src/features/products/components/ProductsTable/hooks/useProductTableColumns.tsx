import { IndeterminateCheckbox } from '@/components/IndeterminateCheckbox';
import { type ProductGetAllOutputSingle } from '@/types';
import { getStockUnitTextAbbrev } from '@/utils';
import { Flex, Tag, Text } from '@chakra-ui/react';
import { type ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { ProductViewerDrawer } from '../../..';

export default function useProductTableColumns() {
  return React.useMemo<ColumnDef<ProductGetAllOutputSingle>[]>(
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
        accessorFn: (row) => row.name,
        id: 'name',
        header: 'Name',
        sortingFn: 'alphanumeric',
        cell: (info) => <ProductViewerDrawer {...info.cell.row.original} />,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.stockLevel.stock,
        id: 'stock',
        header: 'Stock',
        sortingFn: 'alphanumeric',
        cell: (info) => (
          <Text>
            {Number(info.getValue())}{' '}
            {getStockUnitTextAbbrev(
              Number(info.getValue()),
              info.cell.row.original.stockLevel.stockUnit
            )}
          </Text>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.stockLevel.minStock,
        id: 'minStock',
        header: 'Min. Stock',
        sortingFn: 'alphanumeric',
        cell: (info) => (
          <Text>
            {info.getValue()
              ? `${Number(info.getValue())} ${getStockUnitTextAbbrev(
                  Number(info.getValue()),
                  info.cell.row.original.stockLevel.stockUnit
                )}`
              : '-'}
          </Text>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.batchSize,
        id: 'batchSize',
        header: 'Batch size',
        sortingFn: 'alphanumeric',
        cell: (info) => <Text>{Number(info.getValue())}</Text>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.categories,
        id: 'categories',
        header: 'Categories',
        enableSorting: false,
        cell: (info) => (
          <Flex gap={2}>
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
}