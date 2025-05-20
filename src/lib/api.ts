// API functions for fetching dog and cat breeds data

// Define the breed types based on the API responses
export interface DogBreed {
  id: number;
  name: string;
  description: string;
  bred_for?: string;
  breed_group?: string;
  life_span: string;
  temperament?: string;
  origin: string;
  country_code: string;
  reference_image_id?: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  external_links: string[];
}

export interface CatBreed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  country_code: string;
  life_span: string;
  weight: {
    imperial: string;
    metric: string;
  };
  reference_image_id: string;
  external_links: string[];
}

// Normalized breed type for our application
export interface NormalizedBreed {
  id: string;
  name: string;
  countryCode: string;
  description: string;
  origin: string;
  lifeSpan: string;
  weight: string;
  height?: string;
  image: string;
  bredFor?: string;
  temperament?: string[];
}

export type Sections = "cats" | "dogs";

export const fetchData = async (
  section: Sections
): Promise<NormalizedBreed[]> => {
  const baseUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${baseUrl}/${section}.json`);
    const data = await response.json();

    // Normalize the data to match our application's structure
    if (section === "cats") {
      return data.map((breed: CatBreed) => ({
        id: `cat-${breed.id}`,
        name: breed.name,
        countryCode: breed.country_code,
        description: breed.description,
        origin: breed.origin,
        lifeSpan: breed.life_span.replace(" years", ""),
        weight: breed.weight.metric,
        height: null,
        temperament: breed.temperament ? breed.temperament.split(", ") : [],
        image: breed.reference_image_id
          ? `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
          : "/placeholder.svg?height=400&width=600",
      }));
    }

    if (section === "dogs") {
      return data.map((breed: DogBreed) => ({
        id: `dog-${breed.id}`,
        name: breed.name,
        countryCode: breed.country_code,
        description: breed.description,
        origin: breed.origin,
        lifeSpan: breed.life_span.replace(" years", ""),
        weight: breed.weight.metric,
        height: breed.height.metric,
        temperament: breed.temperament ? breed.temperament.split(", ") : [],
        bredFor: breed.bred_for || "Unknown",
        image: breed.reference_image_id
          ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
          : "/placeholder.svg?height=400&width=600",
      }));
    }

    return [];
  } catch (e) {
    console.error("Failed to fetch data", e);
    return [];
  }
};
