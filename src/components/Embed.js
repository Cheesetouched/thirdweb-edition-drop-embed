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
  chainId,
  contract,
  height,
  hideDescription = false,
  hideThirdwebLogo = false,
  hideTitle = false,
  inventoryImageHeight,
  inventoryImageWidth,
  imageHeight,
  imageWidth,
  rpcUrl,
  tokenId,
  transactionRelayerUrl = null,
  width,
}) {
  const toast = useToast();
  const [mode, setMode] = useState("mint");
  const [loading, setLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [tokenDetails, setTokenDetails] = useState(null);
  const [claimConditions, setClaimConditions] = useState(null);
  const { address, connectWallet, disconnectWallet, error, provider } =
    useWeb3();

  const sdk = useMemo(() => {
    if (provider) {
      return new ThirdwebSDK(provider.getSigner(), { transactionRelayerUrl });
    }
    return null;
  }, [provider, transactionRelayerUrl]);

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
    (async () => {
      if (dropModule) {
        getTokenBalance();
      }
    })();
  }, [dropModule, getTokenBalance]);

  useEffect(() => {
    if (typeof chainId !== "number") {
      toast({
        title: "chainId is not provided",
        status: "error",
      });
    } else if (contract === undefined || contract === null) {
      toast({
        title: "contract is not provided",
        status: "error",
      });
    } else if (rpcUrl === undefined || rpcUrl === null) {
      toast({
        title: "rpcUrl is not provided",
        status: "error",
      });
    } else if (tokenId === undefined || tokenId === null) {
      toast({
        title: "tokenId is not provided",
        status: "error",
      });
    }
  }, [chainId, contract, rpcUrl, toast, tokenId]);

  return (
    <Flex
      borderColor="rgba(0,0,0,0.1)"
      borderWidth="1px"
      borderRadius="15px"
      bgColor="white"
      flexDirection="column"
      height={height}
      width={width}
    >
      <Header
        address={address}
        claimConditions={claimConditions}
        disconnectWallet={disconnectWallet}
        mode={mode}
        provider={provider}
        setMode={setMode}
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
            dropModule={dropModule}
            error={error}
            getDropDetails={getDropDetails}
            getTokenBalance={getTokenBalance}
            hideDescription={hideDescription}
            hideTitle={hideTitle}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
            provider={provider}
            toast={toast}
            tokenDetails={tokenDetails}
            tokenId={tokenId}
          />
        )}

        {!loading && mode === "inventory" && (
          <Inventory
            connectFunction={connectWallet}
            error={error}
            inventoryImageHeight={inventoryImageHeight}
            inventoryImageWidth={inventoryImageWidth}
            provider={provider}
            tokenDetails={tokenDetails}
          />
        )}
      </Center>

      <Footer hideThirdwebLogo={hideThirdwebLogo} />
    </Flex>
  );
}

export default Embed;
