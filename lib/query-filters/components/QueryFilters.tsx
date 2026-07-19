import { Flex, FlexProps, Separator } from "@chakra-ui/react";

import { FilterItem } from "./FilterItem";
import { QueryFiltersApplied } from "./QueryFiltersApplied";
import { Title } from "./Title";

interface QueryFiltersProps extends FlexProps {
  title?: string;
  dataCount?: number;
}

const QueryFilters = ({ title, dataCount, ...props }: QueryFiltersProps) => {
  return (
    <Flex gap={5} direction="column" {...props}>
      <Flex gap={4} alignItems="center">
        <Title {...{ title, dataCount }} />
        <Separator orientation="vertical" height="6" size="md" />
        <FilterItem />
      </Flex>

      <QueryFiltersApplied />
    </Flex>
  );
};

export default QueryFilters;
