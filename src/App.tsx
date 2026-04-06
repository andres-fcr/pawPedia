import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import Header from "./components/Header";
import MainLayout from "./layouts/MainLayout";
import ThemeProvider from "./providers/ThemeProvider";
import NotFound from "./components/NotFound";
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

          <Route path="/vacunos" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path=":id" element={<DetailsPage />} />
          </Route>

          <Route path="/caballos" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path=":id" element={<DetailsPage />} />
          </Route>

          <Route
            path="*"
            element={
              <main className="flex flex-col min-h-screen w-screen container p-6 mx-auto transition-colors duration-300">
                <Header />
                <NotFound />
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
