import { Badge, Flex, IconButton } from "@chakra-ui/react";
import { ReactNode } from "react";

import { useQueryFilters } from "../store/queryFilters.store";

interface QueryFiltersAppliedProps {
  names: string[];
  appliedIcon: ReactNode;
  removeIcon: ReactNode;
}

export const QueryFiltersApplied = ({
  names,
  appliedIcon,
  removeIcon,
}: QueryFiltersAppliedProps) => {
  const { queryFilters, deleteQueryFilter } = useQueryFilters(names);

  return (
    <Flex gap={2} alignItems="center">
      {appliedIcon}

      {queryFilters.map((filter, index) => (
        <Badge variant="subtle" key={index} pl={4}>
          {filter.name}: {filter.value}
          <IconButton
            aria-label="Close"
            size="xs"
            variant="ghost"
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
