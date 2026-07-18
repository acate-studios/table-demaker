import { ButtonProps, Flex, Text } from "@chakra-ui/react";

import { Button } from "../ui/button";

interface PaginationControlsProps {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  buttonProps?: ButtonProps;
}

export const PaginationControls = ({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  buttonProps,
}: PaginationControlsProps) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" mt={4}>
      <Button
        {...buttonProps}
        onClick={previousPage}
        disabled={!canPreviousPage}
      >
        Anterior
      </Button>

      <Text fontSize="sm">
        Página {pageIndex + 1} de {pageCount}
      </Text>
      <Button {...buttonProps} onClick={nextPage} disabled={!canNextPage}>
        Siguiente
      </Button>
    </Flex>
  );
};
