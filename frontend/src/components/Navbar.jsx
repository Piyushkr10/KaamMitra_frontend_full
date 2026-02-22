
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Moon, Sun, User, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const SERVICES = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Cleaning",
  "Painting",
  "Gardening",
  "AC Repair",
  "Cooking",
  "Photography",
  "Beauty Services",
  "More...",
];

export default function Navbar({
  isLoggedIn,
  userName,
  profileImage,
  darkMode,
  toggleDarkMode,
}) {
  const { t, i18n } = useTranslation();
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

    function handleScrollClose() {
      if (servicesOpen || langOpen || profileOpen) {
        setServicesOpen(false);
        setLangOpen(false);
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScrollClose);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollClose);
    };
  }, [servicesOpen, langOpen, profileOpen]);

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
    <header
      className="bg-gray-300 text-blue-700 dark:bg-gray-900 dark:text-white
                 shadow sticky top-0 z-50 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
      
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 ml-2cd f  
        ">
          <img
            src="/logo.png"
            alt="KaamMitra"
            className="h-20 w-auto object-contain transition duration-300 dark:brightness-0 dark:invert"
          />
        </Link>

        {/* Desktop Nav */}
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

              {/* Services Dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  className="flex items-center gap-1 font-medium"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  {t("services")} <ChevronDown size={16} />
                </button>
                {servicesOpen && (
                  <div
                    className="absolute top-full mt-1 rounded-md shadow-lg w-56 z-50
                               bg-white dark:bg-gray-800"
                  >
                    {SERVICES.slice(0, 10).map((name) => (
                      <Link
                        key={name}
                        to={`/service/${encodeURIComponent(name)}`}
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setServicesOpen(false)}
                      >
                        {name}
                      </Link>
                    ))}
                    <Link
                      to="/moreservices"
                      className="block px-4 py-2 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 border-t transition-colors"
                      onClick={() => setServicesOpen(false)}
                    >
                      {t("see_more")}
                    </Link>
                  </div>
                )}
              </div>

              {/* Profile / Auth */}
              {isLoggedIn ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 dark:bg-gray-700">
                        <User
                          size={18}
                          className="text-gray-600 dark:text-gray-300"
                        />
                      </div>
                    )}
                    <span className="font-medium">{userName}</span>
                    <ChevronDown size={16} />
                  </button>

                  {profileOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50
                                 bg-white dark:bg-gray-800"
                    >
                      <Link
                        to="/book-history"
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        {t("my_book_history")}
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        {t("settings")}
                      </Link>
                      <Link
                        to="/logout"
                        className="block px-4 py-2 text-red-600 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        {t("logout")}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
                  >
                    {t("login")}
                  </Link>
                  {/* <Link
                    to="/signup"
                    className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition-colors"
                  >
                    {t("signup")}
                  </Link> */}
                </div>
              )}
            </nav>
          )}

          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              className="flex items-center gap-1 font-medium"
              onClick={() => setLangOpen(!langOpen)}
            >
              {getLanguageName(i18n.language)} <ChevronDown size={16} />
            </button>
            {langOpen && (
              <div
                className="absolute top-full mt-1 w-32 rounded-md shadow-lg z-50
                                 bg-white dark:bg-gray-800"
              >
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => changeLanguage("en")}
                >
                  English
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => changeLanguage("hi")}
                >
                  Hindi
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => changeLanguage("bn")}
                >
                  Bengali
                </button>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:opacity-80 transition-colors
                                bg-gray-200 text-blue-700 dark:bg-gray-800 dark:text-white"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>



      {/* Mobile Right Icons */}  

    <div className="flex items-center gap-3 md:hidden">

      {/* Dark Mode Icon (Mobile) */}
        <button
          onClick={toggleDarkMode}
         className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
          >
       {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

      {/* Hamburger */}
        <button
         onClick={() => setMenuOpen(!menuOpen)}
          className="p-2"
           >
      {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>

      
        {/* Mobile Menu */}
        {menuOpen && !hideNavItems && (
          <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm">

            {/* Side Drawer */}
            <div className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-lg p-6 overflow-y-auto transition-transform duration-300">

              {/* Close Button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">{t("Menu")}</h2>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              {/* Services */}
              <div className="mb-3">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex justify-between w-full font-semibold py-2"
                >
                  {t("services")}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${servicesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {servicesOpen && (
                  <div className="pl-3 space-y-2 mt-1">
                    {SERVICES.map((name) => (
                      <Link
                        key={name}
                        to={`/service/${encodeURIComponent(name)}`}
                        onClick={() => setMenuOpen(false)}
                        className="block text-sm hover:text-blue-600"
                      >
                        {name}
                      </Link>
                    ))}
                    <Link
                      to="/moreservices"
                      onClick={() => setMenuOpen(false)}
                      className="block font-semibold text-blue-600"
                    >
                      {t("see_more")}
                    </Link>
                  </div>
                )}
              </div>

              {/* Auth */}
              <div className="space-y-2 border-t pt-3">
                {isLoggedIn ? (
                  <>
                    <Link to="/book-history" onClick={() => setMenuOpen(false)}>
                      {t("my_book_history")}
                    </Link>
                    <Link to="/settings" onClick={() => setMenuOpen(false)}>
                      {t("settings")}
                    </Link>
                    <Link
                      to="/logout"
                      onClick={() => setMenuOpen(false)}
                      className="text-red-600"
                    >
                      {t("logout")}
                    </Link>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    {t("login")}
                  </Link>
                )}
              </div>

              {/* Language */}
              <div className="mt-6 border-t pt-4">
                <p className="font-semibold mb-2">{t("language")}</p>
                <div className="space-y-2">
                  <button onClick={() => changeLanguage("en")} className="block w-full text-left">
                    English
                  </button>
                  <button onClick={() => changeLanguage("hi")} className="block w-full text-left">
                    Hindi
                  </button>
                  <button onClick={() => changeLanguage("bn")} className="block w-full text-left">
                    Bengali
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
