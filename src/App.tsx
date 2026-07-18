import { Badge, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

import { type ColumnDef, DataTable } from "../lib";
import { Provider } from "../lib/components/ui/provider";

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
  {
    id: 4,
    name: "Linus Torvalds",
    email: "linus@demaker.dev",
    role: "Viewer",
    status: "active",
  },
  {
    id: 5,
    name: "Margaret Hamilton",
    email: "margaret@demaker.dev",
    role: "Admin",
    status: "inactive",
  },
];

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Rol" },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <Badge colorPalette={status === "active" ? "green" : "gray"}>
          {status === "active" ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },
];

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Provider>
      <Stack
        align="stretch"
        gap={8}
        maxW="1400px"
        mx="auto"
        py={10}
        px={{ base: 4, md: 8 }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          wrap="wrap"
          gap={4}
        >
          <Flex alignItems="center" gap={3}>
            <Heading size="2xl" fontWeight="bold">
              📊 Table deMaker
            </Heading>
            <Badge colorPalette="teal" size="lg" variant="subtle">
              Demo
            </Badge>
          </Flex>

          <Button onClick={() => setLoading((prev) => !prev)}>
            {loading ? "Mostrar datos" : "Simular carga"}
          </Button>
        </Flex>

        <Text fontSize="lg" color="gray.600">
          Filtro global, paginado y celdas custom — misma API que en acate-ui.
        </Text>

        <DataTable data={users} columns={columns} loading={loading} />
      </Stack>
    </Provider>
  );
}

export default App;
