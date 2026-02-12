// const API_BASE = "http://localhost:5000/api/v1";

// /* ======================================================
//    HELPER FUNCTIONS
// ====================================================== */

// // Get token
// const getAccessToken = () => localStorage.getItem("accessToken");

// // Build headers
// const buildHeaders = (includeAuth = false) => {
//   const headers = { "Content-Type": "application/json" };
//   const token = getAccessToken();

//   if (includeAuth && token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   return headers;
// };

// // Handle Request
// const request = async (url, options = {}) => {
//   const res = await fetch(url, { ...options, credentials: "include" });
//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) throw new Error(data.error || "Request failed");
//   return data;
// };

// // Refresh Token Logic
// const tryRefreshToken = async () => {
//   const res = await fetch(`${API_BASE}/auth/refresh-token`, {
//     method: "POST",
//     credentials: "include",
//   });

//   if (!res.ok) return null;

//   const data = await res.json();
//   if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);
//   return data.accessToken;
// };

// /* ======================================================
//    AUTH MODULE
// ====================================================== */

// // Request OTP
// export const requestOtp = async ({ fullName, phoneNumber }) =>
//   request(`${API_BASE}/auth/request-otp`, {
//     method: "POST",
//     headers: buildHeaders(),
//     body: JSON.stringify({ fullName, phoneNumber }),
//   });

// // Verify OTP
// export const verifyOtp = async ({ phoneNumber, otp }) => {
//   const data = await request(`${API_BASE}/auth/verify-otp`, {
//     method: "POST",
//     headers: buildHeaders(),
//     body: JSON.stringify({ phoneNumber, otp }),
//   });

//   if (data.accessToken) {
//     localStorage.setItem("accessToken", data.accessToken);
//   }

//   return data;
// };

// // Logout
// export const logout = async () => {
//   await fetch(`${API_BASE}/auth/logout`, {
//     method: "POST",
//     credentials: "include",
//   });
//   localStorage.removeItem("accessToken");
//   return true;
// };

// // Get Profile (auto token refresh)
// export const getProfile = async () => {
//   let token = getAccessToken();

//   let res = await fetch(`${API_BASE}/auth/profile`, {
//     method: "GET",
//     headers: buildHeaders(true),
//     credentials: "include",
//   });

//   // Unauthorized → try refresh
//   if (res.status === 401) {
//     token = await tryRefreshToken();
//     if (!token) throw new Error("Session expired. Please log in again.");

//     res = await fetch(`${API_BASE}/auth/profile`, {
//       method: "GET",
//       headers: buildHeaders(true),
//       credentials: "include",
//     });
//   }

//   if (!res.ok) throw new Error("Failed to fetch profile");

//   return res.json();
// };

// // Complete Signup
// export const signup = async ({ userId, address, city, state }) =>
//   request(`${API_BASE}/auth/signup`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ userId, address, city, state }),
//   });

// // Update Profile
// export const updateProfile = async ({ address, city, state }) =>
//   request(`${API_BASE}/auth/profile`, {
//     method: "PUT",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ address, city, state }),
//   });

// /* ======================================================
//    SERVICES MODULE
// ====================================================== */

// export const getServices = async (filters = {}) => {
//   const params = new URLSearchParams(filters).toString();
//   const url = `${API_BASE}/services${params ? `?${params}` : ""}`;

//   return request(url, { method: "GET" }).then((data) => data.services || data);
// };

// /* ======================================================
//    BOOKING MODULE
// ====================================================== */

// // Book a service
// export const bookService = async (bookingData) => {
//   const data = await request(`${API_BASE}/booking`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify(bookingData),
//   });

//   if (data.bookingId) {
//     localStorage.setItem("bookingId", data.bookingId);
//   }

//   return data;
// };

// // Get user bookings
// export const getUserBookings = async () =>
//   request(`${API_BASE}/booking`, {
//     method: "GET",
//     headers: buildHeaders(true),
//   });

// // Cancel booking
// export const cancelBooking = async (bookingId) =>
//   request(`${API_BASE}/booking/${bookingId}/cancel`, {
//     method: "PUT",
//     headers: buildHeaders(true),
//   });

// /* ======================================================
//    PAYMENT MODULE
// ====================================================== */

// export const createTokenPayment = async ({ bookingId, method }) =>
//   request(`${API_BASE}/payment/token`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ bookingId, method }),
//   });

// /* ======================================================
//    DEACTIVATION MODULE
// ====================================================== */

// // Request deactivation OTP
// export const requestDeactivateOtp = async () =>
//   request(`${API_BASE}/auth/deactivate/request-otp`, {
//     method: "POST",
//     headers: buildHeaders(true),
//   });

