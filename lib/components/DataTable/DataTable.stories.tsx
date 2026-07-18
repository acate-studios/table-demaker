import { Badge } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const users: User[] = [
  {
    id: 1,
    name: "Ada Lovelace",
    email: "ada@demaker.dev",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Alan Turing",
    email: "alan@demaker.dev",
    role: "Editor",
    status: "active",
  },
  {
    id: 3,
    name: "Grace Hopper",
    email: "grace@demaker.dev",
    role: "Editor",
    status: "inactive",
  },
];

const manyUsers: User[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@demaker.dev`,
  role: i % 2 === 0 ? "Admin" : "Editor",
  status: i % 3 === 0 ? "inactive" : "active",
}));

const baseColumns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];

const columnsWithCustomCell: ColumnDef<User>[] = [
  ...baseColumns,
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <Badge colorPalette={status === "active" ? "green" : "gray"}>
          {status === "active" ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
];

// Instantiate the generic component for User so Storybook infers concrete args.
const UserDataTable = DataTable<User>;

const meta = {
  title: "Components/DataTable",
  component: UserDataTable,
} satisfies Meta<typeof UserDataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { data: users, columns: baseColumns },
};

export const CustomCell: Story = {
  args: { data: users, columns: columnsWithCustomCell },
};

export const Loading: Story = {
  args: { data: users, columns: baseColumns, loading: true },
};

export const Pagination: Story = {
  args: { data: manyUsers, columns: columnsWithCustomCell },
};
