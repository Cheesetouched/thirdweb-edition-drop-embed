import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
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
  connectText,
  contract,
  description,
  descriptionTextAlign,
  fallbackImage,
  footerImage,
  footerUrl,
  height,
  imageHeight,
  imageWidth,
  imageBorderRadius,
  inventoryTitle,
  inventoryImageHeight,
  inventoryImageWidth,
  mintAllowedPerWallet,
  mintSuccessText,
  mintText,
  overrideInventory,
  overrideMint,
  primaryBorderRadius,
  relayer = null,
  rpcUrl,
  showBalance,
  showClaimCount,
  showDescription,
  showInventory,
  showMintIcon,
  showRemainingMints,
  showThirdwebLogo,
  showTitle,
  showWallet,
  title,
  tokenId,
  useMetamask,
  useWalletConnect,
  useWalletLink,
  width,
}) {
  const toast = useToast();
  const [mode, setMode] = useState("mint");
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [dropError, setDropError] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [tokenDetails, setTokenDetails] = useState(null);
  const [claimConditions, setClaimConditions] = useState(null);
  const { address, balance, connectWallet, disconnectWallet, error, provider } =
    useWeb3();

  const sdk = useMemo(() => {
    if (provider) {
      if (relayer) {
        return new ThirdwebSDK(provider.getSigner(), {
          gasless: { openzeppelin: { relayerUrl: relayer } },
        });
      } else {
        return new ThirdwebSDK(provider.getSigner());
      }
    }
    return null;
  }, [provider, relayer]);

  const dropModule = useMemo(() => {
    if (sdk) {
      return sdk.getEditionDrop(contract);
    }
    return null;
  }, [contract, sdk]);

  const getDropDetails = useCallback(async () => {
    const sdk = new ThirdwebSDK(rpcUrl);
    const dropModule = sdk.getEditionDrop(contract);

    const [tokenDetails, claimConditions] = await Promise.allSettled([
      dropModule.get(tokenId),
      dropModule.claimConditions.getActive(tokenId),
    ]);

    setLoading(false);

    tokenDetails.status === "fulfilled"
      ? setTokenDetails(tokenDetails.value)
      : setDropError("Could not fetch drop details");

    claimConditions.status === "fulfilled"
      ? setClaimConditions(claimConditions.value)
      : setDropError("This drop is not ready to be claimed.");
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
      borderColor="borderColor"
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
        minting={minting}
        mode={mode}
        overrideInventory={overrideInventory}
        overrideMint={overrideMint}
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
            connectText={connectText}
            description={description}
            descriptionTextAlign={descriptionTextAlign}
            dropError={dropError}
            dropModule={dropModule}
            error={error}
            fallbackImage={fallbackImage}
            getDropDetails={getDropDetails}
            getTokenBalance={getTokenBalance}
            imageBorderRadius={imageBorderRadius}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
            minting={minting}
            mintAllowedPerWallet={mintAllowedPerWallet}
            mintSuccessText={mintSuccessText}
            mintText={mintText}
            primaryBorderRadius={primaryBorderRadius}
            provider={provider}
            setMinting={setMinting}
            showClaimCount={showClaimCount}
            showDescription={showDescription}
            showMintIcon={showMintIcon}
            showTitle={showTitle}
            title={title}
            toast={toast}
            tokenDetails={tokenDetails}
            tokenId={tokenId}
            useMetamask={useMetamask}
            useWalletConnect={useWalletConnect}
            useWalletLink={useWalletLink}
          />
        )}

        {!loading && mode === "inventory" && showInventory && (
          <Inventory
            connectFunction={connectWallet}
            connectText={connectText}
            error={error}
            fallbackImage={fallbackImage}
            inventoryImageHeight={inventoryImageHeight}
            inventoryImageWidth={inventoryImageWidth}
            inventoryTitle={inventoryTitle}
            primaryBorderRadius={primaryBorderRadius}
            provider={provider}
            tokenBalance={tokenBalance}
            tokenDetails={tokenDetails}
            useMetamask={useMetamask}
            useWalletConnect={useWalletConnect}
            useWalletLink={useWalletLink}
          />
        )}
      </Center>

      <Footer
        footerImage={footerImage}
        footerUrl={footerUrl}
        showThirdwebLogo={showThirdwebLogo}
      />
    </Flex>
  );
}

export default Embed;
