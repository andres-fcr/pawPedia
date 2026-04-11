import type { NormalizedCattleBreed } from "@/lib/api";

interface CattlePhysicalSectionProps {
  breed: NormalizedCattleBreed;
  breedName: string;
}

const CattlePhysicalSection = ({ breed, breedName }: CattlePhysicalSectionProps) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="space-y-2 text-sm">
      <p className="break-words"><span className="text-muted-foreground">Pelaje:</span> {breed.productiveCharacteristics.coat}</p>
      <p className="break-words"><span className="text-muted-foreground">Patrón:</span> {breed.productiveCharacteristics.coat_pattern}</p>
      <p className="break-words"><span className="text-muted-foreground">Cuernos:</span> {breed.productiveCharacteristics.horns}</p>
      <p className="break-words"><span className="text-muted-foreground">Carácter:</span> {breed.productiveCharacteristics.nature}</p>
    </div>
  </div>
);

export default CattlePhysicalSection;