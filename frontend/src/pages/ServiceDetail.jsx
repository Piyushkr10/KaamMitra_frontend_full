// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   Star,
//   Clock,
//   MapPin,
//   PhoneCall,
//   CheckCircle,
//   Tag,
// } from "lucide-react";

// const ServiceDetail = () => {
//   const { serviceName } = useParams();
//   const decodedName = decodeURIComponent(serviceName);
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await fetch("/api.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setServices(data.services);
//       } catch (e) {
//         setError(e.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-gray-800 dark:text-white">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-red-500">
//         Error: {error}
//       </div>
//     );
//   }

//   const service = services.find((s) => s.name === decodedName) || {
//     name: decodedName,
//     description: `Professional ${decodedName} service by verified experts. Book on-demand or schedule at your convenience. Transparent pricing and quality guaranteed.`,
//     img: `https://placehold.co/800x400/525252/FFF?text=${encodeURIComponent(
//       decodedName
//     )}`,
//     icon: "❓",
//     iconColor: "gray-500",
//     rating: "4.5",
//     price: "Price varies",
//     features: [
//       "Verified and trained professionals",
//       "Fast response and reliable support",
//       "Flexible scheduling",
//       "Transparent pricing",
//     ],
//   };

//   // Only show 5 services in "Explore More"
//   const limitedServices = services
//     .filter((s) => s.name !== decodedName)
//     .slice(0, 5);

//   return (
//     <div className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white min-h-screen font-sans transition-colors duration-300">
//       <div className="container mx-auto px-4 py-8">
//         {/* Main Service Detail */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-300">
//           <div className="flex flex-col md:flex-row">
//             {/* Image Section */}
//             <div className="md:w-1/2 relative">
//               <img
//                 src={service.img}
//                 alt={service.name}
//                 className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
//                   {service.name}
//                 </h1>
//               </div>
//             </div>

//             {/* Details Section */}
//             <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
//               <div>
//                 <p className="text-lg mb-6 leading-relaxed">
//                   {service.description}
//                 </p>

//                 {/* Price & Features */}
//                 <div className="mb-8">
//                   <div className="flex items-center gap-3 text-2xl font-bold mb-4">
//                     <Tag size={28} className="text-blue-500" />
//                     <span>{service.price}</span>
//                   </div>
//                   <div className="grid grid-cols-1 gap-4">
//                     {service.features.map((feature, index) => (
//                       <div key={index} className="flex items-start gap-3">
//                         <CheckCircle
//                           size={24}
//                           className="text-blue-500 flex-shrink-0"
//                         />
//                         <span>{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Extra Info */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3 text-blue-500">
//                     <Star size={24} />
//                     <span>
//                       Average Rating: {service.rating}/5 (1,200+ reviews)
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Clock size={24} className="text-blue-500" />
//                     <span>Available 24/7 for urgent requests</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <MapPin size={24} className="text-blue-500" />
//                     <span>Serving your local area</span>
//                   </div>
//                 </div>
//               </div>

//               {/* CTA */}
//               <div className="mt-8 text-center md:text-left">
//                 <Link
//                   to={`/booking/${encodeURIComponent(service.name)}`}
//                   className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-md w-full md:w-auto"
//                 >
//                   <PhoneCall size={18} />
//                   Book This Service Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Explore More Services */}
//         <div className="mt-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
//               Explore More Services
//             </h2>
//             <Link
//               to="/services"
//               className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
//             >
//               See All →
//             </Link>
//           </div>

//           <div className="flex gap-6 overflow-x-auto pb-4">
//             {limitedServices.map((s) => (
//               <div
//                 key={s.name}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-w-[250px] flex-shrink-0 hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className={`text-4xl mb-4 text-${s.iconColor}`}>
//                   {s.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
//                 <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
//                   {s.description}
//                 </p>
//                 <Link
//                   to={`/service/${encodeURIComponent(s.name)}`}
//                   className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
//                 >
//                   Learn More
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetail;







// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   Star,
//   Clock,
//   MapPin,
//   PhoneCall,
//   CheckCircle,
//   Tag,
// } from "lucide-react";

// const ServiceDetail = () => {
//   const { serviceId } = useParams();

//   const [service, setService] = useState(null);
//   const [allServices, setAllServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   /* -----------------------------------------------------
//      FETCH SPECIFIC SERVICE BY ID
//   ------------------------------------------------------ */
//   useEffect(() => {
//     const fetchService = async () => {
//       try {
//         const response = await fetch(`/api/services/${serviceId}`);
//         const data = await response.json();

//         if (!response.ok || !data.success) {
//           throw new Error(data.error || "Failed to load service");
//         }

//         setService(data.service);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch service data");
//       }
//     };

//     fetchService();
//   }, [serviceId]);

//   /* -----------------------------------------------------
//      FETCH ALL SERVICES (for Explore More)
//   ------------------------------------------------------ */
//   useEffect(() => {
//     const fetchAllServices = async () => {
//       try {
//         const response = await fetch(`/api/services`);
//         const data = await response.json();

//         if (Array.isArray(data.services)) {
//           setAllServices(data.services);
//         }
//       } catch (err) {
//         console.error("Error fetching all services",err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllServices();
//   }, []);

//   /* -----------------------------------------------------
//      LOADING STATE
//   ------------------------------------------------------ */
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-gray-800 dark:text-white">
//         Loading...
//       </div>
//     );
//   }

//   /* -----------------------------------------------------
//      ERROR STATE
//   ------------------------------------------------------ */
//   if (error || !service) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
//         <p>Error: {error || "Service not found"}</p>

//         <Link
//           to="/services"
//           className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-md"
//         >
//           Back to Services
//         </Link>
//       </div>
//     );
//   }

//   /* -----------------------------------------------------
//      FALLBACKS
//   ------------------------------------------------------ */
//   const img = service.imageUrl
//     ? service.imageUrl
//     : `https://placehold.co/800x400/525252/FFF?text=${encodeURIComponent(
//         service.name
//       )}`;

//   const description =
//     service.description ||
//     `Professional ${service.name} service provided by verified experts.`;

//   const price = service.price ? `₹${service.price}` : "Price varies";

//   const requirement =
//     service.requirement || "No special requirements for this service.";

//   const features = [
//     "Verified and trained professionals",
//     "Fast response and reliable support",
//     "Flexible scheduling",
//     "Transparent pricing",
//   ];

//   const limitedServices = allServices
//     .filter((s) => s._id !== service._id)
//     .slice(0, 5);

//   /* -----------------------------------------------------
//      PAGE UI (UNCHANGED)
//   ------------------------------------------------------ */
//   return (
//     <div className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white min-h-screen font-sans transition-colors duration-300">
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//           <div className="flex flex-col md:flex-row">
//             {/* IMAGE */}
//             <div className="md:w-1/2 relative">
//               <img
//                 src={img}
//                 alt={service.name}
//                 className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
//                   {service.name}
//                 </h1>
//               </div>
//             </div>

//             {/* DETAILS */}
//             <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
//               <div>
//                 <p className="text-lg mb-6 leading-relaxed">{description}</p>

//                 {/* PRICE */}
//                 <div className="mb-8">
//                   <div className="flex items-center gap-3 text-2xl font-bold mb-4">
//                     <Tag size={28} className="text-blue-500" />
//                     <span>{price}</span>
//                   </div>

//                   {/* REQUIREMENTS */}
//                   <div className="mb-5">
//                     <h4 className="font-semibold mb-2">Requirements:</h4>
//                     <p className="text-gray-700 dark:text-gray-300">
//                       {requirement}
//                     </p>
//                   </div>

//                   {/* FEATURES */}
//                   <div className="grid grid-cols-1 gap-4">
//                     {features.map((feature, index) => (
//                       <div key={index} className="flex items-start gap-3">
//                         <CheckCircle
//                           size={24}
//                           className="text-blue-500 flex-shrink-0"
//                         />
//                         <span>{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* EXTRAS */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3 text-blue-500">
//                     <Star size={24} />
//                     <span>Average Rating: 4.5/5 (1,200+ reviews)</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Clock size={24} className="text-blue-500" />
//                     <span>Available 24/7 for urgent requests</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <MapPin size={24} className="text-blue-500" />
//                     <span>Serving your local area</span>
//                   </div>
//                 </div>
//               </div>

//               {/* CTA */}
//               <div className="mt-8 text-center md:text-left">
//                 <Link
//                   to={`/booking/${service._id}`}
//                   className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-md w-full md:w-auto"
//                 >
//                   <PhoneCall size={18} />
//                   Book This Service Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* EXPLORE MORE */}
//         <div className="mt-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-3xl md:text-4xl font-bold">Explore More Services</h2>
//             <Link
//               to="/services"
//               className="text-blue-600 hover:text-blue-800 font-semibold"
//             >
//               See All →
//             </Link>
//           </div>

//           <div className="flex gap-6 overflow-x-auto pb-4">
//             {limitedServices.map((s) => (
//               <div
//                 key={s._id}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-w-[250px]"
//               >
//                 <div className="text-4xl mb-4">⚡</div>

//                 <h3 className="text-xl font-semibold mb-2">
//                   {s.name}
//                 </h3>

//                 <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
//                   {s.description}
//                 </p>

//                 <Link
//                   to={`/service/${s._id}`}
//                   className="text-blue-600 hover:text-blue-800 font-medium"
//                 >
//                   Learn More
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetail;



// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   Star,
//   Clock,
//   MapPin,
//   PhoneCall,
//   CheckCircle,
//   Tag,
// } from "lucide-react";
// import { getServiceById, getAllServices } from "../services/api";


// const ServiceDetail = () => {
//   const { serviceId } = useParams();

//   const [service, setService] = useState(null);
//   const [allServices, setAllServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   /* -----------------------------------------------------
//      FETCH SERVICE BY ID + FETCH ALL SERVICES
//   ------------------------------------------------------ */
//   useEffect(() => {
//     const loadService = async () => {
//       try {
//         if (!serviceId) throw new Error("Service ID missing");

//         const fetchedService = await getServiceById(serviceId);
//         setService(fetchedService);
//       } catch (err) {
//         console.error("Error fetching service:", err);
//         setError(err.message);
//       }
//     };

//     const loadAll = async () => {
//       try {
//         const list = await getAllServices();
//         setAllServices(list);
//       } catch (err) {
//         console.error("Error fetching all services", err);
//       } finally{
//         setLoading(false);
//       }
//     };

//     loadService();
//     loadAll();
//     setLoading(false);
//   }, [serviceId]);

//   /* -----------------------------------------------------
//      LOADING STATE
//   ------------------------------------------------------ */
//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen text-gray-800 dark:text-white">
//         Loading...
//       </div>
//     );

//   /* -----------------------------------------------------
//      ERROR STATE
//   ------------------------------------------------------ */
//   if (error || !service)
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
//         <p>Error: {error || "Service not found"}</p>

//         <Link
//           to="/services"
//           className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-md"
//         >
//           Back to Services
//         </Link>
//       </div>
//     );

//   /* -----------------------------------------------------
//      FALLBACK AND UI VALUES
//   ------------------------------------------------------ */
//   const img = service.imageUrl
//     ? service.imageUrl
//     : `https://placehold.co/800x400/525252/FFF?text=${encodeURIComponent(
//         service.name || "Service"
//       )}`;

//   const description =
//     service.description || `Professional ${service.name} service.`;

//   const price = service.price ? `₹${service.price}` : "Price varies";

//   const requirement =
//     service.requirement || "No special requirements for this service.";

//   const features = [
//     "Verified and trained professionals",
//     "Fast response and reliable support",
//     "Flexible scheduling",
//     "Transparent pricing",
//   ];

//   const limitedServices = allServices
//     .filter((s) => s._id !== service._id)
//     .slice(0, 5);

//   /* -----------------------------------------------------
//      UI (UNCHANGED)
//   ------------------------------------------------------ */
//   return (
//     <div className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white min-h-screen font-sans transition-colors duration-300">
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//           <div className="flex flex-col md:flex-row">
//             {/* IMAGE */}
//             <div className="md:w-1/2 relative">
//               <img
//                 src={img}
//                 alt={service.name}
//                 className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
//                   {service.name}
//                 </h1>
//               </div>
//             </div>

//             {/* DETAILS */}
//             <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
//               <div>
//                 <p className="text-lg mb-6 leading-relaxed">{description}</p>

//                 {/* PRICE */}
//                 <div className="mb-8">
//                   <div className="flex items-center gap-3 text-2xl font-bold mb-4">
//                     <Tag size={28} className="text-blue-500" />
//                     <span>{price}</span>
//                   </div>

//                   {/* REQUIREMENTS */}
//                   <div className="mb-5">
//                     <h4 className="font-semibold mb-2">Requirements:</h4>
//                     <p className="text-gray-700 dark:text-gray-300">
//                       {requirement}
//                     </p>
//                   </div>

//                   {/* FEATURES */}
//                   <div className="grid grid-cols-1 gap-4">
//                     {features.map((feature, index) => (
//                       <div key={index} className="flex items-start gap-3">
//                         <CheckCircle
//                           size={24}
//                           className="text-blue-500 flex-shrink-0"
//                         />
//                         <span>{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* EXTRAS */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3 text-blue-500">
//                     <Star size={24} />
//                     <span>Average Rating: 4.5/5 (1,200+ reviews)</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Clock size={24} className="text-blue-500" />
//                     <span>Available 24/7 for urgent requests</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <MapPin size={24} className="text-blue-500" />
//                     <span>Serving your local area</span>
//                   </div>
//                 </div>
//               </div>

//               {/* CTA */}
//               <div className="mt-8 text-center md:text-left">
//                 <Link
//                   to={`/booking/${encodeURIComponent(service._id)}`}
//                   className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-md w-full md:w-auto"
//                 >
//                   <PhoneCall size={18} />
//                   Book This Service Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* EXPLORE MORE */}
//         <div className="mt-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-3xl md:text-4xl font-bold">
//               Explore More Services
//             </h2>
//             <Link
//               to="/services"
//               className="text-blue-600 hover:text-blue-800 font-semibold"
//             >
//               See All →
//             </Link>
//           </div>

//           <div className="flex gap-6 overflow-x-auto pb-4">
//             {limitedServices.map((s) => (
//               <div
//                 key={s._id}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-w-[250px]"
//               >
//                 <div className="text-4xl mb-4">⚡</div>

//                 <h3 className="text-xl font-semibold mb-2">
//                   {s.name || s.subService}
//                 </h3>

//                 <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
//                   {s.description}
//                 </p>

//                 <Link
//                   to={`/service/${s._id}`}
//                   className="text-blue-600 hover:text-blue-800 font-medium"
//                 >
//                   Learn More
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetail;



import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  Clock,
  MapPin,
  PhoneCall,
  CheckCircle,
  Tag,
} from "lucide-react";
import { getServiceById, getAllServices } from "../services/api";

