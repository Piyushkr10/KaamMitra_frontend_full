import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ServiceDetail from "../ServiceDetail";

// Mock API
vi.mock("../../services/api", () => ({
  getServiceById: vi.fn(),
  getAllServices: vi.fn(),
}));

import { getServiceById, getAllServices } from "../../services/api";

const renderWithRouter = (serviceId = "123") => {
  return render(
    <MemoryRouter initialEntries={[`/service/${serviceId}`]}>
      <Routes>
        <Route path="/service/:serviceId" element={<ServiceDetail />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("ServiceDetail Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockService = {
    _id: "123",
    category: "Plumbing",
    description: "Fix leaks and pipes",
    price: 500,
    requirement: "Bring tools",
    imageUrl: "test.jpg",
  };

  const mockAllServices = [
    mockService,
    { _id: "2", category: "Electrician", description: "Fix wiring" },
    { _id: "3", category: "Cleaning", description: "Home cleaning" },
    { _id: "4", category: "Painting", description: "Wall painting" },
    { _id: "5", category: "AC Repair", description: "Cooling fix" },
    { _id: "6", category: "Carpenter", description: "Wood work" },
  ];

  // 1. Loading state
  it("shows loading initially", async () => {
    getServiceById.mockResolvedValue(mockService);
    getAllServices.mockResolvedValue(mockAllServices);

    renderWithRouter();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  // 2. API error state
  it("shows error when service fetch fails", async () => {
    getServiceById.mockRejectedValue(new Error("Service not found"));
    getAllServices.mockResolvedValue([]);

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  // 3. Renders service details
  it("renders service details correctly", async () => {
    getServiceById.mockResolvedValue(mockService);
    getAllServices.mockResolvedValue(mockAllServices);

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText("Plumbing")).toBeInTheDocument();
      expect(screen.getByText("Fix leaks and pipes")).toBeInTheDocument();
      expect(screen.getByText("₹500")).toBeInTheDocument();
      expect(screen.getByText("Bring tools")).toBeInTheDocument();
    });
  });

  // 4. Uses fallback image when no imageUrl
  it("uses placeholder image if imageUrl missing", async () => {
    getServiceById.mockResolvedValue({
      ...mockService,
      imageUrl: null,
    });
    getAllServices.mockResolvedValue(mockAllServices);

    renderWithRouter();

    await waitFor(() => {
      const img = screen.getByRole("img");
      expect(img.src).toContain("placehold.co");
    });
  });

  // 5. Booking link correct
  it("renders correct booking link", async () => {
    getServiceById.mockResolvedValue(mockService);
    getAllServices.mockResolvedValue(mockAllServices);

    renderWithRouter();

    await waitFor(() => {
      const link = screen.getByText("Book This Service Now");
      expect(link.closest("a")).toHaveAttribute(
        "href",
        "/booking/123"
      );
    });
  });

  // 6. Renders related services excluding current
  it("renders up to 5 related services excluding current one", async () => {
    getServiceById.mockResolvedValue(mockService);
    getAllServices.mockResolvedValue(mockAllServices);

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText("Electrician")).toBeInTheDocument();
      expect(screen.queryByText("Plumbing")).toBeInTheDocument(); // main title exists
    });

    const relatedLinks = screen.getAllByText("Learn More");
    expect(relatedLinks.length).toBeLessThanOrEqual(5);
  });

  // 7. Explore More section renders
  it("renders Explore More Services section", async () => {
    getServiceById.mockResolvedValue(mockService);
    getAllServices.mockResolvedValue(mockAllServices);

    renderWithRouter();

    await waitFor(() => {
      expect(
        screen.getByText("Explore More Services")
      ).toBeInTheDocument();
    });
  });
});