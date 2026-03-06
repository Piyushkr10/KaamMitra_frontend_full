import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import PaymentPage from "../PaymentPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("PaymentPage", () => {
  const booking = {
    service: "Plumbing",
    totalPrice: 500,
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  it("renders booking details", () => {
    localStorage.setItem("booking", JSON.stringify(booking));

    render(
      <MemoryRouter>
        <PaymentPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/full payment/i)).toBeInTheDocument();
    expect(screen.getByText(/plumbing/i)).toBeInTheDocument();
    expect(screen.getByText(/500/i)).toBeInTheDocument();
  });

  it("shows not found if no booking", () => {
    render(
      <MemoryRouter>
        <PaymentPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it("shows success and navigates on pay", async () => {
    localStorage.setItem("booking", JSON.stringify(booking));

    vi.useFakeTimers();

    render(
      <MemoryRouter>
        <PaymentPage />
      </MemoryRouter>
    );

    const button = await screen.findByRole("button", { name: /pay/i });

    await userEvent.click(button);

    expect(screen.getByText(/payment successful/i)).toBeInTheDocument();

    vi.runAllTimers();

    expect(mockNavigate).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
