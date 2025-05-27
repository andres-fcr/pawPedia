import { Outlet } from "react-router";

import Header from "@/components/Header";

const MainLayout = () => {
  return (
    <main className="flex flex-col min-h-screen w-screen container p-6 mx-auto transition-colors duration-300">
      <Header />
      <Outlet />
    </main>
  );
};

export default MainLayout;
