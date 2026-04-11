import React from "react";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type {
  BreedData,
  NormalizedBreed,
  NormalizedCattleBreed,
  NormalizedHorseBreed,
} from "@/lib/api";
import { isCattleBreed, isHorseBreed } from "@/lib/api";
import { cn } from "@/lib/utils";
import PetDetails from "./PetDetails";
import CattleDetails from "./CattleDetails";
import HorseDetails from "./HorseDetails";
import {
  PetStatsSection,
  PetAboutSection,
  PetTemperamentSection,
  CattleStatsSection,
  CattleAboutSection,
  CattleUsosSection,
  CattlePhysicalSection,
  CattleLecheSection,
  CattleCarneSection,
  HorseStatsSection,
  HorseAboutSection,
  HorseAptitudSection,
  HorsePhysicalSection,
  HorseTemperamentSection,
  BreedImageCard,
  EmptyBreedCard,
  SectionHeader,
} from "./compare";
import {
  Scale,
  MapPin,
  Beef,
  Droplets,
  Shield,
  Palette,
  Heart,
  Target,
  ArrowRightLeft,
  Plus,
  RefreshCw,
} from "lucide-react";

interface CompareViewProps {
  breed1: BreedData | null;
  breed2: BreedData | null;
  onChangeBreed: (slot: 1 | 2) => void;
  onReturn: () => void;
  onZoomImage: (src: string) => void;
}

interface SectionConfig {
  headerTitle: string;
  headerIcon: React.ReactNode;
  SectionComponent: React.ComponentType<{ breed: unknown; breedName: string }>;
  keyPrefix: string;
}

const PET_SECTIONS: SectionConfig[] = [
  {
    headerTitle: "Estadísticas",
    headerIcon: <Scale className="w-5 h-5 text-primary" />,
    SectionComponent: PetStatsSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "stats",
  },
  {
    headerTitle: "Acerca de",
    headerIcon: <MapPin className="w-5 h-5 text-primary" />,
    SectionComponent: PetAboutSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "about",
  },
  {
    headerTitle: "Temperamento",
    headerIcon: <span className="sr-only">Temperamento</span>,
    SectionComponent: PetTemperamentSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "temp",
  },
];

const CATTLE_SECTIONS: SectionConfig[] = [
  {
    headerTitle: "Estadísticas",
    headerIcon: <Scale className="w-5 h-5 text-primary" />,
    SectionComponent: CattleStatsSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "stats",
  },
  {
    headerTitle: "Acerca de",
    headerIcon: <MapPin className="w-5 h-5 text-primary" />,
    SectionComponent: CattleAboutSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "about",
  },
  {
    headerTitle: "Usos productivos",
    headerIcon: <Shield className="w-5 h-5 text-primary" />,
    SectionComponent: CattleUsosSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "usos",
  },
  {
    headerTitle: "Características físicas",
    headerIcon: <Beef className="w-5 h-5 text-primary" />,
    SectionComponent: CattlePhysicalSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "physical",
  },
  {
    headerTitle: "Producción de leche",
    headerIcon: <Droplets className="w-5 h-5 text-accent" />,
    SectionComponent: CattleLecheSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "leche",
  },
  {
    headerTitle: "Producción de carne",
    headerIcon: <Beef className="w-5 h-5 text-primary" />,
    SectionComponent: CattleCarneSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "carne",
  },
];

const HORSE_SECTIONS: SectionConfig[] = [
  {
    headerTitle: "Estadísticas",
    headerIcon: <Scale className="w-5 h-5 text-primary" />,
    SectionComponent: HorseStatsSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "stats",
  },
  {
    headerTitle: "Acerca de",
    headerIcon: <MapPin className="w-5 h-5 text-primary" />,
    SectionComponent: HorseAboutSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "about",
  },
  {
    headerTitle: "Aptitud",
    headerIcon: <Target className="w-5 h-5 text-primary" />,
    SectionComponent: HorseAptitudSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "aptitud",
  },
  {
    headerTitle: "Características físicas",
    headerIcon: <Palette className="w-5 h-5 text-primary" />,
    SectionComponent: HorsePhysicalSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "physical",
  },
  {
    headerTitle: "Temperamento",
    headerIcon: <Heart className="w-5 h-5 text-primary" />,
    SectionComponent: HorseTemperamentSection as React.ComponentType<{ breed: unknown; breedName: string }>,
    keyPrefix: "temp",
  },
];

