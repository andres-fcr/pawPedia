import { Scale, Ruler, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "./ui/badge";
import type { NormalizedBreed } from "@/lib/api";
import HeroImage from "@/components/HeroImage";
import StatCard from "@/components/StatCard";
import SectionCard from "@/components/SectionCard";

interface PetDetailsProps {
  breed: NormalizedBreed;
  onZoomImage: () => void;
}

const PetDetails = ({ breed, onZoomImage }: PetDetailsProps) => {
  return (
    <>
      <HeroImage
        src={breed.image}
        alt={breed.name}
        origin={breed.origin}
        onZoomImage={onZoomImage}
        originIcon={
          <svg className="h-6 w-6 text-primary animate-float" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Scale className="w-5 h-5" />}
          label="Peso"
          value={`${breed.weight} kg`}
        />
        <StatCard
          icon={<Ruler className="w-5 h-5" />}
          label="Altura"
          value={breed.height ? `${breed.height} cm` : "N/D"}
          accent="accent"
        />
        <StatCard
          icon={<CalendarDays className="w-5 h-5" />}
          label="Esperanza de vida"
          value={`${breed.lifeSpan} años`}
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <SectionCard title="Acerca de" icon={<MapPin className="w-5 h-5 text-primary" />}>
          <p className="text-muted-foreground leading-relaxed">
            {breed.description}
          </p>
        </SectionCard>

        <SectionCard title="Temperamento" icon={<span className="sr-only">Temperamento</span>}>
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
        </SectionCard>
      </div>
    </>
  );
};

export default PetDetails;
