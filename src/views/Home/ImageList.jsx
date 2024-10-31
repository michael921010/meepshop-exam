import { useCallback, useRef } from "react";
import { Box, Stack, TextField, ButtonBase, styled, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageIcon from "@mui/icons-material/Image";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/configs/drag-items";
import { ImageModel, TextModel } from "@/modules/model";
import { Image } from "@/components/common";

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
    <Box ref={dropRef} width="100%" height="100%">
      <Stack direction="row" spacing={2}>
        {images?.map((_card, i) => {
          const { image, text } = _card;

          return (
            <Stack
              key={i}
              p={1}
              direction="column"
              alignItems="center"
              spacing={2}
              sx={{ borderRadius: 2, border: "solid 1px", borderColor: "grey.200" }}
            >
              {image?.enabled && (
                <Box width={image?.width} height={image?.height}>
                  <Image
                    alt=""
                    src={image?.src}
                    width="100%"
                    height="100%"
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </Box>
              )}

              {text?.enabled && (
                <Box width={text?.width} height={text?.height}>
                  <Typography component="p">{text?.src ?? ""}</Typography>
                </Box>
              )}
            </Stack>
          );
        })}

        {!model?.image?.enabled && !model?.text?.enabled && isOver && canDrop && (
          <Stack
            p={1}
            direction="column"
            alignItems="center"
            spacing={2}
            sx={{ borderRadius: 2, border: "solid 1px", borderColor: "grey.200" }}
          >
            <Box
              width={ImageModel._width}
              height={ImageModel._height}
              sx={{ borderRadius: 1, bgcolor: "secondary.light" }}
            />

            <Box
              width={TextModel._width}
              height={TextModel._height}
              sx={{ borderRadius: 1, bgcolor: "secondary.light" }}
            />
          </Stack>
        )}

        {(model?.image?.enabled || model?.text?.enabled) && (
          <Stack
            p={1}
            direction="column"
            alignItems="center"
            spacing={2}
            sx={{ borderRadius: 2, border: "solid 1px", borderColor: "grey.200" }}
          >
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
                      src={URL.createObjectURL(model?.image?.src)}
                      width="100%"
                      height="100%"
                      sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  )}
                </ButtonBase>
              </Box>
            ) : (
              <Box
                width={ImageModel._width}
                height={ImageModel._height}
                sx={{ borderRadius: 1, bgcolor: "secondary.light" }}
              />
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
              <Box
                width={TextModel._width}
                height={TextModel._height}
                sx={{ borderRadius: 1, bgcolor: "secondary.light" }}
              />
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
