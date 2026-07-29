import { Flex, FlexProps, Separator } from "@chakra-ui/react";
import { ReactNode } from "react";

import { FilterItem } from "./FilterItem";
import DefaultAppliedIcon from "./Icons/DefaultAppliedIcon";
import DefaultFilterIcon from "./Icons/DefaultFilterIcon";
import DefaultRemoveIcon from "./Icons/DefaultRemoveIcon";
import { QueryFiltersApplied } from "./QueryFiltersApplied";
import { Title } from "./Title";

interface QueryFiltersIcons {
  filter?: ReactNode;
  applied?: ReactNode;
  remove?: ReactNode;
}

interface QueryFiltersTextColor {
  title?: string;
  subtitle?: string;
}

interface QueryFiltersIconColor {
  filter?: string;
  applied?: string;
  remove?: string;
}

interface QueryFiltersProps extends FlexProps {
  title?: string;
  dataCount?: number;
  icons?: QueryFiltersIcons;
  textColor?: QueryFiltersTextColor;
  iconColor?: QueryFiltersIconColor;
}

const QueryFilters = ({
  title,
  dataCount,
  icons,
  textColor,
  iconColor,
  ...props
}: QueryFiltersProps) => {
  return (
    <Flex gap={5} direction="column" {...props}>
      <Flex gap={4} alignItems="center">
        <Title {...{ title, dataCount, textColor }} />
        <Separator orientation="vertical" height="6" size="md" />
        <FilterItem
          subtitleColor={textColor?.subtitle}
          icon={
            icons?.filter ?? (
              <DefaultFilterIcon strokeWidth={2} color={iconColor?.filter} />
            )
          }
        />
      </Flex>

      <QueryFiltersApplied
        appliedIcon={
          icons?.applied ?? (
            <DefaultAppliedIcon
              strokeWidth={2}
              width={16}
              height={16}
              color={iconColor?.applied}
            />
          )
        }
        removeIcon={
          icons?.remove ?? (
            <DefaultRemoveIcon
              strokeWidth={2}
              width={16}
              height={16}
              color={iconColor?.remove}
            />
          )
        }
      />
    </Flex>
  );
};

export default QueryFilters;
