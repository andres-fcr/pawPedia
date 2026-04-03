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

export interface CattleBreed {
  image_url: string
  name: string
  origin: string
  productive_characteristics: ProductiveCharacteristics
  productive_usages: string[]
  region_colombia: string
  species: string
}

export interface ProductiveCharacteristics {
  coat: string
  coat_pattern: string
  dairy: Dairy
  horns: string
  meat: Meat
  nature: string
  weight: Weight
}

export interface Dairy {
  quality: string
  quantity: string
}

export interface Meat {
  quality: string
  quantity: string
}

export interface Weight {
  female: string
  male: string
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
  imageAlt?: string;
  externalLinks?: string[];
  bredFor?: string;
  temperament?: string[];
}

export interface NormalizedCattleBreed {
  id: string;
  name: string;
  species: string;
  origin: string;
  regionColombia: string;
  description: string;
  image: string;
  productiveUsages: string[];
  productiveCharacteristics: ProductiveCharacteristics;
}

export type BreedData = NormalizedBreed | NormalizedCattleBreed;

export const isCattleBreed = (breed: BreedData): breed is NormalizedCattleBreed => {
  return "productiveUsages" in breed;
};

export type Sections = "cats" | "dogs" | "cattle";

export type UrlSections = "cats" | "dogs" | "vacunos";

export const urlToApiSection: Record<UrlSections, Sections> = {
  cats: "cats",
  dogs: "dogs",
  vacunos: "cattle",
};

export const fetchData = async (
  section: Sections
): Promise<BreedData[]> => {
  const baseUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${baseUrl}/${section}.json`);
    const data = await response.json();

    // Normalize the data to match our application's structure
    if (section === "cats") {
      return data.map((breed: CatBreed) => ({
        id: breed.id,
        name: breed.name,
        countryCode: breed.country_code,
        description: breed.description,
        origin: breed.origin,
        lifeSpan: breed.life_span.replace(" years", ""),
        weight: breed.weight.metric,
        height: null,
        temperament: breed.temperament ? breed.temperament.split(", ") : [],
        image: `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`,
        imageAlt: `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.png`,
        externalLinks: breed.external_links || [],
      }));
    }

    if (section === "dogs") {
      return data.map((breed: DogBreed) => ({
        id: breed.id.toString(),
        name: breed.name,
        countryCode: breed.country_code,
        description: breed.description,
        origin: breed.origin,
        lifeSpan: breed.life_span.replace(" years", ""),
        weight: breed.weight.metric,
        height: breed.height.metric,
        temperament: breed.temperament ? breed.temperament.split(", ") : [],
        bredFor: breed.bred_for || "Desconocido",
        image: `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`,
        imageAlt: `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.png`,
        externalLinks: breed.external_links || [],
      }));
    }

    if (section === "cattle") {
      return data.map((breed: CattleBreed) => ({
        id: breed.name.toLowerCase().replace(/\s+/g, "-"),
        name: breed.name,
        species: breed.species,
        origin: breed.origin,
        regionColombia: breed.region_colombia,
        description: breed.productive_characteristics.nature,
        image: breed.image_url,
        productiveUsages: breed.productive_usages,
        productiveCharacteristics: breed.productive_characteristics,
      }));
    }

    return [];
  } catch (e) {
    console.error("Error al obtener los datos", e);
    return [];
  }
};
