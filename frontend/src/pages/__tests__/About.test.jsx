import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import About from "../About";

/*
  Mock Navbar & Footer
  (We don't want to test them here — only About page)
*/
vi.mock("../../components/Navbar", () => ({
  default: () => <div data-testid="navbar" />,
}));

vi.mock("../../components/Footer", () => ({
  default: () => <div data-testid="footer" />,
}));

describe("About Page", () => {
  it("renders hero section correctly", () => {
    render(<About />);

    expect(screen.getByText(/about kaam mitra/i)).toBeInTheDocument();
    expect(
      screen.getByText(/revolutionizing how india finds/i)
    ).toBeInTheDocument();
  });

  it("renders stats correctly", () => {
    render(<About />);

    expect(screen.getByText("10,000+")).toBeInTheDocument();
    expect(screen.getByText("50,000+")).toBeInTheDocument();
    expect(screen.getByText("50+")).toBeInTheDocument();
    expect(screen.getByText("4.8/5")).toBeInTheDocument();
  });

  it("renders mission & vision section", () => {
    render(<About />);

    expect(screen.getByText(/our mission/i)).toBeInTheDocument();
    expect(screen.getByText(/our vision/i)).toBeInTheDocument();
  });

  it("renders navbar and footer", () => {
    render(<About />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});