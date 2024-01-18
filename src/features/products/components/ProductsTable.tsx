import { Table } from '@/components/Table';
import { type ProductGetAllOutput } from '@/types';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';
import React from 'react';
import { useProductTableColumns } from '../hooks';

type ProductsTableProps = {
  products: ProductGetAllOutput;
};

export default function ProductsTable(props: ProductsTableProps) {
  const { products } = props;
  const columns = useProductTableColumns();

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'name',
      desc: false,
    },
  ]);

  const table = useReactTable({
    data: products,
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
          id: 'name',
          desc: false,
        },
      ],
    },
  });

  return <Table {...table} />;
}
