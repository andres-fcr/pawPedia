import { useEffect, useState } from "react";

import { fetchData, type NormalizedBreed, type Sections } from "@/lib/api";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";

export const useSpecies = (section: Sections) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<NormalizedBreed[]>(
    getLocalStorageItem(section) ?? []
  );

  useEffect(() => {
    if (data.length > 0) return;

    const fetchSectionData = async (section: Sections) => {
      try {
        setIsLoading(true);
        const data = await fetchData(section);
        setLocalStorageItem(section, data);
        setData(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectionData(section);
  }, [section, data.length]);

  return {
    data,
    isLoading,
  };
};
