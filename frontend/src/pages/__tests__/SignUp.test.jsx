

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, beforeEach, test, expect } from "vitest";
import SignUp from "../SignUp";
import * as api from "../../services/api";
import { BrowserRouter } from "react-router-dom";

/* ================= MOCKS ================= */

vi.mock("../../services/api", () => ({
  requestOtp: vi.fn(),
  verifyOtp: vi.fn(),
  signup: vi.fn(),
  getProfile: vi.fn(),
}));

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock("@react-google-maps/api", () => ({
  useJsApiLoader: () => ({ isLoaded: true }),
  Autocomplete: ({ children }) => children,
}));

/* ================= HELPER ================= */

const renderComponent = () =>
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

/* ================= TEST SUITE ================= */

describe("SignUp Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.alert = vi.fn();
  });

  /* ================= STEP 1 ================= */

  test("shows validation error for invalid input", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "" },
    });

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByText("Send OTP"));

    const error = await screen.findByText(
      /Enter valid name & 10 digit phone number/i
    );

    expect(error).toBeInTheDocument();
  });

  test("calls requestOtp and moves to otp step", async () => {
    api.requestOtp.mockResolvedValueOnce({});

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByText("Send OTP"));

    await waitFor(() => {
      expect(api.requestOtp).toHaveBeenCalledTimes(1);
    });

    expect(await screen.findByText(/OTP sent to/i)).toBeInTheDocument();
  });

  /* ================= STEP 2 ================= */

  test("verifies otp and moves to signup step", async () => {
    api.requestOtp.mockResolvedValueOnce({});
    api.verifyOtp.mockResolvedValueOnce({ user: { id: 1 } });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByText("Send OTP"));

    await screen.findByText(/OTP sent to/i);

    const otpInputs = screen.getAllByRole("textbox");

    otpInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "1" } });
    });

    fireEvent.click(screen.getByText("Verify OTP"));

    expect(await screen.findByText("Complete Signup")).toBeInTheDocument();
  });

  /* ================= STEP 3 ================= */

  test("completes signup and navigates to home", async () => {
    api.requestOtp.mockResolvedValueOnce({});
    api.verifyOtp.mockResolvedValueOnce({ user: { id: 1 } });
    api.signup.mockResolvedValueOnce({});
    api.getProfile.mockResolvedValueOnce({ user: { id: 1 } });

    renderComponent();

    /* ---- Step 1 ---- */

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByText("Send OTP"));

    await screen.findByText(/OTP sent to/i);

    /* ---- Step 2 ---- */

    const otpInputs = screen.getAllByRole("textbox");
    otpInputs.forEach((input) =>
      fireEvent.change(input, { target: { value: "1" } })
    );

    fireEvent.click(screen.getByText("Verify OTP"));

    await screen.findByText("Complete Signup");

    /* ---- Step 3 ---- */

    const form = screen.getByText("Complete Signup").closest("form");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(api.signup).toHaveBeenCalledTimes(1);
      expect(api.getProfile).toHaveBeenCalledTimes(1);
      expect(mockedNavigate).toHaveBeenCalledWith("/");
    });
  });
});