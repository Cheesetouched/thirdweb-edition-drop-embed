import { FiChevronDown } from "react-icons/fi";
import {
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
} from "@chakra-ui/react";

function Embed() {
  return (
    <Center bgColor="#F5F6F8" height="100vh">
      <Flex
        borderColor="rgba(0,0,0,0.1)"
        borderWidth="1px"
        borderRadius="15px"
        bgColor="white"
        flexDirection="column"
        height={600}
        width={600}
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
              height={178}
              overflow="hidden"
              width={178}
            >
              <Image
                alt="preview"
                src="https://cloudflare-ipfs.com/ipfs/QmbNx2NpkHgmRmB4PawZjxnkHWTD7oAkTwBemwXKvWq1qT/0.gif"
              />
            </Box>

            <Text
              color="#272E36"
              fontSize="28px"
              fontWeight="bold"
              marginTop={2.5}
            >
              Football is life
            </Text>

            <Text color="#272E36" fontWeight={500} noOfLines={2} mt={2.5}>
              Football fans are a special breed. We follow and support our
              favourite players and clubs. We cry when they lose and party when
              they win. This deserves it's own place. We're building it. You,
              are the first ones to be a part of this space. You will be the
              first to use the product when we launch and will always be known
              as the folks who were here first. Welcome to Bantr!
            </Text>

            <Popover matchWidth>
              <PopoverTrigger>
                <Button
                  _active={{
                    backgroundColor: "#0369A1",
                  }}
                  backgroundColor="#0EA5E9"
                  color="white"
                  _hover={{ backgroundColor: "#0369A1" }}
                  isFullWidth
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
                    leftIcon={<Image boxSize={6} src="/metamask.svg" />}
                    size="sm"
                    variant="outline"
                  >
                    MetaMask
                  </Button>

                  <Button
                    flexGrow={1}
                    fontSize="xs"
                    leftIcon={<Image boxSize={6} src="/walletconnect.svg" />}
                    size="sm"
                    variant="outline"
                  >
                    WalletConnect
                  </Button>

                  <Button
                    flexGrow={1}
                    fontSize="xs"
                    leftIcon={<Image boxSize={6} src="/coinbase.svg" />}
                    size="sm"
                    variant="outline"
                  >
                    Coinbase Wallet
                  </Button>
                </HStack>
              </PopoverContent>
            </Popover>
          </Flex>
        </Center>

        <Flex height="48px">
          <Flex
            alignItems="center"
            _hover={{ cursor: "pointer" }}
            justifyContent="flex-end"
            mx="28px"
            onClick={() =>
              window.open("https://thirdweb.com/?utm_source=embed", "_blank")
            }
            width="100%"
          >
            <Image boxSize={6} src="/thirdweb.svg" />
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
}

export default Embed;
