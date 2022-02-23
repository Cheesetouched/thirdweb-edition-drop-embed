import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

import "./index.css";
import App from "./App";

const supportedChainIds = [137];

const connectors = {
  injected: {},
  walletconnect: {
    rpc: {
      1: "https://polygon-mainnet.infura.io/v3/1419eeee49ac441183a8bdbe716d232f",
      4: "https://polygon-mainnet.infura.io/v3/1419eeee49ac441183a8bdbe716d232f",
      137: "https://polygon-mainnet.infura.io/v3/1419eeee49ac441183a8bdbe716d232f",
      80001:
        "https://polygon-mainnet.infura.io/v3/1419eeee49ac441183a8bdbe716d232f",
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
          contractChainId={137}
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
