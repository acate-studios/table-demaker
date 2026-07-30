import { Button, Flex, IconButton, MenuItem, Text } from "@chakra-ui/react";
import { AdaptiveInputProps, FormDemaker } from "form-demaker";
import { ReactNode, useRef } from "react";

import { MenuContent, MenuRoot, MenuTrigger } from "@/components/ui/menu";

import { useQueryFilters } from "../store/queryFilters.store";

interface FilterItemProps {
  inputs: AdaptiveInputProps[];
  names: string[];
  icon: ReactNode;
  subtitleColor?: string;
}

export const FilterItem = ({
  inputs,
  names,
  icon,
  subtitleColor,
}: FilterItemProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { addQueriesFilters } = useQueryFilters(names);

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton aria-label="Filter By" variant="ghost" px={1}>
          {icon}
          <Text color={subtitleColor} opacity={0.6}>
            Filter By
          </Text>
        </IconButton>
      </MenuTrigger>

      <MenuContent minW="300px" maxW="400px">
        <Flex w="100%" mb="20px">
          <Text fontSize="md" fontWeight="600">
            Sort by
          </Text>
        </Flex>

        <FormDemaker
          ref={formRef}
          columns={1}
          gridProps={{
            mb: 2,
            gap: 2,
          }}
          inputs={inputs}
          onSubmit={(values) => {
            addQueriesFilters(
              Object.entries(values).map(([name, value]) => ({ name, value })),
            );
          }}
        />

        <MenuItem
          value="new-tab"
          valueText="New Tab"
          _hover={{ bg: "none" }}
          display="flex"
          justifyContent="end"
          closeOnSelect={false}
          p={0}
        >
          <Button variant="plain" onClick={() => formRef.current?.submitForm()}>
            Apply
          </Button>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
