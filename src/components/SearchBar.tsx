import { type ChangeEvent } from "react";

import type { UrlSections } from "@/lib/api";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";

interface Props {
  section: UrlSections;
  searchQuery?: string;
  handleSearchChange: (value: string) => void;
  disabled?: boolean;
}

const SearchBar = ({
  section,
  searchQuery,
  disabled,
  handleSearchChange,
}: Props) => {

  const sectionDictionary: Record<UrlSections, string> = {
    cats: "gatos",
    dogs: "perros",
    vacunos: "vacunos",
    caballos: "caballos",
  };

  const placeholderText = `Buscar razas de ${sectionDictionary[section]}...`;

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

  return (
    <div className="relative container mx-auto mb-8">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300 z-10" aria-hidden="true" />
        <Input
          type="text"
          placeholder={placeholderText}
          value={searchQuery}
          onChange={onSearch}
          className="relative pl-12 pr-12 bg-card border-border text-foreground placeholder:text-muted-foreground rounded-xl h-14 text-lg focus-visible:ring-primary/50 transition-all duration-300 shadow-sm border-2 focus-visible:border-primary/50"
          disabled={disabled}
          aria-label={placeholderText}
        />
        {!!searchQuery && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 z-10"
            onClick={() => handleSearchChange("")}
            aria-label="Limpiar búsqueda"
            data-testid="clear-button"
            type="button"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
