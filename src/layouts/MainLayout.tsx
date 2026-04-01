import { Outlet } from "react-router";

import Header from "@/components/Header";

const MainLayout = () => {
  return (
    <main className="flex flex-col min-h-screen w-full overflow-x-hidden relative transition-colors duration-300">
      <div className="absolute inset-0 bg-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative container p-6 mx-auto">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
