import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Stack, CircularProgress } from "@mui/material";

const Home = lazy(() => import("@/views/Home"));
const Editor = lazy(() => import("@/views/Editor"));

export default function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <Stack width="100dvw" height="100dvh" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Stack>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
