import { Stack } from "@mui/material";

export default function Card({ children }) {
  return (
    <Stack
      p={1}
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{ borderRadius: 2, border: "solid 1px", borderColor: "grey.200" }}
    >
      {children}
    </Stack>
  );
}
