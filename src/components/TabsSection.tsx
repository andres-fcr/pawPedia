import type { Sections } from "@/lib/api";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Cat, Dog } from "lucide-react";

interface Props {
  section: Sections;
  handleTabChange: (value: string) => void;
}

const TabsSection = ({ section, handleTabChange }: Props) => {
  return (
    <Tabs
      defaultValue={section}
      className="container mx-auto mb-8"
      onValueChange={handleTabChange}
    >
      <TabsList className="w-full max-w-md mx-auto bg-secondary/50 p-1.5 rounded-xl">
        <TabsTrigger
          value="cats"
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-lg transition-all duration-300"
        >
          <Cat className="w-4 h-4" />
          <span className="font-outfit font-medium">Cats</span>
        </TabsTrigger>
        <TabsTrigger
          value="dogs"
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-lg transition-all duration-300"
        >
          <Dog className="w-4 h-4" />
          <span className="font-outfit font-medium">Dogs</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabsSection;
