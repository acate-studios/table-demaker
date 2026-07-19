import { Badge, Flex, IconButton } from "@chakra-ui/react";
import { ReactNode } from "react";

import { useColorModeHex } from "@/hooks/useColorMode";

import { useQueryFilters } from "../store/queryFilters.store";

interface QueryFiltersAppliedProps {
  appliedIcon: ReactNode;
  removeIcon: ReactNode;
}

export const QueryFiltersApplied = ({
  appliedIcon,
  removeIcon,
}: QueryFiltersAppliedProps) => {
  const { white, colorText } = useColorModeHex();
  const { queryFilters, deleteQueryFilter } = useQueryFilters();

  return (
    <Flex gap={2} alignItems="center">
      {appliedIcon}

      {queryFilters.map((filter, index) => (
        <Badge variant="secondary" key={index} pl={4}>
          {filter.name}: {filter.value}
          <IconButton
            aria-label="Close"
            size="xs"
            variant="small"
            ml={2}
            onClick={() => deleteQueryFilter(index)}
          >
            {removeIcon}
          </IconButton>
        </Badge>
      ))}
    </Flex>
  );
};
