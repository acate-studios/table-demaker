import {
  ButtonProps,
  InputProps,
  Table,
  TableRootProps,
} from "@chakra-ui/react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { GlobalFilter } from "./GlobalFilter";
import { PaginationControls } from "./PaginationControls";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

export interface DataTableProps<TData extends object> {
  data: TData[];
  columns: ColumnDef<TData>[];
  tableProps?: TableRootProps;
  loading?: boolean;
  filterProps?: InputProps;
  paginationButtonProps?: ButtonProps;
}

export const DataTable = <TData extends object>({
  data,
  columns,
  tableProps,
  loading = false,
  filterProps,
  paginationButtonProps,
}: DataTableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const columnsCount = table.getHeaderGroups()[0]?.headers.length ?? 0;

  return (
    <div>
      {/* Filtro Global */}
      <GlobalFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
        inputProps={filterProps}
      />

      {/* Tabla */}
      <Table.Root {...tableProps}>
        <TableHeader headerGroups={table.getHeaderGroups()} />
        <TableBody
          rows={table.getRowModel().rows}
          loading={loading}
          columnsCount={columnsCount}
        />
      </Table.Root>

      {/* Paginado */}
      <PaginationControls
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        previousPage={() => table.previousPage()}
        nextPage={() => table.nextPage()}
        buttonProps={paginationButtonProps}
      />
    </div>
  );
};
