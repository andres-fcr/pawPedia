import type { NormalizedBreed } from "@/lib/api";

interface PetStatsSectionProps {
  breed: NormalizedBreed;
  breedName: string;
}

const PetStatsSection = ({ breed, breedName }: PetStatsSectionProps) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3">
      <div className="text-left sm:text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Peso</p>
        <p className="text-lg sm:text-xl font-outfit font-semibold text-foreground break-words">{breed.weight} kg</p>
      </div>
      <div className="text-left sm:text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Altura</p>
        <p className="text-lg sm:text-xl font-outfit font-semibold text-foreground break-words">{breed.height ? `${breed.height} cm` : "N/D"}</p>
      </div>
      <div className="text-left sm:text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Vida</p>
        <p className="text-lg sm:text-xl font-outfit font-semibold text-foreground break-words">{breed.lifeSpan} años</p>
      </div>
    </div>
  </div>
);

export default PetStatsSection;