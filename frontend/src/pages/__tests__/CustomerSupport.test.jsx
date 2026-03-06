import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CustomerSupport from "../CustomerSupport";

describe("CustomerSupport Component", () => {
  it("does not render when isOpen is false", () => {
    render(<CustomerSupport isOpen={false} onClose={vi.fn()} />);

    expect(
      screen.queryByText(/customer support/i)
    ).not.toBeInTheDocument();
  });

  it("renders correctly when isOpen is true", () => {
    render(<CustomerSupport isOpen={true} onClose={vi.fn()} />);

    expect(
      screen.getByText(/customer support/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText("+1 (800) 123-4567")
    ).toBeInTheDocument();

    expect(
      screen.getByText("support@yourcompany.com")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/live chat available/i)
    ).toBeInTheDocument();
  });

  it("calls onClose when top close button is clicked", () => {
    const mockClose = vi.fn();

    render(<CustomerSupport isOpen={true} onClose={mockClose} />);

    // First button is the top-right X button
    const closeButtons = screen.getAllByRole("button");
    fireEvent.click(closeButtons[0]);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when footer Close button is clicked", () => {
    const mockClose = vi.fn();

    render(<CustomerSupport isOpen={true} onClose={mockClose} />);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("has correct mailto link", () => {
    render(<CustomerSupport isOpen={true} onClose={vi.fn()} />);

    const emailLink = screen.getByRole("link", { name: /email us/i });

    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:support@yourcompany.com"
    );
  });
});