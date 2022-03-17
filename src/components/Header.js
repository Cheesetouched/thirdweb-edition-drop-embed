import { IoWalletOutline } from "react-icons/io5";
import { Button, Divider, Flex, useDisclosure } from "@chakra-ui/react";

import WalletPopup from "./WalletPopup";
import { formatAddress } from "../utils/helper";

export default function Header({
  address,
  balance,
  claimConditions,
  disconnectWallet,
  minting,
  mode,
  overrideInventory,
  overrideMint,
  provider,
  setMode,
  showBalance,
  showInventory,
  showRemainingMints,
  showWallet,
  toast,
  tokenBalance,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex direction="column">
      <Flex marginX="28px">
        <Button
          _active={{
            color:
              mode === "mint" ? "tabActiveTextColor" : "tabInactiveTextColor",
          }}
          borderRadius={0}
          borderTop="4px solid transparent"
          borderBottom="4px solid"
          borderBottomColor={mode === "mint" ? "primaryColor" : "#00000000"}
          color={
            mode === "mint" ? "tabActiveTextColor" : "tabInactiveTextColor"
          }
          fontSize={{ base: "16px", md: "20px", lg: "20px" }}
          fontWeight="bold"
          height="48px"
          _hover={{ textDecoration: "none" }}
          onClick={() => setMode("mint")}
          variant="link"
        >
          {overrideMint ? overrideMint : "Mint"}{" "}
          {claimConditions &&
            showRemainingMints &&
            `(${claimConditions?.availableSupply})`}
        </Button>

        {showInventory && (
          <Button
            _active={{
              color:
                mode === "inventory"
                  ? "tabActiveTextColor"
                  : "tabInactiveTextColor",
            }}
            borderRadius={0}
            borderTop="4px solid transparent"
            borderBottom="4px solid"
            borderBottomColor={
              mode === "inventory" ? "primaryColor" : "#00000000"
            }
            color={
              mode === "inventory"
                ? "tabActiveTextColor"
                : "tabInactiveTextColor"
            }
            disabled={minting}
            fontSize={{ base: "16px", md: "20px", lg: "20px" }}
            fontWeight="bold"
            height="48px"
            _hover={{ textDecoration: "none" }}
            ml={5}
            onClick={() => setMode("inventory")}
            variant="link"
          >
            {overrideInventory ? overrideInventory : "Inventory"}{" "}
            {provider && tokenBalance !== null && `(${tokenBalance})`}
          </Button>
        )}

        {address && provider && showWallet && (
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
        balance={balance}
        disconnectWallet={disconnectWallet}
        isOpen={isOpen}
        onClose={onClose}
        provider={provider}
        showBalance={showBalance}
        toast={toast}
      />
    </Flex>
  );
}
