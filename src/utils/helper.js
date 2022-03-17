export const formatAddress = (address) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
    address.length
  )}`;
};

export const getChainData = (chainId) => {
  let data;

  switch (chainId) {
    case 1:
      data = {
        name: "Ethereum",
        rpcUrl: "https://main-light.eth.linkpool.io/",
      };
      break;

    case 4:
      data = {
        name: "Rinkeby",
        rpcUrl: "https://rinkeby-light.eth.linkpool.io/",
      };
      break;

    case 137:
      data = {
        name: "Polygon",
        rpcUrl: "https://polygon-rpc.com",
      };
      break;

    case 250:
      data = {
        name: "Fantom",
        rpcUrl: "https://rpc.ftm.tools",
      };
      break;

    case 43114:
      data = {
        name: "Avalanche",
        rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
      };
      break;

    case 80001:
      data = {
        name: "Mumbai",
        rpcUrl: "https://rpc-mumbai.matic.today",
      };
      break;

    default:
      data = null;
      break;
  }

  return data;
};

export const processQueryParams = (params) => {
  const getInt = (param) => parseInt(params.get(param));

  const getBool = (param, defaultVal) => {
    const paramExists = params.get(param);
    return paramExists ? JSON.parse(paramExists.toLowerCase()) : defaultVal;
  };

  return {
    borderRadius: getInt("borderRadius") || 15,
    borderColor: params.get("borderColor") || "rgba(0,0,0,0.1)",
    chainId: getInt("chainId") || 1,
    claimCountColor: params.get("claimCountColor") || "#00742E",
    connectText: params.get("connectText") || "Connect Wallet",
    contract: params.get("contract"),
    description: params.get("description"),
    descriptionTextAlign: params.get("descriptionTextAlign") || "center",
    descriptionColor: params.get("descriptionColor") || "#272E36",
    fallbackImage: params.get("fallbackImage"),
    footerImage: params.get("footerImage"),
    footerUrl: params.get("footerUrl"),
    height: getInt("height") || "100vh",
    imageBorderRadius: params.get("imageBorderRadius") || "20",
    imageHeight: getInt("imageHeight") || 178,
    imageWidth: getInt("imageWidth") || 178,
    inventoryTitle: params.get("inventoryTitle"),
    inventoryImageHeight: getInt("inventoryImageHeight") || 318,
    inventoryImageWidth: getInt("inventoryImageWidth") || 318,
    loaderColor: params.get("loaderColor") || "#1A202C",
    mintAllowedPerWallet: getInt("mintAllowedPerWallet") || 1,
    mintSuccessText: params.get("mintSuccessText") || "Minted successfully!",
    mintText: params.get("mintText"),
    overrideMint: params.get("overrideMint"),
    overrideInventory: params.get("overrideInventory"),
    primaryActiveColor: params.get("primaryActiveColor") || "#0369A1",
    primaryBorderRadius: getInt("primaryBorderRadius") || 6,
    primaryColor: params.get("primaryColor") || "#0EA5E9",
    primaryHoverColor: params.get("primaryHoverColor") || "#0284C7",
    secondaryColor: params.get("secondaryColor") || "#FFFFFF",
    relayer: params.get("relayer"),
    rpcUrl: params.get("rpcUrl") || getChainData(getInt("chainId") || 1).rpcUrl,
    showBalance: getBool("showBalance", true),
    showClaimCount: getBool("showClaimCount", true),
    showDescription: getBool("showDescription", true),
    showInventory: getBool("showInventory", true),
    showMintIcon: getBool("showMintIcon", true),
    showRemainingMints: getBool("showRemainingMints", true),
    showThirdwebLogo: getBool("showThirdwebLogo", true),
    showTitle: getBool("showTitle", true),
    showWallet: getBool("showWallet", true),
    tabActiveTextColor: params.get("tabActiveTextColor") || "#3A3A3C",
    tabInactiveTextColor: params.get("tabInactiveTextColor") || "#AEAEB2",
    title: params.get("title"),
    titleColor: params.get("titleColor") || "#272E36",
    tokenId: getInt("tokenId"),
    useMetamask: getBool("useMetamask", true),
    useWalletConnect: getBool("useWalletConnect", true),
    useWalletLink: getBool("useWalletLink", true),
    walletlinkAppName: params.get("walletlinkAppName") || "test",
    walletlinkAppUrl: params.get("walletlinkAppUrl") || "https://test.com",
    walletlinkDarkMode: getBool("walletlinkDarkMode", true),
    width: parseInt(params.get("width")) || "100vw",
  };
};
