import { Input, InputProps } from "@chakra-ui/react";

interface GlobalFilterProps {
  filter: string;
  setFilter: (value: string) => void;
  inputProps?: InputProps;
}

export const GlobalFilter = ({
  filter,
  setFilter,
  inputProps,
}: GlobalFilterProps) => {
  return (
    <Input
      placeholder="Buscar..."
      {...inputProps}
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};
