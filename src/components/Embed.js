import { ethers } from "ethers";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { Center, Flex, useToast } from "@chakra-ui/react";
import { useCallback, useState, useEffect, useMemo } from "react";

import Mint from "./Mint";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import Inventory from "./Inventory";

function Embed({
  borderRadius,
  chainId,
  contract,
  description,
  fallbackImage,
  footerImage,
  footerUrl,
  height,
  hideClaimCount,
  hideDescription,
  hideThirdwebLogo,
  hideTitle,
  imageHeight,
  imageWidth,
  imageBorderRadius,
  inventoryTitle,
  inventoryImageHeight,
  inventoryImageWidth,
  mintAllowedPerWallet,
  mintText,
  rpcUrl,
  showBalance,
  showInventory,
  showRemainingMints,
  showWallet,
  title,
  tokenId,
  relayer = null,
  width,
}) {
  const toast = useToast();
  const [mode, setMode] = useState("mint");
  const [loading, setLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [tokenDetails, setTokenDetails] = useState(null);
  const [claimConditions, setClaimConditions] = useState(null);
  const { address, balance, connectWallet, disconnectWallet, error, provider } =
    useWeb3();

  const sdk = useMemo(() => {
    if (provider) {
      return new ThirdwebSDK(provider.getSigner(), {
        transactionRelayerUrl: relayer,
      });
    }
    return null;
  }, [provider, relayer]);

  const dropModule = useMemo(() => {
    if (sdk) {
      return sdk.getBundleDropModule(contract);
    }
    return null;
  }, [contract, sdk]);

  const getDropDetails = useCallback(async () => {
    const defaultProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const sdk = new ThirdwebSDK(defaultProvider);
    const dropModule = sdk.getBundleDropModule(contract);

    const [tokenDetails, claimConditions] = await Promise.all([
      dropModule.get(tokenId),
      dropModule.getAllClaimConditions(tokenId),
    ]);

    setLoading(false);
    setTokenDetails(tokenDetails);
    setClaimConditions(claimConditions);
  }, [contract, rpcUrl, tokenId]);

  const getTokenBalance = useCallback(async () => {
    const balance = await dropModule.balance(tokenId);
    setTokenBalance(balance.toNumber());
  }, [dropModule, tokenId]);

  useEffect(() => {
    getDropDetails();
  }, [getDropDetails]);

  useEffect(() => {
    if (contract === undefined || contract === null) {
      toast({
        title: "contract is not provided",
        status: "error",
      });
    } else if (tokenId === undefined || isNaN(tokenId)) {
      toast({
        title: "tokenId is not provided",
        status: "error",
      });
    }
  }, [contract, toast, tokenId]);

  useEffect(() => {
    (async () => {
      if (dropModule) {
        getTokenBalance();
      }
    })();
  }, [dropModule, getTokenBalance]);

  return (
    <Flex
      borderColor="rgba(0,0,0,0.1)"
      borderWidth="1px"
      borderRadius={borderRadius}
      bgColor="white"
      flexDirection="column"
      height={height}
      width={width}
    >
      <Header
        address={address}
        balance={balance?.formatted}
        claimConditions={claimConditions}
        disconnectWallet={disconnectWallet}
        mode={mode}
        provider={provider}
        setMode={setMode}
        showBalance={showBalance}
        showInventory={showInventory}
        showRemainingMints={showRemainingMints}
        showWallet={showWallet}
        toast={toast}
        tokenBalance={tokenBalance}
      />

      <Center flex={1} paddingX="28px">
        {loading && <Loader />}

        {!loading && mode === "mint" && (
          <Mint
            chainId={chainId}
            claimConditions={claimConditions}
            connectFunction={connectWallet}
            description={description}
            dropModule={dropModule}
            error={error}
            fallbackImage={fallbackImage}
            getDropDetails={getDropDetails}
            getTokenBalance={getTokenBalance}
            hideClaimCount={hideClaimCount}
            hideDescription={hideDescription}
            hideTitle={hideTitle}
            imageBorderRadius={imageBorderRadius}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
            mintAllowedPerWallet={mintAllowedPerWallet}
            mintText={mintText}
            provider={provider}
            relayer={relayer}
            title={title}
            toast={toast}
            tokenDetails={tokenDetails}
            tokenId={tokenId}
          />
        )}

        {!loading && mode === "inventory" && showInventory && (
          <Inventory
            connectFunction={connectWallet}
            error={error}
            fallbackImage={fallbackImage}
            inventoryImageHeight={inventoryImageHeight}
            inventoryImageWidth={inventoryImageWidth}
            inventoryTitle={inventoryTitle}
            provider={provider}
            tokenBalance={tokenBalance}
            tokenDetails={tokenDetails}
          />
        )}
      </Center>

      <Footer
        footerImage={footerImage}
        footerUrl={footerUrl}
        hideThirdwebLogo={hideThirdwebLogo}
      />
    </Flex>
  );
}

export default Embed;
