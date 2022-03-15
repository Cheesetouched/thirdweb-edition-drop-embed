import React from "react";
import ReactDOM from "react-dom";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "./index.css";
import Embed from "./components/Embed";
import { getChainData, processQueryParams } from "./utils/helper";

const params = new URLSearchParams(window.location.search);
const dropOptions = processQueryParams(params);
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
    appName: dropOptions.walletlinkAppName,
    darkMode: dropOptions.walletlinkDarkMode,
    url: dropOptions.walletlinkAppUrl,
  },
};

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "transparent",
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <ChakraProvider theme={theme}>
        <Embed {...dropOptions} />
      </ChakraProvider>
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
