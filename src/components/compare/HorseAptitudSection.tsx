import { Badge } from "@/components/ui/badge";
import type { NormalizedHorseBreed } from "@/lib/api";

interface HorseAptitudSectionProps {
  breed: NormalizedHorseBreed;
  breedName: string;
}

const HorseAptitudSection = ({ breed, breedName }: HorseAptitudSectionProps) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 rounded-full px-3 py-1 text-xs sm:text-sm font-medium transition-colors duration-200 w-fit max-w-full whitespace-normal text-center">
      {breed.aptitude}
    </Badge>
  </div>
);

export default HorseAptitudSection;