
const API_BASE = "http://localhost:5000/api/v1";

/* =====================================================
   HELPER FUNCTIONS
====================================================== */

const getAccessToken = () => localStorage.getItem("accessToken");

const buildHeaders = (auth = false) => {
  const headers = { "Content-Type": "application/json" };
  const token = getAccessToken();

  if (auth && token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

/* ======================================================
   REQUEST WRAPPER (FIXED)
====================================================== */

const request = async (url, options = {}, auth = false) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...buildHeaders(auth),
      ...(options.headers || {})
    },
    credentials: "include",
  });

  let data = {};
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }

  return data;
};


/* ======================================================
   REFRESH TOKEN
====================================================== */

const tryRefreshToken = async () => {
  const res = await fetch(`${API_BASE}/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) return null;

  const data = await res.json();
  if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);

  return data.accessToken;
};

/* ======================================================
   AUTH API
====================================================== */

export const requestOtp = async ({ fullName, phoneNumber }) =>
  request(
    `${API_BASE}/auth/request-otp`,
    {
      method: "POST",
      body: JSON.stringify({ fullName, phoneNumber }),
    },
    false
  );

export const verifyOtp = async ({ phoneNumber, otp }) => {
  const data = await request(
    `${API_BASE}/auth/verify-otp`,
    {
      method: "POST",
      body: JSON.stringify({ phoneNumber, otp }),
    },
    false
  );

  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }

  return data;
};

export const getProfile = async () => {
  let token = getAccessToken();

  let res = await fetch(`${API_BASE}/auth/profile`, {
    method: "GET",
    headers: buildHeaders(true),
    credentials: "include",
  });

  if (res.status === 401) {
    token = await tryRefreshToken();
    if (!token) throw new Error("Session expired. Please login.");

    res = await fetch(`${API_BASE}/auth/profile`, {
      method: "GET",
      headers: buildHeaders(true),
      credentials: "include",
    });
  }

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

export const logout = async () => {
  await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  localStorage.removeItem("accessToken");
};

export const signup = async (data) =>
  request(
    `${API_BASE}/auth/signup`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    true
  );

export const updateProfile = async (data) =>
  request(
    `${API_BASE}/auth/profile`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    true
  );

/* ======================================================
   SERVICES API  (AUTH REQUIRED NOW)
====================================================== */

export const getServices = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const url = `${API_BASE}/services${params ? `?${params}` : ""}`;
  return request(url, { method: "GET" }, true);
};

export const getAllServices = async () => {
  return request(`${API_BASE}/services`, { method: "GET" }, true);
};

export const getServiceById = async (serviceId) => {
  if (!serviceId) throw new Error("Service ID missing");
  return request(`${API_BASE}/services/${serviceId}`, { method: "GET" }, true);
};

/* ======================================================
   BOOKING API (AUTH REQUIRED)
====================================================== */

export const bookService = async (bookingData) =>
  request(
    `${API_BASE}/booking`,
    {
      method: "POST",
      body: JSON.stringify(bookingData),
    },
    true
  );

export const getUserBookings = async () =>
  request(
    `${API_BASE}/booking`,
    {
      method: "GET",
    },
    true
  );

export const cancelBooking = async (bookingId) =>
  request(
    `${API_BASE}/booking/cancel/${bookingId}`,
    {
      method: "PUT",
    },
    true
  );



/* ======================================================
   TOKEN PAYMENT API
====================================================== */

export const createTokenPaymentOrder = async ({ bookingId, method }) =>
  request(
    `${API_BASE}/payment/token`,
    {
      method: "POST",
      body: JSON.stringify({ bookingId, method }),
    },
    true
  );

export const verifyTokenPayment = async (data) =>
  request(
    `${API_BASE}/payment/verify`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    true
  );

/* ✅ GET BOOKING BY ID (Required for Token Page) */

export const getBookingById = async (bookingId) =>
  request(
    `${API_BASE}/booking/${bookingId}`,
    {
      method: "GET",
    },
    true
  );


/* ======================================================
   PAYMENT API
====================================================== */

export const createTokenPayment = async ({ bookingId, method }) =>
  request(
    `${API_BASE}/payment/token`,
    {
      method: "POST",
      body: JSON.stringify({ bookingId, method }),
    },
    true
  );

/* ======================================================
   ACCOUNT DEACTIVATION
====================================================== */

export const requestDeactivateOtp = async () =>
  request(
    `${API_BASE}/auth/deactivate/request-otp`,
    {
      method: "POST",
    },
    true
  );

export const verifyDeactivationOtp = async (otp) => {
  const data = await request(
    `${API_BASE}/auth/deactivate/verify-otp`,
    {
      method: "POST",
      body: JSON.stringify({ otp }),
    },
    true
  );

  localStorage.removeItem("accessToken");
  return data;
};

/* ======================================================
   ACCOUNT DELETION
====================================================== */

export const requestDeleteOtp = async () =>
  request(
    `${API_BASE}/auth/delete/request-otp`,
    {
      method: "POST",
    },
    true
  );

export const verifyDeleteOtp = async (otp) => {
  const data = await request(
    `${API_BASE}/auth/delete/verify-otp`,
    {
      method: "POST",
      body: JSON.stringify({ otp }),
    },
    true
  );

  localStorage.removeItem("accessToken");
  return data;
};



/* ======================================================
   BOOKING DETAILS PAGE
====================================================== */

export const getBookingDetails = async(bookingId)=>{
  if(!bookingId) throw new Error ("Booking Id missing");

  return request(
    `${API_BASE}/booking/${bookingId}/details`,
    {
      method:"GET"
    },
    true
  );
}

/* ======================================================
   FEEDBACK API
====================================================== */

export const submitFeedback = async (bookingId, feedbackData) => {
  if (!bookingId) throw new Error("Booking ID missing");

  return request(
    `${API_BASE}/feedback/${bookingId}`,
    {
      method: "POST",
      body: JSON.stringify(feedbackData),
    },
    true
  );
};