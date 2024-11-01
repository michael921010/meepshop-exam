import { useCallback, useState } from "react";
import { Container, Box } from "@mui/material";
import { Editor } from "@/components/common";

export default function EditorPage() {
  const [value, setValue] = useState("");

  const handleEditor = useCallback((value) => {
    setValue(value);
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Editor value={value} onChange={handleEditor} />
      </Box>
    </Container>
  );
}
