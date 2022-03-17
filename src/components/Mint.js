import { useMemo } from "react";
import { useCallback } from "react";
import { FaRegGem } from "react-icons/fa";
import { Button, Flex, Image, Text } from "@chakra-ui/react";

import WrongNetwork from "./WrongNetwork";
import ConnectWallet from "./ConnectWallet";

export default function Mint({
  chainId,
  claimConditions,
  connectFunction,
  connectText,
  description,
  descriptionTextAlign,
  dropError,
  dropModule,
  error,
  fallbackImage,
  getDropDetails,
  getTokenBalance,
  imageBorderRadius,
  imageHeight,
  imageWidth,
  minting,
  mintAllowedPerWallet,
  mintSuccessText,
  mintText,
  primaryBorderRadius,
  provider,
  setMinting,
  showClaimCount,
  showDescription,
  showMintIcon,
  showTitle,
  title,
  toast,
  tokenDetails,
  tokenId,
  useMetamask,
  useWalletConnect,
  useWalletLink,
}) {
  const availableSupply = useMemo(
    () => parseInt(claimConditions?.availableSupply),
    [claimConditions]
  );

  const maxSupply = useMemo(
    () => claimConditions?.maxQuantity.toNumber(),
    [claimConditions]
  );

  const claimed = useMemo(
    () => maxSupply - availableSupply,
    [availableSupply, maxSupply]
  );

  const claimCount = useMemo(
    () => `${claimed} / ${maxSupply}`,
    [claimed, maxSupply]
  );

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
          duration: 10000,
          isClosable: true,
          status: "success",
          title: mintSuccessText,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        isClosable: true,
        status: "error",
        title: "Minting failed",
        description: error?.message,
      });
    }
    setMinting(false);
  }, [
    dropModule,
    getDropDetails,
    getTokenBalance,
    mintAllowedPerWallet,
    mintSuccessText,
    setMinting,
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
          height="100%"
          objectFit="contain"
          src={tokenDetails?.metadata?.image}
          width="100%"
        />
      </Flex>

      {showTitle && (
        <Text
          color="titleColor"
          fontSize={{ base: "28px", md: "64px", lg: "64px" }}
          fontWeight="bold"
          marginTop={2.5}
        >
          {title ? title : tokenDetails?.metadata?.name}
        </Text>
      )}

      {showDescription && (
        <Text
          align={descriptionTextAlign}
          color="descriptionColor"
          fontSize={{ base: "16px", md: "20px", lg: "20px" }}
          fontWeight={500}
          noOfLines={2}
          mt={2.5}
        >
          {description ? description : tokenDetails?.metadata?.description}
        </Text>
      )}

      {!error?.message.toLowerCase().includes("unsupported") && provider && (
        <Button
          _active={{
            backgroundColor: "primaryActiveColor",
          }}
          backgroundColor="primaryColor"
          borderRadius={primaryBorderRadius}
          color="secondaryColor"
          disabled={dropError || minting || claimed === maxSupply}
          _hover={{ backgroundColor: "primaryHoverColor" }}
          isFullWidth
          leftIcon={showMintIcon && <FaRegGem />}
          isLoading={minting}
          mt={5}
          onClick={() => mint()}
          size="md"
        >
          {dropError
            ? dropError
            : claimed === maxSupply
            ? "Sold out"
            : mintText
            ? mintText
            : claimConditions?.currencyMetadata.displayValue === "0.0"
            ? "Mint (Free)"
            : `Mint (${`${claimConditions?.currencyMetadata?.displayValue} ${claimConditions?.currencyMetadata?.symbol}`})`}
        </Button>
      )}

      {!error?.message.toLowerCase().includes("unsupported") && !provider && (
        <ConnectWallet
          connectFunction={connectFunction}
          connectText={connectText}
          dropError={dropError}
          error={error}
          primaryBorderRadius={primaryBorderRadius}
          provider={provider}
          useMetamask={useMetamask}
          useWalletConnect={useWalletConnect}
          useWalletLink={useWalletLink}
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
            color="claimCountColor"
            fontSize={14}
            fontWeight="bold"
            mt={3}
          >{`${claimCount} claimed`}</Text>
        )}
    </Flex>
  );
}
