import { useCallback, useMemo, useState } from "react";
import { Box, Stack, Container, Divider, Button } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Layer as DragLayer, DraggableText, DraggableImage } from "@/components/draggable";
import { ImageModel, TextModel, CardModel } from "@/modules/model";
import { ItemTypes } from "@/configs/drag-items";
import { Slick } from "@/components/common";
import { PageProvider, usePage } from "./context";
import ImageList from "./ImageList";
import { Card, CardImage, CardText } from "./Card";

function Home() {
  const { state, updateValue } = usePage();

  const [images, setImages] = useState([
    new CardModel({
      text: new TextModel("This is Meepshop.", { enabled: true }),
      image: new ImageModel("https://www.meepshop.com/meepshop_favicon.png", { enabled: true }),
    }),
  ]);
  const [model, setModel] = useState(new CardModel());

  const handleMove = useCallback((type) => {
    setModel((_model) => {
      const newModel = new CardModel({
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
      const newModel = new CardModel({
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
      const newModel = new CardModel({
        text: _model.text,
        image: _model.image,
      });

      switch (type) {
        case ItemTypes.TEXT: {
          newModel.text = new TextModel(value, { enabled: _model.text.enabled });
          break;
        }
        case ItemTypes.IMAGE: {
          newModel.image = new ImageModel(URL.createObjectURL(value), { enabled: _model.image.enabled });
          break;
        }
        default:
          break;
      }
      return newModel;
    });
  }, []);

  const handleEdit = useCallback(
    (value) => () => {
      setModel(new CardModel());
      updateValue("editing", value);
    },
    [updateValue]
  );

  const handleSave = useCallback(() => {
    if (!!model.text.src || !!model.image.src) {
      setImages((_images) => [..._images, model]);
    }

    setModel(new CardModel());
    updateValue("editing", false);
  }, [model, updateValue]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" justifyContent="end">
            {state.editing ? (
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button size="small" variant="contained" color="error" onClick={handleEdit(false)}>
                  Cancel
                </Button>

                <Button size="small" variant="contained" color="success" onClick={handleSave}>
                  Save
                </Button>
              </Stack>
            ) : (
              <Button size="small" variant="contained" onClick={handleEdit(true)}>
                Edit
              </Button>
            )}
          </Stack>

          {state.editing ? (
            <DndProvider backend={HTML5Backend}>
              <DragLayer />

              <ImageList
                images={images}
                model={model}
                onMove={handleMove}
                onRemove={handleRemove}
                onChange={handleChange}
              />

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <DraggableText disabled={model?.text?.enabled} />
                <DraggableImage disabled={model?.image?.enabled} />
              </Stack>
            </DndProvider>
          ) : (
            <Box width="100%">
              <Slick
                infinite={images.length > 1}
                swipe={images.length > 1}
                autoplay
                centerMode
                arrows={false}
                sx={{
                  ".slick-slide": {
                    mx: 0.5,

                    ...(images.length > 1 && {
                      cursor: "move",
                    }),
                  },
                }}
              >
                {images?.map((_card, i) => {
                  const { image, text } = _card;

                  return (
                    <Stack key={i} width="100%" alignItems="center" justifyContent="center">
                      <Card>
                        {image?.enabled && (
                          <CardImage width={image?.width} height={image?.height} src={image?.src} enabled />
                        )}

                        {text?.enabled && (
                          <CardText width={text?.width} height={text?.height} src={text?.src} enabled />
                        )}
                      </Card>
                    </Stack>
                  );
                })}
              </Slick>
            </Box>
          )}
        </Stack>
      </Box>
    </Container>
  );
}

export default function Page() {
  return (
    <PageProvider>
      <Home />
    </PageProvider>
  );
}
