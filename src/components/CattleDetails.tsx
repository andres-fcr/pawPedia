import {
  Scale,
  MapPin,
  Droplets,
  Beef,
  Map,
  Leaf,
  Mountain,
  Shield,
} from "lucide-react";

import { Badge } from "./ui/badge";
import type { NormalizedCattleBreed } from "@/lib/api";
import HeroImage from "@/components/HeroImage";
import StatCard from "@/components/StatCard";
import SectionCard from "@/components/SectionCard";
import DetailRow from "@/components/DetailRow";
import InfoBox from "@/components/InfoBox";

interface CattleDetailsProps {
  breed: NormalizedCattleBreed;
  onZoomImage: () => void;
}

const CattleDetails = ({ breed, onZoomImage }: CattleDetailsProps) => {
  return (
    <>
      <HeroImage
        src={breed.image}
        alt={breed.name}
        origin={breed.origin}
        onZoomImage={onZoomImage}
        originIcon={<Leaf className="h-6 w-6 text-accent animate-float" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={<Scale className="w-5 h-5" />}
          label="Peso (macho)"
          value={`${breed.productiveCharacteristics.weight.male} Kg`}
        />
        <StatCard
          icon={<Scale className="w-5 h-5" />}
          label="Peso (hembra)"
          value={`${breed.productiveCharacteristics.weight.female} Kg`}
        />
        <StatCard
          icon={<Mountain className="w-5 h-5" />}
          label="Especie"
          value={breed.species}
          accent="accent"
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
          Región:
        </span>
        <p className="font-medium">{breed.regionColombia}</p>
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
        <SectionCard title="Características físicas" icon={<Beef className="w-5 h-5 text-primary" />}>
          <div className="space-y-0">
            <DetailRow label="Pelaje" value={breed.productiveCharacteristics.coat} />
            <DetailRow label="Patrón de pelaje" value={breed.productiveCharacteristics.coat_pattern} />
            <DetailRow label="Cuernos" value={breed.productiveCharacteristics.horns} />
            <DetailRow label="Carácter" value={breed.productiveCharacteristics.nature} showBorder={false} />
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Producción de leche" icon={<Droplets className="w-5 h-5 text-accent" />}>
            <div className="grid grid-cols-2 gap-4">
              <InfoBox label="Calidad" value={breed.productiveCharacteristics.dairy.quality} accent="accent" />
              <InfoBox label="Cantidad" value={breed.productiveCharacteristics.dairy.quantity} accent="accent" />
            </div>
          </SectionCard>

          <SectionCard title="Producción de carne" icon={<Beef className="w-5 h-5 text-primary" />}>
            <div className="grid grid-cols-2 gap-4">
              <InfoBox label="Calidad" value={breed.productiveCharacteristics.meat.quality} />
              <InfoBox label="Cantidad" value={breed.productiveCharacteristics.meat.quantity} />
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
};

export default CattleDetails;
