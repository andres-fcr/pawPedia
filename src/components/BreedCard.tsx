import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { BreedData } from "@/lib/api";
import { isCattleBreed, isHorseBreed } from "@/lib/api";

interface BreedCardProps {
  breed: BreedData;
  onClick: (id: string) => void;
}

export default function BreedCard({ breed, onClick }: BreedCardProps) {
  const handleClick = () => {
    onClick(breed.id);
  };

  const isCattle = isCattleBreed(breed);
  const isHorse = isHorseBreed(breed);

  const fallbackText = "Descubre más";

  let temperamentPreview: string = fallbackText;
  if (isCattle) {
    temperamentPreview = breed.productiveUsages?.slice(0, 2).join(" • ");
  } else if (isHorse) {
    temperamentPreview = breed.temperament;
  } else {
    temperamentPreview = breed.temperament?.slice(0, 2).join(" • ") || fallbackText;
  }

  const origin = isHorse ? breed.countryOfOrigin : breed.origin;

  return (
    <div className="h-full group perspective-1000">
      <Card
        className="h-full p-0 cursor-pointer overflow-hidden bg-card border-border hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:shadow-primary/10"
        onClick={handleClick}
      >
        <CardContent className="p-0">
          <div className="relative w-full pt-[75%] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <img
              src={breed.image}
              alt={breed.name}
              className="object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-110 h-full w-full"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=600&width=800";
              }}
            />
            <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-white/80 text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                {origin}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 flex flex-col items-start gap-1 capitalize">
          <h3 className="font-outfit text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
            {breed.name}
          </h3>
          <p className="text-sm text-muted-foreground capitalize line-clamp-1">
            {temperamentPreview || fallbackText}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
