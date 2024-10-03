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

/**
 * Props for the DocModal component.
 */
interface DocModalProps {
  /** Determines whether the modal is open or closed */
  isOpen: boolean;
  /** Function to call when the modal should be closed */
  onClose: () => void;
  /** The document to display in the modal */
  doc?: Doc;
}

/**
 * DocModal component displays a modal with document information.
 * It shows the document's title and thumbnail image.
 *
 * @param {DocModalProps} props - The props for the DocModal component
 * @returns {JSX.Element} The rendered DocModal component
 */
export const DocModal = ({ isOpen, onClose, doc }: DocModalProps) => {
  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{doc?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={doc?.thumbnail} alt={`Thumbnail for ${doc?.title}`} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DocModal;
