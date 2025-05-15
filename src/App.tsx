import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout";
import ThemeProvider from "./providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/cats" />} />

          <Route path="/cats" element={<MainLayout />}>
            <Route index element={<h1>Cats</h1>} />
            <Route path=":id" element={<h1>Cat</h1>} />
          </Route>
          <Route path="/dogs" element={<MainLayout />}>
            <Route index element={<h1>Dogs</h1>} />
            <Route path=":id" element={<h1>Dog</h1>} />
          </Route>

          <Route path="*" element={<Navigate to="/cats" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
