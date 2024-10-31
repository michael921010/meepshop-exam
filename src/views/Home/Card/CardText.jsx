import { Box, Typography } from "@mui/material";

export default function CardText({ width, height, src, enabled = false }) {
  if (enabled && !!src) {
    return (
      <Box width={width} height={height}>
        <Typography component="p">{src ?? ""}</Typography>
      </Box>
    );
  } else {
    return <Box width={width} height={height} sx={{ borderRadius: 1, bgcolor: "secondary.light" }} />;
  }
}
