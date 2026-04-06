import type { UrlSections } from "@/lib/api";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Cat, Dog, Beef } from "lucide-react";

interface Props {
  section: UrlSections;
  handleTabChange: (value: string) => void;
}

const TabsSection = ({ section, handleTabChange }: Props) => {
  return (
    <Tabs
      defaultValue={section}
      className="container mx-auto mb-8"
      onValueChange={handleTabChange}
    >
      <TabsList className="w-full max-w-md mx-auto bg-secondary/80 p-1.5 rounded-2xl border-2 border-border">
        <TabsTrigger
          value="cats"
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-xl transition-all duration-300"
        >
          <Cat className="w-4 h-4" />
          <span className="font-outfit font-medium">Gatos</span>
        </TabsTrigger>
        <TabsTrigger
          value="dogs"
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-xl transition-all duration-300"
        >
          <Dog className="w-4 h-4" />
          <span className="font-outfit font-medium">Perros</span>
        </TabsTrigger>
        <TabsTrigger
          value="vacunos"
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-xl transition-all duration-300"
        >
          <Beef className="w-4 h-4" />
          <span className="font-outfit font-medium">Vacunos</span>
        </TabsTrigger>
        <TabsTrigger
          value="caballos"
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-xl transition-all duration-300"
        >
          <Dog className="w-4 h-4" />
          <span className="font-outfit font-medium">Caballos</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabsSection;
