import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Navbar from "../Navbar";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: "en",
      changeLanguage: vi.fn(),
    },
  }),
}));

const renderNavbar = (props = {}) => {
  const defaultProps = {
    isLoggedIn: false,
    userName: "",
    profileImage: "",
    darkMode: false,
    toggleDarkMode: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <Navbar {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe("Navbar Component", () => {
  it("renders logo", () => {
    renderNavbar();
    expect(screen.getByAltText("KaamMitra")).toBeInTheDocument();
  });

  it("shows login when not logged in", () => {
    renderNavbar();
    expect(screen.getByText("login")).toBeInTheDocument();
  });

  it("shows username when logged in", () => {
    renderNavbar({ isLoggedIn: true, userName: "John" });
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  it("opens services dropdown", () => {
    renderNavbar();
    fireEvent.click(screen.getByText("services"));
    expect(screen.getByText("Plumbing")).toBeInTheDocument();
  });

  it("opens language dropdown", () => {
    renderNavbar();
    fireEvent.click(screen.getByText("English"));
    expect(screen.getByText("Hindi")).toBeInTheDocument();
  });

//   it("calls toggleDarkMode", () => {
//     const mockToggle = vi.fn();
//     renderNavbar({ toggleDarkMode: mockToggle });

//     const darkModeBtn = screen.getAllByRole("button")[0];
//     fireEvent.click(darkModeBtn);

//     expect(mockToggle).toHaveBeenCalled();
//   });

it("calls toggleDarkMode", () => {
  const mockToggle = vi.fn();

  renderNavbar({ toggleDarkMode: mockToggle });

  const darkModeButton = screen.getAllByLabelText("toggle-dark-mode")[0];

  fireEvent.click(darkModeButton);

  expect(mockToggle).toHaveBeenCalledTimes(1);
});

  it("opens mobile menu", () => {
    renderNavbar();

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 1]);

    expect(screen.getByText("Menu")).toBeInTheDocument();
  });
});