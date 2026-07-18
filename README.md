![table-demaker](https://raw.githubusercontent.com/acate-studios/table-demaker/main/table-demaker-banner.webp)

# 📊 table-demaker

A modern, faithful `DataTable` component for React, built on TanStack Table and styled with Chakra UI. Global filtering, client-side pagination and a loading state out of the box — fully re-themable by the consuming app.

[![npm](https://img.shields.io/npm/v/table-demaker.svg)](https://www.npmjs.com/package/table-demaker)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-19.2.0-61dafb.svg)](https://reactjs.org/)

---

## 📋 Description

**table-demaker** is a lightweight table component for React that wraps the power of [TanStack Table](https://tanstack.com/table) in ready-to-use [Chakra UI](https://chakra-ui.com) markup. Pass your columns and data, and get a filtered, paginated, accessible table — without shipping any theme of its own.

### ✨ Key features

- 🔍 **Global filter**: search across all columns out of the box
- 📄 **Pagination**: client-side pagination (10 rows per page)
- ⏳ **Loading state**: skeleton rows while data is fetching
- 🎨 **Chakra UI**: stock components, re-themable by the consumer
- 🧩 **Custom cells**: full power of TanStack's `ColumnDef`
- 🔧 **TypeScript**: fully typed and generic over your row type
- 🧪 **Tested**: ships with a Vitest suite

---

## 🚀 Requirements

- **Node.js**: v24 or higher
- **Package manager**: npm, yarn or pnpm

---

## 📦 Installation

```bash
# npm
npm install table-demaker

# yarn
yarn add table-demaker

# pnpm
pnpm add table-demaker
```

### Peer Dependencies

The library expects the following dependencies to be installed in your project (most apps already have them):

```bash
npm install react @chakra-ui/react @emotion/react @tanstack/react-table
```

| Peer dependency         | Version    |
| ----------------------- | ---------- |
| `@chakra-ui/react`      | `^3.28.0`  |
| `@emotion/react`        | `^11.14.0` |
| `@tanstack/react-table` | `^8.21.3`  |
| `react`                 | `^19.2.0`  |

---

## 🎯 Quick start

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

---

## 📚 Main API

### `<DataTable />`

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `data` | `TData[]` | Rows to render | - |
| `columns` | `ColumnDef<TData>[]` | Column definitions (TanStack Table) | - |
| `loading` | `boolean` | Renders skeleton rows instead of data | `false` |
| `tableProps` | `TableRootProps` | Passthrough props for the Chakra `Table.Root` | - |
| `filterProps` | `InputProps` | Passthrough props for the search `Input` | - |
| `paginationButtonProps` | `ButtonProps` | Passthrough props for both pagination buttons | - |

---

## 🧩 Custom cells

Use TanStack's `cell` renderer for anything beyond plain text:

```tsx
import { Badge } from "@chakra-ui/react";
import { DataTable, type ColumnDef } from "table-demaker";

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge colorPalette={row.original.status === "active" ? "green" : "gray"}>
        {row.original.status}
      </Badge>
    ),
  },
];
```

---

## 🎨 Theming

`table-demaker` renders **stock Chakra components** and does not bundle any theme. To restyle it, either theme `Input` / `Button` / `Table` in your own Chakra system (every table in your app inherits it), or pass per-instance overrides through the passthrough props:

```tsx
<DataTable
  data={users}
  columns={columns}
  filterProps={{ variant: "subtle" }}
  paginationButtonProps={{ variant: "outline", colorPalette: "teal" }}
/>
```

The passthrough props can override styling but never the internal wiring (controlled filter value, pagination handlers).

---

## 🤝 Contributing

Contributions are welcome! If you want to collaborate:

1. **Fork** the repository
2. Create a **branch** for your feature (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

### Contribution guidelines

- Make sure lint, tests and the type-check pass before opening a PR
- Follow the project's code conventions (ESLint)
- Document significant changes in the PR
- Add tests for new functionality

---

## 📝 License

This project is licensed under the **MIT** license. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Pablo Gallina**

---

## 🔗 Useful links

- [npm package](https://www.npmjs.com/package/table-demaker)
- [TanStack Table docs](https://tanstack.com/table)
- [Chakra UI docs](https://chakra-ui.com/)

---

<div align="center">
  Made with 💚 and 📊 by the Acate Studios team
</div>
