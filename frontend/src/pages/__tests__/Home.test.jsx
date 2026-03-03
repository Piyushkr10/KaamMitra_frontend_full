import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "../Home";

vi.mock("../../services/api", () => ({
  getProfile: vi.fn(),
  getServices: vi.fn(),
}));

import { getProfile, getServices } from "../../services/api";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockServices = [
  {
    _id: "1",
    category: "Cleaning",
    subService: "Basic Cleaning",
    price: 500,
    imageUrl: "test.jpg",
  },
];

const renderHome = (props = {}) =>
  render(
    <MemoryRouter>
      <Home {...props} />
    </MemoryRouter>
  );

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -----------------------------
  // RENDERING
  // -----------------------------

  it("renders hero section", () => {
    renderHome({ isLoggedIn: false });

    expect(
      screen.getByPlaceholderText(/search for services/i)
    ).toBeInTheDocument();
  });

  it("shows All Services when not logged in", async () => {
    getServices.mockResolvedValue([]);

    renderHome({ isLoggedIn: false });

    await waitFor(() => {
      expect(screen.getByText(/all services/i)).toBeInTheDocument();
    });
  });

  it("shows welcome message when userName exists", () => {
    renderHome({ isLoggedIn: true, userName: "John" });

    expect(screen.getByText(/welcome, john/i)).toBeInTheDocument();
  });

  // -----------------------------
  // PROFILE + CITY
  // -----------------------------

  it("fetches profile when logged in", async () => {
    getProfile.mockResolvedValue({
      user: { city: "Delhi" },
    });

    getServices.mockResolvedValue([]);

    renderHome({ isLoggedIn: true });

    await waitFor(() => {
      expect(getProfile).toHaveBeenCalled();
    });
  });

  it("displays city after profile loads", async () => {
    getProfile.mockResolvedValue({
      user: { city: "Delhi" },
    });

    getServices.mockResolvedValue([]);

    renderHome({ isLoggedIn: true });

    await waitFor(() => {
      expect(screen.getByText(/services in delhi/i)).toBeInTheDocument();
    });
  });

  it("handles profile error gracefully", async () => {
    getProfile.mockRejectedValue(new Error("Fail"));
    getServices.mockResolvedValue([]);

    renderHome({ isLoggedIn: true });

    await waitFor(() => {
      expect(getProfile).toHaveBeenCalled();
    });
  });

  // -----------------------------
  // SERVICES
  // -----------------------------

  it("loads services when not logged in", async () => {
    getServices.mockResolvedValue(mockServices);

    renderHome({ isLoggedIn: false });

    await waitFor(() => {
      expect(getServices).toHaveBeenCalledWith({ query: "" });
    });
  });

  it("loads services with city when logged in", async () => {
    getProfile.mockResolvedValue({
      user: { city: "Delhi" },
    });

    getServices.mockResolvedValue(mockServices);

    renderHome({ isLoggedIn: true });

    await waitFor(() => {
      expect(getServices).toHaveBeenCalledWith({
        city: "Delhi",
        query: "",
      });
    });
  });

  it("shows empty message if no services", async () => {
    getServices.mockResolvedValue([]);

    renderHome({ isLoggedIn: false });

    await waitFor(() => {
      expect(
        screen.getByText(/no services available/i)
      ).toBeInTheDocument();
    });
  });

  // -----------------------------
  // SEARCH
  // -----------------------------

  it("updates search input", async () => {
    getServices.mockResolvedValue([]);

    renderHome({ isLoggedIn: false });

    const input = screen.getByPlaceholderText(/search for services/i);

    fireEvent.change(input, { target: { value: "clean" } });

    expect(input.value).toBe("clean");
  });

  // -----------------------------
  // NAVIGATION
  // -----------------------------

  it("hero Book Now navigates to login if not logged in", () => {
    renderHome({ isLoggedIn: false });

    fireEvent.click(screen.getByText(/^book now$/i));

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("hero Book Now navigates to moreservices if logged in", () => {
    renderHome({ isLoggedIn: true });

    fireEvent.click(screen.getByText(/^book now$/i));

    expect(mockNavigate).toHaveBeenCalledWith("/moreservices");
  });

  it("service card Book Now navigates correctly when logged in", async () => {
    getServices.mockResolvedValue(mockServices);

    renderHome({ isLoggedIn: true });

    await waitFor(() => {
      expect(screen.getByText(/basic cleaning/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText(/book now/i)[1]);

    expect(mockNavigate).toHaveBeenCalledWith("/service/1");
  });

  it("service card Book Now navigates to login if not logged in", async () => {
    getServices.mockResolvedValue(mockServices);

    renderHome({ isLoggedIn: false });

    await waitFor(() => {
      expect(screen.getByText(/basic cleaning/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText(/book now/i)[1]);

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});