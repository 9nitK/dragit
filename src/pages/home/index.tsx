import { useEffect, useState } from "react";
import { Doc } from "./types";
import DocCard from "./components/DocCard";
import { SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { debounce, swapPositionsAndReturnNewArray } from "../../utils";
import DocModal from "./components/DocModal";

const Home = () => {
  const [docData, setDocData] = useState<Doc[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDoc, setSelectedDoc] = useState<Doc>();

  const getDocData = async () => {
    try {
      const response = await fetch(`/docs`);
      const data: { docs: Doc[] } = await response.json();
      setDocData(data.docs);
    } catch (error) {
      console.log("Failed to fetch docs", error);
    }
  };

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

  useEffect(() => {
    // Getting the initial data
    getDocData();
  }, []);

  const updateDocs = (dragId: string, hoverId: string) => {
    const dragCard = docData.find((doc) => doc.id === dragId);
    const hoverCard = docData.find((doc) => doc.id === hoverId);

    if (!dragCard || !hoverCard) {
      return;
    }
    const dragIndexInArray = docData.indexOf(dragCard);
    const hoverIndexInArray = docData.indexOf(hoverCard);
    const newDocData = swapPositionsAndReturnNewArray(
      docData,
      dragIndexInArray,
      hoverIndexInArray
    );

    setDocData(newDocData);

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
