import { Box } from "@mui/material";
import { useDragLayer } from "react-dnd";
import { ItemTypes } from "@/configs/drag-items";
import { ImageModel, TextModel } from "@/components/draggable";

function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px) rotate(5deg)`;
  return {
    transform,
    opacity: 0.5,
  };
}

const DragLayer = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  function renderItem() {
    switch (itemType) {
      case ItemTypes.TEXT:
        return <TextModel />;
      case ItemTypes.IMAGE:
        return <ImageModel />;
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: 0,
        top: 0,
      }}
    >
      <Box sx={getItemStyles(initialOffset, currentOffset)}>{renderItem()}</Box>
    </Box>
  );
};
export default DragLayer;
