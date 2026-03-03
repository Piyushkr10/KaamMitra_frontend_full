// import { describe, it, expect, beforeEach, vi } from "vitest";
// import { render, screen, fireEvent } from "@testing-library/react";
// // import BookHistory from "../BookHistory";
// import BookHistory from "../MyBookingHistory";

// describe("BookHistory Component", () => {
//   beforeEach(() => {
//     localStorage.clear();
//     vi.restoreAllMocks();
//   });

//   //  1. No bookings case
//   it("shows message when no bookings exist", () => {
//     render(<BookHistory darkMode={false} />);
//     expect(
//       screen.getByText("You have no past bookings.")
//     ).toBeInTheDocument();
//   });

//   // Mock booking data
//   const mockBookings = [
//     {
//       service: "Plumbing",
//       name: "John",
//       serviceType: "Repair",
//       address: "123 Street",
//       date: "2024-01-01",
//       time: "10:00 AM",
//       remarks: "",
//       paymentMethod: "UPI",
//       totalAmount: 500,
//       transactionDate: "2024-01-01T10:00:00",
//     },
//     {
//       service: "Electrician",
//       name: "Doe",
//       serviceType: "Installation",
//       address: "456 Avenue",
//       date: "2024-02-01",
//       time: "2:00 PM",
//       remarks: "Urgent",
//       paymentMethod: "Cash",
//       totalAmount: 800,
//       transactionDate: "2024-02-01T14:00:00",
//     },
//     {
//       service: "Cleaning",
//       name: "Alice",
//       serviceType: "Home",
//       address: "789 Road",
//       date: "2024-03-01",
//       time: "12:00 PM",
//       remarks: "",
//       paymentMethod: "Card",
//       totalAmount: 600,
//       transactionDate: "2024-03-01T12:00:00",
//     },
//   ];

//   //  2. Renders bookings correctly
//   it("renders bookings from localStorage", () => {
//     localStorage.setItem("bookings", JSON.stringify(mockBookings));
//     render(<BookHistory darkMode={false} />);

//     expect(screen.getByText("Plumbing")).toBeInTheDocument();
//     expect(screen.getByText("Electrician")).toBeInTheDocument();
//   });

//   //  3. Sorts bookings by transactionDate (latest first)
//   it("shows latest booking first", () => {
//     localStorage.setItem("bookings", JSON.stringify(mockBookings));
//     render(<BookHistory darkMode={false} />);

//     const headings = screen.getAllByRole("heading", { level: 2 });
//     expect(headings[0]).toHaveTextContent("Cleaning"); // Most recent
//   });

//   //  4. Initially shows only 2 bookings
//   it("shows only 2 bookings initially", () => {
//     localStorage.setItem("bookings", JSON.stringify(mockBookings));
//     render(<BookHistory darkMode={false} />);

//     expect(screen.getByText("Cleaning")).toBeInTheDocument();
//     expect(screen.getByText("Electrician")).toBeInTheDocument();
//     expect(screen.queryByText("Plumbing")).not.toBeInTheDocument();
//   });

//   //  5. Show All Past Bookings button works
//   it("shows all bookings when clicking 'Show All Past Bookings'", () => {
//     localStorage.setItem("bookings", JSON.stringify(mockBookings));
//     render(<BookHistory darkMode={false} />);

//     const button = screen.getByText("Show All Past Bookings");
//     fireEvent.click(button);

//     expect(screen.getByText("Plumbing")).toBeInTheDocument();
//   });

//   //  6. Back to Top button appears and works
//   it("shows and triggers scroll when clicking Back to Top", () => {
//     localStorage.setItem("bookings", JSON.stringify(mockBookings));

//     const scrollMock = vi.fn();
//     window.scrollTo = scrollMock;

//     render(<BookHistory darkMode={false} />);

//     fireEvent.click(screen.getByText("Show All Past Bookings"));

//     const backButton = screen.getByText("Back to Top");
//     expect(backButton).toBeInTheDocument();

//     fireEvent.click(backButton);

//     expect(scrollMock).toHaveBeenCalledWith({
//       top: 0,
//       behavior: "smooth",
//     });
//   });

