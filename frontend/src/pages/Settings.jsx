import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  User,
  Bell,
  CreditCard,
  Lock,
  Settings as SettingsIcon,
  X,
} from "lucide-react";
import CustomerSupport from "./CustomerSupport";
import {
  getProfile,
  updateProfile,
  requestDeactivateOtp,
  verifyDeactivationOtp,
  requestDeleteOtp,
  verifyDeleteOtp,
} from "../services/api"; // Updated API imports

// Switch component
const Switch = ({ checked, onCheckedChange }) => (
  <button
    onClick={onCheckedChange}
    role="switch"
    aria-checked={checked}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
      checked ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

// Card components
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-6 rounded-2xl shadow-lg transition-colors duration-300 ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`space-y-4 ${className}`}>{children}</div>
);

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const Settings = () => {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });
  const [editData, setEditData] = useState(userData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    app: true,
    serviceUpdates: true,
    offers: false,
  });
  const [payment, setPayment] = useState({ saveBilling: false, autoPay: false });

  // Deactivation/Delete Modals & OTP
  const [isDeactivationOpen, setIsDeactivationOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpMode, setOtpMode] = useState(""); // "deactivate" or "delete"

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUserData({
          name: res.user.fullName,
          phone: res.user.phoneNumber,
          address: res.user.address || "",
          city: res.user.city || "",
          state: res.user.state || "",
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const toggleNotification = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  const togglePayment = (key) =>
    setPayment((prev) => ({ ...prev, [key]: !prev[key] }));

  const openEditModal = () => {
    setEditData(userData);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const updated = await updateProfile({
        address: editData.address,
        city: editData.city,
        state: editData.state,
      });
      setUserData({
        name: updated.user.fullName,
        phone: updated.user.phoneNumber,
        address: updated.user.address || "",
        city: updated.user.city || "",
        state: updated.user.state || "",
      });
      setIsModalOpen(false);
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    }
  };

  const handleLinkClick = (message) => {
    alert(message);
  };

  // ===============================
  // Deactivation / Delete Functions
  // ===============================
  const handleRequestOtp = async (mode) => {
    if (!termsAccepted) return alert("Please accept the terms and conditions first");
    try {
      setOtpMode(mode);
      if (mode === "deactivate") {
        await requestDeactivateOtp();
      } else if (mode === "delete") {
        await requestDeleteOtp();
      }
      setIsOtpSent(true);
    } catch (err) {
      alert("Failed to send OTP: " + err.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (otpMode === "deactivate") {
        await verifyDeactivationOtp(otp);
        alert("Account deactivated successfully");
        setIsDeactivationOpen(false);
      } else if (otpMode === "delete") {
        await verifyDeleteOtp(otp);
        alert("Account deleted successfully");
        window.location.href = "/"; // redirect to home/new signup
      }
      setOtp("");
      setTermsAccepted(false);
      setIsOtpSent(false);
    } catch (err) {
      alert("OTP verification failed: " + err.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-12 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-8 md:mb-12">
        Account Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Profile */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <User size={20} className="text-blue-500" />
              <h2 className="font-bold text-lg uppercase tracking-wide">Profile</h2>
            </div>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <p className="font-medium text-gray-800 dark:text-gray-100">{userData.name}</p>
              <p>{userData.phone}</p>
              <p>{userData.address}</p>
              <p>{userData.city}</p>
              <p>{userData.state}</p>
            </div>
            <button
              onClick={openEditModal}
              className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg mt-4 font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            >
              Update Details
            </button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Bell size={20} className="text-blue-500" />
              <h2 className="font-bold text-lg uppercase tracking-wide">Notifications</h2>
            </div>
            <div className="space-y-3">
              {Object.entries(notifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                >
                  <span className="text-sm">
                    {key === "serviceUpdates"
                      ? "Service Updates"
                      : key === "offers"
                      ? "Promotional Offers & Discounts"
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <Switch checked={value} onCheckedChange={() => toggleNotification(key)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={20} className="text-blue-500" />
              <h2 className="font-bold text-lg uppercase tracking-wide">Payment</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center text-gray-700 dark:text-gray-200">
                <span>Save billing address</span>
                <Switch
                  checked={payment.saveBilling}
                  onCheckedChange={() => togglePayment("saveBilling")}
                />
              </div>
              <div className="flex justify-between items-center text-gray-700 dark:text-gray-200">
                <span>Auto-pay</span>
                <Switch checked={payment.autoPay} onCheckedChange={() => togglePayment("autoPay")} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account & Security */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Lock size={20} className="text-blue-500" />
              <h2 className="font-bold text-lg uppercase tracking-wide">Account & Security</h2>
            </div>
            <ul className="mt-2 space-y-3 text-sm">
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200 cursor-pointer"
                onClick={() => setIsDeactivationOpen(true)}
              >
                <span>Deactivate Account</span>
                <ChevronRight size={16} />
              </li>
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200 cursor-pointer"
                onClick={() => setIsDeleteOpen(true)}
              >
                <span>Delete Account</span>
                <ChevronRight size={16} />
              </li>
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200 cursor-pointer"
                onClick={() => handleLinkClick("Managing sessions...")}
              >
                <span>Manage Active Sessions</span>
                <ChevronRight size={16} />
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <SettingsIcon size={20} className="text-blue-500" />
              <h2 className="font-bold text-lg uppercase tracking-wide">Privacy</h2>
            </div>
            <ul className="mt-2 space-y-3 text-sm">
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200 cursor-pointer"
                onClick={() => handleLinkClick("Controlling provider info...")}
              >
                <span>Control what providers see</span>
                <ChevronRight size={16} />
              </li>
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200 cursor-pointer"
                onClick={() => handleLinkClick("Managing blocked providers...")}
              >
                <span>Blocked providers</span>
                <ChevronRight size={16} />
              </li>
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200 cursor-pointer"
                onClick={() => handleLinkClick("Setting login alerts...")}
              >
                <span>Login alerts & device management</span>
                <ChevronRight size={16} />
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Bell size={20} className="text-blue-500" />
              <h2 className="font-bold text-lg uppercase tracking-wide">Support</h2>
            </div>
            <ul className="mt-2 space-y-3 text-sm">
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200 cursor-pointer"
                onClick={() => setIsFaqOpen(true)}
              >
                <span>FAQ & Help Centre</span>
                <ChevronRight size={16} />
              </li>
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200 cursor-pointer"
                onClick={() => setIsSupportOpen(true)}
              >
                <span>Contact Support</span>
                <ChevronRight size={16} />
              </li>
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200 cursor-pointer"
                onClick={() => handleLinkClick("Reporting a problem...")}
              >
                <span>Report a Problem</span>
                <ChevronRight size={16} />
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* ========================= */}
      {/* Modals */}
      {/* ========================= */}

      {/* Edit Profile Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold text-blue-600 mb-4">Update Your Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={editData.name}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={editData.phone}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={editData.address}
              onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="City"
              value={editData.city}
              onChange={(e) => setEditData({ ...editData, city: e.target.value })}
              className="w-1/2 border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-300"
            />
            <input
              type="text"
              placeholder="State"
              value={editData.state}
              onChange={(e) => setEditData({ ...editData, state: e.target.value })}
              className="w-1/2 border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Save
          </button>
        </div>
      </Modal>

      {/* Deactivate / Delete OTP Modal */}
      <Modal
        isOpen={isDeactivationOpen || isDeleteOpen}
        onClose={() => {
          setIsDeactivationOpen(false);
          setIsDeleteOpen(false);
          setOtp("");
          setTermsAccepted(false);
          setIsOtpSent(false);
        }}
      >
        {!isOtpSent ? (
          <>
            <h2 className="text-xl font-bold text-red-600 mb-4">
              {isDeactivationOpen ? "Deactivate Account" : "Delete Account"}
            </h2>
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-200">
              <p>
                Please read and accept the terms and conditions to{" "}
                {isDeactivationOpen ? "deactivate" : "delete"} your account.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span>I accept the terms and conditions</span>
              </div>
              <button
                disabled={!termsAccepted}
                onClick={() => handleRequestOtp(isDeactivationOpen ? "deactivate" : "delete")}
                className={`w-full py-2 rounded-lg font-medium ${
                  termsAccepted
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Send OTP
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-red-600 mb-4">Enter OTP</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-300"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Verify OTP
              </button>
            </div>
          </>
        )}
      </Modal>

      {/* Customer Support / FAQ Modals */}
      {isSupportOpen && <CustomerSupport onClose={() => setIsSupportOpen(false)} />}
      {isFaqOpen && (
        <Modal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)}>
          <h2 className="text-xl font-bold text-blue-600 mb-4">FAQ & Help Centre</h2>
          <p className="text-sm text-gray-700 dark:text-gray-200">
            Frequently asked questions will appear here...
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Settings;
