import { useSwitchNetwork } from "@3rdweb/hooks";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { Alert, AlertDescription, Button, Text, VStack } from "@chakra-ui/react";

import { getChainData } from "../utils/helper";

export default function WrongNetwork({ shouldSwitchTo }) {
  const { switchNetwork } = useSwitchNetwork();

  return (
    <VStack>
      <Button
        _active={{
          backgroundColor: "orange.600",
        }}
        backgroundColor="#F97316"
        color="white"
        _hover={{ backgroundColor: "orange.600" }}
        isFullWidth
        mt={5}
        onClick={() => switchNetwork(shouldSwitchTo)}
        leftIcon={<HiOutlineSwitchHorizontal />}
        size="md"
      >
        Switch Network to {getChainData(shouldSwitchTo).name}
      </Button>

      <Alert
        borderColor="#FFEDD5"
        borderWidth="1px"
        backgroundColor="#FFF7ED"
        borderRadius={5}
        color="#9A3412"
        fontSize={14}
        padding="10px"
        status="info"
      >
        <AiOutlineInfoCircle color="#FB923C" size={35} />
        <AlertDescription ml={3}>
          <VStack>
            <Text>
              You are currently connected to the wrong network. Please switch
              your network to continue.
            </Text>

            <Text>
              If you are using wallet connect or coinbase wallet, you may need
              to manually switch networks on your app.
            </Text>
          </VStack>
        </AlertDescription>
      </Alert>
    </VStack>
  );
}
