import { Badge, Flex, Heading, Text, VStack } from "@chakra-ui/react";

import { Provider } from "../lib/components/ui/provider";

function App() {
  return (
    <Provider>
      <VStack
        align="stretch"
        gap={8}
        maxW="1400px"
        mx="auto"
        py={10}
        px={{ base: 4, md: 8 }}
      >
        <Flex alignItems="center" gap={3}>
          <Heading size="2xl" fontWeight="bold">
            📊 Table deMaker
          </Heading>
          <Badge colorPalette="teal" size="lg" variant="subtle">
            Demo
          </Badge>
        </Flex>
        <Text fontSize="lg" color="gray.600">
          The DataTable component lands in Fase 3.
        </Text>
      </VStack>
    </Provider>
  );
}

export default App;
