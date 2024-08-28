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

interface DocCardProps {
  doc: Doc;
  updateDocs: (dragId: string, hoverId: string) => void;
  onClick: () => void;
}

const DocCard = ({ doc, updateDocs, onClick }: DocCardProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "DOC",
    item: { id: doc.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const hoverItem = (item: { id: string }) => {
    const dragId = item.id;
    const hoverId = doc.id;
    // If the item being dragged is the same as the item being hovered over, do nothing.
    if (dragId === hoverId) {
      return;
    }

    updateDocs(dragId, hoverId);
  };

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
