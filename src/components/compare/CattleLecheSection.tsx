import type { NormalizedCattleBreed } from "@/lib/api";

interface CattleLecheSectionProps {
  breed: NormalizedCattleBreed;
  breedName: string;
}

const CattleLecheSection = ({ breed, breedName }: CattleLecheSectionProps) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Calidad</p>
        <p className="text-base sm:text-lg font-outfit font-semibold text-accent break-words">{breed.productiveCharacteristics.dairy.quality}</p>
      </div>
      <div>
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Cantidad</p>
        <p className="text-base sm:text-lg font-outfit font-semibold text-accent break-words">{breed.productiveCharacteristics.dairy.quantity}</p>
      </div>
    </div>
  </div>
);

export default CattleLecheSection;