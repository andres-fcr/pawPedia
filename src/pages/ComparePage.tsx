import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";

import NotFound from "@/components/NotFound";
import CompareView from "@/components/CompareView";
import BreedSelector from "@/components/BreedSelector";
import ImageModal from "@/components/ImageModal";
import { useSpecies } from "@/hooks/UseSpecies";
import type { BreedData, UrlSections } from "@/lib/api";

const ComparePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const section = location.pathname.split("/")[1] as UrlSections;

  const breed1Id = searchParams.get("breed1");
  const breed2Id = searchParams.get("breed2");

  const { data: breeds, isLoading } = useSpecies(section);

  const [breed1, setBreed1] = useState<BreedData | null>(null);
  const [breed2, setBreed2] = useState<BreedData | null>(null);

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<1 | 2>(1);

  const [zoomImage, setZoomImage] = useState<string | null>(null);

  useEffect(() => {
    if (breeds.length > 0) {
      if (breed1Id) {
        const foundBreed1 = breeds.find((b) => b.id === breed1Id);
        setBreed1(foundBreed1 || null);
      }
      if (breed2Id) {
        const foundBreed2 = breeds.find((b) => b.id === breed2Id);
        setBreed2(foundBreed2 || null);
      }
    }
  }, [breeds, breed1Id, breed2Id]);

  const handleOpenSelector = (slot: 1 | 2) => {
    setSelectedSlot(slot);
    setIsSelectorOpen(true);
  };

  const handleSelectBreed = (breedId: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedSlot === 1) {
      newParams.set("breed1", breedId);
    } else {
      newParams.set("breed2", breedId);
    }
    navigate(`/${section}/compare?${newParams.toString()}`);
  };

  const handleReturn = () => {
    if (breed1) {
      navigate(`/${section}/${breed1.id}`);
    } else {
      navigate(`/${section}`);
    }
  };

  if (!section) {
    return <NotFound message="Sección no válida." />;
  }

  if (!isLoading && !breed1 && !breed2) {
    return (
      <NotFound message="Selecciona al menos una raza para comparar." />
    );
  }

  return (
    <>
      <CompareView
        breed1={breed1}
        breed2={breed2}
        onChangeBreed={handleOpenSelector}
        onReturn={handleReturn}
        onZoomImage={(src) => setZoomImage(src)}
      />
      <BreedSelector
        isOpen={isSelectorOpen}
        onOpenChange={setIsSelectorOpen}
        currentBreedId={selectedSlot === 1 ? breed2Id || "" : breed1Id || ""}
        section={section}
        onSelect={handleSelectBreed}
      />
      <ImageModal
        imageUrl={zoomImage || ""}
        altText={breed1?.name || breed2?.name || "Imagen"}
        isOpen={!!zoomImage}
        onOpenChange={() => setZoomImage(null)}
      />
    </>
  );
};

export default ComparePage;