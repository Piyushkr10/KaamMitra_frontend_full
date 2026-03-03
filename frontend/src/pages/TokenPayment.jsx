import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  createTokenPaymentOrder,
  verifyTokenPayment,
  getBookingById,
} from "../services/api";

const PLATFORM_CHARGE = 7;
const GST_PERCENT = 5;
const TOKEN_PERCENT = 30;

const TokenPaymentPage = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId } = location.state || {};

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) return;
      const data = await getBookingById(bookingId);
      setBooking(data);
    };

    fetchBooking();
  }, [bookingId]);

  if (!bookingId) return <div>Invalid Booking</div>;
  if (!booking) return <div>Loading Booking...</div>;

  /* ================= PRICE CALCULATION ================= */

  const basePrice = Number(booking.price || 0);

  const addonTotal =
    booking.addOns?.reduce((sum, item) => sum + Number(item.price), 0) || 0;

  const subTotal = basePrice;
  const platformCharge = PLATFORM_CHARGE;
  const gstAmount = ((subTotal + addonTotal + platformCharge) * GST_PERCENT) / 100;

  const finalTotal =
    subTotal + addonTotal + platformCharge + gstAmount;

  const tokenAmount = (finalTotal * TOKEN_PERCENT) / 100;

  /* ================= PAYMENT ================= */

  const handleTokenPayment = async () => {
    try {
      setLoading(true);

      const data = await createTokenPaymentOrder({
        bookingId,
        method: "Razorpay",
      });

      const { order, key } = data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: async function (response) {
          await verifyTokenPayment({
            ...response,
            bookingId,
          });

          navigate("/booking-details", {
            state: { bookingId },
          });
        },
        theme: { color: "#1E40AF" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert("Token Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className={`min-h-screen flex justify-center items-center p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <div className={`w-full max-w-2xl p-8 rounded-xl shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 mb-6"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          TOKEN PAYMENT SUMMARY
        </h2>

        {/* ================= BOOKING DETAILS ================= */}

        <div className="space-y-2 text-sm border-b pb-4">

          <p><strong>Service:</strong> {booking.service}</p>
          <p><strong>Service Type:</strong> {booking.serviceType}</p>
          <p><strong>Address:</strong> {booking.address}</p>
          <p><strong>City:</strong> {booking.city}</p>
          <p><strong>State:</strong> {booking.state}</p>
          <p><strong>Date:</strong> {booking.date?.split("T")[0]}</p>
          <p><strong>Time:</strong> {booking.time}</p>

        </div>

        {/* ================= PRICE BREAKDOWN ================= */}

        <div className="mt-4 space-y-2 text-sm">

          <div className="flex justify-between">
            <span>Base Price</span>
            <span>₹{subTotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Add-ons</span>
            <span>₹{addonTotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Platform Charge</span>
            <span>₹{platformCharge}</span>
          </div>

          <div className="flex justify-between">
            <span>GST (5%)</span>
            <span>₹{gstAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold border-t pt-2 text-lg">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-blue-600 text-lg">
            <span>Token (30%)</span>
            <span>₹{tokenAmount.toFixed(2)}</span>
          </div>

        </div>

        {/* ================= PAY BUTTON ================= */}

        <button
          onClick={handleTokenPayment}
          disabled={loading}
          className="w-full mt-6 bg-blue-800 text-white py-3 rounded font-semibold"
        >
          {loading
            ? "Processing..."
            : `PAY TOKEN ₹${tokenAmount.toFixed(2)}`}
        </button>

      </div>
    </div>
  );
};

export default TokenPaymentPage;