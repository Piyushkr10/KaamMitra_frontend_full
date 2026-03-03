import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ServicesMenu from "../ServicesMenu";

describe("ServicesMenu Component", () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (activeCategory = "All Services") => {
    render(
      <ServicesMenu
        activeCategory={activeCategory}
        onCategoryClick={mockOnClick}
      />
    );
  };

  //  1. Renders all categories
  it("renders all categories", () => {
    renderComponent();

    expect(screen.getByText("All Services")).toBeInTheDocument();
    expect(screen.getByText("Home Services")).toBeInTheDocument();
    expect(screen.getByText("Professional Works")).toBeInTheDocument();
    expect(screen.getByText("Digital Works")).toBeInTheDocument();
    expect(screen.getByText("Emergency service")).toBeInTheDocument();
    expect(screen.getByText("Per day Services")).toBeInTheDocument();
    expect(screen.getByText("Medical Helpers")).toBeInTheDocument();
  });

  //  2. Renders correct number of buttons
  it("renders correct number of category buttons", () => {
    renderComponent();

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(7);
  });

  //  3. Highlights active category
  it("highlights active category", () => {
    renderComponent("Home Services");

    const activeButton = screen.getByText("Home Services")
      .closest("button");

    expect(activeButton).toHaveClass("bg-blue-600");
    expect(activeButton).toHaveClass("text-white");
  });

  //  4. Calls onCategoryClick when clicked
  it("calls onCategoryClick when a category is clicked", () => {
    renderComponent();

    const button = screen.getByText("Digital Works");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  //  5. Passes correct category to callback
  it("passes correct category to callback", () => {
    renderComponent();

    const button = screen.getByText("Medical Helpers");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledWith("Medical Helpers");
  });

  //  6. Image renders correctly with alt text
  it("renders category image with correct alt text", () => {
    renderComponent();

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);

    expect(images[0]).toHaveAttribute("alt");
  });

  //  7. Snapshot test (optional but useful)
  it("matches snapshot", () => {
    const { asFragment } = render(
      <ServicesMenu
        activeCategory="All Services"
        onCategoryClick={mockOnClick}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});