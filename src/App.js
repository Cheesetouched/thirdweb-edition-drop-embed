import { Center } from "@chakra-ui/react";

import Embed from "./components/Embed";

function App({ chainId, contract, rpcUrl, tokenId, transactionRelayerUrl }) {
  return (
    <Center bgColor="#F5F6F8" height="100vh">
      <Embed
        chainId={chainId}
        contract={contract}
        height={600}
        inventoryImageHeight={320}
        inventoryImageWidth={320}
        imageHeight={178}
        imageWidth={178}
        rpcUrl={rpcUrl}
        tokenId={tokenId}
        transactionRelayerUrl={transactionRelayerUrl}
        width={600}
      />
    </Center>
  );
}

export default App;
