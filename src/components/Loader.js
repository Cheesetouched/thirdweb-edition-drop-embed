import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function Loader({ mt }) {
  return (
    <Flex align="center" mt={mt}>
      <Spinner color="loaderColor" />

      <Text color="loaderColor" fontSize={12} fontWeight="bold" ml={3}>
        Loading...
      </Text>
    </Flex>
  );
}
