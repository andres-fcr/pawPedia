import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "./utils";

describe("getLocalStorageItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return parsed value for valid JSON", () => {
    const mockData = { key: "value", count: 42 };
    (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      JSON.stringify(mockData),
    );

    const result = getLocalStorageItem("test-key");

    expect(result).toEqual(mockData);
    expect(localStorage.getItem).toHaveBeenCalledWith("test-key");
  });

  it("should return null for non-existent key", () => {
    (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(null);

    const result = getLocalStorageItem("missing-key");

    expect(result).toBeNull();
  });

  it("should return null and log error for invalid JSON", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      "not-json",
    );

    const result = getLocalStorageItem("bad-key");

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe("setLocalStorageItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should set stringified value in localStorage", () => {
    const data = { name: "test", active: true };

    setLocalStorageItem("my-key", data);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "my-key",
      JSON.stringify(data),
    );
  });

  it("should handle primitive values", () => {
    setLocalStorageItem("str-key", "hello");

    expect(localStorage.setItem).toHaveBeenCalledWith("str-key", '"hello"');
  });
});

describe("removeLocalStorageItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should remove item from localStorage", () => {
    removeLocalStorageItem("delete-key");

    expect(localStorage.removeItem).toHaveBeenCalledWith("delete-key");
  });
});
