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
//      FETCH SERVICE BY ID + ALL SERVICES
//   ------------------------------------------------------ */
//   useEffect(() => {
//     const loadService = async () => {
//       try {
//         if (!serviceId) throw new Error("Service ID missing");

//         const result = await getServiceById(serviceId);
//         setService(result);
//         console.log("Loaded Service:", result);
//       } catch (err) {
//         console.error("Error fetching service:", err);
//         setError(err.message);
//       }
//     };

//     const loadAll = async () => {
//       try {
//         const list = await getAllServices();
//         setAllServices(list);
//         console.log("All Services:", list);
//       } catch (err) {
//         console.error("Error fetching all services", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadService();
//     loadAll();
//   }, [serviceId]);

//   /* -----------------------------------------------------
//      DEBUG CATEGORY CHECK
//   ------------------------------------------------------ */
//   console.log("Current Service Category:", service?.category);
//   console.log("All Services Count:", allServices.length);

//   /* -----------------------------------------------------
//      LOADING
//   ------------------------------------------------------ */
//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen text-gray-800 dark:text-white">
//         Loading...
//       </div>
//     );

//   /* -----------------------------------------------------
//      ERROR
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
//      SERVICE DATA
//   ------------------------------------------------------ */
//   const serviceName = service.category || "Service";

//   const img = service.imageUrl
//     ? service.imageUrl
//     : `https://placehold.co/800x400/525252/FFF?text=${encodeURIComponent(
//         serviceName
//       )}`;

//   const description =
//     service.description || `Professional ${serviceName} service.`;

//   const price = service.price ? `₹${service.price}` : "Price varies";

//   const requirement =
//     service.requirement || "No special requirements for this service.";

//   const features = [
//     "Verified and trained professionals",
//     "Fast response and reliable support",
//     "Flexible scheduling",
//     "Transparent pricing",
//   ];

//   /* -----------------------------------------------------
//      SAME CATEGORY FILTER (SAFE VERSION)
//   ------------------------------------------------------ */
//   const limitedServices = allServices
//     .filter(
//       (s) =>
//         service &&
//         s._id !== service._id &&
//         s.category?.toLowerCase() === service.category?.toLowerCase()
//     )
//     .slice(0, 5);

//   console.log("Filtered Same Category Services:", limitedServices);

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
//                 alt={serviceName}
//                 className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
//                   {serviceName}
//                 </h1>
//               </div>
//             </div>

//             {/* DETAILS */}
//             <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
//               <div>
//                 <p className="text-lg mb-6 leading-relaxed">{description}</p>

//                 <div className="mb-8">
//                   <div className="flex items-center gap-3 text-2xl font-bold mb-4">
//                     <Tag size={28} className="text-blue-500" />
//                     <span>{price}</span>
//                   </div>

//                   <div className="mb-5">
//                     <h4 className="font-semibold mb-2">Requirements:</h4>
//                     <p className="text-gray-700 dark:text-gray-300">
//                       {requirement}
//                     </p>
//                   </div>

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
//                   {s.category}
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-800 dark:text-white">
        Loading...
      </div>
    );

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
    .filter(
      (s) =>
        service &&
        s._id !== service._id &&
        s.category?.toLowerCase() === service.category?.toLowerCase()
    )
    .slice(0, 5);

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

                <div className="mb-8">
                  <div className="flex items-center gap-3 text-2xl font-bold mb-4">
                    <Tag size={28} className="text-blue-500" />
                    <span>{price}</span>
                  </div>

                  <div className="mb-5">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {requirement}
                    </p>
                  </div>

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

          {/* Removed horizontal scroll and added responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {limitedServices.map((s) => (
              <div
                key={s._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
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