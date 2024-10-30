import { useEffect } from "react";
import { Box } from "@mui/material";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes } from "@/configs/drag-items";
import { TextModel } from "@/components/draggable";

const DraggableText = (props) => {
  const [{}, dragRef, preview] = useDrag(
    () => ({
      type: ItemTypes.TEXT,
      item: { type: ItemTypes.TEXT },
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
    <Box ref={dragRef} sx={{ cursor: "pointer" }}>
      <TextModel />
    </Box>
  );
};

export default DraggableText;
