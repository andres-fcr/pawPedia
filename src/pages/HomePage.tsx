import { useLocation, useNavigate } from "react-router";

import { type UrlSections } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import BreedCard from "@/components/BreedCard";
import { Pagination } from "@/components/ui/pagination";
import { useSpecies } from "@/hooks/UseSpecies";
import TabsSection from "@/components/TabsSection";
import SearchBar from "@/components/SearchBar";
import { Cat, Dog, Beef } from "lucide-react";

const itemsPerPage = 12;

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const section = location.pathname.split("/")[1] as UrlSections;

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
    breed.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredBreeds.length / itemsPerPage);
  const paginatedBreeds = filteredBreeds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleBreedClick = (breedId: string) => {
    navigate(`/${section}/${breedId}`);
  };

  return (
    <>
      <TabsSection section={section} handleTabChange={handleTabChange} />

      <section className="relative container mx-auto mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-amber-50 to-primary/5 dark:from-primary/20 dark:via-primary/10 dark:to-amber-900/20 border border-border">
        <div className="absolute inset-0 bg-pattern opacity-50 dark:opacity-30" />
        <div className="relative px-5 py-6 md:px-8 md:py-8 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {section === "cats" ? (
                <Cat className="w-5 h-5 text-primary" />
              ) : section === "dogs" ? (
                <Dog className="w-5 h-5 text-primary" />
              ) : (
                <Beef className="w-5 h-5 text-primary" />
              )}
              <span className="text-muted-foreground font-outfit text-sm tracking-wide uppercase">
                {section === "cats"
                  ? "Explora las razas felinas"
                  : section === "dogs"
                  ? "Explora las razas caninas"
                  : "Explora las razas bovinas"}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-outfit font-bold text-foreground">
              Descubre al Compañero{" "}
              <span className="text-primary">Perfecto</span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-outfit font-bold">
              {breeds.length}
            </span>
            <span className="text-muted-foreground text-sm">razas</span>
          </div>
        </div>
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float" />
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
              <div key={index} className="rounded-xl overflow-hidden bg-card">
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
            No se encontraron razas en esta sección.
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
