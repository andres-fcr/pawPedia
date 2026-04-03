import { useState } from "react";
import { ArrowLeft, PawPrintIcon as Paw, ZoomIn, Scale, Ruler, CalendarDays, MapPin } from "lucide-react";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";
import type { NormalizedBreed } from "@/lib/api";
import ImageModal from "./ImageModal";

interface BreedDetailsProps {
  breed: NormalizedBreed | null;
  isLoading: boolean;
  onReturn: () => void;
}

const BreedDetails = ({ breed, isLoading, onReturn }: BreedDetailsProps) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

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
          <div className="max-w-5xl mx-auto details-card">
            <div className="relative rounded-2xl overflow-hidden mb-8 group">
              <div className="relative aspect-[21/9] md:aspect-[2/1] w-full">
                <img
                  src={breed.image || breed.imageAlt}
                  alt={breed.name}
                  className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      breed.imageAlt ||
                      "/placeholder.svg?height=600&width=800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Paw className="h-6 w-6 text-primary animate-float" />
                    <span className="text-white/70 font-outfit text-sm tracking-wide uppercase">
                      {breed.origin}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold text-white">
                    {breed.name}
                  </h1>
                </div>
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute top-4 right-4 p-3 bg-black/30 backdrop-blur-sm rounded-full text-white/70 hover:text-white hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Ampliar imagen"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Peso</span>
                </div>
                <p className="text-xl font-outfit font-semibold text-foreground">{breed.weight} kg</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Ruler className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Altura</span>
                </div>
                <p className="text-xl font-outfit font-semibold text-foreground">{breed.height ? `${breed.height} cm` : "N/D"}</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CalendarDays className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Esperanza de vida</span>
                </div>
                <p className="text-xl font-outfit font-semibold text-foreground">{breed.lifeSpan} años</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <h2 className="text-xl font-outfit font-semibold mb-3 text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Acerca de
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {breed.description}
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <h2 className="text-xl font-outfit font-semibold mb-4 text-foreground">
                  Temperamento
                </h2>
                <div className="flex flex-wrap gap-2">
                  {breed.temperament?.map((trait, index) => (
                    <Badge
                      key={index}
                      className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 rounded-full px-3 py-1.5 font-medium transition-colors duration-200"
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
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
