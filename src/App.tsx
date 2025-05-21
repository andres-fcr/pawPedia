import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout";
import ThemeProvider from "./providers/ThemeProvider";
import DetailsPage from "./pages/DetailsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/cats" />} />

          <Route path="/cats" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path=":id" element={<DetailsPage />} />
          </Route>

          <Route path="/dogs" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path=":id" element={<DetailsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/cats" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
