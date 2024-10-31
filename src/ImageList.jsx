import { useCallback, useRef } from "react";
import { Box, Stack, TextField, ButtonBase, styled } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageIcon from "@mui/icons-material/Image";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/configs/drag-items";
import { ImageModel, TextModel } from "@/components/draggable";
import { Image } from "@/components/common";

const IconButton = styled(MuiIconButton)(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: 1,
  transform: "translate(25%, -50%)",
  padding: 0,
}));

export default function ImageList({ model, onMove, onRemove, onChange }) {
  const fileRef = useRef();

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: [ItemTypes.TEXT, ItemTypes.IMAGE],
    drop: (item) => {
      onMove(item.type);
    },
    // canDrop: (item) => item.columnIndex !== columnIndex,
    // collect: (monitor) => ({
    //   isOver: monitor.isOver(),
    //   canDrop: monitor.canDrop(),
    // }),
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
      <Stack direction="column" alignItems="center" spacing={2}>
        {model?.image !== undefined && (
          <Box width={200} height={200} position="relative">
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

              {model?.image === "" ? (
                <ImageIcon />
              ) : (
                <Image
                  alt=""
                  src={URL.createObjectURL(model?.image)}
                  width="100%"
                  height="100%"
                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              )}
            </ButtonBase>
          </Box>
        )}

        {model?.text !== undefined && (
          <Box width={200} height={30} position="relative">
            <IconButton onClick={handleRemove(ItemTypes.TEXT)}>
              <CancelIcon />
            </IconButton>

            <TextField
              size="small"
              placeholder="Please write down some text."
              value={model?.text ?? ""}
              onChange={handleText}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}
