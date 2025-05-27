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
    <div className="relative container mx-auto mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
      <Input
        type="text"
        placeholder={`Search ${section} breeds...`}
        value={searchQuery}
        onChange={onSearch}
        className="pl-10 bg-white dark:bg-slate-800 border-amber-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
        disabled={disabled}
      />
      {!!searchQuery && (
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          onClick={() => handleSearchChange("")}
        >
          <X />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
