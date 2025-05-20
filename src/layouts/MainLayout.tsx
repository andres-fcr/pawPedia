import { useLocation, useNavigate } from "react-router";

import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { fetchData, type NormalizedBreed, type Sections } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import BreedCard from "@/components/BreedCard";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";
import { Pagination } from "@/components/ui/pagination";

const itemsPerPage = 10;

const MainLayout = () => {
  const { pathname } = useLocation();
  const section = pathname.split("/")[1] as Sections;

  const navigate = useNavigate();

  const [breeds, setBreeds] = useState<NormalizedBreed[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchSectionData = async (section: Sections) => {
      setIsLoading(true);
      try {
        const parsedData: NormalizedBreed[] | null =
          getLocalStorageItem(section);

        if (parsedData) setBreeds(parsedData);
        else {
          const data = await fetchData(section);
          setLocalStorageItem(section, data);
          setBreeds(data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (section === "cats" || section === "dogs") {
      fetchSectionData(section);
    } else {
      navigate("/cats");
    }
  }, [section, navigate]);

  return (
    <main className="flex flex-col min-h-screen min-w-screen container p-6 mx-auto transition-colors duration-300">
      <Header />
      <Tabs
        defaultValue="cats"
        className="w-full max-w-4xl mx-auto mb-8 bg-am"
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full">
          <TabsTrigger value="cats">🐱 Cats</TabsTrigger>
          <TabsTrigger value="dogs">🐶 Dogs</TabsTrigger>
        </TabsList>
        <TabsContent value="cats">
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
        </TabsContent>
        <TabsContent value="dogs">
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
        </TabsContent>
      </Tabs>
      {!isLoading && breeds.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
};

export default MainLayout;
