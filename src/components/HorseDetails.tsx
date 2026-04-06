import {
  MapPin,
  Palette,
  Heart,
  Ruler,
  Scale,
  CalendarDays,
  Target,
  Map,
  Link,
} from "lucide-react";

import { Badge } from "./ui/badge";
import type { NormalizedHorseBreed } from "@/lib/api";
import HeroImage from "@/components/HeroImage";
import StatCard from "@/components/StatCard";
import SectionCard from "@/components/SectionCard";
import DetailRow from "@/components/DetailRow";

interface HorseDetailsProps {
  breed: NormalizedHorseBreed;
  onZoomImage: () => void;
}

const HorseDetails = ({ breed, onZoomImage }: HorseDetailsProps) => {
  return (
    <>
      <HeroImage
        src={breed.image}
        alt={breed.name}
        origin={breed.countryOfOrigin}
        onZoomImage={onZoomImage}
        originIcon={<MapPin className="h-6 w-6 text-primary animate-float" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={<Scale className="w-5 h-5" />}
          label="Peso aproximado"
          value={breed.approximateWeight}
        />
        <StatCard
          icon={<Ruler className="w-5 h-5" />}
          label="Tamaño"
          value={breed.size}
          accent="accent"
        />
        <StatCard
          icon={<CalendarDays className="w-5 h-5" />}
          label="Esperanza de vida"
          value={breed.lifespan}
        />
      </div>

      <div className="bg-secondary/50 rounded-2xl p-6 border-2 border-border mb-8">
        <h2 className="text-xl font-outfit font-semibold mb-3 text-foreground flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Acerca de:
        </h2>
        <p className="leading-relaxed">{breed.description}</p>

        <span className="text-lg font-outfit font-semibold mb-3 mt-4 text-foreground flex items-center gap-2">
          <Map className="w-4 h-4 text-primary" />
          Región en Colombia:
        </span>
        <p className="font-medium">{breed.colombiaRegion}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-outfit font-semibold mb-4 text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Aptitud
        </h2>
        <Badge
          className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 rounded-full px-4 py-2 font-medium transition-colors duration-200 text-sm w-fit max-w-full whitespace-normal text-center"
        >
          {breed.aptitude}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <SectionCard title="Características físicas" icon={<Palette className="w-5 h-5 text-primary" />}>
          <div className="space-y-0">
            <DetailRow label="Colores" value={breed.colors} />
            <DetailRow label="Orejas" value={breed.ears} />
            <DetailRow label="Crines" value={breed.manes} showBorder={false} />
          </div>
        </SectionCard>

        <SectionCard title="Temperamento" icon={<Heart className="w-5 h-5 text-primary" />}>
          <p className="text-muted-foreground leading-relaxed">
            {breed.temperament}
          </p>
        </SectionCard>
      </div>

      {breed.links.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-outfit font-semibold mb-4 text-foreground flex items-center gap-2">
            <Link className="w-5 h-5 text-primary" />
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
