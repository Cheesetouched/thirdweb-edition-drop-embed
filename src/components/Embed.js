import { IoCopy } from "react-icons/io5";
import { FaRegGem } from "react-icons/fa";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { FiChevronDown } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useEffect, useMemo, useState } from "react";
import { useWeb3, useSwitchNetwork } from "@3rdweb/hooks";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { formatAddress, getChainData } from "../utils/helper";
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
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
  transactionRelayerUrl = null,
  width,
}) {
  const toast = useToast();
  const { switchNetwork } = useSwitchNetwork();
  const [connecting, setConnecting] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address, disconnectWallet, connectWallet, error, provider } =
    useWeb3();

  if (!contractChainId) {
    throw new Error("contractChainId is required");
  }

  const sdk = useMemo(() => {
    if (provider) {
      (async () => {
        const sdk = new ThirdwebSDK(provider.getSigner());
        const test = sdk.getBundleDropModule(
          "0x959676c53BE5e3Be7F5E61cc990dD960fa69f406"
        );
        console.log(await test.getMetadata());
      })();
    }
    return undefined;
  }, [provider]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (error) {
      setConnecting(null);
    }
  }, [error]);

  useEffect(() => {
    (async () => {
      if (provider) {
        setConnecting(false);
        const balance = await provider.getBalance(address);
        console.log(parseInt(balance._hex));
      }
    })();
  }, [address, provider]);

  return (
    <>
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
          <Flex marginX="28px">
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
              Mint {provider && "(1109)"}
            </Button>

            {address && provider && (
              <Flex alignItems="center" flex={1} justifyContent="flex-end">
                <Button
                  fontSize={12}
                  leftIcon={<IoWalletOutline color="#AEAEB2" size={16} />}
                  onClick={onOpen}
                  size="sm"
                  variant="outline"
                >
                  {formatAddress(address)}
                </Button>
              </Flex>
            )}
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
                  when they win. This deserves it's own place. We're building
                  it. You, are the first ones to be a part of this space. You
                  will be the first to use the product when we launch and will
                  always be known as the folks who were here first. Welcome to
                  Bantr!
                </Text>
              )}

              {error?.name !== "UnsupportedChainIdError" && provider && (
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
                  leftIcon={<FaRegGem />}
                  size="md"
                >
                  Mint (Free)
                </Button>
              )}

              {error?.name !== "UnsupportedChainIdError" && !provider && (
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
                        leftIcon={
                          <Image boxSize={6} src="/walletconnect.svg" />
                        }
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
                    <AlertDescription ml={3}>
                      <VStack>
                        <Text>
                          You are currently connected to the wrong network.
                          Please switch your network to continue.
                        </Text>

                        <Text>
                          If you are using wallet connect or coinbase wallet,
                          you may need to manually switch networks on your app.
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

      {provider && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent backgroundColor="#F2F2F7">
            <ModalCloseButton />
            <ModalHeader fontSize={16}>Account Details</ModalHeader>
            <ModalBody mb={5}>
              <Button
                borderTopRightRadius={0}
                borderBottomRightRadius={0}
                onClick={() =>
                  toast({
                    title: "Address copied to clipboard",
                    status: "success",
                    isClosable: true,
                  })
                }
                size="sm"
                variant="outline"
              >
                <IoCopy />
              </Button>

              <Button
                borderRadius={0}
                fontSize={12}
                onClick={() =>
                  toast({
                    title: "Address copied to clipboard",
                    status: "success",
                    isClosable: true,
                  })
                }
                size="sm"
                variant="outline"
              >
                {formatAddress(address)}
              </Button>

              <Button
                _active={{ backgroundColor: "#DC2626" }}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
                backgroundColor="#EF4444"
                color="white"
                _hover={{ backgroundColor: "#DC2626" }}
                fontSize={12}
                onClick={() => disconnectWallet()}
                size="sm"
              >
                Disconnect
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default Embed;
