import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../Footer";

describe("Footer Component", () => {

  const renderFooter = () => {
    return render(
      <MemoryRouter>
        <Footer darkMode={false} />
      </MemoryRouter>
    );
  };

  test("renders copyright text", () => {
  renderFooter();
  const copyrightElements =
    screen.getAllByText("© 2024 KaamMitra. All rights reserved.");

  expect(copyrightElements.length).toBeGreaterThan(0);
});

  test("renders section titles", () => {
    renderFooter();

    expect(screen.getAllByText("Services")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Quick Links")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Contact Us")[0]).toBeInTheDocument();
  });

  test("renders service links", () => {
    renderFooter();

    expect(screen.getAllByText("Plumbing")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Electrical")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Cleaning")[0]).toBeInTheDocument();
  });

  test("renders quick links", () => {
    renderFooter();

    expect(screen.getAllByText("About Us")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Contact")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Privacy Policy")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Terms of Service")[0]).toBeInTheDocument();
  });

  test("renders contact details", () => {
    renderFooter();

    expect(screen.getAllByText("Patna, Bihar, India")[0]).toBeInTheDocument();
    expect(screen.getAllByText("+91 98765 43210")[0]).toBeInTheDocument();
    expect(screen.getAllByText("info@kaammitra.in")[0]).toBeInTheDocument();
  });

  test("renders logo image with correct src", () => {
    renderFooter();

    const logo = screen.getAllByAltText("KaamMitra")[0];
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.png");
  });

});