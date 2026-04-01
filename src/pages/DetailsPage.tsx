import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import BreedDetails from "@/components/BreedDetails";
import NotFound from "@/components/NotFound";
import { useSpecies } from "@/hooks/UseSpecies";
import type { NormalizedBreed, Sections } from "@/lib/api";

const DetailsPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id: breedId } = useParams();

  const section = pathname.split("/")[1] as Sections;

  const { data: breeds, isLoading } = useSpecies(section);

  const [breed, setBreed] = useState<NormalizedBreed | null>(null);

  const handleReturn = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/${section}`);
    }
  };

  useEffect(() => {
    if (breedId && breeds.length > 0) {
      const breedDetails = breeds.find((item) => item.id === breedId);
      setBreed(breedDetails || null);
    }
  }, [breedId, breeds]);

  if (!section || !breedId) {
    return <NotFound message="Invalid breed URL." />;
  }

  if (!isLoading && !breed) {
    return (
      <NotFound
        message="We couldn't find the breed you're looking for."
      />
    );
  }

  return (
    <BreedDetails
      isLoading={isLoading}
      onReturn={handleReturn}
      breed={breed}
    />
  );
};

export default DetailsPage;
