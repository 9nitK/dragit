import { useEffect, useState } from "react";
import { Doc } from "./types";
import DocCard from "./components/DocCard";
import { SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { debounce } from "../../utils";
import DocModal from "./components/DocModal";

/**
 * Home component
 * Displays a grid of document cards and handles document data management
 */
const Home = () => {
  // State for storing document data
  const [docData, setDocData] = useState<Doc[]>([]);
  // Chakra UI hook for managing modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  // State for storing the currently selected document
  const [selectedDoc, setSelectedDoc] = useState<Doc>();

  /**
   * Fetches document data from the server
   */
  const getDocData = async () => {
    try {
      const response = await fetch(`/docs`);
      const data: { docs: Doc[] } = await response.json();
      setDocData(data.docs);
    } catch (error) {
      console.log("Failed to fetch docs", error);
    }
  };

  /**
   * Saves updated document data to the server
   * @param newDocData - Updated array of documents
   */
  const saveDocData = async (newDocData: Doc[]) => {
    try {
      await fetch(`/docs`, {
        method: "POST",
        body: JSON.stringify({ docs: newDocData }),
      });
    } catch (error) {
      console.log("Failed to update docs", error);
    }
  };

  // Effect hook to fetch initial document data on component mount
  useEffect(() => {
    getDocData();
  }, []);

  /**
   * Updates the order of documents when a card is dragged and dropped
   * @param dragId - ID of the dragged document
   * @param hoverId - ID of the document being hovered over
   */
  const updateDocs = (dragId: string, hoverId: string) => {
    const dragCard = docData.find((doc) => doc.id === dragId);
    const hoverCard = docData.find((doc) => doc.id === hoverId);

    if (!dragCard || !hoverCard) {
      return;
    }
    const dragIndexInArray = docData.indexOf(dragCard);
    const hoverIndexInArray = docData.indexOf(hoverCard);

    let newDocData = [...docData];
    newDocData.splice(dragIndexInArray, 1);
    newDocData.splice(hoverIndexInArray, 0, dragCard);

    setDocData(newDocData);

    // Debounce the save operation to reduce server calls
    debounce(() => {
      saveDocData(newDocData);
    }, 1000)();
  };

  return (
    <SimpleGrid columns={3} spacing={10}>
      {docData?.map((doc) => (
        <DocCard
          key={doc.id}
          onClick={() => {
            setSelectedDoc(doc);
            onOpen();
          }}
          doc={doc}
          updateDocs={updateDocs}
        />
      ))}
      <DocModal isOpen={isOpen} onClose={onClose} doc={selectedDoc} />
    </SimpleGrid>
  );
};

export default Home;
