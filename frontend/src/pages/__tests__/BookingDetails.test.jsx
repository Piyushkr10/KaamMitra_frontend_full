import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookingDetails from "../BookingDetails";
import { describe, it, expect, vi } from "vitest";

// Mock Footer (keep this)
vi.mock("../../components/Footer", () => ({
  default: () => <div data-testid="footer">Footer Component</div>,
}));

const renderWithRouter = (ui) => {
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  );
};

describe("BookingDetails Component", () => {

  it("renders without crashing", () => {
    renderWithRouter(<BookingDetails darkMode={false} />);
    expect(screen.getByText("Payment Summary")).toBeInTheDocument();
  });

  it("renders in dark mode", () => {
    renderWithRouter(<BookingDetails darkMode={true} />);
    expect(screen.getByText("Payment Summary")).toBeInTheDocument();
  });

  it("displays Job Details section", () => {
    renderWithRouter(<BookingDetails />);
    expect(screen.getByText("Job Details")).toBeInTheDocument();
    expect(screen.getByText("Service Address")).toBeInTheDocument();
    expect(screen.getByText("+91 98765 43210")).toBeInTheDocument();
  });

  it("displays Service Scope section", () => {
    renderWithRouter(<BookingDetails />);
    expect(screen.getByText("Service Scope")).toBeInTheDocument();
    expect(screen.getByText("Full-Home Deep Santization")).toBeInTheDocument();
  });

  it("calculates and displays payment amounts correctly", () => {
    renderWithRouter(<BookingDetails />);
    expect(screen.getByText("₹3,000")).toBeInTheDocument();
    expect(screen.getByText("₹900")).toBeInTheDocument();
    expect(screen.getByText("₹2,100")).toBeInTheDocument();
  });

  it("shows Payment Pending when remaining amount > 0", () => {
    renderWithRouter(<BookingDetails />);
    expect(screen.getByText("Payment Pending")).toBeInTheDocument();
  });

  it("shows correct payment progress percentage", () => {
    renderWithRouter(<BookingDetails />);
    expect(screen.getByText("30% Completed")).toBeInTheDocument();
  });

  it("renders Pay Balance Now button when payment is pending", () => {
    renderWithRouter(<BookingDetails />);
    expect(screen.getByText("Pay Balance Now")).toBeInTheDocument();
  });

  it("renders Footer component", () => {
    renderWithRouter(<BookingDetails />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

});