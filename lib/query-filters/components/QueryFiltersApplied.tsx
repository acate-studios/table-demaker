import {
  Badge,
  BadgeProps,
  Flex,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

import { useQueryFilters } from "../store/queryFilters.store";
import { QueryFilter } from "../types/store.types";

export type QueryFiltersBadgeProps =
  | BadgeProps
  | ((filter: QueryFilter, index: number) => BadgeProps);

interface QueryFiltersAppliedProps {
  names: string[];
  appliedIcon: ReactNode;
  removeIcon: ReactNode;
  badgeProps?: QueryFiltersBadgeProps;
  removeButtonProps?: IconButtonProps;
}

export const QueryFiltersApplied = ({
  names,
  appliedIcon,
  removeIcon,
  badgeProps,
  removeButtonProps,
}: QueryFiltersAppliedProps) => {
  const { queryFilters, deleteQueryFilter } = useQueryFilters(names);

  const resolveBadgeProps = (filter: QueryFilter, index: number) =>
    typeof badgeProps === "function" ? badgeProps(filter, index) : badgeProps;

  return (
    <Flex gap={2} alignItems="center">
      {appliedIcon}

      {queryFilters.map((filter, index) => (
        <Badge
          key={index}
          variant="subtle"
          pl={4}
          {...resolveBadgeProps(filter, index)}
        >
          {filter.name}: {filter.value}
          {/* onClick sits after the spread: consumers restyle, never rewire. */}
          <IconButton
            aria-label="Close"
            size="xs"
            variant="ghost"
            ml={2}
            {...removeButtonProps}
            onClick={() => deleteQueryFilter(index)}
          >
            {removeIcon}
          </IconButton>
        </Badge>
      ))}
    </Flex>
  );
};
