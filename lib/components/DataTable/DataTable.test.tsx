import "@testing-library/jest-dom/vitest";

import { ColumnDef } from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Provider } from "../ui/provider";
import { DataTable, type DataTableProps } from "./DataTable";

interface Row {
  id: number;
  name: string;
  role: string;
}

const columns: ColumnDef<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
];

const makeData = (count: number): Row[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    role: i % 2 === 0 ? "Admin" : "Editor",
  }));

const renderTable = (props: Partial<DataTableProps<Row>>) =>
  render(
    <Provider>
      <DataTable data={makeData(3)} columns={columns} {...props} />
    </Provider>,
  );

describe("DataTable", () => {
  it("renders column headers and data rows", () => {
    renderTable({ data: makeData(3) });

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 3")).toBeInTheDocument();
  });

  it("paginates when there are more than 10 rows", async () => {
    renderTable({ data: makeData(12) });

    expect(screen.getByText(/Página 1 de 2/)).toBeInTheDocument();
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.queryByText("User 11")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Anterior" })).toBeDisabled();

    await userEvent.click(screen.getByRole("button", { name: "Siguiente" }));

    expect(screen.getByText(/Página 2 de 2/)).toBeInTheDocument();
    expect(screen.getByText("User 11")).toBeInTheDocument();
    expect(screen.queryByText("User 1")).not.toBeInTheDocument();
  });

  it("filters rows through the global filter", async () => {
    const data: Row[] = [
      { id: 1, name: "Ada", role: "Admin" },
      { id: 2, name: "Alan", role: "Editor" },
      { id: 3, name: "Grace", role: "Viewer" },
    ];
    renderTable({ data });

    await userEvent.type(screen.getByPlaceholderText("Buscar..."), "Ada");

    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.queryByText("Alan")).not.toBeInTheDocument();
    expect(screen.queryByText("Grace")).not.toBeInTheDocument();
  });

  it("renders skeletons instead of data while loading", () => {
    renderTable({ data: makeData(3), loading: true });

    expect(screen.queryByText("User 1")).not.toBeInTheDocument();
  });
});
