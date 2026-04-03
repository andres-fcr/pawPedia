import { type ChangeEvent } from "react";

import type { Sections } from "@/lib/api";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";

interface Props {
  section: Sections;
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
  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

  return (
    <div className="relative container mx-auto mb-8">
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/10 rounded-xl blur-sm group-focus-within:bg-primary/20 group-focus-within:blur-md transition-all duration-300" />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300 z-10" />
        <Input
          type="text"
          placeholder={`Buscar razas de ${section}...`}
          value={searchQuery}
          onChange={onSearch}
          className="relative pl-12 pr-12 bg-card border-border text-foreground placeholder:text-muted-foreground rounded-xl h-14 text-lg focus-visible:ring-primary/50 transition-all duration-300 shadow-sm"
          disabled={disabled}
        />
        {!!searchQuery && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 z-10"
            onClick={() => handleSearchChange("")}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
