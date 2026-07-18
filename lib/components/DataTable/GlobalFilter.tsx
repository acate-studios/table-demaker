import { Input } from "@chakra-ui/react";

interface GlobalFilterProps {
  filter: string;
  setFilter: (value: string) => void;
}

export const GlobalFilter = ({ filter, setFilter }: GlobalFilterProps) => {
  return (
    <Input
      variant="search"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Buscar..."
    />
  );
};
