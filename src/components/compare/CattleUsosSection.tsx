import { Badge } from "@/components/ui/badge";
import type { NormalizedCattleBreed } from "@/lib/api";

interface CattleUsosSectionProps {
  breed: NormalizedCattleBreed;
  breedName: string;
}

const CattleUsosSection = ({ breed, breedName }: CattleUsosSectionProps) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="flex flex-wrap gap-2">
      {breed.productiveUsages?.map((usage, index) => (
        <Badge
          key={index}
          className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 rounded-full px-3 py-1 text-xs sm:text-sm font-medium transition-colors duration-200"
        >
          {usage}
        </Badge>
      ))}
    </div>
  </div>
);

export default CattleUsosSection;