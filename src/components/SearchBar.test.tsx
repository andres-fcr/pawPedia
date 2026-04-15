import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("should render with correct placeholder for cats section", () => {
    const handleSearchChange = vi.fn();
    render(
      <SearchBar
        section="cats"
        searchQuery=""
        handleSearchChange={handleSearchChange}
      />,
    );

    const input = screen.getByPlaceholderText("Buscar razas de gatos...");
    expect(input).toBeInTheDocument();
  });

  it("should render with correct placeholder for dogs section", () => {
    const handleSearchChange = vi.fn();
    render(
      <SearchBar
        section="dogs"
        searchQuery=""
        handleSearchChange={handleSearchChange}
      />,
    );

    const input = screen.getByPlaceholderText("Buscar razas de perros...");
    expect(input).toBeInTheDocument();
  });

  it("should render with correct placeholder for vacunos section", () => {
    const handleSearchChange = vi.fn();
    render(
      <SearchBar
        section="vacunos"
        searchQuery=""
        handleSearchChange={handleSearchChange}
      />,
    );

    const input = screen.getByPlaceholderText("Buscar razas de vacunos...");
    expect(input).toBeInTheDocument();
  });

  it("should render with correct placeholder for caballos section", () => {
    const handleSearchChange = vi.fn();
    render(
      <SearchBar
        section="caballos"
        searchQuery=""
        handleSearchChange={handleSearchChange}
      />,
    );

    const input = screen.getByPlaceholderText("Buscar razas de caballos...");
    expect(input).toBeInTheDocument();
  });

  it("should call handleSearchChange when typing", async () => {
    const user = userEvent.setup();
    const handleSearchChange = vi.fn();
    render(
      <SearchBar
        section="cats"
        searchQuery=""
        handleSearchChange={handleSearchChange}
      />,
    );

    const input = screen.getByPlaceholderText("Buscar razas de gatos...");
    await user.type(input, "Persian");

    // handleSearchChange should be called for each character typed
    expect(handleSearchChange).toHaveBeenCalled();
    // The last call should have been with the full text or the last character
    expect(handleSearchChange).lastCalledWith("n");
  });

  it("should show clear button when there is a query", () => {
    const handleSearchChange = vi.fn();
    render(
      <SearchBar
        section="cats"
        searchQuery="Persian"
        handleSearchChange={handleSearchChange}
      />,
    );

    const clearButton = screen.getByTestId("clear-button");
    expect(clearButton).toBeInTheDocument();
  });

  it("should not show clear button when query is empty", () => {
    const handleSearchChange = vi.fn();
    render(
      <SearchBar
        section="cats"
        searchQuery=""
        handleSearchChange={handleSearchChange}
      />,
    );

    // Only the input should be present, no clear button
    const buttons = screen.queryByTestId("clear-button");
    expect(buttons).toBeNull();
  });

  it("should clear query when clear button is clicked", async () => {
    const user = userEvent.setup();
    const handleSearchChange = vi.fn();
    render(
      <SearchBar
        section="cats"
        searchQuery="Persian"
        handleSearchChange={handleSearchChange}
      />,
    );

    const clearButton = screen.getByTestId("clear-button");
    await user.click(clearButton);

    expect(handleSearchChange).toHaveBeenCalledWith("");
  });

  it("should be disabled when disabled prop is true", () => {
    const handleSearchChange = vi.fn();
    render(
      <SearchBar
        section="cats"
        searchQuery=""
        handleSearchChange={handleSearchChange}
        disabled
      />,
    );

    const input = screen.getByPlaceholderText("Buscar razas de gatos...");
    expect(input).toBeDisabled();
  });
});
