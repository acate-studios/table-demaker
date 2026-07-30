import { Flex, Text } from "@chakra-ui/react";

type TitleProps = {
  title?: string;
  dataCount?: number;
  textColor?: {
    title?: string;
    subtitle?: string;
  };
};

export const Title = ({ title, dataCount, textColor }: TitleProps) => {
  return (
    <Flex gap={3} alignItems="center">
      {title && (
        <Text fontSize="2xl" fontWeight="semibold" color={textColor?.title}>
          {title}
        </Text>
      )}
      {dataCount && (
        <Text
          fontSize="2xl"
          fontWeight="medium"
          color={textColor?.subtitle}
          opacity={0.6}
        >
          {dataCount}
        </Text>
      )}
    </Flex>
  );
};