const ServiceDetail = () => {
  const { serviceId } = useParams();

  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* -----------------------------------------------------
     FETCH SERVICE BY ID + ALL SERVICES
  ------------------------------------------------------ */
  useEffect(() => {
    const loadService = async () => {
      try {
        if (!serviceId) throw new Error("Service ID missing");

        const result = await getServiceById(serviceId);
        setService(result);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError(err.message);
      }
    };

    const loadAll = async () => {
      try {
        const list = await getAllServices();
        setAllServices(list);
      } catch (err) {
        console.error("Error fetching all services", err);
      } finally {
        setLoading(false);
      }
    };

    loadService();
    loadAll();
  }, [serviceId]);

  /* -----------------------------------------------------
     LOADING
  ------------------------------------------------------ */
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-800 dark:text-white">
        Loading...
      </div>
    );

  /* -----------------------------------------------------
     ERROR
  ------------------------------------------------------ */
  if (error || !service)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
        <p>Error: {error || "Service not found"}</p>

        <Link
          to="/services"
          className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-md"
        >
          Back to Services
        </Link>
      </div>
    );

  /* -----------------------------------------------------
     FIXED — USE CATEGORY AS SERVICE NAME
  ------------------------------------------------------ */
  const serviceName = service.category || "Service";

  const img = service.imageUrl
    ? service.imageUrl
    : `https://placehold.co/800x400/525252/FFF?text=${encodeURIComponent(
        serviceName
      )}`;

  const description =
    service.description || `Professional ${serviceName} service.`;

  const price = service.price ? `₹${service.price}` : "Price varies";

  const requirement =
    service.requirement || "No special requirements for this service.";

  const features = [
    "Verified and trained professionals",
    "Fast response and reliable support",
    "Flexible scheduling",
    "Transparent pricing",
  ];

  const limitedServices = allServices
    .filter((s) => s._id !== service._id)
    .slice(0, 5);

  /* -----------------------------------------------------
     UI
  ------------------------------------------------------ */
  return (
    <div className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white min-h-screen font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* IMAGE */}
            <div className="md:w-1/2 relative">
              <img
                src={img}
                alt={serviceName}
                className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
                  {serviceName}
                </h1>
              </div>
            </div>

            {/* DETAILS */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-lg mb-6 leading-relaxed">{description}</p>

                {/* PRICE */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 text-2xl font-bold mb-4">
                    <Tag size={28} className="text-blue-500" />
                    <span>{price}</span>
                  </div>

                  {/* REQUIREMENTS */}
                  <div className="mb-5">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {requirement}
                    </p>
                  </div>

                  {/* FEATURES */}
                  <div className="grid grid-cols-1 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle
                          size={24}
                          className="text-blue-500 flex-shrink-0"
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EXTRAS */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-500">
                    <Star size={24} />
                    <span>Average Rating: 4.5/5 (1,200+ reviews)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={24} className="text-blue-500" />
                    <span>Available 24/7 for urgent requests</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={24} className="text-blue-500" />
                    <span>Serving your local area</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center md:text-left">
                <Link
                  to={`/booking/${encodeURIComponent(service._id)}`}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-md w-full md:w-auto"
                >
                  <PhoneCall size={18} />
                  Book This Service Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* EXPLORE MORE */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Explore More Services
            </h2>
            <Link
              to="/services"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              See All →
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {limitedServices.map((s) => (
              <div
                key={s._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-w-[250px]"
              >
                <div className="text-4xl mb-4">⚡</div>

                <h3 className="text-xl font-semibold mb-2">
                  {s.category}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                  {s.description}
                </p>

                <Link
                  to={`/service/${s._id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