function renderSections(
  configs: SectionConfig[],
  breed1: unknown,
  breed2: unknown,
  breed1Original: BreedData | null,
  breed2Original: BreedData | null,
  getBreedName: (breed: BreedData | null) => string,
): React.ReactNode[] {
  const sections: React.ReactNode[] = [];

  for (const config of configs) {
    sections.push(
      <SectionHeader
        key={`${config.keyPrefix}-header`}
        title={config.headerTitle}
        icon={config.headerIcon}
      />,
    );

    if (breed1) {
      const Section = config.SectionComponent;
      sections.push(
        <Section
          key={`${config.keyPrefix}1`}
          breed={breed1}
          breedName={getBreedName(breed1Original)}
        />,
      );
    }
    if (breed2) {
      const Section = config.SectionComponent;
      sections.push(
        <Section
          key={`${config.keyPrefix}2`}
          breed={breed2}
          breedName={getBreedName(breed2Original)}
        />,
      );
    }
  }

  return sections;
}

const CompareView = ({
  breed1,
  breed2,
  onChangeBreed,
  onReturn,
  onZoomImage,
}: CompareViewProps) => {
  const getBreedName = (breed: BreedData | null) => breed?.name || "";

  const renderMobileComparison = () => {
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

    const sections: React.ReactNode[] = [];

    if (breed1) {
      sections.push(
        <BreedImageCard
          key="breed1-image"
          breed={breed1}
          breedName={getBreedName(breed1)}
          onChangeBreed={() => onChangeBreed(1)}
          onZoomImage={() => onZoomImage(breed1.image)}
        />,
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
        />,
      );
    }

    if (breed1 || breed2) {
      const pet1 =
        breed1 && !isCattleBreed(breed1) && !isHorseBreed(breed1)
          ? (breed1 as NormalizedBreed)
          : null;
      const pet2 =
        breed2 && !isCattleBreed(breed2) && !isHorseBreed(breed2)
          ? (breed2 as NormalizedBreed)
          : null;
      const cattle1 = breed1 && isCattleBreed(breed1)
        ? (breed1 as NormalizedCattleBreed)
        : null;
      const cattle2 = breed2 && isCattleBreed(breed2)
        ? (breed2 as NormalizedCattleBreed)
        : null;
      const horse1 = breed1 && isHorseBreed(breed1)
        ? (breed1 as NormalizedHorseBreed)
        : null;
      const horse2 = breed2 && isHorseBreed(breed2)
        ? (breed2 as NormalizedHorseBreed)
        : null;

      if (pet1 || pet2) {
        sections.push(...renderSections(PET_SECTIONS, pet1, pet2, breed1, breed2, getBreedName));
      }
      if (cattle1 || cattle2) {
        sections.push(...renderSections(CATTLE_SECTIONS, cattle1, cattle2, breed1, breed2, getBreedName));
      }
      if (horse1 || horse2) {
        sections.push(...renderSections(HORSE_SECTIONS, horse1, horse2, breed1, breed2, getBreedName));
      }
    }

    if (!breed2 && breed1) {
      sections.push(
        <div key="breed2-selector" className="mt-8">
          <EmptyBreedCard slot={2} onSelect={() => onChangeBreed(2)} />
        </div>,
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
        <div
          className={cn(
            !breed1 && "border-2 border-dashed border-border rounded-xl",
          )}
        >
          {breed1 ? (
            isCattleBreed(breed1) ? (
              <CattleDetails
                breed={breed1 as NormalizedCattleBreed}
                onZoomImage={() => {}}
              />
            ) : isHorseBreed(breed1) ? (
              <HorseDetails
                breed={breed1 as NormalizedHorseBreed}
                onZoomImage={() => {}}
              />
            ) : (
              <PetDetails
                breed={breed1 as NormalizedBreed}
                onZoomImage={() => {}}
              />
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <ArrowRightLeft className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                Selecciona una raza para comparar
              </p>
              <Button onClick={() => onChangeBreed(1)}>Elegir raza</Button>
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
        <div
          className={cn(
            !breed2 && "border-2 border-dashed border-border rounded-xl",
          )}
        >
          {breed2 ? (
            isCattleBreed(breed2) ? (
              <CattleDetails
                breed={breed2 as NormalizedCattleBreed}
                onZoomImage={() => {}}
              />
            ) : isHorseBreed(breed2) ? (
              <HorseDetails
                breed={breed2 as NormalizedHorseBreed}
                onZoomImage={() => {}}
              />
            ) : (
              <PetDetails
                breed={breed2 as NormalizedBreed}
                onZoomImage={() => {}}
              />
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <ArrowRightLeft className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                Selecciona una raza para comparar
              </p>
              <Button onClick={() => onChangeBreed(2)}>Elegir raza</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onReturn}
          className="text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/5">
            Modo comparación
          </Badge>
        </div>
      </div>

      <div className="lg:hidden">{renderMobileComparison()}</div>
      <div className="hidden lg:block">{renderDesktopComparison()}</div>
    </div>
  );
};

export default CompareView;
