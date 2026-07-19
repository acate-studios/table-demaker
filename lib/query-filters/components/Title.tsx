import { Flex, Text } from "@chakra-ui/react";

type TitleProps = {
  title?: string;
  dataCount?: number;
};

export const Title = ({ title, dataCount }: TitleProps) => {
  return (
    <Flex gap={3} alignItems="center">
      {title && (
        <Text fontSize="2xl" fontWeight="semibold">
          {title}
        </Text>
      )}
      {dataCount && (
        <Text fontSize="2xl" fontWeight="medium" color="gray.500">
          {dataCount}
        </Text>
      )}
    </Flex>
  );
};
