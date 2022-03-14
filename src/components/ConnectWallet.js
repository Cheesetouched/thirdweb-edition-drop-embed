import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  Button,
  HStack,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

export default function ConnectWallet({ connectFunction, error, provider }) {
  const [active, setActive] = useState(false);
  const [connecting, setConnecting] = useState(null);

  useEffect(() => {
    if (error || provider) {
      setConnecting(null);
    }
  }, [error, provider]);

  return (
    <Popover
      closeOnBlur={!connecting}
      matchWidth
      onClose={() => setActive(false)}
      onOpen={() => setActive(true)}
    >
      <PopoverTrigger>
        <Button
          _active={{
            backgroundColor: "#007EC5",
          }}
          backgroundColor="#0098EE"
          color="white"
          _hover={{ backgroundColor: "#007EC5" }}
          isActive={active}
          isFullWidth
          isLoading={connecting}
          mt={5}
          rightIcon={<FiChevronDown />}
          size="md"
        >
          Connect Wallet
        </Button>
      </PopoverTrigger>

      <PopoverContent width="100%">
        <HStack padding="8px">
          <Button
            flexGrow={1}
            fontSize="xs"
            isLoading={connecting === "metamask"}
            leftIcon={<Image boxSize={6} src="./metamask.svg" />}
            onClick={() => {
              setConnecting("metamask");
              connectFunction("injected");
            }}
            size="sm"
            variant="outline"
          >
            MetaMask
          </Button>

          <Button
            flexGrow={1}
            fontSize="xs"
            isLoading={connecting === "walletconnect"}
            leftIcon={<Image boxSize={6} src="./walletconnect.svg" />}
            onClick={() => {
              setConnecting("walletconnect");
              connectFunction("walletconnect");
            }}
            size="sm"
            variant="outline"
          >
            WalletConnect
          </Button>

          <Button
            flexGrow={1}
            fontSize="xs"
            isLoading={connecting === "walletlink"}
            leftIcon={<Image boxSize={6} src="./coinbase.svg" />}
            onClick={() => {
              setConnecting("walletlink");
              connectFunction("walletlink");
            }}
            size="sm"
            variant="outline"
          >
            Coinbase Wallet
          </Button>
        </HStack>
      </PopoverContent>
    </Popover>
  );
}
