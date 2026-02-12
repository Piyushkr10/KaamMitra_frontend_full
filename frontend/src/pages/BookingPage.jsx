import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { getServiceById, bookService as bookServiceAPI } from "../services/api";

const BookingPage = ({ darkMode }) => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const currentDate = `${yyyy}-${mm}-${dd}`;

  const [serviceData, setServiceData] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    serviceType: "",
    price: "",
    name: "",
    address: "",
    city: "",
    state: "",
    date: "",
    time: "",
    remarks: "",
  });

  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  // Fetch service details
  useEffect(() => {
    async function loadService() {
      try {
        const data = await getServiceById(serviceId);
        setServiceData(data);
        setFormData((prev) => ({
          ...prev,
          service: data.category,
          serviceType: data.subService || "",
          price: data.price || "",
        }));
      } catch (error) {
        console.error("Error loading service:", error);
      }
    }
    loadService();
  }, [serviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    setFormData((prev) => ({ ...prev, date: e.target.value, time: "" }));
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const selectedDateTime = new Date(`${formData.date}T${selectedTime}`);
    const now = new Date();

    if (formData.date === currentDate && selectedDateTime < now) {
      setPopup({ show: true, type: "error", message: "🚫 Please select a future time." });
      setFormData((prev) => ({ ...prev, time: "" }));
      setTimeout(() => setPopup({ show: false }), 3000);
    } else {
      setFormData((prev) => ({ ...prev, time: selectedTime }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { service, serviceType, price, name, address, city, state, date, time, remarks } = formData;

    if (!service || !serviceType || !price || !name || !address || !city || !state || !date || !time || !remarks) {
      setPopup({ show: true, type: "error", message: "⚠️ Please fill in all fields." });
      setTimeout(() => setPopup({ show: false }), 3000);
      return;
    }

    try {
      const response = await bookServiceAPI({ service, serviceType, price, name, address, city, state, date, time, remarks });
      setPopup({ show: true, type: "success", message: "✅ Booking done! Redirecting..." });

      const booking = response.booking; // Full booking object from backend

      setTimeout(() => {
        setPopup({ show: false });
        navigate("/payment", { state: { booking } }); // send full booking to PaymentPage
      }, 1500);
    } catch (err) {
      console.error("Booking error:", err.message);
      setPopup({ show: true, type: "error", message: "Booking failed. Try again." });
      setTimeout(() => setPopup({ show: false }), 3000);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <div className={`w-full max-w-2xl p-8 rounded-lg shadow-lg relative ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft size={20} /> Back
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">COMPLETE YOUR BOOKING</h2>

        {popup.show && (
          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md shadow-lg flex items-center gap-2 ${popup.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {popup.type === "error" ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
            <span>{popup.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* USER NAME */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-md p-2 bg-gray-200" placeholder="Enter your name" required />
          </div>

          {/* SERVICE NAME */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">Service (Auto-filled)</label>
            <input type="text" value={formData.service} readOnly className="w-full border rounded-md p-2 bg-gray-200" />
          </div>

          {/* SERVICE TYPE */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">Service Type *</label>
            <input type="text" name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full border rounded-md p-2 bg-gray-200" placeholder="Cooking / Cleaning / Etc" required />
          </div>

          {/* PRICE */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">Price (Auto-filled)</label>
            <input type="number" name="price" value={formData.price} readOnly className="w-full border rounded-md p-2 bg-gray-200" />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">Address *</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border rounded-md p-2 bg-gray-200" required />
          </div>

          {/* CITY */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">City *</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border rounded-md p-2 bg-gray-200" required />
          </div>

          {/* STATE */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">State *</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border rounded-md p-2 bg-gray-200" required />
          </div>

          {/* DATE + TIME */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">Date & Time *</label>
            <div className="flex gap-2">
              <input type="date" name="date" value={formData.date} onChange={handleDateChange} min={currentDate} className="w-1/2 border rounded-md p-2 bg-gray-200" required />
              <input type="time" name="time" value={formData.time} onChange={handleTimeChange} className="w-1/2 border rounded-md p-2 bg-gray-200" required />
            </div>
          </div>

          {/* REMARKS */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">Remarks *</label>
            <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="w-full border rounded-md p-2 bg-gray-200" rows="3" required />
          </div>

          <button type="submit" className="w-full bg-blue-800 text-white py-3 rounded-md font-semibold hover:bg-blue-900">
            SUBMIT & PAY
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
