import { Button, Flex, IconButton, MenuItem, Text } from "@chakra-ui/react";
import { AdaptiveInputProps, FormDemaker } from "form-demaker";
import { ReactNode, useRef } from "react";

import { MenuContent, MenuRoot, MenuTrigger } from "@/components/ui/menu";
import { useColorModeHex, useColorModeTheme } from "@/hooks/useColorMode";

import { useQueryFilters } from "../store/queryFilters.store";

const inputs = (): AdaptiveInputProps[] => {
  return [
    {
      inputType: "number",
      name: "DPI",
      label: "DPI",
      inputProps: {
        placeholder: "Enter your DPI",
      },
      rules: {
        minLength: {
          value: 13,
          message: "DPI must have 13 characters",
        },
      },
    },
    {
      inputType: "text",
      name: "Name",
      label: "Name",
      inputProps: {
        placeholder: "Enter your Name",
      },
      rules: {
        maxLength: {
          value: 50,
          message: "Name must have less than 50 characters",
        },
      },
    },
  ];
};

interface FilterItemProps {
  icon: ReactNode;
}

export const FilterItem = ({ icon }: FilterItemProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { addQueriesFilters } = useQueryFilters();

  const { backgroundColor } = useColorModeTheme();
  const { grayColor } = useColorModeHex();

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton
          aria-label="Notifications"
          backgroundColor={backgroundColor}
          _active={{ backgroundColor: "none" }}
          _hover={{ backgroundColor: "gray.200" }}
          px={1}
        >
          {icon}
          <Text color={grayColor}>Filter By</Text>
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
          inputs={inputs()}
          onSubmit={(values) => {
            addQueriesFilters(
              Object.entries(values).map(([name, value]) => ({ name, value }))
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
          <Button variant="text" onClick={() => formRef.current?.submitForm()}>
            Apply
          </Button>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
