import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Moon, Sun, User, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getServices } from "../services/api";   // ✅ SAME AS HOME

export default function Navbar({
  isLoggedIn,
  userName,
  profileImage,
  darkMode,
  toggleDarkMode,
}) {
  const { t, i18n } = useTranslation();

  const [services, setServices] = useState([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const servicesRef = useRef(null);
  const langRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();

  const hideNavItems =
    location.pathname === "/login" || location.pathname === "/signup";

  // ✅ SAME SERVICE CALL AS HOME
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
        setServices(data || []);
      } catch (err) {
        console.error("Navbar service load error:", err);
        setServices([]);
      }
    };

    loadServices();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
    setMenuOpen(false);
  };

  const getLanguageName = (code) => {
    switch (code) {
      case "en":
        return "English";
      case "hi":
        return "Hindi";
      case "bn":
        return "Bengali";
      default:
        return "Language";
    }
  };

  return (
    <header className="bg-gray-300 text-blue-700 dark:bg-gray-900 dark:text-white shadow sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="KaamMitra"
            className="h-20 w-auto object-contain dark:brightness-0 dark:invert"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {!hideNavItems && (
            <nav className="flex items-center gap-6 relative">

              <Link to="/" className="font-medium">
                {t("home")}
              </Link>

              <Link
                to="/booking-details"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
              >
                My Booking
              </Link>

              {/* ✅ SERVICES DROPDOWN */}
              <div className="relative" ref={servicesRef}>
                <button
                  className="flex items-center gap-1 font-medium"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  {t("services")} <ChevronDown size={16} />
                </button>

                {servicesOpen && (
                  <div className="absolute top-full mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 max-h-96 overflow-y-auto">

                    {services.slice(0, 10).map((service) => (
                      <Link
                        key={service._id}
                        to={`/service/${service._id}`}
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setServicesOpen(false)}
                      >
                        {service.subService}
                      </Link>
                    ))}

                    <Link
                      to="/moreservices"
                      className="block px-4 py-2 font-semibold border-t hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setServicesOpen(false)}
                    >
                      {t("see_more")}
                    </Link>
                  </div>
                )}
              </div>

              {/* Profile */}
              {isLoggedIn ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2"
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border bg-gray-200 dark:bg-gray-700">
                        <User size={18} />
                      </div>
                    )}
                    <span>{userName}</span>
                    <ChevronDown size={16} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800">
                      <Link to="/book-history" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                        {t("my_book_history")}
                      </Link>
                      <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                        {t("settings")}
                      </Link>
                      <Link to="/logout" className="block px-4 py-2 text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700">
                        {t("logout")}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">{t("login")}</Link>
              )}
            </nav>
          )}

          {/* Language */}
          <div className="relative" ref={langRef}>
            <button
              className="flex items-center gap-1"
              onClick={() => setLangOpen(!langOpen)}
            >
              {getLanguageName(i18n.language)} <ChevronDown size={16} />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                <button onClick={() => changeLanguage("en")} className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">English</button>
                <button onClick={() => changeLanguage("hi")} className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Hindi</button>
                <button onClick={() => changeLanguage("bn")} className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Bengali</button>
              </div>
            )}
          </div>

          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>
    </header>
  );
}
