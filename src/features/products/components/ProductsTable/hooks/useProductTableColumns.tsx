import { CategoryTags } from '@/components/CategoryTags';
import { IndeterminateCheckbox } from '@/components/IndeterminateCheckbox';
import { type ProductGetAllOutputSingle } from '@/types';
import { getCostPerUnit, getStockUnitTextAbbrev } from '@/utils';
import { Text } from '@chakra-ui/react';
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
        accessorFn: (row) => row.batchSize,
        id: 'costPerUnit',
        header: 'Cost per unit',
        sortingFn: 'alphanumeric',
        cell: (info) => (
          <Text>{`$${getCostPerUnit(info.cell.row.original)}`}</Text>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.categories,
        id: 'categories',
        header: 'Categories',
        enableSorting: false,
        cell: (info) => (
          <CategoryTags
            categories={info.cell.row.original.categories}
            routePrefix='/products'
          />
        ),
        footer: (props) => props.column.id,
      },
    ],
    []
  );
}
