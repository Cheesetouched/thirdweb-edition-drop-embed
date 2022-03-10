import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

import "./index.css";
import App from "./App";
import { getChainData } from "./utils/helper";

const contractData = {
  chainId: 137,
};
const supportedChainIds = [1, 137];

const connectors = {
  injected: {},
  walletconnect: {
    chainId: contractData.chainId,
    rpc: {
      [contractData.chainId]:
        contractData.rpcUrl || getChainData(contractData.chainId).rpcUrl,
    },
  },
  walletlink: {
    appName: "thirdweb - demo",
    url: "https://thirdweb.com",
    darkMode: false,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <ChakraProvider>
        <App
          contractChainId
          height={600}
          imageHeight={178}
          imageWidth={178}
          width={600}
        />
      </ChakraProvider>
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
