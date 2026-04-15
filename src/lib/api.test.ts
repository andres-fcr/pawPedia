import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
} from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  isCattleBreed,
  isHorseBreed,
  urlToApiSection,
  fetchData,
  type NormalizedBreed,
  type NormalizedCattleBreed,
  type NormalizedHorseBreed,
} from "./api";

const server = setupServer(
  http.get("https://api.example.com/:section.json", () => {
    return HttpResponse.json({});
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("urlToApiSection", () => {
  it("should map cats to cats", () => {
    expect(urlToApiSection["cats"]).toBe("cats");
  });

  it("should map dogs to dogs", () => {
    expect(urlToApiSection["dogs"]).toBe("dogs");
  });

  it("should map vacunos to cattle", () => {
    expect(urlToApiSection["vacunos"]).toBe("cattle");
  });

  it("should map caballos to horses", () => {
    expect(urlToApiSection["caballos"]).toBe("horses");
  });
});

describe("isCattleBreed", () => {
  it("should return true for cattle breeds", () => {
    const cattleBreed: NormalizedCattleBreed = {
      id: "holstein",
      name: "Holstein",
      species: "Bovino",
      origin: "Alemania",
      regionColombia: "Antioquia",
      description: "Test",
      image: "test.jpg",
      productiveUsages: ["Leche"],
      productiveCharacteristics: {
        coat: "Negro y blanco",
        coat_pattern: "Manchas",
        horns: "Sí",
        nature: "Manso",
        dairy: { quality: "Alta", quantity: "40L" },
        meat: { quality: "Baja", quantity: "Baja" },
        weight: { male: "600kg", female: "500kg" },
      },
    };
    expect(isCattleBreed(cattleBreed)).toBe(true);
  });

  it("should return false for pet breeds", () => {
    const petBreed: NormalizedBreed = {
      id: "1",
      name: "Persian",
      countryCode: "IR",
      description: "A cat",
      origin: "Iran",
      lifeSpan: "15",
      weight: "4-5",
      image: "cat.jpg",
      temperament: ["Calm"],
    };
    expect(isCattleBreed(petBreed)).toBe(false);
  });
});

describe("isHorseBreed", () => {
  it("should return true for horse breeds", () => {
    const horseBreed: NormalizedHorseBreed = {
      id: "paso-finero",
      name: "Paso Finero",
      image: "horse.jpg",
      ears: "Medianas",
      colors: "Varios",
      temperament: "Noble",
      size: "Mediano",
      approximateWeight: "400kg",
      lifespan: "25 años",
      manes: "Abundantes",
      aptitude: "Paso",
      colombiaRegion: "Antioquia",
      countryOfOrigin: "Colombia",
      description: "A horse",
      links: [],
    };
    expect(isHorseBreed(horseBreed)).toBe(true);
  });

  it("should return false for pet breeds", () => {
    const petBreed: NormalizedBreed = {
      id: "1",
      name: "Labrador",
      countryCode: "CA",
      description: "A dog",
      origin: "Canada",
      lifeSpan: "12",
      weight: "25-36",
      height: "55-62",
      image: "dog.jpg",
      temperament: ["Friendly"],
    };
    expect(isHorseBreed(petBreed)).toBe(false);
  });
});

describe("fetchData", () => {
  const originalEnv = import.meta.env.VITE_API_URL;

  beforeEach(() => {
    import.meta.env.VITE_API_URL = "https://api.example.com";
  });

  afterEach(() => {
    import.meta.env.VITE_API_URL = originalEnv;
    server.resetHandlers();
    vi.restoreAllMocks();
  });

  describe("cats normalization", () => {
    it("should normalize cat data correctly", async () => {
      const mockCats = [
        {
          id: "persian",
          name: "Persian",
          description: "A gentle cat",
          temperament: "Calm, Gentle",
          origin: "Iran",
          country_code: "IR",
          life_span: "15 years",
          weight: { imperial: "7-12", metric: "3-5" },
          reference_image_id: "abc123",
          external_links: ["https://example.com"],
        },
      ];

      server.use(
        http.get("https://api.example.com/cats.json", () => {
          return HttpResponse.json(mockCats);
        }),
      );

      const result = await fetchData("cats");

      expect(result).toHaveLength(1);
      const cat = result[0] as NormalizedBreed;
      expect(cat.id).toBe("persian");
      expect(cat.name).toBe("Persian");
      expect(cat.description).toBe("A gentle cat");
      expect(cat.origin).toBe("Iran");
      expect(cat.countryCode).toBe("IR");
      expect(cat.lifeSpan).toBe("15");
      expect(cat.weight).toBe("3-5");
      expect(cat.temperament).toEqual(["Calm", "Gentle"]);
      expect(cat.image).toBe("https://cdn2.thecatapi.com/images/abc123.jpg");
      expect(cat.imageAlt).toBe("https://cdn2.thecatapi.com/images/abc123.png");
      expect(cat.externalLinks).toEqual(["https://example.com"]);
    });

    it("should handle cats without temperament", async () => {
      const mockCats = [
        {
          id: "unknown",
          name: "Unknown",
          description: "Mystery cat",
          origin: "Unknown",
          country_code: "XX",
          life_span: "10 years",
          weight: { imperial: "5-10", metric: "2-4" },
          reference_image_id: "xyz",
          external_links: [],
        },
      ];

      server.use(
        http.get("https://api.example.com/cats.json", () => {
          return HttpResponse.json(mockCats);
        }),
      );

      const result = await fetchData("cats");
      const cat = result[0] as NormalizedBreed;
      expect(cat.temperament).toEqual([]);
    });
  });

  describe("dogs normalization", () => {
    it("should normalize dog data correctly", async () => {
      const mockDogs = [
        {
          id: 1,
          name: "Labrador",
          description: "Friendly dog",
          breed_group: "Sporting",
          life_span: "12 years",
          temperament: "Friendly, Outgoing",
          origin: "Canada",
          country_code: "CA",
          reference_image_id: "dog123",
          weight: { imperial: "55-80", metric: "25-36" },
          height: { imperial: "21-24", metric: "55-62" },
          external_links: ["https://example.com/dog"],
          bred_for: "Hunting",
        },
      ];

      server.use(
        http.get("https://api.example.com/dogs.json", () => {
          return HttpResponse.json(mockDogs);
        }),
      );

      const result = await fetchData("dogs");

      expect(result).toHaveLength(1);
      const dog = result[0] as NormalizedBreed;
      expect(dog.id).toBe("1");
      expect(dog.name).toBe("Labrador");
      expect(dog.description).toBe("Friendly dog");
      expect(dog.origin).toBe("Canada");
      expect(dog.countryCode).toBe("CA");
      expect(dog.lifeSpan).toBe("12");
      expect(dog.weight).toBe("25-36");
      expect(dog.height).toBe("55-62");
      expect(dog.temperament).toEqual(["Friendly", "Outgoing"]);
      expect(dog.image).toBe("https://cdn2.thedogapi.com/images/dog123.jpg");
      expect(dog.imageAlt).toBe("https://cdn2.thedogapi.com/images/dog123.png");
      expect(dog.bredFor).toBe("Hunting");
    });

    it("should handle dogs without bred_for", async () => {
      const mockDogs = [
        {
          id: 2,
          name: "Mixed",
          description: "Mixed breed",
          life_span: "14 years",
          temperament: "Varied",
          origin: "Unknown",
          country_code: "XX",
          reference_image_id: "mixed",
          weight: { imperial: "20-40", metric: "9-18" },
          height: { imperial: "15-20", metric: "38-50" },
          external_links: [],
        },
      ];

      server.use(
        http.get("https://api.example.com/dogs.json", () => {
          return HttpResponse.json(mockDogs);
        }),
      );

      const result = await fetchData("dogs");
      const dog = result[0] as NormalizedBreed;
      expect(dog.bredFor).toBe("Desconocido");
    });
  });

  describe("cattle normalization", () => {
    it("should normalize cattle data correctly", async () => {
      const mockCattle = [
        {
          name: "Holstein",
          image_url: "https://example.com/holstein.jpg",
          origin: "Germany",
          species: "Bovino",
          productive_usages: ["Leche", "Carne"],
          region_colombia: "Antioquia",
          productive_characteristics: {
            coat: "Negro y blanco",
            coat_pattern: "Manchas",
            horns: "Sí",
            nature: "Manso y dócil",
            dairy: { quality: "Alta", quantity: "40L/día" },
            meat: { quality: "Baja", quantity: "Baja" },
            weight: { male: "600-800 kg", female: "500-600 kg" },
          },
        },
      ];

      server.use(
        http.get("https://api.example.com/cattle.json", () => {
          return HttpResponse.json(mockCattle);
        }),
      );

      const result = await fetchData("cattle");

      expect(result).toHaveLength(1);
      const cattle = result[0] as NormalizedCattleBreed;
      expect(cattle.id).toBe("holstein");
      expect(cattle.name).toBe("Holstein");
      expect(cattle.species).toBe("Bovino");
      expect(cattle.origin).toBe("Germany");
      expect(cattle.regionColombia).toBe("Antioquia");
      expect(cattle.description).toBe("Manso y dócil");
      expect(cattle.image).toBe("https://example.com/holstein.jpg");
      expect(cattle.productiveUsages).toEqual(["Leche", "Carne"]);
      expect(cattle.productiveCharacteristics.nature).toBe("Manso y dócil");
    });
  });

  describe("horses normalization", () => {
    it("should normalize horse data correctly", async () => {
      const mockHorses = [
        {
          name: "Paso Finero",
          image: "https://example.com/paso.jpg",
          ears: "Medianas",
          colors: "Varios",
          temperament: "Noble y dócil",
          size: "Mediano",
          approximate_weight: "400-500 kg",
          lifespan: "25-30 años",
          manes: "Abundantes",
          aptitude: "Paso",
          colombia_region: "Antioquia",
          country_of_origin: "Colombia",
          description: "Caballo de paso",
          links: ["https://example.com"],
        },
      ];

      server.use(
        http.get("https://api.example.com/horses.json", () => {
          return HttpResponse.json(mockHorses);
        }),
      );

      const result = await fetchData("horses");

      expect(result).toHaveLength(1);
      const horse = result[0] as NormalizedHorseBreed;
      expect(horse.id).toBe("paso-finero");
      expect(horse.name).toBe("Paso Finero");
      expect(horse.image).toBe("https://example.com/paso.jpg");
      expect(horse.ears).toBe("Medianas");
      expect(horse.colors).toBe("Varios");
      expect(horse.temperament).toBe("Noble y dócil");
      expect(horse.size).toBe("Mediano");
      expect(horse.approximateWeight).toBe("400-500 kg");
      expect(horse.lifespan).toBe("25-30 años");
      expect(horse.manes).toBe("Abundantes");
      expect(horse.aptitude).toBe("Paso");
      expect(horse.colombiaRegion).toBe("Antioquia");
      expect(horse.countryOfOrigin).toBe("Colombia");
      expect(horse.description).toBe("Caballo de paso");
      expect(horse.links).toEqual(["https://example.com"]);
    });
  });

  describe("error handling", () => {
    it("should return empty array on fetch error", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      server.use(
        http.get("https://api.example.com/cats.json", () => {
          return HttpResponse.error();
        }),
      );

      const result = await fetchData("cats");

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
