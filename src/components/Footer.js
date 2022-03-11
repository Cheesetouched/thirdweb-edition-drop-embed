import { Flex, Image } from "@chakra-ui/react";

export default function Footer({ hideThirdwebLogo }) {
  return (
    <>
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
                window.open("https://thirdweb.com/?utm_source=embed", "_blank")
              }
              src="/thirdweb.svg"
            />
          </Flex>
        </Flex>
      )}
    </>
  );
}
