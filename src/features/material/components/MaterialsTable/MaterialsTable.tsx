import { Table } from '@/components/Table';
import { type MaterialGetAllOutput } from '@/types';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';
import React from 'react';
import { DeleteMaterialRows } from '../DeleteMaterialRows';
import { useMaterialsTableColumns } from './hooks';

type MaterialsTableProps = {
  materials: MaterialGetAllOutput;
};

export default function MaterialsTable(props: MaterialsTableProps) {
  const { materials } = props;
  const columns = useMaterialsTableColumns();

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'name',
      desc: false,
    },
  ]);

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
          id: 'name',
          desc: false,
        },
      ],
    },
  });

  return (
    <>
      <Table {...table} />
      <DeleteMaterialRows {...{ materials, rowSelection, setRowSelection }} />
    </>
  );
}
