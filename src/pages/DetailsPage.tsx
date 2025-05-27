import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";

import BreedDetails from "@/components/BreedDetails";
import { useSpecies } from "@/hooks/UseSpecies";
import type { NormalizedBreed, Sections } from "@/lib/api";

const DetailsPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id: breedId } = useParams();

  const section = pathname.split("/")[1] as Sections;

  const { data: breeds, isLoading } = useSpecies(section);

  const [breed, setBreed] = useState<NormalizedBreed | null>(null);

  const handleReturn = () => navigate(-1);

  useEffect(() => {
    if (breedId && breeds.length > 0) {
      const getBreedDetails = (breedId: string) => {
        const breedDetails = breeds.find((item) => item.id === breedId);
        setBreed(breedDetails || null);
      };

      getBreedDetails(breedId);
    }
  }, [breedId, breeds]);

  if (!section || !breedId) return <Navigate to="/cats" replace />;

  return (
    <>
      <BreedDetails
        isLoading={isLoading}
        onReturn={handleReturn}
        breed={breed}
      />
    </>
  );
};

export default DetailsPage;
