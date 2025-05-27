import { useLocation, useNavigate } from "react-router";

import { type Sections } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import BreedCard from "@/components/BreedCard";
import { Pagination } from "@/components/ui/pagination";
import { useSpecies } from "@/hooks/UseSpecies";
import TabsSection from "@/components/TabsSection";
import SearchBar from "@/components/SearchBar";

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
                className="rounded-lg overflow-hidden bg-white dark:bg-slate-800"
              >
                <Skeleton className="h-48 w-full bg-amber-100/50 dark:bg-slate-700" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 bg-amber-100/50 dark:bg-slate-700" />
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
          <p className="text-center text-gray-500">
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
