import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

/* ================= MOCK NAVIGATE ================= */
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import LogOut from "../LogOut";

describe("LogOut Component", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // control setTimeout
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls onLogout immediately when mounted", () => {
    const mockOnLogout = vi.fn();

    render(
      <MemoryRouter>
        <LogOut onLogout={mockOnLogout} />
      </MemoryRouter>
    );

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it("renders logout message", () => {
    const mockOnLogout = vi.fn();

    render(
      <MemoryRouter>
        <LogOut onLogout={mockOnLogout} />
      </MemoryRouter>
    );

    expect(screen.getByText(/logging you out/i)).toBeInTheDocument();
    expect(screen.getByText(/please wait/i)).toBeInTheDocument();
  });

  it("navigates to home after 1.5 seconds", () => {
    const mockOnLogout = vi.fn();

    render(
      <MemoryRouter>
        <LogOut onLogout={mockOnLogout} />
      </MemoryRouter>
    );

    // Fast-forward time
    vi.advanceTimersByTime(1500);

    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});