import { Stack } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";

const TextComponent = ({ sx }) => {
  return (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      sx={{ ...sx, borderRadius: 1, border: "1px solid" }}
    >
      <TranslateIcon />
    </Stack>
  );
};

export default TextComponent;
