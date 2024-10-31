import { useEffect } from "react";
import { Box } from "@mui/material";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes } from "@/configs/drag-items";
import { ImageComponent } from "@/components/draggable";

const DraggableImage = ({ disabled = false }) => {
  const [_, dragRef, preview] = useDrag(
    () => ({
      type: ItemTypes.IMAGE,
      item: { type: ItemTypes.IMAGE },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <Box
      ref={dragRef}
      sx={{
        cursor: "move",

        ...(disabled && {
          pointerEvents: "none",
          opacity: 0.2,
        }),
      }}
    >
      <ImageComponent />
    </Box>
  );
};

export default DraggableImage;
