import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import { getProfile, getServices } from "../services/api";
import ServicesMenu from "./ServicesMenu";

export default function Home({ isLoggedIn, userName }) {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Services");
  const navigate = useNavigate();

  // Fetch user profile to get city
  useEffect(() => {
    const fetchProfile = async () => {
      if (!isLoggedIn) {
        setCity(""); // no user → no city
        return;
      }

      try {
        const profile = await getProfile();
        setCity(profile?.user?.city || "");
      } catch (err) {
        console.error("Profile fetch error:", err);
        setCity("");
      }
    };

    fetchProfile();
  }, [isLoggedIn]);

  // Load services based on login status
  useEffect(() => {
    const loadServices = async () => {
      try {
        let data;

        //  If NOT logged in → fetch ALL services
        if (!isLoggedIn) {
          data = await getServices({ query: search });
        } else {
          //  If logged in → wait for city to load
          if (!city) return;
          data = await getServices({ city, query: search });
        }

        setServices(data || []);
      } catch (err) {
        console.error("Service load error:", err);
        setServices([]);
      }
    };

    loadServices();
  }, [city, search, isLoggedIn]);

  const handleBookNowClick = (service) => {
    if (isLoggedIn) navigate(`/service/${service._id}`);
    else navigate("/login");
  };

  const filteredServices =
    activeCategory === "All Services"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-white">

      {/* HERO SECTION */}

      <section className="relative w-full min-h-[200px] sm:min-h-[400px] lg:min-h-[400px]">

  <img
    src={isLoggedIn ? "customer_landing.png" : "hero2.png"}
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">

    {userName && (
      <h1 className="text-3xl font-bold mb-4">Welcome, {userName}!</h1>
    )}

    {/* SEARCH BAR */}
    <div className="flex items-center h-12 bg-white rounded-3xl overflow-hidden shadow-md max-w-xl w-full mb-4">

      <div className="flex items-center gap-1 bg-gradient-to-r from-blue-100 to-yellow-300 h-full text-black">
        <MapPin size={20} className="text-blue-700 ml-2" />
        <span className="font-semibold pr-4 whitespace-nowrap">
          {isLoggedIn ? city || "Loading city..." : "All Cities"}
        </span>
      </div>

      <input
        type="text"
        placeholder="Search for services..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow px-4 h-full text-black outline-none"
      />

      <button className="px-3 h-full text-gray-400 hover:bg-blue-800">
        <Search/>
      </button>

    </div>

    <button
      onClick={() =>
        isLoggedIn ? navigate("/moreservices") : navigate("/login")
      }
      className="bg-blue-700 px-6 py-3 rounded-full text-white font-bold hover:bg-blue-800"
    >
      Book Now
    </button>

  </div>
</section>


      {/* SERVICE SECTION */}
      <section className="bg-gray-100 dark:bg-gray-900 py-10 shadow-inner">
        <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-400 mb-6">
          {isLoggedIn
            ? city
              ? `Services in ${city}`
              : "Loading your city..."
            : "All Services"}
        </h2>

        <ServicesMenu
          activeCategory={activeCategory}
          onCategoryClick={setActiveCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">

          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={service.imageUrl}
                  alt={service.subService}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">
                    {service.subService}
                  </h3>

                  <p className="font-bold text-gray-900 dark:text-white">
                    ₹{service.price} onwards
                  </p>

                  <button
                    onClick={() => handleBookNowClick(service)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              {isLoggedIn
                ? city
                  ? `No services found in ${city}.`
                  : "Loading..."
                : "No services available at the moment."}
            </p>
          )}

        </div>
      </section>
    </div>
  );
}
