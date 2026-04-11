import type { NormalizedHorseBreed } from "@/lib/api";

interface HorseTemperamentSectionProps {
  breed: NormalizedHorseBreed;
  breedName: string;
}

const HorseTemperamentSection = ({ breed, breedName }: HorseTemperamentSectionProps) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
      {breed.temperament}
    </p>
  </div>
);

export default HorseTemperamentSection;