export const getChainData = (chainId) => {
  let data;

  switch (chainId) {
    case 1:
      data = {
        name: "Ethereum",
      };
      break;

    case 4:
      data = {
        name: "Rinkeby",
      };
      break;

    case 137:
      data = {
        name: "Polygon",
      };
      break;

    case 80001:
      data = {
        name: "Mumbai",
      };
      break;

    default:
      data = null;
      break;
  }

  return data;
};
