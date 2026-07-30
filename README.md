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
- 🔎 **URL filters**: optional [`table-demaker/query-filters`](#-table-demakerquery-filters) entry point for filters synced to the query string

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

## 🔎 `table-demaker/query-filters`

A separate entry point that ships `QueryFilters`: a filter bar whose state lives in the **URL query string**, so a filtered view is shareable, bookmarkable and survives a reload. It is built on [nuqs](https://nuqs.dev) for the URL state and [form-demaker](https://www.npmjs.com/package/form-demaker) for the form.

```tsx
import { QueryFilters } from "table-demaker/query-filters";
```

### Extra peer dependencies

On top of the ones above, this entry point needs:

```bash
npm install nuqs form-demaker react-hook-form @hookform/resolvers zod
```

| Peer dependency       | Version   |
| --------------------- | --------- |
| `nuqs`                | `^2.9.0`  |
| `form-demaker`        | `^1.2.0`  |
| `react-hook-form`     | `^7.65.0` |
| `@hookform/resolvers` | `^5.2.2`  |
| `zod`                 | `^4.1.12` |

### Wiring the nuqs adapter

`QueryFilters` reads and writes the URL through nuqs, which requires **an adapter for your router, mounted once at the app root**. Without it the component throws. Pick the adapter that matches your stack ([full list](https://nuqs.dev/docs/adapters)):

```tsx
// React SPA (Vite)
import { NuqsAdapter } from "nuqs/adapters/react";

export function App() {
  return (
    <NuqsAdapter>
      <ChakraProvider value={system}>
        <Users />
      </ChakraProvider>
    </NuqsAdapter>
  );
}
```

For Next.js App Router use `nuqs/adapters/next/app` (wrap `{children}` in the root layout); for React Router v7, `nuqs/adapters/react-router/v7`.

### Quick start

`inputs` is the only required prop: it declares the filterable fields, and each field's `name` becomes the query param it writes to.

```tsx
import { type AdaptiveInputProps } from "form-demaker";
import { QueryFilters } from "table-demaker/query-filters";

const inputs: AdaptiveInputProps[] = [
  {
    inputType: "text",
    name: "Name",
    label: "Name",
    inputProps: { placeholder: "Enter a name" },
  },
  {
    inputType: "number",
    name: "DPI",
    label: "DPI",
    inputProps: { placeholder: "Enter a DPI" },
  },
];

export function Users() {
  return <QueryFilters title="Users" dataCount={12} inputs={inputs} />;
}
```

Applying the `Name` filter yields `?Name=Ada`; removing it drops the key from the URL. Read the values back anywhere with nuqs (`useQueryState("Name")`) and feed them to your fetch or to `<DataTable />`.

### `<QueryFilters />`

Extends Chakra's `FlexProps`, so layout props (`gap`, `mb`, `width`…) pass straight through to the root `Flex`.

| Prop        | Type                                                        | Description                                                              | Default |
| ----------- | ----------------------------------------------------------- | ------------------------------------------------------------------------ | ------- |
| `inputs`    | `AdaptiveInputProps[]`                                      | **Required.** Filterable fields; each `name` maps to one query param      | -       |
| `title`     | `string`                                                    | Heading next to the filter menu                                          | -       |
| `dataCount` | `number`                                                    | Result count rendered beside the title                                   | -       |
| `icons`     | `{ filter?, applied?, remove? }`                            | Replace the default icons with your own nodes                            | -       |
| `textColor` | `{ title?, subtitle? }`                                     | Optional color override for the title and the secondary text             | -       |
| `iconColor` | `{ filter?, applied?, remove? }`                            | Optional color override for the **default** icons only                   | -       |

### Colors and icons

The library imposes **no color and no token** — text and icons inherit the foreground of your Chakra provider via `currentColor`, and secondary text is dimmed with `opacity`, not a gray. So the normal usage is **zero color props**.

`textColor` and `iconColor` are an escape hatch for one-off overrides. `iconColor` only tints the built-in icons; if you replace an icon through `icons`, that node owns its own color and the matching `iconColor` slot is ignored.

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