// // Verify deactivate OTP
// export const verifyDeactivationOtp = async (otp) => {
//   const data = await request(`${API_BASE}/auth/deactivate/verify-otp`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ otp }),
//   });

//   localStorage.removeItem("accessToken");
//   return data;
// };

// /* ======================================================
//    DELETE ACCOUNT MODULE
// ====================================================== */

// // Request OTP
// export const requestDeleteOtp = async () =>
//   request(`${API_BASE}/auth/delete/request-otp`, {
//     method: "POST",
//     headers: buildHeaders(true),
//   });

// // Verify OTP & delete account
// export const verifyDeleteOtp = async (otp) => {
//   const data = await request(`${API_BASE}/auth/delete/verify-otp`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ otp }),
//   });

//   localStorage.removeItem("accessToken");
//   return data;
// };


// // /* ======================================================
// //    GET SINGLE SERVICE
// // ====================================================== */
// // export const getServiceById = async (id) => {
// //   if (!id) throw new Error("Service ID missing");

// //   const data = await request(`${API_BASE}/services/${id}`, {
// //     method: "GET",
// //   });

// //   return data.service || data;
// // };


// // /* --------------------------------------------------
// //    GET ALL SERVICES
// // --------------------------------------------------*/
// // export const getAllServices = async () => {
// //   const res = await fetch(`${API_BASE}/services`);
// //   if (!res.ok) throw new Error("Failed to fetch all services");
  
// //   const data = await res.json();
// //   return data.services;
// // };

// // /* --------------------------------------------------
// //    GET SERVICE BY ID
// // --------------------------------------------------*/
// // export const getServiceById = async (id) => {
// //   if (!id) throw new Error("Service ID missing");

// //   const res = await fetch(`${API_BASE}/services/${id}`);

// //   if (!res.ok) throw new Error("Failed to fetch service");

// //   const data = await res.json();
// //   return data.service;
// // };


// /* ============================
//    SERVICES
// ============================= */

// export const getAllServices = async () => {
//   return request(`${API_BASE}/services`, { method: "GET" })
//     .then((data) => data.services);
// };

// export const getServiceById = async (serviceId) => {
//   if (!serviceId) throw new Error("Service ID missing");

//   return request(`${API_BASE}/services/${serviceId}`, { method: "GET" })
//     .then((data) => data.service);
// };



// const API_BASE = "http://localhost:5000/api/v1";

// /* ======================================================
//    HELPER FUNCTIONS
// ====================================================== */

// const getAccessToken = () => localStorage.getItem("accessToken");

// const buildHeaders = (includeAuth = false) => {
//   const headers = { "Content-Type": "application/json" };
//   const token = getAccessToken();

//   if (includeAuth && token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   return headers;
// };

// // FIXED REQUEST WRAPPER — HEADERS NOW WORK
// const request = async (url, options = {}) => {
//   const res = await fetch(url, {
//     ...options,
//     headers: options.headers || {},   // <-- FIXED
//     credentials: "include",
//   });

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     throw new Error(data.error || data.message || "Request failed");
//   }

//   return data;
// };

// const tryRefreshToken = async () => {
//   const res = await fetch(`${API_BASE}/auth/refresh-token`, {
//     method: "POST",
//     credentials: "include",
//   });

//   if (!res.ok) return null;

//   const data = await res.json();
//   if (data.accessToken) {
//     localStorage.setItem("accessToken", data.accessToken);
//   }
//   return data.accessToken;
// };

// /* ======================================================
//    AUTH MODULE
// ====================================================== */

// export const requestOtp = async ({ fullName, phoneNumber }) =>
//   request(`${API_BASE}/auth/request-otp`, {
//     method: "POST",
//     headers: buildHeaders(),
//     body: JSON.stringify({ fullName, phoneNumber }),
//   });

// export const verifyOtp = async ({ phoneNumber, otp }) => {
//   const data = await request(`${API_BASE}/auth/verify-otp`, {
//     method: "POST",
//     headers: buildHeaders(),
//     body: JSON.stringify({ phoneNumber, otp }),
//   });

//   if (data.accessToken) {
//     localStorage.setItem("accessToken", data.accessToken);
//   }

//   return data;
// };

// export const logout = async () => {
//   await fetch(`${API_BASE}/auth/logout`, {
//     method: "POST",
//     credentials: "include",
//   });

//   localStorage.removeItem("accessToken");
//   return true;
// };

// export const getProfile = async () => {
//   let token = getAccessToken();

//   let res = await fetch(`${API_BASE}/auth/profile`, {
//     method: "GET",
//     headers: buildHeaders(true),
//     credentials: "include",
//   });

//   if (res.status === 401) {
//     token = await tryRefreshToken();
//     if (!token) throw new Error("Session expired. Please log in again.");

