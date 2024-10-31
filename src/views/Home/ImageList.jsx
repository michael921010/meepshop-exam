import { useCallback, useRef } from "react";
import { Box, Stack, TextField, ButtonBase, styled } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageIcon from "@mui/icons-material/Image";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/configs/drag-items";
import { ImageModel, TextModel } from "@/modules/model";
import { Image } from "@/components/common";
import { Card, CardImage, CardText } from "./Card";

const IconButton = styled(MuiIconButton)(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: 1,
  transform: "translate(25%, -50%)",
  padding: 0,
}));

export default function ImageList({ images, model, onMove, onRemove, onChange }) {
  const fileRef = useRef();

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: [ItemTypes.TEXT, ItemTypes.IMAGE],
    drop: (item) => {
      onMove(item.type);
    },
    // canDrop: (item) => item.columnIndex !== columnIndex,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleRemove = useCallback(
    (type) => () => {
      onRemove?.(type);
    },
    [onRemove]
  );

  const handleText = useCallback(
    (evt) => {
      const val = evt.target.value;
      onChange?.(ItemTypes.TEXT, val);
    },
    [onChange]
  );

  const handleImage = useCallback(
    (evt) => {
      const filePath = fileRef.current?.value;

      // const folderPath = filePath.match(/(.*)[\/\\]/)?.[1] || "";
      const file = evt.target.files?.[0];

      if (file) {
        onChange?.(ItemTypes.IMAGE, file);
      }

      fileRef.current.value = "";
    },
    [onChange]
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
        {images?.map((_card, i) => {
          const { image, text } = _card;

          return (
            <Card key={i}>
              {image?.enabled && <CardImage width={image?.width} height={image?.height} src={image?.src} enabled />}

              {text?.enabled && <CardText width={text?.width} height={text?.height} src={text?.src} enabled />}
            </Card>
          );
        })}

        {!model?.image?.enabled && !model?.text?.enabled && isOver && canDrop && (
          <Card>
            <CardImage width={ImageModel._width} height={ImageModel._height} />

            <CardText width={TextModel._width} height={TextModel._height} />
          </Card>
        )}

        {(model?.image?.enabled || model?.text?.enabled) && (
          <Card>
            {model?.image?.enabled ? (
              <Box width={model?.image?.width} height={model?.image?.height} position="relative">
                <IconButton onClick={handleRemove(ItemTypes.IMAGE)}>
                  <CancelIcon />
                </IconButton>

                <ButtonBase
                  component="label"
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 1,
                    bgcolor: "grey.200",
                  }}
                >
                  <input ref={fileRef} hidden type="file" accept="image/*" onChange={handleImage} />

                  {model?.image?.src === null ? (
                    <ImageIcon />
                  ) : (
                    <Image
                      alt=""
                      src={model?.image?.src}
                      width="100%"
                      height="100%"
                      sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  )}
                </ButtonBase>
              </Box>
            ) : (
              <CardImage width={ImageModel._width} height={ImageModel._height} />
            )}

            {model?.text?.enabled ? (
              <Box width={model?.text?.width} height={model?.text?.height} position="relative">
                <IconButton onClick={handleRemove(ItemTypes.TEXT)}>
                  <CancelIcon />
                </IconButton>

                <TextField
                  size="small"
                  placeholder="Please write down some text."
                  value={model?.text?.src ?? ""}
                  onChange={handleText}
                />
              </Box>
            ) : (
              <CardText width={TextModel._width} height={TextModel._height} />
            )}
          </Card>
        )}
      </Stack>
    </Box>
  );
}
