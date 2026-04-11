import type { NormalizedHorseBreed } from "@/lib/api";

interface HorseAboutSectionProps {
  breed: NormalizedHorseBreed;
  breedName: string;
}

const HorseAboutSection = ({ breed, breedName }: HorseAboutSectionProps) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words mb-2">
      {breed.description}
    </p>
    <p className="text-sm font-medium text-foreground break-words">
      <span className="text-muted-foreground">Región:</span> {breed.colombiaRegion}
    </p>
  </div>
);

export default HorseAboutSection;