import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

/* ================= MOCK API ================= */
vi.mock("../../services/api", () => ({
  requestOtp: vi.fn(),
  verifyOtp: vi.fn(),
}));

/* ================= MOCK NAVIGATION ================= */
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

/* IMPORT AFTER MOCKS */
import Login from "../Login";
import { requestOtp, verifyOtp } from "../../services/api";

describe("Login Page", () => {
  const mockOnLoginComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders login form correctly", () => {
    render(
      <MemoryRouter>
        <Login onLoginComplete={mockOnLoginComplete} />
      </MemoryRouter>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your mobile number/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/send otp/i)).toBeInTheDocument();
  });

  it("shows error if mobile number is invalid", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login onLoginComplete={mockOnLoginComplete} />
      </MemoryRouter>
    );

    await user.type(
      screen.getByPlaceholderText(/enter your mobile number/i),
      "123"
    );

    await user.click(screen.getByText(/send otp/i));

    expect(
      await screen.findByText(/please enter a valid 10-digit/i)
    ).toBeInTheDocument();
  });

  it("sends OTP successfully and switches to OTP screen", async () => {
    requestOtp.mockResolvedValue({
      message: "OTP sent successfully",
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login onLoginComplete={mockOnLoginComplete} />
      </MemoryRouter>
    );

    await user.type(
      screen.getByPlaceholderText(/enter your mobile number/i),
      "9876543210"
    );

    await user.click(screen.getByText(/send otp/i));

    expect(
      await screen.findByText(/otp sent successfully/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/enter otp/i)).toBeInTheDocument();
  });



  it("verifies OTP and navigates on success", async () => {
  requestOtp.mockResolvedValue({
    message: "OTP sent successfully",
  });

  verifyOtp.mockResolvedValue({
    accessToken: "fake-token",
    message: "Login success",
    user: {
      fullName: "John Doe",
      phoneNumber: "9876543210",
    },
  });

  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Login onLoginComplete={mockOnLoginComplete} />
    </MemoryRouter>
  );

  // Enter mobile number
  await user.type(
    screen.getByPlaceholderText(/enter your mobile number/i),
    "9876543210"
  );

  await user.click(screen.getByText(/send otp/i));

  // Wait for OTP screen
  await screen.findByText(/enter otp/i);

  // ✅ Get ALL 4 OTP inputs (no slice)
  const otpInputs = screen.getAllByRole("textbox");

  expect(otpInputs).toHaveLength(4);

  // Fill all 4 boxes
  for (let input of otpInputs) {
    await user.type(input, "1");
  }

  // Click verify
  await user.click(screen.getByText(/verify otp/i));

  await waitFor(() => {
    expect(verifyOtp).toHaveBeenCalledTimes(1);
  });

  expect(localStorage.getItem("token")).toBe("fake-token");
  expect(mockOnLoginComplete).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});
});