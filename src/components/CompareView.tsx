import { ArrowLeft, ArrowRightLeft, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BreedData } from "@/lib/api";
import { isCattleBreed, isHorseBreed } from "@/lib/api";
import { cn } from "@/lib/utils";
import PetDetails from "./PetDetails";
import CattleDetails from "./CattleDetails";
import HorseDetails from "./HorseDetails";

interface CompareViewProps {
  breed1: BreedData | null;
  breed2: BreedData | null;
  onChangeBreed: (slot: 1 | 2) => void;
  onReturn: () => void;
}

const CompareView = ({
  breed1,
  breed2,
  onChangeBreed,
  onReturn,
}: CompareViewProps) => {
  const renderBreedDetails = (breed: BreedData | null, side: "left" | "right") => {
    if (!breed) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <ArrowRightLeft className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">
            Selecciona una raza para comparar
          </p>
          <Button onClick={() => onChangeBreed(side === "left" ? 1 : 2)}>
            Elegir raza
          </Button>
        </div>
      );
    }

    if (isCattleBreed(breed)) {
      return (
        <CattleDetails
          breed={breed}
          onZoomImage={() => {}}
        />
      );
    }

    if (isHorseBreed(breed)) {
      return (
        <HorseDetails
          breed={breed}
          onZoomImage={() => {}}
        />
      );
    }

    return (
      <PetDetails
        breed={breed}
        onZoomImage={() => {}}
      />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onReturn} className="text-muted-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/5">
            Modo comparación
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative">
          {breed1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChangeBreed(1)}
              className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Cambiar
            </Button>
          )}
          <div className={cn(!breed1 && "border-2 border-dashed border-border rounded-xl")}>
            {renderBreedDetails(breed1, "left")}
          </div>
        </div>

        <div className="relative">
          {breed2 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChangeBreed(2)}
              className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Cambiar
            </Button>
          )}
          <div className={cn(!breed2 && "border-2 border-dashed border-border rounded-xl")}>
            {renderBreedDetails(breed2, "right")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareView;