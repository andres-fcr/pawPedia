import { useEffect, useRef, useState } from "react";

import { fetchData, type NormalizedBreed, type Sections } from "@/lib/api";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";

export const useSpecies = (section: Sections) => {
  const firstLoad = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<NormalizedBreed[]>([]);

  useEffect(() => {
    const localData: NormalizedBreed[] | null = getLocalStorageItem(section);

    if (localData?.length && !firstLoad.current) {
      setData(localData);
      return;
    }

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
    firstLoad.current = false;
  }, [section, data.length]);

  return {
    data,
    isLoading,
  };
};
