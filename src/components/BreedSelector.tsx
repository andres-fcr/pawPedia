import { useState, useEffect } from "react";
import { Search } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSpecies } from "@/hooks/UseSpecies";
import type { UrlSections } from "@/lib/api";
import { cn } from "@/lib/utils";

interface BreedSelectorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentBreedId: string;
  section: UrlSections;
  onSelect: (breedId: string) => void;
}

const BreedSelector = ({
  isOpen,
  onOpenChange,
  currentBreedId,
  section,
  onSelect,
}: BreedSelectorProps) => {
  const { data: breeds, isLoading } = useSpecies(section);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedId(null);
    }
  }, [isOpen]);

  const filteredBreeds = breeds.filter(
    (breed) =>
      breed.id !== currentBreedId &&
      breed.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelect = (breedId: string) => {
    setSelectedId(breedId);
  };

  const handleConfirm = () => {
    if (selectedId) {
      onSelect(selectedId);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-hidden flex flex-col">
        <DialogTitle className="text-xl font-outfit font-semibold">
          Seleccionar raza para comparar
        </DialogTitle>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar raza..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex-1 overflow-y-auto min-h-[200px] max-h-[400px] space-y-2">
          {isLoading ? (
            <div className="text-center text-muted-foreground py-8">
              Cargando razas...
            </div>
          ) : filteredBreeds.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No se encontraron razas
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredBreeds.map((breed) => (
                <button
                  key={breed.id}
                  onClick={() => handleSelect(breed.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 text-left",
                    selectedId === breed.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-secondary/50",
                  )}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-sm line-clamp-2">
                    {breed.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 px-4 py-2 rounded-lg border-2 border-border hover:bg-secondary/50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedId}
            className="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Comparar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BreedSelector;