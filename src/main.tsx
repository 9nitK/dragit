import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

async function enableMocking() {
  const { worker } = await import("./mockAPI/browser.ts");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking()
  .then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <ChakraProvider>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </ChakraProvider>
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error("Failed to enable mocking", error);
  });
