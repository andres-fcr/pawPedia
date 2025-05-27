import type { Sections } from "@/lib/api";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  section: Sections;
  handleTabChange: (value: string) => void;
}

const TabsSection = ({ section, handleTabChange }: Props) => {
  return (
    <Tabs
      defaultValue={section}
      className="container mx-auto mb-8 bg-am"
      onValueChange={handleTabChange}
    >
      <TabsList className="w-full">
        <TabsTrigger value="cats">🐱 Cats</TabsTrigger>
        <TabsTrigger value="dogs">🐶 Dogs</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabsSection;
