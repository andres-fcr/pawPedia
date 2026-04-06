import {
  MapPin,
  Palette,
  Heart,
  Ruler,
  Scale,
  CalendarDays,
  Target,
  Map,
  ZoomIn,
  Link,
} from "lucide-react";

import { Badge } from "./ui/badge";
import type { NormalizedHorseBreed } from "@/lib/api";

interface HorseDetailsProps {
  breed: NormalizedHorseBreed;
  onZoomImage: () => void;
}

const HorseDetails = ({ breed, onZoomImage }: HorseDetailsProps) => {
  return (
    <>
      <div className="relative rounded-2xl overflow-hidden mb-8 group">
        <div className="relative aspect-[21/9] md:aspect-[2/1] w-full">
          <img
            src={breed.image}
            alt={breed.name}
            className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=600&width=800";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="h-6 w-6 text-primary animate-float" />
              <span className="text-white/70 font-outfit text-sm tracking-wide uppercase">
                {breed.countryOfOrigin}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold text-white">
              {breed.name}
            </h1>
          </div>
          <button
            onClick={onZoomImage}
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
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Peso aproximado
            </span>
          </div>
          <p className="text-xl font-outfit font-semibold text-foreground">
            {breed.approximateWeight}
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-5 border border-amber-500/20 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/15 rounded-lg">
              <Ruler className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Tamaño
            </span>
          </div>
          <p className="text-xl font-outfit font-semibold text-foreground">
            {breed.size}
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-5 border border-amber-500/20 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/15 rounded-lg">
              <CalendarDays className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              Esperanza de vida
            </span>
          </div>
          <p className="text-xl font-outfit font-semibold text-foreground">
            {breed.lifespan}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl p-6 border border-amber-500/15 mb-8">
        <h2 className="text-xl font-outfit font-semibold mb-3 text-foreground flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-500" />
          Acerca de:
        </h2>
        <p className="leading-relaxed">{breed.description}</p>

        <span className="text-lg font-outfit font-semibold mb-3 mt-4 text-foreground flex items-center gap-2">
          <Map className="w-4 h-4 text-amber-500" /> 
          Región en Colombia:
        </span>
        <p className="font-medium ">{breed.colombiaRegion}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-outfit font-semibold mb-4 text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-500" />
          Aptitud
        </h2>
        <Badge
          className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20 rounded-full px-4 py-2 font-medium transition-colors duration-200 text-sm"
        >
          {breed.aptitude}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-xl font-outfit font-semibold mb-5 text-foreground flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-500" />
            Características físicas
          </h2>
          <div className="space-y-0">
            <div className="flex justify-between items-center py-3 border-b border-border/50">
              <span className="text-muted-foreground text-sm">Colores</span>
              <span className="font-outfit font-medium text-foreground text-sm text-right max-w-[60%]">
                {breed.colors}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border/50">
              <span className="text-muted-foreground text-sm">Orejas</span>
              <span className="font-outfit font-medium text-foreground text-sm text-right max-w-[60%]">
                {breed.ears}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-muted-foreground text-sm">Crines</span>
              <span className="font-outfit font-medium text-foreground text-sm text-right max-w-[60%]">
                {breed.manes}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-xl font-outfit font-semibold mb-4 text-foreground flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-500" />
            Temperamento
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {breed.temperament}
          </p>
        </div>
      </div>

      {breed.links.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-outfit font-semibold mb-4 text-foreground flex items-center gap-2">
            <Link className="w-5 h-5 text-amber-500" />
            Enlaces de interés
          </h2>
          <ul className="space-y-2">
            {breed.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors duration-200 underline underline-offset-4"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default HorseDetails;
