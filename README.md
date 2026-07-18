# 📊 table-demaker

A lightweight, faithful `DataTable` component for React, built on
[Chakra UI](https://chakra-ui.com) and [TanStack Table](https://tanstack.com/table).
It ships global filtering, client-side pagination and a loading state out of the
box, and stays fully re-themable by the consuming app.

## Features

- **Global filter** across all columns.
- **Client-side pagination** (10 rows per page).
- **Loading state** with skeleton rows.
- **Custom cells** via TanStack's `ColumnDef`.
- **Zero theme coupling** — renders stock Chakra components, re-themable through
  your own Chakra system or per-instance passthrough props.

## Installation

```bash
pnpm add table-demaker
```

`table-demaker` declares its rendering stack as peer dependencies, so install them
alongside (most apps already have them):

```bash
pnpm add @chakra-ui/react @emotion/react @tanstack/react-table react
```

| Peer dependency         | Version    |
| ----------------------- | ---------- |
| `@chakra-ui/react`      | `^3.28.0`  |
| `@emotion/react`        | `^11.14.0` |
| `@tanstack/react-table` | `^8.21.3`  |
| `react`                 | `^19.2.0`  |

## Usage

The component must render inside a Chakra provider (your app's `ChakraProvider`).

```tsx
import { DataTable, type ColumnDef } from "table-demaker";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];

const users: User[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@demaker.dev", role: "Admin" },
  { id: 2, name: "Alan Turing", email: "alan@demaker.dev", role: "Editor" },
];

export function Users() {
  return <DataTable data={users} columns={columns} />;
}
```

### Custom cells

Use TanStack's `cell` renderer for anything beyond plain text:

```tsx
const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge>{row.original.status}</Badge>,
  },
];
```

## Props

| Prop                    | Type                  | Default | Description                                            |
| ----------------------- | --------------------- | ------- | ------------------------------------------------------ |
| `data`                  | `TData[]`             | —       | Rows to render.                                        |
| `columns`               | `ColumnDef<TData>[]`  | —       | Column definitions (TanStack Table).                   |
| `loading`               | `boolean`             | `false` | Renders skeleton rows instead of data.                 |
| `tableProps`            | `TableRootProps`      | —       | Passthrough props for the Chakra `Table.Root`.         |
| `filterProps`           | `InputProps`          | —       | Passthrough props for the search `Input`.              |
| `paginationButtonProps` | `ButtonProps`         | —       | Passthrough props for both pagination buttons.         |

## Theming

`table-demaker` renders **stock Chakra components** and does not bundle any theme.
To restyle it, either theme `Input` / `Button` / `Table` in your own Chakra system
(every table in your app inherits it), or pass per-instance overrides through the
passthrough props:

```tsx
<DataTable
  data={users}
  columns={columns}
  filterProps={{ variant: "subtle" }}
  paginationButtonProps={{ variant: "outline", colorPalette: "teal" }}
/>
```

The passthrough props can override styling but never the internal wiring
(controlled filter value, pagination handlers).

## License

MIT © Pablo Gallina
