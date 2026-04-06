import {
  Scale,
  MapPin,
  Droplets,
  Beef,
  Map,
  Leaf,
  Mountain,
  Shield,
  ZoomIn,
} from "lucide-react";

import { Badge } from "./ui/badge";
import type { NormalizedCattleBreed } from "@/lib/api";

interface CattleDetailsProps {
  breed: NormalizedCattleBreed;
  onZoomImage: () => void;
}

const CattleDetails = ({ breed, onZoomImage }: CattleDetailsProps) => {
  return (
    <>
      <div className="relative rounded-2xl overflow-hidden mb-8 group border-2 border-border">
        <div className="relative aspect-[3/4] sm:aspect-[4/3] md:aspect-[2/1] w-full">
          <img
            src={breed.image}
            alt={breed.name}
            className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=600&width=800";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex items-center gap-3 mb-3">
              <Leaf className="h-6 w-6 text-accent animate-float" />
              <span className="text-white/80 font-outfit text-sm tracking-wide uppercase">
                {breed.origin}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold text-white">
              {breed.name}
            </h1>
          </div>
          <button
            onClick={onZoomImage}
            className="absolute top-4 right-4 p-3 bg-primary/80 rounded-full text-white hover:bg-primary transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 shadow-lg"
            aria-label="Ampliar imagen"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-2xl p-5 border-2 border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Peso (macho)
            </span>
          </div>
          <p className="text-xl font-outfit font-semibold text-foreground">
            {breed.productiveCharacteristics.weight.male + ' Kg'}
          </p>
        </div>
        <div className="bg-card rounded-2xl p-5 border-2 border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Peso (hembra)
            </span>
          </div>
          <p className="text-xl font-outfit font-semibold text-foreground">
            {breed.productiveCharacteristics.weight.female + ' Kg'}
          </p>
        </div>
        <div className="bg-card rounded-2xl p-5 border-2 border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent/10 rounded-xl">
              <Mountain className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Especie
            </span>
          </div>
          <p className="text-xl font-outfit font-semibold text-foreground">
            {breed.species}
          </p>
        </div>
      </div>

      <div className="bg-secondary/50 rounded-2xl p-6 border-2 border-border mb-8">
        <h2 className="text-xl font-outfit font-semibold mb-3 text-foreground flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Acerca de:
        </h2>
        <p className="leading-relaxed">{breed.description}</p>

        <span className="text-lg font-outfit font-semibold mb-3 mt-4 text-foreground flex items-center gap-2">
          <Map className="w-4 h-4 text-primary" /> 
          Región:
        </span>
        <p className="font-medium ">{breed.regionColombia}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-outfit font-semibold mb-4 text-foreground flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Usos productivos
        </h2>
        <div className="flex flex-wrap gap-2">
          {breed.productiveUsages?.map((usage, index) => (
            <Badge
              key={index}
              className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 rounded-full px-4 py-2 font-medium transition-colors duration-200 text-sm"
            >
              {usage}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-sm">
          <h2 className="text-xl font-outfit font-semibold mb-5 text-foreground flex items-center gap-2">
            <Beef className="w-5 h-5 text-primary" />
            Características físicas
          </h2>
          <div className="space-y-0">
            <div className="flex justify-between items-center py-3 border-b border-border/50">
              <span className="text-muted-foreground text-sm">Pelaje</span>
              <span className="font-outfit font-medium text-foreground text-sm text-right max-w-[60%]">
                {breed.productiveCharacteristics.coat}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border/50">
              <span className="text-muted-foreground text-sm">
                Patrón de pelaje
              </span>
              <span className="font-outfit font-medium text-foreground text-sm text-right max-w-[60%]">
                {breed.productiveCharacteristics.coat_pattern}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border/50">
              <span className="text-muted-foreground text-sm">Cuernos</span>
              <span className="font-outfit font-medium text-foreground text-sm text-right max-w-[60%]">
                {breed.productiveCharacteristics.horns}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-muted-foreground text-sm">Carácter</span>
              <span className="font-outfit font-medium text-foreground text-sm text-right max-w-[60%]">
                {breed.productiveCharacteristics.nature}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-sm">
            <h2 className="text-lg font-outfit font-semibold mb-4 text-foreground flex items-center gap-2">
              <Droplets className="w-5 h-5 text-accent" />
              Producción de leche
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-accent/5 rounded-xl p-3 border-2 border-accent/20">
                <span className="text-muted-foreground font-semibold uppercase tracking-wide">
                  Calidad
                </span>
                <p className="font-outfit font-medium text-sm text-foreground mt-1">
                  {breed.productiveCharacteristics.dairy.quality}
                </p>
              </div>
              <div className="bg-accent/5 rounded-xl p-3 border-2 border-accent/20">
                <span className="text-muted-foreground font-semibold uppercase tracking-wide">
                  Cantidad
                </span>
                <p className="font-outfit font-medium text-sm text-foreground mt-1">
                  {breed.productiveCharacteristics.dairy.quantity}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-sm">
            <h2 className="text-lg font-outfit font-semibold mb-4 text-foreground flex items-center gap-2">
              <Beef className="w-5 h-5 text-primary" />
              Producción de carne
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 rounded-xl p-3 border-2 border-primary/20">
                <span className="text-muted-foreground font-semibold uppercase tracking-wide">
                  Calidad
                </span>
                <p className="font-outfit font-medium text-sm text-foreground mt-1">
                  {breed.productiveCharacteristics.meat.quality}
                </p>
              </div>
              <div className="bg-primary/5 rounded-xl p-3 border-2 border-primary/20">
                <span className="text-muted-foreground font-semibold uppercase tracking-wide">
                  Cantidad
                </span>
                <p className="font-outfit font-medium text-sm text-foreground mt-1">
                  {breed.productiveCharacteristics.meat.quantity}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CattleDetails;
