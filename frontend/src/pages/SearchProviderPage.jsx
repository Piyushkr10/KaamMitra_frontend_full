import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProviderSearchModal from "../components/ProviderSearchModal";
import { getBookingById } from "../services/api";

const SearchProviderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = location.state?.bookingId;

  const [status, setStatus] = useState("searching");

  useEffect(() => {
    if (!bookingId) {
      navigate("/");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const data = await getBookingById(bookingId);
        const bookingStatus = data.booking?.status;

        if (bookingStatus === "accepted") {
          clearInterval(interval);
          navigate(`/booking/${bookingId}`);
        }

        if (bookingStatus === "no_provider_found") {
          clearInterval(interval);
          setStatus("failed");
        }

      } catch (err) {
        console.error("Error checking booking:", err.message);
      }
    }, 3000);

    return () => clearInterval(interval);

  }, [bookingId, navigate]);

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2>No provider available right now</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-black text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <ProviderSearchModal open={true} />;
};

export default SearchProviderPage;