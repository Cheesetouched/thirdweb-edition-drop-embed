import { Flex, Image, Text, VStack } from "@chakra-ui/react";

import ConnectWallet from "./ConnectWallet";

export default function Inventory({
  connectFunction,
  error,
  inventoryImageHeight,
  inventoryImageWidth,
  provider,
  tokenBalance,
  tokenDetails,
}) {
  return (
    <>
      {provider && tokenBalance > 0 && (
        <Flex direction="column">
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
              fallbackSrc="/drop.svg"
              src={tokenDetails?.metadata?.image}
            />
          </Flex>

          <Text
            align="center"
            color="#272E36"
            fontSize={18}
            fontWeight="bold"
            mt={3}
          >
            {tokenDetails?.metadata?.name}
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
            error={error}
            provider={provider}
          />
        </Flex>
      )}
    </>
  );
}
