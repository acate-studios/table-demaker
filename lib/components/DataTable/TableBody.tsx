import { Skeleton, Table } from "@chakra-ui/react";
import { flexRender, Row } from "@tanstack/react-table";

interface TableBodyProps<TData extends object> {
  rows: Row<TData>[];
  loading?: boolean;
  columnsCount: number;
}

export const TableBody = <TData extends object>({
  rows,
  loading = false,
  columnsCount,
}: TableBodyProps<TData>) => {
  const renderSkeletonRow = (index: number) => (
    <Table.Row key={index}>
      {Array.from({ length: columnsCount }).map((_, cellIndex) => (
        <Table.Cell key={cellIndex}>
          <Skeleton boxSize="8" width="full" />
        </Table.Cell>
      ))}
    </Table.Row>
  );

  const renderDataRow = (row: Row<TData>) => (
    <Table.Row key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <Table.Cell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Table.Cell>
      ))}
    </Table.Row>
  );

  return (
    <Table.Body>
      {loading
        ? Array.from({ length: 10 }, (_, index) => renderSkeletonRow(index))
        : rows.map(renderDataRow)}
    </Table.Body>
  );
};
