import { Box } from "@mui/material";
import { Image } from "@/components/common";

export default function CardImage({ width, height, src, enabled = false }) {
  if (enabled && !!src) {
    return (
      <Box width={width} height={height}>
        <Image
          alt=""
          src={src}
          width="100%"
          height="100%"
          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
    );
  } else {
    return <Box width={width} height={height} sx={{ borderRadius: 1, bgcolor: "secondary.light" }} />;
  }
}
