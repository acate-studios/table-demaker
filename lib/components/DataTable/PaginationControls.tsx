import { Flex, Text } from "@chakra-ui/react";

import { Button } from "../ui/button";

interface PaginationControlsProps {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
}

export const PaginationControls = ({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
}: PaginationControlsProps) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" mt={4}>
      <Button
        onClick={previousPage}
        disabled={!canPreviousPage}
        variant="social"
      >
        Anterior
      </Button>

      <Text fontSize="sm">
        Página {pageIndex + 1} de {pageCount}
      </Text>
      <Button onClick={nextPage} disabled={!canNextPage} variant="social">
        Siguiente
      </Button>
    </Flex>
  );
};
