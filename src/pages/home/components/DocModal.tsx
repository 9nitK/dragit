import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Doc } from "../types";

interface DocModalProps {
  isOpen: boolean;
  onClose: () => void;
  doc?: Doc;
}

export const DocModal = ({ isOpen, onClose, doc }: DocModalProps) => {
  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{doc?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={doc?.thumbnail} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default DocModal;
