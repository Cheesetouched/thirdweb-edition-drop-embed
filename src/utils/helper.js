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
