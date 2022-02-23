import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { getChainData } from "../utils/helper";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useWeb3, useSwitchNetwork } from "@3rdweb/hooks";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import {
  Alert,
  AlertDescription,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";

function Embed({
  contractChainId,
  height,
  hideTitle = false,
  hideDescription = false,
  hideThirdwebLogo = false,
  imageHeight,
  imageWidth,
  width,
}) {
  const { connectWallet, error } = useWeb3();
  const { switchNetwork } = useSwitchNetwork();
  const [connecting, setConnecting] = useState(null);

  if (!contractChainId) {
    throw new Error("contractChainId is required");
  }

  useEffect(() => {
    if (error) {
      setConnecting(null);
    }
  }, [error?.name]);

  return (
    <Center bgColor="#F5F6F8" height="100vh">
      <Flex
        borderColor="rgba(0,0,0,0.1)"
        borderWidth="1px"
        borderRadius="15px"
        bgColor="white"
        flexDirection="column"
        height={height}
        width={width}
      >
        <Flex marginX={7}>
          <Button
            borderRadius={0}
            borderTop="4px solid transparent"
            borderBottom="4px solid"
            borderBottomColor="#0EA5E9"
            color="#3A3A3C"
            fontWeight="bold"
            height="48px"
            _hover={{ textDecoration: "none" }}
            variant="link"
          >
            Mint (1,109)
          </Button>
        </Flex>

        <Divider />

        <Center flex={1} paddingX="28px">
          <Flex align="center" direction="column">
            <Box
              borderRadius="20px"
              flexDirection="column"
              height={imageHeight}
              overflow="hidden"
              width={imageWidth}
            >
              <Image
                alt="preview"
                src="https://cloudflare-ipfs.com/ipfs/QmbNx2NpkHgmRmB4PawZjxnkHWTD7oAkTwBemwXKvWq1qT/0.gif"
              />
            </Box>

            {!hideTitle && (
              <Text
                color="#272E36"
                fontSize="28px"
                fontWeight="bold"
                marginTop={2.5}
              >
                Football is life
              </Text>
            )}

            {!hideDescription && (
              <Text color="#272E36" fontWeight={500} noOfLines={2} mt={2.5}>
                Football fans are a special breed. We follow and support our
                favourite players and clubs. We cry when they lose and party
                when they win. This deserves it's own place. We're building it.
                You, are the first ones to be a part of this space. You will be
                the first to use the product when we launch and will always be
                known as the folks who were here first. Welcome to Bantr!
              </Text>
            )}

            {error?.name !== "UnsupportedChainIdError" && (
              <Popover matchWidth closeOnBlur={!connecting}>
                <PopoverTrigger>
                  <Button
                    _active={{
                      backgroundColor: "#0369A1",
                    }}
                    backgroundColor="#0EA5E9"
                    color="white"
                    _hover={{ backgroundColor: "#0369A1" }}
                    isFullWidth
                    isLoading={connecting}
                    mt={5}
                    rightIcon={<FiChevronDown />}
                    size="md"
                  >
                    Connect Wallet
                  </Button>
                </PopoverTrigger>

                <PopoverContent width="100%">
                  <HStack padding="8px">
                    <Button
                      flexGrow={1}
                      fontSize="xs"
                      isLoading={connecting === "metamask"}
                      leftIcon={<Image boxSize={6} src="/metamask.svg" />}
                      onClick={() => {
                        setConnecting("metamask");
                        connectWallet("injected");
                      }}
                      size="sm"
                      variant="outline"
                    >
                      MetaMask
                    </Button>

                    <Button
                      flexGrow={1}
                      fontSize="xs"
                      isLoading={connecting === "walletconnect"}
                      leftIcon={<Image boxSize={6} src="/walletconnect.svg" />}
                      onClick={() => {
                        setConnecting("walletconnect");
                        connectWallet("walletconnect");
                      }}
                      size="sm"
                      variant="outline"
                    >
                      WalletConnect
                    </Button>

                    <Button
                      flexGrow={1}
                      fontSize="xs"
                      isLoading={connecting === "walletlink"}
                      leftIcon={<Image boxSize={6} src="/coinbase.svg" />}
                      onClick={() => {
                        setConnecting("walletlink");
                        connectWallet("walletlink");
                      }}
                      size="sm"
                      variant="outline"
                    >
                      Coinbase Wallet
                    </Button>
                  </HStack>
                </PopoverContent>
              </Popover>
            )}

            {error?.name === "UnsupportedChainIdError" && (
              <VStack>
                <Button
                  _active={{
                    backgroundColor: "orange.600",
                  }}
                  backgroundColor="#F97316"
                  color="white"
                  _hover={{ backgroundColor: "orange.600" }}
                  isFullWidth
                  mt={5}
                  onClick={() => switchNetwork(contractChainId)}
                  leftIcon={<HiOutlineSwitchHorizontal />}
                  size="md"
                >
                  Switch Network to {getChainData(contractChainId).name}
                </Button>

                <Alert
                  borderColor="#FFEDD5"
                  borderWidth="1px"
                  backgroundColor="#FFF7ED"
                  borderRadius={5}
                  color="#9A3412"
                  fontSize={14}
                  padding="10px"
                  status="info"
                >
                  <AiOutlineInfoCircle color="#FB923C" size={35} />
                  <AlertDescription ml={2.5}>
                    <VStack>
                      <Text>
                        You are currently connected to the wrong network. Please
                        switch your network to continue.
                      </Text>

                      <Text>
                        If you are using wallet connect or coinbase wallet, you
                        may need to manually switch networks on your app.
                      </Text>
                    </VStack>
                  </AlertDescription>
                </Alert>
              </VStack>
            )}
          </Flex>
        </Center>

        {!hideThirdwebLogo && (
          <Flex height="48px">
            <Flex
              alignItems="center"
              justifyContent="flex-end"
              mx="28px"
              width="100%"
            >
              <Image
                boxSize={6}
                _hover={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    "https://thirdweb.com/?utm_source=embed",
                    "_blank"
                  )
                }
                src="/thirdweb.svg"
              />
            </Flex>
          </Flex>
        )}
      </Flex>
    </Center>
  );
}

export default Embed;
