import { useCallback } from "react";
import { Box, Stack, styled } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/configs/drag-items";
import { ImageModel, TextModel } from "@/modules/model";
import { Card, CardImage, CardText } from "./Card";
import { usePage } from "./context";

const IconButton = styled(MuiIconButton)(() => ({
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: 1,
  transform: "translate(25%, -50%)",
  padding: 0,
}));

export default function ImageList() {
  const { state, dispatch } = usePage();

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: [ItemTypes.TEXT, ItemTypes.IMAGE],
    drop: (item) => {
      dispatch({ type: "move_model", slug: item.type });
    },
    // canDrop: (item) => item.columnIndex !== columnIndex,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleRemove = useCallback(
    (type) => () => {
      dispatch({ type: "remove_model", slug: type });
    },
    [dispatch]
  );

  return (
    <Box
      ref={dropRef}
      width="100%"
      height={400}
      p={2}
      sx={{
        borderRadius: 2,
        boxShadow: "0 0 0 1px",
        transition: (theme) =>
          `${theme.transitions.create(["background-color"], {
            duration: 300,
          })}`,

        ...(isOver &&
          canDrop && {
            bgcolor: "#99999994",
          }),
      }}
    >
      <Stack direction="row" spacing={2}>
        {state.images?.map((_card, i) => {
          const { image, text } = _card;

          return (
            <Card key={i}>
              {image?.enabled && (
                <CardImage
                  width={image?.width}
                  height={image?.height}
                  src={image?.src}
                  onChange={(model) =>
                    dispatch({
                      type: "update_card_in_image_list",
                      index: i,
                      slug: ItemTypes.IMAGE,
                      model,
                    })
                  }
                />
              )}

              {text?.enabled && (
                <CardText
                  width={text?.width}
                  height={text?.height}
                  src={text?.src}
                  onChange={(model) =>
                    dispatch({
                      type: "update_card_in_image_list",
                      index: i,
                      slug: ItemTypes.TEXT,
                      model,
                    })
                  }
                />
              )}
            </Card>
          );
        })}

        {!state.model?.image?.enabled && !state.model?.text?.enabled && isOver && canDrop && (
          <Card>
            <CardImage width={ImageModel._width} height={ImageModel._height} empty />

            <CardText width={TextModel._width} height={TextModel._height} empty />
          </Card>
        )}

        {(state.model?.image?.enabled || state.model?.text?.enabled) && (
          <Card>
            {state.model?.image?.enabled ? (
              <Box width={state.model?.image?.width} height={state.model?.image?.height} position="relative">
                <IconButton onClick={handleRemove(ItemTypes.IMAGE)}>
                  <CancelIcon />
                </IconButton>

                <CardImage
                  width={state.model?.image?.width}
                  height={state.model?.image?.height}
                  src={state.model?.image?.src}
                  onChange={(model) =>
                    dispatch({
                      type: "update_model",
                      slug: ItemTypes.IMAGE,
                      model,
                    })
                  }
                />
              </Box>
            ) : (
              <CardImage width={ImageModel._width} height={ImageModel._height} empty />
            )}

            {state.model?.text?.enabled ? (
              <Box width={state.model?.text?.width} height={state.model?.text?.height} position="relative">
                <IconButton onClick={handleRemove(ItemTypes.TEXT)}>
                  <CancelIcon />
                </IconButton>

                <CardText
                  width={state.model?.text?.width}
                  height={state.model?.text?.height}
                  src={state.model?.text?.src}
                  onChange={(model) =>
                    dispatch({
                      type: "update_model",
                      slug: ItemTypes.TEXT,
                      model,
                    })
                  }
                />
              </Box>
            ) : (
              <CardText width={TextModel._width} height={TextModel._height} empty />
            )}
          </Card>
        )}
      </Stack>
    </Box>
  );
}
