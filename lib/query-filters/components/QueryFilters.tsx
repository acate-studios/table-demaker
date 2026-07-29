import { Flex, FlexProps, Separator } from "@chakra-ui/react";
import { AdaptiveInputProps } from "form-demaker";
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
  inputs: AdaptiveInputProps[];
  title?: string;
  dataCount?: number;
  icons?: QueryFiltersIcons;
  textColor?: QueryFiltersTextColor;
  iconColor?: QueryFiltersIconColor;
}

const QueryFilters = ({
  inputs,
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
          inputs={inputs}
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
