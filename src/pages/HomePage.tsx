import { useLocation, useNavigate } from "react-router";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Sections } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import BreedCard from "@/components/BreedCard";
import { Pagination } from "@/components/ui/pagination";
import { useSpecies } from "@/hooks/UseSpecies";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const itemsPerPage = 12;

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const section = location.pathname.split("/")[1] as Sections;

  const currentPage =
    Number(new URLSearchParams(location.search).get("page")) || 1;

  const searchQuery = new URLSearchParams(location.search).get("search") || "";
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
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
      <Tabs
        defaultValue={section}
        className="container mx-auto mb-8 bg-am"
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full">
          <TabsTrigger value="cats">🐱 Cats</TabsTrigger>
          <TabsTrigger value="dogs">🐶 Dogs</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative container mx-auto mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <Input
          type="text"
          placeholder={`Search ${section} breeds...`}
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 bg-white dark:bg-slate-800 border-amber-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
          disabled={isLoading}
        />
      </div>

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
        {!isLoading && breeds.length === 0 && (
          <p className="text-center text-gray-500">
            No breeds found for this section.
          </p>
        )}
      </section>
      {!isLoading && breeds.length > 0 && (
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