//     res = await fetch(`${API_BASE}/auth/profile`, {
//       method: "GET",
//       headers: buildHeaders(true),
//       credentials: "include",
//     });
//   }

//   if (!res.ok) throw new Error("Failed to fetch profile");
//   return res.json();
// };

// export const signup = async ({ userId, address, city, state }) =>
//   request(`${API_BASE}/auth/signup`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ userId, address, city, state }),
//   });

// export const updateProfile = async ({ address, city, state }) =>
//   request(`${API_BASE}/auth/profile`, {
//     method: "PUT",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ address, city, state }),
//   });

// /* ======================================================
//    SERVICES MODULE
// ====================================================== */

// export const getServices = async (filters = {}) => {
//   const params = new URLSearchParams(filters).toString();
//   const url = `${API_BASE}/services${params ? `?${params}` : ""}`;

//   return request(url, { method: "GET" }).then((data) => data.services || data);
// };

// export const getAllServices = async () => {
//   return request(`${API_BASE}/services`, { method: "GET" })
//     .then((data) => data.services);
// };

// export const getServiceById = async (serviceId) => {
//   if (!serviceId) throw new Error("Service ID missing");

//   return request(`${API_BASE}/services/${serviceId}`, {
//     method: "GET",
//   }).then((data) => data.service);
// };

// /* ======================================================
//    BOOKING MODULE
// ====================================================== */

// export const bookService = async (bookingData) => {
//   const data = await request(`${API_BASE}/booking`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify(bookingData),
//   });

//   if (data.bookingId) {
//     localStorage.setItem("bookingId", data.bookingId);
//   }

//   return data;
// };

// export const getUserBookings = async () =>
//   request(`${API_BASE}/booking`, {
//     method: "GET",
//     headers: buildHeaders(true),
//   });

// export const cancelBooking = async (bookingId) =>
//   request(`${API_BASE}/booking/${bookingId}/cancel`, {
//     method: "PUT",
//     headers: buildHeaders(true),
//   });

// /* ======================================================
//    PAYMENT MODULE
// ====================================================== */

// export const createTokenPayment = async ({ bookingId, method }) =>
//   request(`${API_BASE}/payment/token`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ bookingId, method }),
//   });

// /* ======================================================
//    DEACTIVATION MODULE
// ====================================================== */

// export const requestDeactivateOtp = async () =>
//   request(`${API_BASE}/auth/deactivate/request-otp`, {
//     method: "POST",
//     headers: buildHeaders(true),
//   });

// export const verifyDeactivationOtp = async (otp) => {
//   const data = await request(`${API_BASE}/auth/deactivate/verify-otp`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ otp }),
//   });

//   localStorage.removeItem("accessToken");
//   return data;
// };

// /* ======================================================
//    DELETE ACCOUNT MODULE
// ====================================================== */

// export const requestDeleteOtp = async () =>
//   request(`${API_BASE}/auth/delete/request-otp`, {
//     method: "POST",
//     headers: buildHeaders(true),
//   });

// export const verifyDeleteOtp = async (otp) => {
//   const data = await request(`${API_BASE}/auth/delete/verify-otp`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ otp }),
//   });

//   localStorage.removeItem("accessToken");
//   return data;
// };






// const API_BASE = "http://localhost:5000/api/v1";

// /* ======================================================
//    HELPER FUNCTIONS
// ====================================================== */

// const getAccessToken = () => localStorage.getItem("accessToken");

// const buildHeaders = (auth = false) => {
//   const headers = { "Content-Type": "application/json" };
//   const token = getAccessToken();

//   if (auth && token) headers.Authorization = `Bearer ${token}`;
//   return headers;
// };

// /* ======================================================
//    REQUEST WRAPPER (FIXED)
// ====================================================== */

// const request = async (url, options = {}) => {
//   const res = await fetch(url, {
//     ...options,
//     headers: options.headers || {},
//     credentials: "include",
//   });

//   let data = {};
//   try {
//     data = await res.json();
//   } catch (err) {}

//   if (!res.ok) {
//     throw new Error(data.error || data.message || "Request failed");
//   }

//   return data;
// };

// /* ======================================================
//    REFRESH TOKEN
// ====================================================== */

// const tryRefreshToken = async () => {
//   const res = await fetch(`${API_BASE}/auth/refresh-token`, {
//     method: "POST",
//     credentials: "include",
//   });

//   if (!res.ok) return null;

//   const data = await res.json();
//   if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);

//   return data.accessToken;
// };

// /* ======================================================
//    AUTH API
// ====================================================== */

// export const requestOtp = async ({ fullName, phoneNumber }) =>
//   request(`${API_BASE}/auth/request-otp`, {
//     method: "POST",
//     headers: buildHeaders(false),
//     body: JSON.stringify({ fullName, phoneNumber }),
//   });

