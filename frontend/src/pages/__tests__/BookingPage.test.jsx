import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BookingPage from "../BookingPage";

/* ================= MOCK API ================= */
vi.mock("../../services/api", () => ({
  getServiceById: vi.fn(),
  bookService: vi.fn(),
}));

import { getServiceById, bookService } from "../../services/api";

/* ================= MOCK NAVIGATE ================= */
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

/* ================= HELPER ================= */
const renderWithRouter = () => {
  return render(
    <MemoryRouter initialEntries={["/booking/1"]}>
      <Routes>
        <Route path="/booking/:serviceId" element={<BookingPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("BookingPage", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ================= RENDER ================= */
  it("renders booking form correctly", async () => {
    getServiceById.mockResolvedValue({
      category: "Cleaning",
      subService: "Deep Cleaning",
      price: 2000,
    });

    renderWithRouter();

    expect(await screen.findByText(/complete your booking/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
  });

  /* ================= LOAD SERVICE ================= */
  it("loads service data from API", async () => {
    getServiceById.mockResolvedValue({
      category: "Plumbing",
      subService: "Pipe Repair",
      price: 1500,
    });

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByDisplayValue("Plumbing")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Pipe Repair")).toBeInTheDocument();
      expect(screen.getByDisplayValue("1500")).toBeInTheDocument();
    });
  });

  /* ================= VALIDATION ERROR ================= */
  it("shows error if form is submitted empty", async () => {
    getServiceById.mockResolvedValue({
      category: "Cleaning",
      subService: "Basic",
      price: 1000,
    });

    renderWithRouter();

    fireEvent.click(await screen.findByText(/submit & pay/i));

    expect(await screen.findByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  /* ================= TIME VALIDATION ================= */
  it("shows error when selecting past time on today date", async () => {
    getServiceById.mockResolvedValue({
      category: "Cleaning",
      subService: "Basic",
      price: 1000,
    });

    renderWithRouter();

    const todayInput = await screen.findByDisplayValue("");

    const dateInput = screen.getByLabelText(/date & time/i).querySelector("input[type='date']");
    const timeInput = screen.getByLabelText(/date & time/i).querySelector("input[type='time']");

    const today = new Date().toISOString().split("T")[0];

    fireEvent.change(dateInput, { target: { value: today } });
    fireEvent.change(timeInput, { target: { value: "00:00" } });

    expect(await screen.findByText(/please select a future time/i)).toBeInTheDocument();
  });

  /* ================= SUCCESS BOOKING ================= */
  it("submits form and navigates on success", async () => {
    vi.useFakeTimers();

    getServiceById.mockResolvedValue({
      category: "Cleaning",
      subService: "Basic",
      price: 1000,
    });

    bookService.mockResolvedValue({
      booking: { id: 1, total: 1000 },
    });

    renderWithRouter();

    await screen.findByText(/complete your booking/i);

    fireEvent.change(screen.getByPlaceholderText(/enter your name/i), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText(/cooking \/ cleaning \/ etc/i), {
      target: { value: "Basic Cleaning" },
    });

    fireEvent.change(screen.getByRole("textbox", { name: /address/i }), {
      target: { value: "123 Street" },
    });

    fireEvent.change(screen.getByRole("textbox", { name: /city/i }), {
      target: { value: "Delhi" },
    });

    fireEvent.change(screen.getByRole("textbox", { name: /state/i }), {
      target: { value: "Delhi" },
    });

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split("T")[0];

    fireEvent.change(screen.getByLabelText(/date & time/i).querySelector("input[type='date']"), {
      target: { value: formattedDate },
    });

    fireEvent.change(screen.getByLabelText(/date & time/i).querySelector("input[type='time']"), {
      target: { value: "12:00" },
    });

    fireEvent.change(screen.getByRole("textbox", { name: /remarks/i }), {
      target: { value: "Test remarks" },
    });

    fireEvent.click(screen.getByText(/submit & pay/i));

    await waitFor(() => {
      expect(bookService).toHaveBeenCalled();
    });

    vi.advanceTimersByTime(1500);

    expect(mockNavigate).toHaveBeenCalledWith("/payment", {
      state: { booking: { id: 1, total: 1000 } },
    });

    vi.useRealTimers();
  });

  /* ================= API FAILURE ================= */
  it("shows error if booking fails", async () => {
    getServiceById.mockResolvedValue({
      category: "Cleaning",
      subService: "Basic",
      price: 1000,
    });

    bookService.mockRejectedValue(new Error("API Error"));

    renderWithRouter();

    await screen.findByText(/complete your booking/i);

    fireEvent.click(screen.getByText(/submit & pay/i));

    expect(await screen.findByText(/booking failed/i)).toBeInTheDocument();
  });

});