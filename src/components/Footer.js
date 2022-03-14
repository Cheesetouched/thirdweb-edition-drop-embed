import { Flex, Image } from "@chakra-ui/react";

export default function Footer({ footerImage, footerUrl, hideThirdwebLogo }) {
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
              boxSize={7}
              _hover={{ cursor: "pointer" }}
              onClick={() =>
                window.open(
                  `${
                    footerUrl
                      ? footerUrl
                      : "https://thirdweb.com/?utm_source=embed"
                  }`,
                  "_blank"
                )
              }
              src={footerImage ? footerImage : "./thirdweb.svg"}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
}
