import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Settings from "../Settings";

/* ================= MOCK API ================= */
vi.mock("../../services/api", () => ({
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
  requestDeactivateOtp: vi.fn(),
  verifyDeactivationOtp: vi.fn(),
  requestDeleteOtp: vi.fn(),
  verifyDeleteOtp: vi.fn(),
}));

/* ================= MOCK CUSTOMER SUPPORT ================= */
vi.mock("../CustomerSupport", () => ({
  default: ({ onClose }) => (
    <div>
      <p>Customer Support Modal</p>
      <button onClick={onClose}>Close Support</button>
    </div>
  ),
}));

import {
  getProfile,
  updateProfile,
  requestDeactivateOtp,
  verifyDeactivationOtp,
  requestDeleteOtp,
  verifyDeleteOtp,
} from "../../services/api";

describe("Settings Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockProfile = {
    user: {
      fullName: "John Doe",
      phoneNumber: "9876543210",
      address: "123 Street",
      city: "New York",
      state: "NY",
    },
  };

  it("loads and displays profile data", async () => {
    getProfile.mockResolvedValue(mockProfile);

    render(<Settings />);

    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("9876543210")).toBeInTheDocument();
    expect(screen.getByText("123 Street")).toBeInTheDocument();
  });

  it("opens edit modal and updates profile", async () => {
    getProfile.mockResolvedValue(mockProfile);
    updateProfile.mockResolvedValue({
      user: {
        ...mockProfile.user,
        address: "456 Avenue",
      },
    });

    const user = userEvent.setup();
    render(<Settings />);

    await screen.findByText("John Doe");

    await user.click(screen.getByText(/update details/i));

    const addressInput = screen.getByDisplayValue("123 Street");
    await user.clear(addressInput);
    await user.type(addressInput, "456 Avenue");

    await user.click(screen.getByText(/^save$/i));

    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalled();
    });
  });

  it("toggles notification switch", async () => {
    getProfile.mockResolvedValue(mockProfile);

    const user = userEvent.setup();
    render(<Settings />);

    await screen.findByText("John Doe");

    const switches = screen.getAllByRole("switch");
    expect(switches.length).toBeGreaterThan(0);

    await user.click(switches[0]);
  });

  it("handles deactivate account OTP flow", async () => {
    getProfile.mockResolvedValue(mockProfile);
    requestDeactivateOtp.mockResolvedValue({});
    verifyDeactivationOtp.mockResolvedValue({});

    const user = userEvent.setup();
    render(<Settings />);

    await screen.findByText("John Doe");

    await user.click(screen.getByText(/deactivate account/i));

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    await user.click(screen.getByText(/send otp/i));

    await waitFor(() => {
      expect(requestDeactivateOtp).toHaveBeenCalled();
    });

    const otpInput = await screen.findByPlaceholderText(/enter otp/i);
    await user.type(otpInput, "1234");

    await user.click(screen.getByText(/verify otp/i));

    await waitFor(() => {
      expect(verifyDeactivationOtp).toHaveBeenCalledWith("1234");
    });
  });

  it("handles delete account OTP flow", async () => {
    getProfile.mockResolvedValue(mockProfile);
    requestDeleteOtp.mockResolvedValue({});
    verifyDeleteOtp.mockResolvedValue({});

    delete window.location;
    window.location = { href: "" };

    const user = userEvent.setup();
    render(<Settings />);

    await screen.findByText("John Doe");

    await user.click(screen.getByText(/delete account/i));

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    await user.click(screen.getByText(/send otp/i));

    await waitFor(() => {
      expect(requestDeleteOtp).toHaveBeenCalled();
    });

    const otpInput = await screen.findByPlaceholderText(/enter otp/i);
    await user.type(otpInput, "9999");

    await user.click(screen.getByText(/verify otp/i));

    await waitFor(() => {
      expect(verifyDeleteOtp).toHaveBeenCalledWith("9999");
    });
  });
});