import type { NormalizedCattleBreed } from "@/lib/api";

interface CattleCarneSectionProps {
  breed: NormalizedCattleBreed;
  breedName: string;
}

const CattleCarneSection = ({ breed, breedName }: CattleCarneSectionProps) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Calidad</p>
        <p className="text-base sm:text-lg font-outfit font-semibold text-foreground break-words">{breed.productiveCharacteristics.meat.quality}</p>
      </div>
      <div>
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Cantidad</p>
        <p className="text-base sm:text-lg font-outfit font-semibold text-foreground break-words">{breed.productiveCharacteristics.meat.quantity}</p>
      </div>
    </div>
  </div>
);

export default CattleCarneSection;