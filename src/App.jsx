import { useCallback, useState } from "react";
import { Box, Stack, Container, Divider } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ImageList from "./ImageList";
import DraggableText from "./DraggableText";
import DraggableImage from "./DraggableImage";
import { Layer as DragLayer } from "@/components/draggable";

export default function App() {
  const [model, setModel] = useState({});

  const handleMove = useCallback((type) => {
    setModel((_model) => ({ ..._model, [type]: "" }));
  }, []);

  const handleRemove = useCallback((type) => {
    setModel((_model) => ({ ..._model, [type]: undefined }));
  }, []);

  const handleChange = useCallback((type, value) => {
    setModel((_model) => ({ ..._model, [type]: value }));
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <DndProvider backend={HTML5Backend}>
          <DragLayer />

          <Box p={2} sx={{ borderRadius: 2, border: "1px solid", height: 400 }}>
            <ImageList model={model} onMove={handleMove} onRemove={handleRemove} onChange={handleChange} />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            <DraggableText />
            <DraggableImage />
          </Stack>
        </DndProvider>
      </Box>
    </Container>
  );
}
