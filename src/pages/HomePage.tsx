import { useLocation, useNavigate } from "react-router";

import { type Sections } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import BreedCard from "@/components/BreedCard";
import { Pagination } from "@/components/ui/pagination";
import { useSpecies } from "@/hooks/UseSpecies";
import TabsSection from "@/components/TabsSection";
import SearchBar from "@/components/SearchBar";
import { Cat, Dog } from "lucide-react";

const itemsPerPage = 12;

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const section = location.pathname.split("/")[1] as Sections;

  const currentPage =
    Number(new URLSearchParams(location.search).get("page")) || 1;

  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  const handleSearchChange = (query: string) => {
    updateURL({ search: query, page: 1 });
  };

  const { data: breeds, isLoading } = useSpecies(section);

  function handleTabChange(value: string) {
    navigate(`/${value}`);
  }

  const updateURL = (params: { search?: string; page?: number }) => {
    const searchParams = new URLSearchParams(location.search);

    if (params.search !== undefined) {
      searchParams.set("search", params.search);
    }
    if (params.page !== undefined) {
      searchParams.set("page", params.page.toString());
    }
    navigate(`/${section}?${searchParams.toString()}`);
  };

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBreeds.length / itemsPerPage);
  const paginatedBreeds = filteredBreeds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleBreedClick = (breedId: string) => {
    navigate(`/${section}/${breedId}`);
  };

  return (
    <>
      <TabsSection section={section} handleTabChange={handleTabChange} />

      <section className="relative container mx-auto mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-amber-50 to-primary/5 dark:from-primary/20 dark:via-primary/10 dark:to-amber-900/20 border border-border">
        <div className="absolute inset-0 bg-pattern opacity-50 dark:opacity-30" />
        <div className="relative px-6 py-12 md:px-12 md:py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-4">
            {section === "cats" ? (
              <Cat className="w-8 h-8 text-primary animate-float" />
            ) : (
              <Dog className="w-8 h-8 text-primary animate-float" />
            )}
            <span className="text-muted-foreground font-outfit text-lg tracking-wide uppercase">
              Explore {section === "cats" ? "Feline" : "Canine"} Breeds
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-foreground mb-4">
            Discover the Perfect
            <br />
            <span className="text-primary">Companion</span>
          </h2>
          <p className="text-muted-foreground max-w-lg text-lg">
            Browse {breeds.length}+ breeds with detailed profiles, temperament insights, and care guides.
          </p>
          <div className="flex gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-outfit font-bold text-lg">{breeds.length}</span>
              </div>
              <span className="text-muted-foreground text-sm">Breeds</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-outfit font-bold">A-Z</span>
              </div>
              <span className="text-muted-foreground text-sm">Complete</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-amber-400/10 rounded-full blur-xl animate-float-delay" />
      </section>

      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        section={section}
        disabled={isLoading}
      />

      <section className="container mx-auto mb-8">
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden bg-card"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}
        {breeds.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedBreeds.map((breed, index) => (
              <div
                key={breed.id}
                className="grid-card"
                style={{ "--index": index } as React.CSSProperties}
              >
                <BreedCard breed={breed} onClick={handleBreedClick} />
              </div>
            ))}
          </section>
        )}
        {!isLoading && filteredBreeds.length === 0 && (
          <p className="text-center text-muted-foreground">
            No breeds found for this section.
          </p>
        )}
      </section>
      {!isLoading && filteredBreeds.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => updateURL({ page })}
        />
      )}
    </>
  );
};

export default HomePage;
