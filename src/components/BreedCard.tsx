"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { NormalizedBreed } from "@/lib/api";

interface BreedCardProps {
  breed: NormalizedBreed;
  onClick: (id: NormalizedBreed["id"]) => void;
}

export default function BreedCard({ breed, onClick }: BreedCardProps) {
  // Function to handle click event
  const handleClick = () => {
    onClick(breed.id);
  };

  return (
    <div className="h-full translate-y-5">
      <Card
        className="h-full p-0 cursor-pointer overflow-hidden bg-white dark:bg-slate-800 border-amber-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.03] hover:-translate-y-1"
        onClick={handleClick}
      >
        <CardContent className="p-0">
          <div className="relative w-full pt-[95%] overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700">
            <img
              src={breed.image}
              alt={breed.name}
              className="object-cover absolute inset-0 transition-transform duration-300 h-full w-full"
              onError={(e) => {
                e.currentTarget.src =
                  breed.imageAlt || "/placeholder.svg?height=600&width=800";
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="p-4 flex flex-col items-start">
          <h3 className="font-xl text-lg text-slate-900 dark:text-slate-100">
            {breed.name}
          </h3>
          <p className="text-medium text-slate-600 dark:text-slate-400">
            {breed.origin}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
