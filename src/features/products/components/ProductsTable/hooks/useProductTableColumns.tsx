import { CategoryTags } from "@/components/CategoryTags";
import { IndeterminateCheckbox } from "@/components/IndeterminateCheckbox";
import { ProductContext } from "@/features/products/contexts";
import { type ProductGetAllOutputSingle } from "@/types";
import {
  formatCurrency,
  getCostPerUnit,
  getStockUnitTextAbbrev,
} from "@/utils";
import { Text } from "@chakra-ui/react";
import { type ColumnDef } from "@tanstack/react-table";
import React from "react";
import { EditProductStockPopover, ProductViewerDrawer } from "../../..";

export default function useProductTableColumns() {
  return React.useMemo<ColumnDef<ProductGetAllOutputSingle>[]>(
    () => [
      {
        id: "select",
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
        id: "name",
        header: "Name",
        sortingFn: "alphanumeric",
        cell: (info) => (
          <ProductContext.Provider value={info.cell.row.original}>
            <ProductViewerDrawer />
          </ProductContext.Provider>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.stockLevel.stock,
        id: "stock",
        header: "Stock",
        sortingFn: "alphanumeric",
        cell: (info) => (
          <ProductContext.Provider value={info.cell.row.original}>
            <EditProductStockPopover />
          </ProductContext.Provider>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.stockLevel.minStock,
        id: "minStock",
        header: "Min. Stock",
        sortingFn: "alphanumeric",
        cell: (info) => {
          const { stockUnit } = info.cell.row.original.stockLevel;

          const value = Number(info.getValue());
          const unit = getStockUnitTextAbbrev(value, stockUnit);

          return <Text>{value ? `${value} ${unit}.` : "—"}</Text>;
        },
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.batchSize,
        id: "batchSize",
        header: "Batch size",
        sortingFn: "alphanumeric",
        cell: (info) => {
          const { stockUnit } = info.cell.row.original.stockLevel;

          const value = Number(info.getValue());
          const unit = getStockUnitTextAbbrev(value, stockUnit);

          return <Text>{value ? `${value} ${unit}.` : "—"}</Text>;
        },
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.batchSize,
        id: "costPerUnit",
        header: "Cost per unit",
        sortingFn: "alphanumeric",
        cell: (info) => {
          const { stockUnit } = info.cell.row.original.stockLevel;

          const value = formatCurrency(getCostPerUnit(info.cell.row.original));
          const unit = getStockUnitTextAbbrev(1, stockUnit);

          return (
            <Text>
              {value} /{unit}.
            </Text>
          );
        },
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.categories,
        id: "categories",
        header: "Categories",
        enableSorting: false,
        cell: (info) => (
          <CategoryTags
            categories={info.cell.row.original.categories}
            routePrefix="/products"
          />
        ),
        footer: (props) => props.column.id,
      },
    ],
    []
  );
}
