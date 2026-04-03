import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import type { BreedData, NormalizedBreed, NormalizedCattleBreed } from "@/lib/api";
import { isCattleBreed } from "@/lib/api";
import ImageModal from "./ImageModal";
import PetDetails from "./PetDetails";
import CattleDetails from "./CattleDetails";

interface BreedDetailsProps {
  breed: BreedData | null;
  isLoading: boolean;
  onReturn: () => void;
}

const BreedDetails = ({ breed, isLoading, onReturn }: BreedDetailsProps) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const cattle = breed && isCattleBreed(breed) ? breed as NormalizedCattleBreed : null;
  const pet = breed && !isCattleBreed(breed) ? breed as NormalizedBreed : null;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {breed && (
          <Button
            variant="ghost"
            onClick={onReturn}
            className="mb-6 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300 rounded-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        )}

        {isLoading && (
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-6 w-48 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-80 w-full rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            </div>
          </div>
        )}
        {breed && !isLoading && (
          <div className="max-w-5xl mx-auto details-card capitalize">
            {cattle ? (
              <CattleDetails breed={cattle} onZoomImage={() => setIsZoomOpen(true)} />
            ) : pet ? (
              <PetDetails breed={pet} onZoomImage={() => setIsZoomOpen(true)} />
            ) : null}
          </div>
        )}

      </div>

      <ImageModal
        isOpen={isZoomOpen}
        onOpenChange={() => setIsZoomOpen(false)}
        imageUrl={breed?.image || "/placeholder.svg?height=600&width=800"}
        altText={breed?.name || "Imagen de la raza"}
      />
    </>
  );
};

export default BreedDetails;
