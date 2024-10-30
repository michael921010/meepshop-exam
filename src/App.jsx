import { Box, Container, Typography, Link } from "@mui/material";
import { Image } from "@/components/common";
import logo from "@/assets/react.svg";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Link href="https://vite.dev" target="_blank">
          <Image src={logo} alt="Vite logo" />
        </Link>

        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI Vite.js example
        </Typography>
      </Box>
    </Container>
  );
}
