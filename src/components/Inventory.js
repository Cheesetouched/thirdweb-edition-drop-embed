import { Flex, Image, Text, VStack } from "@chakra-ui/react";

import ConnectWallet from "./ConnectWallet";

export default function Inventory({
  connectFunction,
  connectText,
  error,
  fallbackImage,
  inventoryImageHeight,
  inventoryImageWidth,
  inventoryTitle,
  primaryBorderRadius,
  provider,
  tokenBalance,
  tokenDetails,
  useMetamask,
  useWalletConnect,
  useWalletLink,
}) {
  return (
    <>
      {provider && tokenBalance > 0 && (
        <Flex align="center" direction="column">
          <Flex
            align="center"
            background="#F2F0FF"
            border="1px solid rgba(0,0,0,0.1)"
            borderRadius="20px"
            flexDirection="column"
            height={inventoryImageHeight}
            overflow="hidden"
            justifyContent="center"
            width={inventoryImageWidth}
          >
            <Image
              alt="preview"
              fallbackSrc={fallbackImage ? fallbackImage : "./drop.svg"}
              height="100%"
              objectFit="contain"
              src={tokenDetails?.metadata?.image}
              width="100%"
            />
          </Flex>

          <Text
            align="center"
            color="titleColor"
            fontSize={18}
            fontWeight="bold"
            mt={3}
          >
            {inventoryTitle ? inventoryTitle : tokenDetails?.metadata?.name}
          </Text>

          <Text align="center" color="titleColor" mt={2}>
            {`You own ${tokenBalance}`}
          </Text>
        </Flex>
      )}

      {provider && tokenBalance === 0 && (
        <VStack>
          <Text fontSize="18" fontWeight="bold">
            You don't own this NFT yet :(
          </Text>

          <Text fontSize="16">Once you do, it'll show up here.</Text>
        </VStack>
      )}

      {!provider && (
        <Flex direction="column">
          <Text fontSize={12} fontWeight="bold">
            Connect your wallet to see your inventory
          </Text>

          <ConnectWallet
            connectFunction={connectFunction}
            connectText={connectText}
            error={error}
            primaryBorderRadius={primaryBorderRadius}
            provider={provider}
            useMetamask={useMetamask}
            useWalletConnect={useWalletConnect}
            useWalletLink={useWalletLink}
          />
        </Flex>
      )}
    </>
  );
}
