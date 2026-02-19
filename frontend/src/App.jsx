// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { I18nextProvider } from "react-i18next";
// import i18n from "./i18n";

// // Components
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Popup from "./components/Popup";

// // Pages
// import Home from "./pages/Home";
// import SignUp from "./pages/SignUp";
// import Login from "./pages/Login";
// import MoreServices from "./pages/MoreServices";
// import ServiceDetail from "./pages/ServiceDetail";
// import BookingPage from "./pages/BookingPage";
// import MyBookingHistory from "./pages/MyBookingHistory";
// import Settings from "./pages/Settings";
// import LogOut from "./pages/LogOut";
// import PaymentPage from "./components/PaymentPage";



// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [popupMessage, setPopupMessage] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [registeredUsers, setRegisteredUsers] = useState([]);
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("theme") === "dark" ||
//       (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
//   );
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Apply dark mode
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   const toggleDarkMode = () => setDarkMode((prev) => !prev);
//   const toggleMenu = () => setMenuOpen((prev) => !prev);

//   const triggerPopup = (message) => {
//     setPopupMessage(message);
//     setShowPopup(true);
//     setTimeout(() => setShowPopup(false), 3000);
//   };

//   const handleRegistrationComplete = (name, mobile) => {
//     setRegisteredUsers([...registeredUsers, { name, mobile }]);
//     setUserName(name);
//     setProfileImage("");
//     setIsLoggedIn(true);
//     triggerPopup("Registration successful! You are now logged in.");
//   };

//   const handleLoginComplete = (name) => {
//     setUserName(name);
//     setIsLoggedIn(true);
//     triggerPopup("Login successful!");
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserName("");
//     setProfileImage("");
//     triggerPopup("You have been logged out!");
//   };

//   const handleEmergencyClick = () => {
//     triggerPopup("🚨 Emergency service requested! We're on our way.");
//   };

//   // Protected route wrapper
//   const ProtectedRoute = ({ children }) => {
//     return isLoggedIn ? children : <Navigate to="/login" replace />;
//   };

//   return (
//     <I18nextProvider i18n={i18n}>
//       <div className="min-h-screen font-sans transition-colors duration-300">
//         <Router>
//           <Navbar
//             isLoggedIn={isLoggedIn}
//             userName={userName}
//             profileImage={profileImage}
//             darkMode={darkMode}
//             toggleDarkMode={toggleDarkMode}
//             menuOpen={menuOpen}
//             toggleMenu={toggleMenu}
//             handleLogout={handleLogout}
//           />

//           {showPopup && <Popup message={popupMessage} />}

//           <Routes>
//             {/* Public Routes */}
//             <Route
//               path="/"
//               element={
//                 <Home
//                   darkMode={darkMode}
//                   handleEmergencyClick={handleEmergencyClick}
//                   userName={userName}
//                   menuOpen={menuOpen}
//                   toggleMenu={toggleMenu}
//                   isLoggedIn={isLoggedIn}
//                 />
//               }
//             />
//             <Route path="/signup" element={<SignUp onRegistrationComplete={handleRegistrationComplete} />} />
//             <Route path="/login" element={<Login onLoginComplete={handleLoginComplete} registeredUsers={registeredUsers} />} />
//             <Route path="/logout" element={<LogOut onLogout={handleLogout} />} />

//             {/* Protected Routes */}
//             <Route
//               path="/moreservices"
//               element={
//                 <ProtectedRoute>
//                   <MoreServices />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/service/:serviceName"
//               element={
//                 <ProtectedRoute>
//                   <ServiceDetail />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/booking/:serviceName"
//               element={
//                 <ProtectedRoute>
//                   <BookingPage darkMode={darkMode} />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/book-history"
//               element={
//                 <ProtectedRoute>
//                   <MyBookingHistory />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/settings"
//               element={
//                 <ProtectedRoute>
//                   <Settings />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/payment"
//               element={
//                 <ProtectedRoute>
//                   <PaymentPage darkMode={darkMode} />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Catch-all route */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>

//           <Footer darkMode={darkMode} />
//         </Router>
//       </div>
//     </I18nextProvider>
//   );
// }



import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Popup from "./components/Popup";

// Pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MoreServices from "./pages/MoreServices";
import ServiceDetail from "./pages/ServiceDetail";
import BookingPage from "./pages/BookingPage";
import MyBookingHistory from "./pages/MyBookingHistory";
import Settings from "./pages/Settings";
import LogOut from "./pages/LogOut";
import PaymentPage from "./components/PaymentPage";
import BookingDetails from "./pages/BookingDetails";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
  const [menuOpen, setMenuOpen] = useState(false);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleRegistrationComplete = (name, mobile) => {
    setRegisteredUsers([...registeredUsers, { name, mobile }]);
    setUserName(name);
    setProfileImage("");
    setIsLoggedIn(true);
    triggerPopup("Registration successful! You are now logged in.");
  };

  const handleLoginComplete = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
    triggerPopup("Login successful!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setProfileImage("");
    triggerPopup("You have been logged out!");
  };

  const handleEmergencyClick = () => {
    triggerPopup("🚨 Emergency service requested! We're on our way.");
  };

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen font-sans transition-colors duration-300">
        <Router>
          <Navbar
            isLoggedIn={isLoggedIn}
            userName={userName}
            profileImage={profileImage}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            menuOpen={menuOpen}
            toggleMenu={toggleMenu}
            handleLogout={handleLogout}
          />

          {showPopup && <Popup message={popupMessage} />}

          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <Home
                  darkMode={darkMode}
                  handleEmergencyClick={handleEmergencyClick}
                  userName={userName}
                  menuOpen={menuOpen}
                  toggleMenu={toggleMenu}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route path="/signup" element={<SignUp onRegistrationComplete={handleRegistrationComplete} />} />
            <Route path="/login" element={<Login onLoginComplete={handleLoginComplete} registeredUsers={registeredUsers} />} />
            <Route path="/logout" element={<LogOut onLogout={handleLogout} />} />
            
            <Route
  path="/booking-details"
  element={<BookingDetails darkMode={darkMode} />}
/>

            {/* Protected Routes */}
            <Route
              path="/moreservices"
              element={
                <ProtectedRoute>
                  <MoreServices />
                </ProtectedRoute>
              }
            />

            {/*
              FIXED ROUTE:
              serviceName ❌
              serviceId   ✅
            */}
            <Route
              path="/service/:serviceId"
              element={
                <ProtectedRoute>
                  <ServiceDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/booking/:serviceId"
              element={
                <ProtectedRoute>
                  <BookingPage darkMode={darkMode} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/book-history"
              element={
                <ProtectedRoute>
                  <MyBookingHistory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage darkMode={darkMode} />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

         
        </Router>
      </div>
    </I18nextProvider>
  );
}
