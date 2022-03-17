import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  Button,
  HStack,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

export default function ConnectWallet({
  connectFunction,
  connectText,
  dropError,
  error,
  primaryBorderRadius,
  provider,
  useMetamask,
  useWalletConnect,
  useWalletLink,
}) {
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
            backgroundColor: "primaryActiveColor",
          }}
          backgroundColor="primaryColor"
          borderRadius={primaryBorderRadius}
          color="secondaryColor"
          disabled={dropError}
          _hover={{ backgroundColor: "primaryHoverColor" }}
          isActive={active}
          isFullWidth
          isLoading={connecting}
          mt={5}
          rightIcon={!dropError && <FiChevronDown />}
          size="md"
        >
          <Text width="100%">{dropError ? dropError : connectText}</Text>
        </Button>
      </PopoverTrigger>

      <PopoverContent width="100%">
        <HStack padding="8px">
          {useMetamask && (
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
          )}

          {useWalletConnect && (
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
          )}

          {useWalletLink && (
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
          )}
        </HStack>
      </PopoverContent>
    </Popover>
  );
}
