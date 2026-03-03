import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../NotFound";

describe("NotFound Page", () => {
  it("renders 404 page content correctly", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/sorry, the page you are looking for/i)
    ).toBeInTheDocument();
  });

  it("has a link to home page", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole("link", { name: /go home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("calls window.history.back when Go Back is clicked", async () => {
    const user = userEvent.setup();

    const backSpy = vi.spyOn(window.history, "back").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button", { name: /go back/i });

    await user.click(backButton);

    expect(backSpy).toHaveBeenCalledTimes(1);

    backSpy.mockRestore();
  });
});