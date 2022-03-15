import { FaRegGem } from "react-icons/fa";
import { useCallback, useState } from "react";
import { Button, Flex, Image, Text } from "@chakra-ui/react";

import WrongNetwork from "./WrongNetwork";
import ConnectWallet from "./ConnectWallet";

export default function Mint({
  chainId,
  claimConditions,
  connectFunction,
  description,
  dropModule,
  error,
  fallbackImage,
  getDropDetails,
  getTokenBalance,
  imageBorderRadius,
  imageHeight,
  imageWidth,
  mintAllowedPerWallet,
  mintText,
  provider,
  relayer,
  showClaimCount,
  showDescription,
  showTitle,
  title,
  toast,
  tokenDetails,
  tokenId,
}) {
  const [minting, setMinting] = useState(false);

  const mint = useCallback(async () => {
    setMinting(true);
    try {
      const balance = await dropModule.balance(tokenId);
      if (balance.toNumber() >= mintAllowedPerWallet) {
        toast({
          isClosable: true,
          status: "error",
          title: "You've already minted!",
        });
      } else {
        await dropModule.claim(tokenId, 1);
        await Promise.all([getDropDetails(), getTokenBalance()]);
        toast({
          isClosable: true,
          status: "success",
          title: "Minted successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        isClosable: true,
        status: "error",
        title: "Minting failed",
      });
    }
    setMinting(false);
  }, [
    dropModule,
    getDropDetails,
    getTokenBalance,
    mintAllowedPerWallet,
    toast,
    tokenId,
  ]);

  return (
    <Flex align="center" direction="column">
      <Flex
        align="center"
        background="#F2F0FF"
        border="1px solid rgba(0,0,0,0.1)"
        borderRadius={imageBorderRadius}
        flexDirection="column"
        height={imageHeight}
        overflow="hidden"
        justifyContent="center"
        width={imageWidth}
      >
        <Image
          alt="preview"
          fallbackSrc={fallbackImage ? fallbackImage : "./drop.svg"}
          src={tokenDetails?.metadata?.image}
        />
      </Flex>

      {showTitle && (
        <Text color="#272E36" fontSize="28px" fontWeight="bold" marginTop={2.5}>
          {title ? title : tokenDetails?.metadata?.name}
        </Text>
      )}

      {showDescription && (
        <Text color="#272E36" fontWeight={500} noOfLines={2} mt={2.5}>
          {description ? description : tokenDetails?.metadata?.description}
        </Text>
      )}

      {!error?.message.toLowerCase().includes("unsupported") && provider && (
        <Button
          _active={{
            backgroundColor: "#007EC5",
          }}
          backgroundColor="#0098EE"
          color="white"
          _hover={{ backgroundColor: "#007EC5" }}
          isFullWidth
          leftIcon={<FaRegGem />}
          isLoading={minting}
          mt={5}
          onClick={() => mint()}
          size="md"
        >
          {mintText ? mintText : relayer ? "Mint (Free)" : "Mint"}
        </Button>
      )}

      {!error?.message.toLowerCase().includes("unsupported") && !provider && (
        <ConnectWallet
          connectFunction={connectFunction}
          error={error}
          provider={provider}
        />
      )}

      {error?.message.toLowerCase().includes("unsupported") && (
        <WrongNetwork shouldSwitchTo={chainId} />
      )}

      {provider &&
        showClaimCount &&
        !error?.message.toLowerCase().includes("unsupported") &&
        claimConditions && (
          <Text
            color="#00742E"
            fontSize={14}
            fontWeight="bold"
            mt={3}
          >{`${claimConditions[0].currentMintSupply} / ${claimConditions[0].maxMintSupply} claimed`}</Text>
        )}
    </Flex>
  );
}
