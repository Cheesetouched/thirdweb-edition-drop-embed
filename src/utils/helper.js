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
    chainId: getInt("chainId"),
    contract: params.get("contract"),
    height: getInt("height") || 600,
    hideDescription: getBool("hideDescription", false),
    hideThirdwebLogo: getBool("hideThirdwebLogo", false),
    hideTitle: getBool("hideTitle", false),
    imageHeight: getInt("imageHeight") || 178,
    imageWidth: getInt("imageWidth") || 178,
    inventoryImageHeight: getInt("inventoryImageHeight") || 320,
    inventoryImageWidth: getInt("inventoryImageWidth") || 320,
    mintAllowedPerWallet: getInt("mintAllowedPerWallet") || 1,
    rpcUrl: params.get("rpcUrl") || getChainData(getInt("chainId")).rpcUrl,
    showInventory: getBool("showInventory", true),
    tokenId: getInt("tokenId"),
    relayer: params.get("relayer"),
    walletlinkAppName: params.get("walletlinkAppName") || "test",
    walletlinkAppUrl: params.get("walletlinkAppUrl") || "https://test.com",
    walletlinkDarkMode: getBool("walletlinkDarkMode", true),
    width: parseInt(params.get("width")) || 600,
  };
};
