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
    chainId: getInt("chainId"),
    contract: params.get("contract"),
    description: params.get("description"),
    fallbackImage: params.get("fallbackImage"),
    footerImage: params.get("footerImage"),
    footerUrl: params.get("footerUrl"),
    height: getInt("height") || "100vh",
    hideClaimCount: getBool("hideClaimCount", false),
    hideDescription: getBool("hideDescription", false),
    hideThirdwebLogo: getBool("hideThirdwebLogo", false),
    hideTitle: getBool("hideTitle", false),
    imageBorderRadius: params.get("imageBorderRadius") || "20",
    imageHeight: getInt("imageHeight") || 178,
    imageWidth: getInt("imageWidth") || 178,
    inventoryTitle: params.get("inventoryTitle"),
    inventoryImageHeight: getInt("inventoryImageHeight") || 320,
    inventoryImageWidth: getInt("inventoryImageWidth") || 320,
    mintAllowedPerWallet: getInt("mintAllowedPerWallet") || 1,
    mintText: params.get("mintText"),
    rpcUrl: params.get("rpcUrl") || getChainData(getInt("chainId")).rpcUrl,
    showBalance: getBool("showBalance", true),
    showInventory: getBool("showInventory", true),
    showRemainingMints: getBool("showRemainingMints", true),
    showWallet: getBool("showWallet", true),
    title: params.get("title"),
    tokenId: getInt("tokenId"),
    relayer: params.get("relayer"),
    walletlinkAppName: params.get("walletlinkAppName") || "test",
    walletlinkAppUrl: params.get("walletlinkAppUrl") || "https://test.com",
    walletlinkDarkMode: getBool("walletlinkDarkMode", true),
    width: parseInt(params.get("width")) || "100vw",
  };
};
