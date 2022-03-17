import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Flex align="center">
      <Spinner color="loaderColor" />

      <Text color="loaderColor" fontSize={12} fontWeight="bold" ml={3}>
        Loading...
      </Text>
    </Flex>
  );
}
