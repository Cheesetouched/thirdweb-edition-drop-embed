import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Flex align="center">
      <Spinner />

      <Text ml={3} fontWeight="bold" fontSize={12}>
        Loading...
      </Text>
    </Flex>
  );
}
