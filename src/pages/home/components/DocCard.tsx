import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import { Doc } from "../types";

/**
 * Props for the DocCard component
 * @interface DocCardProps
 * @property {Doc} doc - The document object to display
 * @property {function} updateDocs - Function to update the order of documents
 * @property {function} onClick - Function to handle click events on the card
 */
interface DocCardProps {
  doc: Doc;
  updateDocs: (dragId: string, hoverId: string) => void;
  onClick: () => void;
}

/**
 * DocCard component - Displays a draggable card for a document
 * @param {DocCardProps} props - The props for the component
 * @returns {JSX.Element} The rendered DocCard component
 */
const DocCard = ({ doc, updateDocs, onClick }: DocCardProps) => {
  // Set up drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: "DOC",
    item: { id: doc.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  /**
   * Handles the hover event when dragging a card over another
   * @param {Object} item - The item being dragged
   * @param {string} item.id - The ID of the dragged item
   */
  const hoverItem = (item: { id: string }) => {
    const dragId = item.id;
    const hoverId = doc.id;
    // If the item being dragged is the same as the item being hovered over, do nothing.
    if (dragId === hoverId) {
      return;
    }

    updateDocs(dragId, hoverId);
  };

  // Set up drop functionality
  const [_collectedProps, drop] = useDrop({
    accept: "DOC",
    hover: hoverItem,
  });

  return (
    <Card
      maxW="lg"
      cursor={isDragging ? "move" : "pointer"}
      ref={(node) => drag(drop(node))} // Attach both drag and drop functionality to the card.
      opacity={isDragging ? 0.5 : 1} // Change the opacity while dragging.
      onClick={onClick}
    >
      <CardHeader>
        <Heading size="md">{doc.title}</Heading>
      </CardHeader>
      <CardBody>
        <Image
          src={doc.thumbnail}
          fallback={<Spinner />}
          fallbackSrc="https://via.placeholder.com/400"
          alt={doc.title}
          borderRadius="lg"
        />
      </CardBody>
    </Card>
  );
};

export default DocCard;
