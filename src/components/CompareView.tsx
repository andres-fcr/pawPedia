import { ArrowLeft, ArrowRightLeft, RefreshCw, Plus, ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BreedData, NormalizedBreed, NormalizedCattleBreed, NormalizedHorseBreed } from "@/lib/api";
import { isCattleBreed, isHorseBreed } from "@/lib/api";
import { cn } from "@/lib/utils";
import PetDetails from "./PetDetails";
import CattleDetails from "./CattleDetails";
import HorseDetails from "./HorseDetails";
import { Scale, MapPin, Beef, Droplets, Shield, Palette, Heart, Target, Leaf } from "lucide-react";

interface CompareViewProps {
  breed1: BreedData | null;
  breed2: BreedData | null;
  onChangeBreed: (slot: 1 | 2) => void;
  onReturn: () => void;
  onZoomImage: (src: string) => void;
}

const PetStatsSection = ({ breed, breedName }: { breed: NormalizedBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3">
      <div className="text-left sm:text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Peso</p>
        <p className="text-lg sm:text-xl font-outfit font-semibold text-foreground break-words">{breed.weight} kg</p>
      </div>
      <div className="text-left sm:text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Altura</p>
        <p className="text-lg sm:text-xl font-outfit font-semibold text-foreground break-words">{breed.height ? `${breed.height} cm` : "N/D"}</p>
      </div>
      <div className="text-left sm:text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Vida</p>
        <p className="text-lg sm:text-xl font-outfit font-semibold text-foreground break-words">{breed.lifeSpan} años</p>
      </div>
    </div>
  </div>
);

const PetAboutSection = ({ breed, breedName }: { breed: NormalizedBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
      {breed.description}
    </p>
  </div>
);

const PetTemperamentSection = ({ breed, breedName }: { breed: NormalizedBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="flex flex-wrap gap-2">
      {breed.temperament?.map((trait, index) => (
        <Badge
          key={index}
          className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 rounded-full px-3 py-1 text-xs sm:text-sm font-medium transition-colors duration-200"
        >
          {trait}
        </Badge>
      ))}
    </div>
  </div>
);

const CattleStatsSection = ({ breed, breedName }: { breed: NormalizedCattleBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3">
      <div className="text-left sm:text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Peso M</p>
        <p className="text-lg sm:text-xl font-outfit font-semibold text-foreground break-words">{breed.productiveCharacteristics.weight.male} Kg</p>
      </div>
      <div className="text-left sm:text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Peso H</p>
        <p className="text-lg sm:text-xl font-outfit font-semibold text-foreground break-words">{breed.productiveCharacteristics.weight.female} Kg</p>
      </div>
      <div className="text-left sm:text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Especie</p>
        <p className="text-lg sm:text-xl font-outfit font-semibold text-foreground break-words">{breed.species}</p>
      </div>
    </div>
  </div>
);

const CattleAboutSection = ({ breed, breedName }: { breed: NormalizedCattleBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words mb-2">
      {breed.description}
    </p>
    <p className="text-sm font-medium text-foreground break-words">
      <span className="text-muted-foreground">Región:</span> {breed.regionColombia}
    </p>
  </div>
);

const CattleUsosSection = ({ breed, breedName }: { breed: NormalizedCattleBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="flex flex-wrap gap-2">
      {breed.productiveUsages?.map((usage, index) => (
        <Badge
          key={index}
          className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 rounded-full px-3 py-1 text-xs sm:text-sm font-medium transition-colors duration-200"
        >
          {usage}
        </Badge>
      ))}
    </div>
  </div>
);

const CattlePhysicalSection = ({ breed, breedName }: { breed: NormalizedCattleBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="space-y-2 text-sm">
      <p className="break-words"><span className="text-muted-foreground">Pelaje:</span> {breed.productiveCharacteristics.coat}</p>
      <p className="break-words"><span className="text-muted-foreground">Patrón:</span> {breed.productiveCharacteristics.coat_pattern}</p>
      <p className="break-words"><span className="text-muted-foreground">Cuernos:</span> {breed.productiveCharacteristics.horns}</p>
      <p className="break-words"><span className="text-muted-foreground">Carácter:</span> {breed.productiveCharacteristics.nature}</p>
    </div>
  </div>
);

const CattleLecheSection = ({ breed, breedName }: { breed: NormalizedCattleBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Calidad</p>
        <p className="text-base sm:text-lg font-outfit font-semibold text-accent break-words">{breed.productiveCharacteristics.dairy.quality}</p>
      </div>
      <div>
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Cantidad</p>
        <p className="text-base sm:text-lg font-outfit font-semibold text-accent break-words">{breed.productiveCharacteristics.dairy.quantity}</p>
      </div>
    </div>
  </div>
);

const CattleCarneSection = ({ breed, breedName }: { breed: NormalizedCattleBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Calidad</p>
        <p className="text-base sm:text-lg font-outfit font-semibold text-foreground break-words">{breed.productiveCharacteristics.meat.quality}</p>
      </div>
      <div>
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Cantidad</p>
        <p className="text-base sm:text-lg font-outfit font-semibold text-foreground break-words">{breed.productiveCharacteristics.meat.quantity}</p>
      </div>
    </div>
  </div>
);

const HorseStatsSection = ({ breed, breedName }: { breed: NormalizedHorseBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3">
      <div className="text-left sm:text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Peso</p>
        <p className="text-lg sm:text-xl font-outfit font-semibold text-foreground break-words">{breed.approximateWeight}</p>
      </div>
      <div className="text-left sm:text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Tamaño</p>
        <p className="text-lg sm:text-xl font-outfit font-semibold text-foreground break-words">{breed.size}</p>
      </div>
      <div className="text-left sm:text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mb-1">Vida</p>
        <p className="text-lg sm:text-xl font-outfit font-semibold text-foreground break-words">{breed.lifespan}</p>
      </div>
    </div>
  </div>
);

const HorseAboutSection = ({ breed, breedName }: { breed: NormalizedHorseBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words mb-2">
      {breed.description}
    </p>
    <p className="text-sm font-medium text-foreground break-words">
      <span className="text-muted-foreground">Región:</span> {breed.colombiaRegion}
    </p>
  </div>
);

const HorseAptitudSection = ({ breed, breedName }: { breed: NormalizedHorseBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 rounded-full px-3 py-1 text-xs sm:text-sm font-medium transition-colors duration-200 w-fit max-w-full whitespace-normal text-center">
      {breed.aptitude}
    </Badge>
  </div>
);

const HorsePhysicalSection = ({ breed, breedName }: { breed: NormalizedHorseBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <div className="space-y-2 text-sm">
      <p className="break-words"><span className="text-muted-foreground">Colores:</span> {breed.colors}</p>
      <p className="break-words"><span className="text-muted-foreground">Orejas:</span> {breed.ears}</p>
      <p className="break-words"><span className="text-muted-foreground">Crines:</span> {breed.manes}</p>
    </div>
  </div>
);

const HorseTemperamentSection = ({ breed, breedName }: { breed: NormalizedHorseBreed; breedName: string }) => (
  <div className="bg-card rounded-2xl p-4 sm:p-5 border-2 border-border shadow-sm mb-4">
    <p className="text-xs sm:text-sm font-semibold text-primary mb-3">{breedName}</p>
    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
      {breed.temperament}
    </p>
  </div>
);

const BreedImageCard = ({ breed, breedName, onChangeBreed, onZoomImage }: { breed: BreedData; breedName: string; onChangeBreed: () => void; onZoomImage: () => void }) => {
  const isCattle = isCattleBreed(breed);
  const isHorse = isHorseBreed(breed);

  const getOrigin = () => {
    if (isCattle) return (breed as NormalizedCattleBreed).regionColombia;
    if (isHorse) return (breed as NormalizedHorseBreed).countryOfOrigin;
    return (breed as NormalizedBreed).origin;
  };

  const getOriginIcon = () => {
    if (isCattle) return <Leaf className="h-6 w-6 text-accent animate-float" />;
    if (isHorse) return <MapPin className="h-6 w-6 text-primary animate-float" />;
    return (
      <svg className="h-6 w-6 text-primary animate-float" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
    );
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden border-2 border-border shadow-sm mb-4">
      <div className="relative aspect-[4/3] sm:aspect-[4/3]">
        <img
          src={breed.image}
          alt={breedName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-2">
            {getOriginIcon()}
            <span className="text-white/80 font-outfit text-xs tracking-wide uppercase">
              {getOrigin()}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white break-words">
            {breedName}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onChangeBreed}
          className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm h-9 px-3"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Cambiar</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomImage}
          className="absolute top-3 left-3 z-10 bg-background/80 backdrop-blur-sm h-9 px-3"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const EmptyBreedCard = ({ slot, onSelect }: { slot: 1 | 2; onSelect: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] p-8 text-center border-2 border-dashed border-border rounded-2xl bg-card mb-4">
    <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
      <ArrowRightLeft className="w-8 h-8 text-muted-foreground" />
    </div>
    <p className="text-muted-foreground mb-4 text-sm sm:text-base">
      {slot === 1 ? "Selecciona la primera raza" : "Selecciona la segunda raza"}
    </p>
    <Button onClick={onSelect} size="lg" className="gap-2">
      <Plus className="h-5 w-5" />
      Elegir raza
    </Button>
  </div>
);

const SectionHeader = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-4 mt-8 first:mt-0">
    {icon}
    <h3 className="text-lg sm:text-xl font-outfit font-semibold text-foreground">{title}</h3>
  </div>
);

const CompareView = ({
  breed1,
  breed2,
  onChangeBreed,
  onReturn,
  onZoomImage,
}: CompareViewProps) => {
  const getBreedName = (breed: BreedData | null) => breed?.name || "";

  const renderMobileComparison = () => {
    const sections: React.ReactNode[] = [];

    if (!breed1 && !breed2) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <ArrowRightLeft className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">
            Selecciona al menos una raza para comparar
          </p>
          <Button onClick={() => onChangeBreed(1)} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Elegir primera raza
          </Button>
        </div>
      );
    }

    if (breed1) {
      sections.push(
        <BreedImageCard
          key="breed1-image"
          breed={breed1}
          breedName={getBreedName(breed1)}
          onChangeBreed={() => onChangeBreed(1)}
          onZoomImage={() => onZoomImage(breed1.image)}
        />
      );
    }
    if (breed2) {
      sections.push(
        <BreedImageCard
          key="breed2-image"
          breed={breed2}
          breedName={getBreedName(breed2)}
          onChangeBreed={() => onChangeBreed(2)}
          onZoomImage={() => onZoomImage(breed2.image)}
        />
      );
    }

    if (breed1 || breed2) {
      const pet1 = breed1 && !isCattleBreed(breed1) && !isHorseBreed(breed1) ? breed1 as NormalizedBreed : null;
      const pet2 = breed2 && !isCattleBreed(breed2) && !isHorseBreed(breed2) ? breed2 as NormalizedBreed : null;
      const cattle1 = breed1 && isCattleBreed(breed1) ? breed1 as NormalizedCattleBreed : null;
      const cattle2 = breed2 && isCattleBreed(breed2) ? breed2 as NormalizedCattleBreed : null;
      const horse1 = breed1 && isHorseBreed(breed1) ? breed1 as NormalizedHorseBreed : null;
      const horse2 = breed2 && isHorseBreed(breed2) ? breed2 as NormalizedHorseBreed : null;

      if (pet1 || pet2) {
        sections.push(<SectionHeader key="stats-header" title="Estadísticas" icon={<Scale className="w-5 h-5 text-primary" />} />);
        if (pet1) sections.push(<PetStatsSection key="pet1-stats" breed={pet1} breedName={getBreedName(breed1)} />);
        if (pet2) sections.push(<PetStatsSection key="pet2-stats" breed={pet2} breedName={getBreedName(breed2)} />);

        sections.push(<SectionHeader key="about-header" title="Acerca de" icon={<MapPin className="w-5 h-5 text-primary" />} />);
        if (pet1) sections.push(<PetAboutSection key="pet1-about" breed={pet1} breedName={getBreedName(breed1)} />);
        if (pet2) sections.push(<PetAboutSection key="pet2-about" breed={pet2} breedName={getBreedName(breed2)} />);

        sections.push(<SectionHeader key="temperament-header" title="Temperamento" icon={<span className="sr-only">Temperamento</span>} />);
        if (pet1) sections.push(<PetTemperamentSection key="pet1-temp" breed={pet1} breedName={getBreedName(breed1)} />);
        if (pet2) sections.push(<PetTemperamentSection key="pet2-temp" breed={pet2} breedName={getBreedName(breed2)} />);
      }

      if (cattle1 || cattle2) {
        sections.push(<SectionHeader key="stats-header" title="Estadísticas" icon={<Scale className="w-5 h-5 text-primary" />} />);
        if (cattle1) sections.push(<CattleStatsSection key="cattle1-stats" breed={cattle1} breedName={getBreedName(breed1)} />);
        if (cattle2) sections.push(<CattleStatsSection key="cattle2-stats" breed={cattle2} breedName={getBreedName(breed2)} />);

        sections.push(<SectionHeader key="about-header" title="Acerca de" icon={<MapPin className="w-5 h-5 text-primary" />} />);
        if (cattle1) sections.push(<CattleAboutSection key="cattle1-about" breed={cattle1} breedName={getBreedName(breed1)} />);
        if (cattle2) sections.push(<CattleAboutSection key="cattle2-about" breed={cattle2} breedName={getBreedName(breed2)} />);

        sections.push(<SectionHeader key="usos-header" title="Usos productivos" icon={<Shield className="w-5 h-5 text-primary" />} />);
        if (cattle1) sections.push(<CattleUsosSection key="cattle1-usos" breed={cattle1} breedName={getBreedName(breed1)} />);
        if (cattle2) sections.push(<CattleUsosSection key="cattle2-usos" breed={cattle2} breedName={getBreedName(breed2)} />);

        sections.push(<SectionHeader key="physical-header" title="Características físicas" icon={<Beef className="w-5 h-5 text-primary" />} />);
        if (cattle1) sections.push(<CattlePhysicalSection key="cattle1-physical" breed={cattle1} breedName={getBreedName(breed1)} />);
        if (cattle2) sections.push(<CattlePhysicalSection key="cattle2-physical" breed={cattle2} breedName={getBreedName(breed2)} />);

        sections.push(<SectionHeader key="leche-header" title="Producción de leche" icon={<Droplets className="w-5 h-5 text-accent" />} />);
        if (cattle1) sections.push(<CattleLecheSection key="cattle1-leche" breed={cattle1} breedName={getBreedName(breed1)} />);
        if (cattle2) sections.push(<CattleLecheSection key="cattle2-leche" breed={cattle2} breedName={getBreedName(breed2)} />);

        sections.push(<SectionHeader key="carne-header" title="Producción de carne" icon={<Beef className="w-5 h-5 text-primary" />} />);
        if (cattle1) sections.push(<CattleCarneSection key="cattle1-carne" breed={cattle1} breedName={getBreedName(breed1)} />);
        if (cattle2) sections.push(<CattleCarneSection key="cattle2-carne" breed={cattle2} breedName={getBreedName(breed2)} />);
      }

      if (horse1 || horse2) {
        sections.push(<SectionHeader key="stats-header" title="Estadísticas" icon={<Scale className="w-5 h-5 text-primary" />} />);
        if (horse1) sections.push(<HorseStatsSection key="horse1-stats" breed={horse1} breedName={getBreedName(breed1)} />);
        if (horse2) sections.push(<HorseStatsSection key="horse2-stats" breed={horse2} breedName={getBreedName(breed2)} />);

        sections.push(<SectionHeader key="about-header" title="Acerca de" icon={<MapPin className="w-5 h-5 text-primary" />} />);
        if (horse1) sections.push(<HorseAboutSection key="horse1-about" breed={horse1} breedName={getBreedName(breed1)} />);
        if (horse2) sections.push(<HorseAboutSection key="horse2-about" breed={horse2} breedName={getBreedName(breed2)} />);

        sections.push(<SectionHeader key="aptitud-header" title="Aptitud" icon={<Target className="w-5 h-5 text-primary" />} />);
        if (horse1) sections.push(<HorseAptitudSection key="horse1-aptitud" breed={horse1} breedName={getBreedName(breed1)} />);
        if (horse2) sections.push(<HorseAptitudSection key="horse2-aptitud" breed={horse2} breedName={getBreedName(breed2)} />);

        sections.push(<SectionHeader key="physical-header" title="Características físicas" icon={<Palette className="w-5 h-5 text-primary" />} />);
        if (horse1) sections.push(<HorsePhysicalSection key="horse1-physical" breed={horse1} breedName={getBreedName(breed1)} />);
        if (horse2) sections.push(<HorsePhysicalSection key="horse2-physical" breed={horse2} breedName={getBreedName(breed2)} />);

        sections.push(<SectionHeader key="temperament-header" title="Temperamento" icon={<Heart className="w-5 h-5 text-primary" />} />);
        if (horse1) sections.push(<HorseTemperamentSection key="horse1-temp" breed={horse1} breedName={getBreedName(breed1)} />);
        if (horse2) sections.push(<HorseTemperamentSection key="horse2-temp" breed={horse2} breedName={getBreedName(breed2)} />);
      }
    }

    if (!breed2 && breed1) {
      sections.push(
        <div key="breed2-selector" className="mt-8">
          <EmptyBreedCard slot={2} onSelect={() => onChangeBreed(2)} />
        </div>
      );
    }

    return sections;
  };

  const renderDesktopComparison = () => (
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
          {breed1 ? (
            isCattleBreed(breed1) ? (
              <CattleDetails breed={breed1 as NormalizedCattleBreed} onZoomImage={() => {}} />
            ) : isHorseBreed(breed1) ? (
              <HorseDetails breed={breed1 as NormalizedHorseBreed} onZoomImage={() => {}} />
            ) : (
              <PetDetails breed={breed1 as NormalizedBreed} onZoomImage={() => {}} />
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <ArrowRightLeft className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                Selecciona una raza para comparar
              </p>
              <Button onClick={() => onChangeBreed(1)}>
                Elegir raza
              </Button>
            </div>
          )}
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
          {breed2 ? (
            isCattleBreed(breed2) ? (
              <CattleDetails breed={breed2 as NormalizedCattleBreed} onZoomImage={() => {}} />
            ) : isHorseBreed(breed2) ? (
              <HorseDetails breed={breed2 as NormalizedHorseBreed} onZoomImage={() => {}} />
            ) : (
              <PetDetails breed={breed2 as NormalizedBreed} onZoomImage={() => {}} />
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <ArrowRightLeft className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                Selecciona una raza para comparar
              </p>
              <Button onClick={() => onChangeBreed(2)}>
                Elegir raza
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

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

      <div className="lg:hidden">
        {renderMobileComparison()}
      </div>
      <div className="hidden lg:block">
        {renderDesktopComparison()}
      </div>
    </div>
  );
};

export default CompareView;