// export const verifyOtp = async ({ phoneNumber, otp }) => {
//   const data = await request(`${API_BASE}/auth/verify-otp`, {
//     method: "POST",
//     headers: buildHeaders(false),
//     body: JSON.stringify({ phoneNumber, otp }),
//   });

//   if (data.accessToken) {
//     localStorage.setItem("accessToken", data.accessToken);
//   }

//   return data;
// };

// export const getProfile = async () => {
//   let token = getAccessToken();

//   let res = await fetch(`${API_BASE}/auth/profile`, {
//     method: "GET",
//     headers: buildHeaders(true),
//     credentials: "include",
//   });

//   // Token expired? Retry once
//   if (res.status === 401) {
//     token = await tryRefreshToken();

//     if (!token) throw new Error("Session expired. Please login.");

//     res = await fetch(`${API_BASE}/auth/profile`, {
//       method: "GET",
//       headers: buildHeaders(true),
//       credentials: "include",
//     });
//   }

//   if (!res.ok) throw new Error("Failed to fetch profile");
//   return res.json();
// };

// export const logout = async () => {
//   await fetch(`${API_BASE}/auth/logout`, {
//     method: "POST",
//     credentials: "include",
//   });

//   localStorage.removeItem("accessToken");
// };

// export const signup = async (data) =>
//   request(`${API_BASE}/auth/signup`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify(data),
//   });

// export const updateProfile = async (data) =>
//   request(`${API_BASE}/auth/profile`, {
//     method: "PUT",
//     headers: buildHeaders(true),
//     body: JSON.stringify(data),
//   });

// /* ======================================================
//    SERVICES API (NO TOKEN REQUIRED)
// ====================================================== */

// export const getServices = async (filters = {}) => {
//   const params = new URLSearchParams(filters).toString();
//   const url = `${API_BASE}/services${params ? `?${params}` : ""}`;

//   const data = await request(url, { method: "GET" });

//   // backend returns array directly → return as-is
//   return data;
// };

// export const getAllServices = async () => {
//   const data = await request(`${API_BASE}/services`, { method: "GET" });
//   return data;
// };

// export const getServiceById = async (serviceId) => {
//   if (!serviceId) throw new Error("Service ID missing");

//   const data = await request(`${API_BASE}/services/${serviceId}`, {
//     method: "GET",
//   });

//   // backend returns full object → return it directly
//   return data;
// };

// /* ======================================================
//    BOOKING API (AUTH REQUIRED)
// ====================================================== */

// export const bookService = async (bookingData) =>
//   request(`${API_BASE}/booking`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify(bookingData),
//   });

// export const getUserBookings = async () =>
//   request(`${API_BASE}/booking`, {
//     method: "GET",
//     headers: buildHeaders(true),
//   });

// export const cancelBooking = async (bookingId) =>
//   request(`${API_BASE}/booking/cancel/${bookingId}`, {
//     method: "PUT",
//     headers: buildHeaders(true),
//   });

// /* ======================================================
//    PAYMENT API
// ====================================================== */

// export const createTokenPayment = async ({ bookingId, method }) =>
//   request(`${API_BASE}/payment/token`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ bookingId, method }),
//   });

// /* ======================================================
//    ACCOUNT DEACTIVATION
// ====================================================== */

// export const requestDeactivateOtp = async () =>
//   request(`${API_BASE}/auth/deactivate/request-otp`, {
//     method: "POST",
//     headers: buildHeaders(true),
//   });

// export const verifyDeactivationOtp = async (otp) => {
//   const data = await request(`${API_BASE}/auth/deactivate/verify-otp`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ otp }),
//   });

//   localStorage.removeItem("accessToken");
//   return data;
// };

// /* ======================================================
//    ACCOUNT DELETION
// ====================================================== */

// export const requestDeleteOtp = async () =>
//   request(`${API_BASE}/auth/delete/request-otp`, {
//     method: "POST",
//     headers: buildHeaders(true),
//   });

// export const verifyDeleteOtp = async (otp) => {
//   const data = await request(`${API_BASE}/auth/delete/verify-otp`, {
//     method: "POST",
//     headers: buildHeaders(true),
//     body: JSON.stringify({ otp }),
//   });

//   localStorage.removeItem("accessToken");
//   return data;
// };



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

// const request = async (url, options = {}, auth = false) => {
//   const res = await fetch(url, {
//     ...options,
//     headers: { ...buildHeaders(auth), ...(options.headers || {}) },
//     credentials: "include",
//   });

//   let data = {};
//   try {
//     data = await res.json();
//   } catch (err) {}

//   if (!res.ok) {
//     throw new Error(data.error || data.message || "Request failed");
//   }

//   return data;
// };

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
