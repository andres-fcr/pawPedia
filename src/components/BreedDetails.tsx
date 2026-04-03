import { useState } from "react";
import { ArrowLeft, PawPrintIcon as Paw, ZoomIn, Scale, Ruler, CalendarDays, MapPin, Droplets, Beef, Map, Leaf, Mountain, Shield } from "lucide-react";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";
import type { BreedData, NormalizedBreed, NormalizedCattleBreed } from "@/lib/api";
import { isCattleBreed } from "@/lib/api";
import ImageModal from "./ImageModal";

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
              <>
                <div className="relative rounded-2xl overflow-hidden mb-8 group">
                  <div className="relative aspect-[21/9] md:aspect-[2/1] w-full">
                    <img
                      src={cattle.image}
                      alt={cattle.name}
                      className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.svg?height=600&width=800";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                      <div className="flex items-center gap-3 mb-3">
                        <Leaf className="h-6 w-6 text-primary animate-float" />
                        <span className="text-white/70 font-outfit text-sm tracking-wide uppercase">
                          {cattle.origin}
                        </span>
                      </div>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold text-white">
                        {cattle.name}
                      </h1>
                    </div>
                    <button
                      onClick={() => setIsZoomOpen(true)}
                      className="absolute top-4 right-4 p-3 bg-black/30 backdrop-blur-sm rounded-full text-white/70 hover:text-white hover:bg-black/50 transition-all duration-300"
                      aria-label="Ampliar imagen"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-5 border border-amber-500/20 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-amber-500/15 rounded-lg">
                        <Scale className="w-5 h-5 text-amber-500" />
                      </div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Peso (macho)</span>
                    </div>
                    <p className="text-xl font-outfit font-semibold text-foreground">{cattle.productiveCharacteristics.weight.male}</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-5 border border-amber-500/20 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-amber-500/15 rounded-lg">
                        <Scale className="w-5 h-5 text-amber-500" />
                      </div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Peso (hembra)</span>
                    </div>
                    <p className="text-xl font-outfit font-semibold text-foreground">{cattle.productiveCharacteristics.weight.female}</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-5 border border-amber-500/20 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-amber-500/15 rounded-lg">
                        <Mountain className="w-5 h-5 text-amber-500" />
                      </div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Especie</span>
                    </div>
                    <p className="text-xl font-outfit font-semibold text-foreground">{cattle.species}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl p-6 border border-amber-500/15 mb-8">
                  <h2 className="text-xl font-outfit font-semibold mb-3 text-foreground flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    Acerca de
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {cattle.description}
                  </p>
                  <div className="flex items-center gap-2 my-3">
                    <Map className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-muted-foreground">Región: <span className="font-medium text-foreground">{cattle.regionColombia}</span></span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-outfit font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-500" />
                    Usos productivos
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {cattle.productiveUsages?.map((usage, index) => (
                      <Badge
                        key={index}
                        className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20 rounded-full px-4 py-2 font-medium transition-colors duration-200 text-sm"
                      >
                        {usage}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <h2 className="text-xl font-outfit font-semibold mb-5 text-foreground flex items-center gap-2">
                      <Beef className="w-5 h-5 text-amber-500" />
                      Características físicas
                    </h2>
                    <div className="space-y-0">
                      <div className="flex justify-between items-center py-3 border-b border-border/50">
                        <span className="text-muted-foreground text-sm">Pelaje</span>
                        <span className="font-outfit font-medium text-foreground text-sm text-right max-w-[60%]">{cattle.productiveCharacteristics.coat}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border/50">
                        <span className="text-muted-foreground text-sm">Patrón de pelaje</span>
                        <span className="font-outfit font-medium text-foreground text-sm text-right max-w-[60%]">{cattle.productiveCharacteristics.coat_pattern}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border/50">
                        <span className="text-muted-foreground text-sm">Cuernos</span>
                        <span className="font-outfit font-medium text-foreground text-sm text-right max-w-[60%]">{cattle.productiveCharacteristics.horns}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-muted-foreground text-sm">Carácter</span>
                        <span className="font-outfit font-medium text-foreground text-sm text-right max-w-[60%]">{cattle.productiveCharacteristics.nature}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                      <h2 className="text-lg font-outfit font-semibold mb-4 text-foreground flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        Producción de leche
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-500/5 rounded-lg p-3 border border-blue-500/10">
                          <span className="text-muted-foreground font-semibold uppercase tracking-wide">Calidad</span>
                          <p className="font-outfit font-medium text-sm text-foreground mt-1">{cattle.productiveCharacteristics.dairy.quality}</p>
                        </div>
                        <div className="bg-blue-500/5 rounded-lg p-3 border border-blue-500/10">
                          <span className="text-muted-foreground font-semibold uppercase tracking-wide">Cantidad</span>
                          <p className="font-outfit font-medium text-sm text-foreground mt-1">{cattle.productiveCharacteristics.dairy.quantity}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                      <h2 className="text-lg font-outfit font-semibold mb-4 text-foreground flex items-center gap-2">
                        <Beef className="w-5 h-5 text-amber-500" />
                        Producción de carne
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-amber-500/5 rounded-lg p-3 border border-amber-500/10">
                          <span className="text-muted-foreground font-semibold uppercase tracking-wide">Calidad</span>
                          <p className="font-outfit font-medium text-sm text-foreground mt-1">{cattle.productiveCharacteristics.meat.quality}</p>
                        </div>
                        <div className="bg-amber-500/5 rounded-lg p-3 border border-amber-500/10">
                          <span className="text-muted-foreground font-semibold uppercase tracking-wide">Cantidad</span>
                          <p className="font-outfit font-medium text-sm text-foreground mt-1">{cattle.productiveCharacteristics.meat.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : pet ? (
              <>
                <div className="relative rounded-2xl overflow-hidden mb-8 group">
                  <div className="relative aspect-[21/9] md:aspect-[2/1] w-full">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src =
                          pet.imageAlt ||
                          "/placeholder.svg?height=600&width=800";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                      <div className="flex items-center gap-3 mb-3">
                        <Paw className="h-6 w-6 text-primary animate-float" />
                        <span className="text-white/70 font-outfit text-sm tracking-wide uppercase">
                          {pet.origin}
                        </span>
                      </div>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold text-white">
                        {pet.name}
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
                    <p className="text-xl font-outfit font-semibold text-foreground">{pet.weight} kg</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Ruler className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">Altura</span>
                    </div>
                    <p className="text-xl font-outfit font-semibold text-foreground">{pet.height ? `${pet.height} cm` : "N/D"}</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <CalendarDays className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">Esperanza de vida</span>
                    </div>
                    <p className="text-xl font-outfit font-semibold text-foreground">{pet.lifeSpan} años</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <h2 className="text-xl font-outfit font-semibold mb-3 text-foreground flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Acerca de
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {pet.description}
                    </p>
                  </div>

                  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <h2 className="text-xl font-outfit font-semibold mb-4 text-foreground">
                      Temperamento
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {pet.temperament?.map((trait, index) => (
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
              </>
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
