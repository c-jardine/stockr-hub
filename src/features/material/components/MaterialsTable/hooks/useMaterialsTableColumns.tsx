import { CategoryTags } from '@/components/CategoryTags';
import { IndeterminateCheckbox } from '@/components/IndeterminateCheckbox';
import { type MaterialGetAllOutputSingle } from '@/types';
import { getStockUnitTextAbbrev } from '@/utils';
import { Text } from '@chakra-ui/react';
import { type ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { MaterialViewerDrawer } from '../../..';
import { EditMaterialStockPopover } from '../../EditMaterialStockPopover';

export default function useMaterialsTableColumns() {
  return React.useMemo<ColumnDef<MaterialGetAllOutputSingle>[]>(
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
        cell: (info) => <MaterialViewerDrawer {...info.cell.row.original} />,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.stockLevel.stock,
        id: 'stock',
        header: 'Stock',
        sortingFn: 'alphanumeric',
        cell: (info) => (
          <EditMaterialStockPopover {...info.cell.row.original} />
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
        accessorFn: (row) => row.costPerUnit,
        id: 'costPerUnit',
        header: 'Cost per unit',
        sortingFn: 'alphanumeric',
        cell: (info) => (
          <Text>
            ${Number(info.getValue())} /
            {info.cell.row.original.stockLevel.stockUnit.abbreviationSingular}
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
          <CategoryTags
            categories={info.cell.row.original.categories}
            routePrefix='/materials'
          />
        ),
        footer: (props) => props.column.id,
      },
    ],
    []
  );
}
