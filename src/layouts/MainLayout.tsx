import { useLocation, useNavigate } from "react-router";

import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  function handleTabChange(value: string) {
    navigate(`/${value}`);
  }

  return (
    <main className="flex flex-col min-h-screen min-w-screen container p-6 mx-auto transition-colors duration-300">
      <Header />
      <Tabs
        defaultValue="cats"
        className="w-full max-w-4xl mx-auto mb-8 bg-am"
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full">
          <TabsTrigger value="cats">🐱 Cats</TabsTrigger>
          <TabsTrigger value="dogs">🐶 Dogs</TabsTrigger>
        </TabsList>
        <TabsContent value="cats">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="dogs">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
};

export default MainLayout;
