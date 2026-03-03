// import {render,screen,waitFor,fireEvent} from "@testing-library/jest-dom";
// import {describe,it,except,vi,beforeEach} from "vitest";
// import { MemoryRouter } from "react-router-dom";
// import MoreServices from "../MoreServices";


// // Helper to render with router
// const renderWithRouter =(uri)=>{
//     return render(<MemoryRouter>{uri}</MemoryRouter>)
// }

// describe("More services page",()=>{
//     beforeEach(()=>{
//         vi.resetAllMocks();
//     });

//     //loading State
//   it("shows loading initially", () => {
//     global.fetch = vi.fn(() =>
//       new Promise(() => {}) // never resolves
//     );

//     renderWithRouter(<MoreServices />);
//     expect(screen.getByText("Loading...")).toBeInTheDocument();
//   });
// })

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MoreServices from "../MoreServices";

// Helper to render with router
const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("MoreServices Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  //  1. Loading state
  it("shows loading initially", () => {
    global.fetch = vi.fn(() =>
      new Promise(() => {}) // never resolves
    );

    renderWithRouter(<MoreServices />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  //  2. Error state
  it("shows error message when fetch fails", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    renderWithRouter(<MoreServices />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  //  3. Renders services correctly
  it("renders service cards after successful fetch", async () => {
    const mockData = {
      services: [
        { name: "Plumbing", img: "plumbing.jpg" },
        { name: "Electrician", img: "electrician.jpg" },
      ],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    renderWithRouter(<MoreServices />);

    await waitFor(() => {
      expect(screen.getByText("Plumbing")).toBeInTheDocument();
      expect(screen.getByText("Electrician")).toBeInTheDocument();
    });
  });

  //  4. Pagination buttons render
  it("renders pagination buttons when services exceed one page", async () => {
    const mockData = {
      services: Array.from({ length: 10 }, (_, i) => ({
        name: `Service ${i + 1}`,
        img: "test.jpg",
      })),
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    renderWithRouter(<MoreServices />);

    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  //  5. Pagination changes page
  it("changes page when pagination button is clicked", async () => {
    const mockData = {
      services: Array.from({ length: 10 }, (_, i) => ({
        name: `Service ${i + 1}`,
        img: "test.jpg",
      })),
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    renderWithRouter(<MoreServices />);

    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
    });

    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);

    await waitFor(() => {
      expect(screen.getByText("Service 9")).toBeInTheDocument();
    });
  });

  //  6. Link is generated correctly
  it("generates correct service link", async () => {
    const mockData = {
      services: [{ name: "AC Repair", img: "ac.jpg" }],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    renderWithRouter(<MoreServices />);

    await waitFor(() => {
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute(
        "href",
        "/service/AC%20Repair"
      );
    });
  });
});