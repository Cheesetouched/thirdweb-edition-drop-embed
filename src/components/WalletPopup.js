import { useEffect } from "react";
import { IoCopy } from "react-icons/io5";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { formatAddress } from "../utils/helper";

export default function WalletPopup({
  address,
  disconnectWallet,
  isOpen,
  onClose,
  provider,
  toast,
}) {
  useEffect(() => {
    if (!provider) {
      onClose();
    }
  }, [provider]);

  return (
    <>
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
                onClick={() => {
                  navigator.clipboard.writeText(address);
                  toast({
                    isClosable: true,
                    status: "success",
                    title: "Address copied to clipboard",
                  });
                }}
                size="sm"
                variant="outline"
              >
                <IoCopy />
              </Button>

              <Button
                borderRadius={0}
                fontSize={12}
                onClick={() => {
                  navigator.clipboard.writeText(address);
                  toast({
                    title: "Address copied to clipboard",
                    status: "success",
                    isClosable: true,
                  });
                }}
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
