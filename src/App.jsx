import { useCallback, useState } from "react";
import { Box, Stack, Container, Divider } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ImageList from "./ImageList";
import { Layer as DragLayer, DraggableText, DraggableImage } from "@/components/draggable";
import { ImageModel, TextModel, Card } from "@/modules/model";
import { ItemTypes } from "@/configs/drag-items";

export default function App() {
  const [images, setImages] = useState([
    new Card({
      text: new TextModel("This is Meepshop.", { enabled: true }),
      image: new ImageModel("https://www.meepshop.com/meepshop_favicon.png", { enabled: true }),
    }),
  ]);

  const [model, setModel] = useState(new Card());

  const handleMove = useCallback((type) => {
    setModel((_model) => {
      const newModel = new Card({
        text: _model.text,
        image: _model.image,
      });

      switch (type) {
        case ItemTypes.TEXT: {
          newModel.text = new TextModel("", { enabled: true });
          break;
        }
        case ItemTypes.IMAGE: {
          newModel.image = new ImageModel(null, { enabled: true });
          break;
        }
        default:
          break;
      }
      return newModel;
    });
  }, []);

  const handleRemove = useCallback((type) => {
    setModel((_model) => {
      const newModel = new Card({
        text: _model.text,
        image: _model.image,
      });

      switch (type) {
        case ItemTypes.TEXT: {
          newModel.text = new TextModel("", { enabled: false });
          break;
        }
        case ItemTypes.IMAGE: {
          newModel.image = new ImageModel(null, { enabled: false });
          break;
        }
        default:
          break;
      }
      return newModel;
    });
  }, []);

  const handleChange = useCallback((type, value) => {
    setModel((_model) => {
      const newModel = new Card({
        text: _model.text,
        image: _model.image,
      });

      switch (type) {
        case ItemTypes.TEXT: {
          newModel.text = new TextModel(value, { enabled: _model.text.enabled });
          break;
        }
        case ItemTypes.IMAGE: {
          newModel.image = new ImageModel(value, { enabled: _model.image.enabled });
          break;
        }
        default:
          break;
      }
      return newModel;
    });
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <DndProvider backend={HTML5Backend}>
          <DragLayer />

          <Box p={2} sx={{ borderRadius: 2, border: "1px solid", height: 400 }}>
            <ImageList
              images={images}
              model={model}
              onMove={handleMove}
              onRemove={handleRemove}
              onChange={handleChange}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            <DraggableText disabled={model?.text?.enabled} />
            <DraggableImage disabled={model?.image?.enabled} />
          </Stack>
        </DndProvider>
      </Box>
    </Container>
  );
}
