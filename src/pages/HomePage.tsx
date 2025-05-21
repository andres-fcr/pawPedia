import { useLocation, useNavigate } from "react-router";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { type Sections } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import BreedCard from "@/components/BreedCard";
import { Pagination } from "@/components/ui/pagination";
import { useSpecies } from "@/hooks/UseSpecies";

const itemsPerPage = 10;

const HomePage = () => {
  const { pathname } = useLocation();
  const section = pathname.split("/")[1] as Sections;

  const navigate = useNavigate();
  
  const { data: breeds, isLoading } = useSpecies(section);

  const [currentPage, setCurrentPage] = useState(1);

  function handleTabChange(value: string) {
    navigate(`/${value}`);
  }

  const totalPages = Math.ceil(breeds.length / itemsPerPage);
  const paginatedBreeds = breeds.slice(
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
      <section className="container mx-auto mb-8">
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default HomePage;
