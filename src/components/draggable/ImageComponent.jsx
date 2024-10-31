import { Stack } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

const ImageComponent = () => {
  return (
    <Stack
      width="100%"
      height="100%"
      p={2}
      alignItems="center"
      justifyContent="center"
      sx={{ borderRadius: 1, border: "1px solid" }}
    >
      <ImageIcon />
    </Stack>
  );
};

export default ImageComponent;
