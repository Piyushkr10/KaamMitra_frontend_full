import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  getServiceById,
  getProfile,
  getAllServices,
  bookService,
} from "../services/api";

import {
  useJsApiLoader,
  Autocomplete,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;
const GOOGLE_LIBRARIES = ["places"];

const BookingPage = ({ darkMode }) => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_KEY,
    libraries: GOOGLE_LIBRARIES,
  });

  const [serviceData, setServiceData] = useState(null);
  const [addOns, setAddOns] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const [formData, setFormData] = useState({
    service: "",
    serviceType: "",
    basePrice: 0,
    name: "",
    houseNo: "",
    address: "",
    landMark: "",
    city: "",
    state: "",
    latitude: null,
    longitude: null,
    date: "",
    time: "",
    remarks: "",
  });

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const service = await getServiceById(serviceId);
        const profileRes = await getProfile();
        const user = profileRes.user || profileRes;

        setServiceData(service);

        setFormData({
          service: service.category,
          serviceType: service.subService,
          basePrice: service.price,
          name: user.fullName || "",
          houseNo: user.address?.houseNo || "",
          address: user.address?.address || "",
          landMark: user.address?.landMark || "",
          city: user.city || "",
          state: user.state || "",
          latitude: user.location?.coordinates?.[1] || null,
          longitude: user.location?.coordinates?.[0] || null,
          date: "",
          time: "",
          remarks: "",
        });

        const all = await getAllServices();
        const sameCategory = all.filter(
          (s) =>
            s._id !== service._id &&
            s.category === service.category
        );

        setAddOns(sameCategory);
      } catch (err) {
        console.error("Booking load error:", err);
      }
    };

    loadData();
  }, [serviceId]);

  /* ================= HANDLE PLACE ================= */
  const handlePlaceChange = () => {
    const place = autocompleteRef.current?.getPlace();
    if (!place || !place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    let city = "";
    let state = "";

    place.address_components?.forEach((component) => {
      const types = component.types;
      if (types.includes("locality")) city = component.long_name;
      if (types.includes("administrative_area_level_1"))
        state = component.long_name;
    });

    setFormData((prev) => ({
      ...prev,
      address: place.formatted_address || "",
      city,
      state,
      latitude: lat,
      longitude: lng,
    }));
  };

  /* ================= PRICE ================= */
  const addOnTotal = selectedAddOns.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const finalPrice = Number(formData.basePrice) + addOnTotal;

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await bookService({
        ...formData,
        price: finalPrice,
        addOns: selectedAddOns.map((item) => ({
          serviceId: item._id,
          name: item.subService,
          price: item.price,
        })),
      });
      // ✅ ONLY FIX — bookingId properly pass kar raha hoon


navigate("/token-payment", {
  replace: false,
  state: {
    bookingId: response.booking._id,
  },
});

    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  if (!serviceData)
    return <div className="text-center mt-10">Loading...</div>;

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`w-full max-w-2xl p-8 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 mb-4"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          COMPLETE YOUR BOOKING
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            value={formData.name}
            onChange={(e)=>setFormData({...formData,name:e.target.value})}
            className="w-full border p-2 rounded text-black"
            placeholder="Your Name"
            required
          />

          <input
            value={formData.service}
            readOnly
            className="w-full border p-2 rounded bg-gray-200 text-black"
          />

          <input
            value={formData.serviceType}
            readOnly
            className="w-full border p-2 rounded bg-gray-200 text-black"
          />

          <input
            value={formData.basePrice}
            readOnly
            className="w-full border p-2 rounded bg-gray-200 text-black"
          />

          <input
            value={formData.houseNo}
            onChange={(e)=>setFormData({...formData,houseNo:e.target.value})}
            className="w-full border p-2 rounded text-black"
            placeholder="House No"
          />

          {isLoaded && (
            <Autocomplete
              onLoad={(ref) => (autocompleteRef.current = ref)}
              onPlaceChanged={handlePlaceChange}
            >
              <input
                value={formData.address}
                onChange={(e)=>setFormData({...formData,address:e.target.value})}
                className="w-full border p-2 rounded text-black"
                placeholder="Search Address"
                required
              />
            </Autocomplete>
          )}

          <input
            value={formData.landMark}
            onChange={(e)=>setFormData({...formData,landMark:e.target.value})}
            className="w-full border p-2 rounded text-black"
            placeholder="Landmark"
          />

          <input
            value={formData.city}
            onChange={(e)=>setFormData({...formData,city:e.target.value})}
            className="w-full border p-2 rounded text-black"
            placeholder="City"
            required
          />

          <input
            value={formData.state}
            onChange={(e)=>setFormData({...formData,state:e.target.value})}
            className="w-full border p-2 rounded text-black"
            placeholder="State"
            required
          />

          {isLoaded && formData.latitude && formData.longitude && (
            <div className="h-64 w-full mt-4 rounded overflow-hidden">
              <GoogleMap
                center={{
                  lat: formData.latitude,
                  lng: formData.longitude,
                }}
                zoom={15}
                mapContainerStyle={{ width: "100%", height: "100%" }}
              >
                <Marker
                  position={{
                    lat: formData.latitude,
                    lng: formData.longitude,
                  }}
                />
              </GoogleMap>
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="date"
              min={today}
              value={formData.date}
              onChange={(e)=>setFormData({...formData,date:e.target.value})}
              className="w-1/2 border p-2 rounded text-black"
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e)=>setFormData({...formData,time:e.target.value})}
              className="w-1/2 border p-2 rounded text-black"
              required
            />
          </div>

          <textarea
            value={formData.remarks}
            onChange={(e)=>setFormData({...formData,remarks:e.target.value})}
            className="w-full border p-2 rounded text-black"
            placeholder="Remarks"
            required
          />

          {addOns.length > 0 && (
            <div>
              <p className="font-semibold mb-3">Add Extra Services</p>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {addOns.map((item) => {
                  const selected = selectedAddOns.find(
                    (s) => s._id === item._id
                  );

                  return (
                    <div
                      key={item._id}
                      onClick={() => {
                        if (selected) {
                          setSelectedAddOns(
                            selectedAddOns.filter((s) => s._id !== item._id)
                          );
                        } else {
                          setSelectedAddOns([...selectedAddOns, item]);
                        }
                      }}
                      className={`min-w-[160px] cursor-pointer rounded-lg shadow-md border ${
                        selected ? "border-blue-600" : "border-gray-300"
                      } ${darkMode ? "bg-gray-700" : "bg-white"}`}
                    >
                      <img
                        src={item.imageUrl}
                        className="w-full h-24 object-cover rounded-t-lg"
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium">
                          {item.subService}
                        </p>
                        <p className="text-sm font-semibold mt-1">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="font-bold text-lg text-right">
            Total: ₹{finalPrice}
          </div>

          <button className="w-full bg-blue-800 text-white py-3 rounded">
            SUBMIT
          </button>

        </form>
      </div>
    </div>
  );
};

export default BookingPage;