import { Box, Stack } from "@mui/material";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/configs/drag-items";
import { ImageModel, TextModel } from "@/components/draggable";

export default function ImageList({ model, onMove }) {
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

  return (
    <Box ref={dropRef} width="100%" height="100%">
      <Stack direction="column" alignItems="center" spacing={2}>
        {model?.image !== undefined && (
          <Box width={150} height={150}>
            <ImageModel />
          </Box>
        )}

        {model?.text !== undefined && (
          <Box width={150} height={30}>
            <TextModel />
          </Box>
        )}
      </Stack>
    </Box>
  );
}
