import { useEffect, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { Button, Divider, Flex, useDisclosure } from "@chakra-ui/react";

import WalletPopup from "./WalletPopup";
import { formatAddress } from "../utils/helper";

export default function Header({
  address,
  claimConditions,
  disconnectWallet,
  dropModule,
  mode,
  provider,
  setMode,
  toast,
  tokenId,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tokenBalance, setTokenBalance] = useState(null);

  useEffect(() => {
    (async () => {
      if (dropModule) {
        const balance = await dropModule.balance(tokenId);
        setTokenBalance(balance.toNumber());
      }
    })();
  }, [dropModule, tokenId]);

  return (
    <Flex direction="column">
      <Flex marginX="28px">
        <Button
          borderRadius={0}
          borderTop="4px solid transparent"
          borderBottom="4px solid"
          borderBottomColor={mode === "mint" ? "#0EA5E9" : "#00000000"}
          color={mode === "mint" ? "#3A3A3C" : "#AEAEB2"}
          fontWeight="bold"
          height="48px"
          _hover={{ textDecoration: "none" }}
          onClick={() => setMode("mint")}
          variant="link"
        >
          Mint {claimConditions && `(${claimConditions[0]?.availableSupply})`}
        </Button>

        <Button
          _active={{
            color: mode === "inventory" ? "#3A3A3C" : "#AEAEB2",
          }}
          borderRadius={0}
          borderTop="4px solid transparent"
          borderBottom="4px solid"
          borderBottomColor={mode === "inventory" ? "#0EA5E9" : "#00000000"}
          color={mode === "inventory" ? "#3A3A3C" : "#AEAEB2"}
          fontWeight="bold"
          height="48px"
          _hover={{ textDecoration: "none" }}
          ml={5}
          onClick={() => setMode("inventory")}
          variant="link"
        >
          Inventory {provider && tokenBalance !== null && `(${tokenBalance})`}
        </Button>

        {address && provider && (
          <Flex alignItems="center" flex={1} justifyContent="flex-end">
            <Button
              fontSize={12}
              leftIcon={<IoWalletOutline color="#AEAEB2" size={16} />}
              onClick={onOpen}
              size="sm"
              variant="outline"
            >
              {formatAddress(address)}
            </Button>
          </Flex>
        )}
      </Flex>

      <Divider />

      <WalletPopup
        address={address}
        disconnectWallet={disconnectWallet}
        isOpen={isOpen}
        onClose={onClose}
        provider={provider}
        toast={toast}
      />
    </Flex>
  );
}
