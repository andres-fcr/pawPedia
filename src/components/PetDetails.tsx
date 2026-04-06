import { Scale, Ruler, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "./ui/badge";
import type { NormalizedBreed } from "@/lib/api";

interface PetDetailsProps {
  breed: NormalizedBreed;
  onZoomImage: () => void;
}

const PetDetails = ({ breed, onZoomImage }: PetDetailsProps) => {
  return (
    <>
      <div className="relative rounded-2xl overflow-hidden mb-8 group border-2 border-border">
        <div className="relative aspect-[3/4] sm:aspect-[4/3] md:aspect-[2/1] w-full">
          <img
            src={breed.image}
            alt={breed.name}
            className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src =
                breed.imageAlt ||
                "/placeholder.svg?height=600&width=800";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex items-center gap-3 mb-3">
              <svg className="h-6 w-6 text-primary animate-float" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
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
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-2xl p-5 border-2 border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Peso</span>
          </div>
          <p className="text-xl font-outfit font-semibold text-foreground">{breed.weight} kg</p>
        </div>
        <div className="bg-card rounded-2xl p-5 border-2 border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent/10 rounded-xl">
              <Ruler className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">Altura</span>
          </div>
          <p className="text-xl font-outfit font-semibold text-foreground">{breed.height ? `${breed.height} cm` : "N/D"}</p>
        </div>
        <div className="bg-card rounded-2xl p-5 border-2 border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <CalendarDays className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Esperanza de vida</span>
          </div>
          <p className="text-xl font-outfit font-semibold text-foreground">{breed.lifeSpan} años</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-sm">
          <h2 className="text-xl font-outfit font-semibold mb-3 text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Acerca de
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {breed.description}
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-sm">
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
    </>
  );
};

export default PetDetails;
