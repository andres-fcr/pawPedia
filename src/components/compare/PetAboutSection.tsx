import type { NormalizedBreed } from "@/lib/api";

interface PetAboutSectionProps {
  breed: NormalizedBreed;
  breedName: string;
}

const PetAboutSection = ({ breed, breedName }: PetAboutSectionProps) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
      {breed.description}
    </p>
  </div>
);

export default PetAboutSection;