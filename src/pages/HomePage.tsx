import { useLocation, useNavigate } from "react-router";

import { type UrlSections } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import BreedCard from "@/components/BreedCard";
import { Pagination } from "@/components/ui/pagination";
import { useSpecies } from "@/hooks/UseSpecies";
import TabsSection from "@/components/TabsSection";
import SearchBar from "@/components/SearchBar";
import { Cat, Dog, Beef, Mountain } from "lucide-react";

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

  const sectionConfig = {
    cats: {
      subtitle: "Explora las razas felinas",
      title: "Descubre al Felino",
      highlight: "Perfecto",
      description: "Desde el juguetón Siamés hasta el majestuoso Maine Coon, encuentra tu compañero ideal.",
      gradient: "from-primary/20 via-secondary to-accent/15",
      iconBg: "from-primary to-accent",
      badgeBg: "bg-primary/10",
      badgeBorder: "border-primary/20",
      iconText: "text-primary",
    },
    dogs: {
      subtitle: "Explora las razas caninas",
      title: "Encuentra al Canino",
      highlight: "Ideal",
      description: "Del leal Labrador al enérgico Border Collie, conoce a tu mejor amigo.",
      gradient: "from-accent/20 via-secondary to-primary/15",
      iconBg: "from-accent to-primary",
      badgeBg: "bg-accent/10",
      badgeBorder: "border-accent/20",
      iconText: "text-accent",
    },
    vacunos: {
      subtitle: "Explora las razas bovinas",
      title: "Conoce al Bovino",
      highlight: "Perfecto",
      description: "Desde la productiva Holstein hasta la resistente Angus, descubre el ganado ideal.",
      gradient: "from-primary/15 via-secondary to-accent/20",
      iconBg: "from-primary to-accent",
      badgeBg: "bg-primary/10",
      badgeBorder: "border-primary/20",
      iconText: "text-primary",
    },
    caballos: {
      subtitle: "Explora las razas equinas",
      title: "Descubre al Equino",
      highlight: "Majestuoso",
      description: "Del noble Árabe al poderoso Percherón, encuentra tu compañero de monta.",
      gradient: "from-accent/15 via-secondary to-primary/20",
      iconBg: "from-accent to-primary",
      badgeBg: "bg-accent/10",
      badgeBorder: "border-accent/20",
      iconText: "text-accent",
    },
  };

  const config = sectionConfig[section];

  const sectionIcon = section === "cats" ? (
    <Cat className="w-7 h-7 text-white" />
  ) : section === "dogs" ? (
    <Dog className="w-7 h-7 text-white" />
  ) : section === "caballos" ? (
    <Mountain className="w-7 h-7 text-white" />
  ) : (
    <Beef className="w-7 h-7 text-white" />
  );

  return (
    <>
      <TabsSection section={section} handleTabChange={handleTabChange} />

      <section className={`relative container mx-auto mb-8 overflow-hidden rounded-3xl bg-gradient-to-br ${config.gradient} border-2 border-border`}>
        <div className="absolute inset-0 bg-pattern opacity-20" />
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full animate-float blur-xl" />
        <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-accent/10 rounded-full animate-float-delay blur-lg" />
        <div className="absolute right-1/4 top-1/2 w-16 h-16 bg-primary/5 rounded-full animate-float-slow blur-sm" />

        <div className="relative px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4 md:gap-5">
              <div className={`relative flex-shrink-0`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${config.iconBg} rounded-2xl blur-md opacity-40`} />
                <div className={`relative flex items-center justify-center bg-gradient-to-br ${config.iconBg} rounded-2xl w-14 h-14 md:w-16 md:h-16 shadow-lg`}>
                  {sectionIcon}
                </div>
              </div>

              <div className="flex-1">
                <span className={`inline-flex items-center gap-1.5 text-xs font-outfit font-semibold tracking-wider uppercase ${config.iconText} mb-2`}>
                  {config.subtitle}
                </span>
                <h2 className="text-2xl md:text-3xl font-outfit font-bold text-foreground leading-tight">
                  {config.title}{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {config.highlight}
                  </span>
                </h2>
                <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
                  {config.description}
                </p>
              </div>
            </div>

            <div className={`hidden sm:flex items-center gap-3 px-5 py-3 ${config.badgeBg} rounded-2xl border ${config.badgeBorder} backdrop-blur-sm`}>
              <span className={`text-2xl font-outfit font-bold ${config.iconText}`}>
                {breeds.length}
              </span>
              <div className="flex flex-col">
                <span className="text-foreground text-sm font-medium leading-none">razas</span>
                <span className="text-muted-foreground text-xs leading-none mt-0.5">disponibles</span>
              </div>
            </div>
          </div>
        </div>
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
              <div key={index} className="rounded-2xl overflow-hidden bg-card border-2 border-border">
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
