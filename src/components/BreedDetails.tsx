import { useState } from "react";
import { ArrowLeft, Badge, PawPrintIcon as Paw, ZoomIn } from "lucide-react";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import type { NormalizedBreed } from "@/lib/api";
import ImageModal from "./ImageModal";

interface BreedDetailsProps {
  breed: NormalizedBreed | null;
  isLoading: boolean;
  onReturn: () => void;
}

const BreedDetails = ({ breed, isLoading, onReturn }: BreedDetailsProps) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {breed && (
          <Button
            variant="ghost"
            onClick={onReturn}
            className="mb-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-amber-100/50 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to breeds
          </Button>
        )}

        {isLoading && (
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-64 mb-4 bg-amber-100/50 dark:bg-slate-800" />
            <Skeleton className="h-6 w-48 mb-8 bg-amber-100/50 dark:bg-slate-800" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-80 w-full rounded-lg bg-amber-100/50 dark:bg-slate-800" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full bg-amber-100/50 dark:bg-slate-800" />
                <Skeleton className="h-6 w-full bg-amber-100/50 dark:bg-slate-800" />
                <Skeleton className="h-6 w-3/4 bg-amber-100/50 dark:bg-slate-800" />
                <Skeleton className="h-6 w-1/2 bg-amber-100/50 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        )}
        {breed && (
          <div className="max-w-4xl mx-auto details-card">
            <div className="flex items-center gap-2 mb-2">
              <Paw className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
                {breed.name}
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Origin: {breed.origin}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-md group">
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src={breed.image || "/placeholder.svg?height=600&width=800"}
                    alt={breed.name}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-200"
                    aria-label="Zoom image"
                  >
                    <ZoomIn className="text-transparent group-hover:text-white w-10 h-10 transition-all duration-200 transform scale-75 group-hover:scale-100" />
                  </button>
                </div>
              </div>

              <div className="space-y-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <div>
                  <h2 className="text-xl font-medium mb-2 text-amber-600 dark:text-amber-400">
                    About
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300">
                    {breed.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Weight
                    </h3>
                    <p className="text-slate-800 dark:text-slate-200">
                      {breed.weight} kg
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Height
                    </h3>
                    <p className="text-slate-800 dark:text-slate-200">
                      {breed.height === "N/A"
                        ? "Not available"
                        : `${breed.height} cm`}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Life Span
                    </h3>
                    <p className="text-slate-800 dark:text-slate-200">
                      {breed.lifeSpan} years
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Origin
                    </h3>
                    <p className="text-slate-800 dark:text-slate-200">
                      {breed.origin}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-medium mb-3 text-amber-600 dark:text-amber-400">
                    Temperament
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {breed.temperament?.map((trait, index) => (
                      <Badge
                        key={index}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-amber-300 border-amber-200 dark:border-slate-600"
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!breed && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-6 rounded-lg">
              <p className="text-xl">Details not found!</p>
              <Button
                variant="outline"
                onClick={onReturn}
                className="mt-4 border-red-700 text-red-700 dark:border-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50"
              >
                Return to homepage
              </Button>
            </div>
          </div>
        )}
      </div>
      <ImageModal
        isOpen={isZoomOpen}
        onOpenChange={() => setIsZoomOpen(false)}
        imageUrl={breed?.image || "/placeholder.svg?height=600&width=800"}
        altText={breed?.name || "Breed image"}
      />
    </>
  );
};

export default BreedDetails;
