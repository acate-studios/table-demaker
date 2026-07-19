import { Badge, Flex, IconButton } from "@chakra-ui/react";

import { useColorModeHex } from "@/hooks/useColorMode";

import CancelIcon from "../Icons/CancelIcon";
import FilterStrokeIcon from "../Icons/FilterStrokeIcon";
import { useQueryFilters } from "../store/queryFilters.store";

export const QueryFiltersApplied = () => {
  const { white, colorText } = useColorModeHex();
  const { queryFilters, deleteQueryFilter } = useQueryFilters();

  return (
    <Flex gap={2} alignItems="center">
      <FilterStrokeIcon
        strokeWidth={2}
        width={16}
        height={16}
        color={colorText}
      />

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
            <CancelIcon
              strokeWidth={2}
              color={white[500].value}
              height={16}
              width={16}
            />
          </IconButton>
        </Badge>
      ))}
    </Flex>
  );
};
