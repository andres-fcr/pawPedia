import { ArrowRightLeft, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyBreedCardProps {
  slot: 1 | 2;
  onSelect: () => void;
}

const EmptyBreedCard = ({ slot, onSelect }: EmptyBreedCardProps) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] p-8 text-center border-2 border-dashed border-border rounded-2xl bg-card mb-4">
    <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
      <ArrowRightLeft className="w-8 h-8 text-muted-foreground" />
    </div>
    <p className="text-muted-foreground mb-4 text-sm sm:text-base">
      {slot === 1 ? "Selecciona la primera raza" : "Selecciona la segunda raza"}
    </p>
    <Button onClick={onSelect} size="lg" className="gap-2">
      <Plus className="h-5 w-5" />
      Elegir raza
    </Button>
  </div>
);

export default EmptyBreedCard;