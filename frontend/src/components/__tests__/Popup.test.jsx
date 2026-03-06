import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Popup from "../Popup";

describe("Popup Component", () => {

  it("renders without crashing", () => {
    render(<Popup message="Test message" />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("displays the correct message", () => {
    render(<Popup message="Success!" />);
    expect(screen.getByText("Success!")).toBeInTheDocument();
  });

  it("updates when message prop changes", () => {
    const { rerender } = render(<Popup message="First message" />);
    expect(screen.getByText("First message")).toBeInTheDocument();

    rerender(<Popup message="Updated message" />);
    expect(screen.getByText("Updated message")).toBeInTheDocument();
  });

  it("renders empty when no message provided", () => {
    render(<Popup message="" />);
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });

});