import { useEffect, useRef, useState } from "react";

import { fetchData, urlToApiSection, type BreedData, type UrlSections } from "@/lib/api";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";

export const useSpecies = (section: UrlSections) => {
  const firstLoad = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<BreedData[]>([]);

  useEffect(() => {
    const apiSection = urlToApiSection[section];
    const localData: BreedData[] | null = getLocalStorageItem(apiSection);

    if (localData?.length && !firstLoad.current) {
      setData(localData);
      return;
    }

    const fetchSectionData = async (section: UrlSections) => {
      try {
        setIsLoading(true);
        const apiSection = urlToApiSection[section];
        const data = await fetchData(apiSection);
        setLocalStorageItem(apiSection, data);
        setData(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectionData(section);
    firstLoad.current = false;
  }, [section, data.length]);

  return {
    data,
    isLoading,
  };
};