//   //  7. Dark mode applies correct class
//   it("applies dark mode styles", () => {
//     localStorage.setItem("bookings", JSON.stringify(mockBookings));
//     const { container } = render(<BookHistory darkMode={true} />);

//     expect(container.firstChild).toHaveClass("bg-gray-900");
//   });
// });



import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookHistory from "../MyBookingHistory";

describe("BookHistory Component", () => {
  const mockBookings = [
    {
      service: "Plumbing",
      name: "John",
      serviceType: "Repair",
      address: "123 Street",
      date: "2024-01-01",
      time: "10:00 AM",
      remarks: "",
      paymentMethod: "UPI",
      totalAmount: 500,
      transactionDate: "2024-01-01T10:00:00",
    },
    {
      service: "Electrician",
      name: "Doe",
      serviceType: "Installation",
      address: "456 Avenue",
      date: "2024-02-01",
      time: "2:00 PM",
      remarks: "Urgent",
      paymentMethod: "Cash",
      totalAmount: 800,
      transactionDate: "2024-02-01T14:00:00",
    },
    {
      service: "Cleaning",
      name: "Alice",
      serviceType: "Home",
      address: "789 Road",
      date: "2024-03-01",
      time: "12:00 PM",
      remarks: "",
      paymentMethod: "Card",
      totalAmount: 600,
      transactionDate: "2024-03-01T12:00:00",
    },
  ];

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  // ✅ 1. No bookings
  it("shows message when no bookings exist", () => {
    render(<BookHistory darkMode={false} />);
    expect(
      screen.getByText("You have no past bookings.")
    ).toBeInTheDocument();
  });

  // ✅ 2. Renders initial 2 latest bookings only
  it("renders only latest 2 bookings initially", () => {
    localStorage.setItem("bookings", JSON.stringify(mockBookings));
    render(<BookHistory darkMode={false} />);

    expect(screen.getByText("Cleaning")).toBeInTheDocument();
    expect(screen.getByText("Electrician")).toBeInTheDocument();

    // Oldest should NOT appear initially
    expect(screen.queryByText("Plumbing")).not.toBeInTheDocument();
  });

  // ✅ 3. Sorts bookings correctly (latest first)
  it("shows most recent booking first", () => {
    localStorage.setItem("bookings", JSON.stringify(mockBookings));
    render(<BookHistory darkMode={false} />);

    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings[0]).toHaveTextContent("Cleaning");
  });

  // ✅ 4. Show All button appears when bookings > 2
  it("shows 'Show All Past Bookings' button when bookings exceed 2", () => {
    localStorage.setItem("bookings", JSON.stringify(mockBookings));
    render(<BookHistory darkMode={false} />);

    expect(
      screen.getByText("Show All Past Bookings")
    ).toBeInTheDocument();
  });

  // ✅ 5. Clicking Show All displays all bookings
  it("shows all bookings when clicking 'Show All Past Bookings'", () => {
    localStorage.setItem("bookings", JSON.stringify(mockBookings));
    render(<BookHistory darkMode={false} />);

    fireEvent.click(screen.getByText("Show All Past Bookings"));

    expect(screen.getByText("Plumbing")).toBeInTheDocument();
    expect(screen.getByText("Electrician")).toBeInTheDocument();
    expect(screen.getByText("Cleaning")).toBeInTheDocument();
  });

  // ✅ 6. Back to Top button appears and triggers scroll
  it("shows and triggers scroll when clicking Back to Top", () => {
    localStorage.setItem("bookings", JSON.stringify(mockBookings));

    const scrollMock = vi.fn();
    window.scrollTo = scrollMock;

    render(<BookHistory darkMode={false} />);

    fireEvent.click(screen.getByText("Show All Past Bookings"));

    const backButton = screen.getByText("Back to Top");
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    expect(scrollMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  // ✅ 7. Applies dark mode class correctly
  it("applies dark mode styles when darkMode is true", () => {
    localStorage.setItem("bookings", JSON.stringify(mockBookings));

    const { container } = render(<BookHistory darkMode={true} />);

    expect(container.firstChild).toHaveClass("bg-gray-900");
  });
});