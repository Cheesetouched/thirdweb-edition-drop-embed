import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

import "./index.css";
import App from "./App";
import { getChainData } from "./utils/helper";

const dropOptions = {
  appName: "thirdweb - demo",
  appUrl: "https://thirdweb.com",
  chainId: 80001,
  contract: null,
  darkMode: false,
  rpcUrl: null,
  tokenId: 0,
  transactionRelayerUrl: null,
};

const supportedChainIds = [dropOptions.chainId];

const connectors = {
  injected: {},
  walletconnect: {
    chainId: dropOptions.chainId,
    rpc: {
      [dropOptions.chainId]:
        dropOptions.rpcUrl || getChainData(dropOptions.chainId).rpcUrl,
    },
  },
  walletlink: {
    appName: dropOptions.appName,
    darkMode: dropOptions.darkMode,
    url: dropOptions.appUrl,
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
          chainId={dropOptions.chainId}
          contract={dropOptions.contract}
          tokenId={dropOptions.tokenId}
          rpcUrl={connectors.walletconnect.rpc[dropOptions.chainId]}
          transactionRelayerUrl={dropOptions.transactionRelayerUrl}
        />
      </ChakraProvider>
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
