import { Table } from "@chakra-ui/react";
import { flexRender, HeaderGroup } from "@tanstack/react-table";

interface TableHeaderProps<TData extends object> {
  headerGroups: HeaderGroup<TData>[];
}

export const TableHeader = <TData extends object>({
  headerGroups,
}: TableHeaderProps<TData>) => {
  return (
    <Table.Header>
      {headerGroups.map((headerGroup) => (
        <Table.Row key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <Table.ColumnHeader key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      ))}
    </Table.Header>
  );
};
