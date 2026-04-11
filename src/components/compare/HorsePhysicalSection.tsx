import type { NormalizedHorseBreed } from "@/lib/api";

interface HorsePhysicalSectionProps {
  breed: NormalizedHorseBreed;
  breedName: string;
}

const HorsePhysicalSection = ({ breed, breedName }: HorsePhysicalSectionProps) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="space-y-2 text-sm">
      <p className="break-words"><span className="text-muted-foreground">Colores:</span> {breed.colors}</p>
      <p className="break-words"><span className="text-muted-foreground">Orejas:</span> {breed.ears}</p>
      <p className="break-words"><span className="text-muted-foreground">Crines:</span> {breed.manes}</p>
    </div>
  </div>
);

export default HorsePhysicalSection;