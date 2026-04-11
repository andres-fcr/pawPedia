import { RefreshCw, ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { BreedData, NormalizedCattleBreed, NormalizedHorseBreed, NormalizedBreed } from "@/lib/api";
import { isCattleBreed, isHorseBreed } from "@/lib/api";
import { Leaf, MapPin } from "lucide-react";

interface BreedImageCardProps {
  breed: BreedData;
  breedName: string;
  onChangeBreed: () => void;
  onZoomImage: () => void;
}

const BreedImageCard = ({ breed, breedName, onChangeBreed, onZoomImage }: BreedImageCardProps) => {
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

export default BreedImageCard;