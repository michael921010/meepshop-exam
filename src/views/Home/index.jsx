import { useCallback } from "react";
import { Box, Stack, Container, Divider, Button } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Layer as DragLayer, DraggableText, DraggableImage } from "@/components/draggable";
import { Slick } from "@/components/common";
import { PageProvider, usePage } from "./context";
import ImageList from "./ImageList";
import { Card, CardImage, CardText } from "./Card";

function Home() {
  const { state, dispatch, updateValue } = usePage();

  const handleEdit = useCallback(
    (value) => () => {
      dispatch({ type: "reset_model" });
      updateValue("editing", value);
    },
    [updateValue, dispatch]
  );

  const handleSave = useCallback(() => {
    if (!!state.model.text.src || !!state.model.image.src) {
      dispatch({ type: "add_model", model: state.model });
    }

    dispatch({ type: "reset_model" });
    updateValue("editing", false);
  }, [state.model, updateValue, dispatch]);

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

              <ImageList />

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <DraggableText disabled={state.model?.text?.enabled} />
                <DraggableImage disabled={state.model?.image?.enabled} />
              </Stack>
            </DndProvider>
          ) : (
            <Box width="100%">
              <Slick
                infinite={state.images.length > 1}
                swipe={state.images.length > 1}
                autoplay
                centerMode
                arrows={false}
                sx={{
                  ".slick-slide": {
                    mx: 0.5,

                    ...(state.images.length > 1 && {
                      cursor: "move",
                    }),
                  },
                }}
              >
                {state.images?.map((_card, i) => {
                  const { image, text } = _card;

                  return (
                    <Stack key={i} width="100%" alignItems="center" justifyContent="center">
                      <Card>
                        {image?.enabled && (
                          <CardImage width={image?.width} height={image?.height} src={image?.src} disabled />
                        )}

                        {text?.enabled && (
                          <CardText width={text?.width} height={text?.height} src={text?.src} disabled />
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
