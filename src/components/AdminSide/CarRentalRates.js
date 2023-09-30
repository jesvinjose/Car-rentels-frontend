// import React, { useEffect, useState } from "react";
// import AdminHeader from "./AdminHeader";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const EditCarTypeModal = ({ carTypeDetails, closeModal}) => {
//   const [carTypeFormData, setCarTypeFormData] = useState(carTypeDetails[0]);

//   const handleUpdate = async () => {
//     console.log("Car Type Data to Update:", carTypeFormData);
//     try {
//       // Send the updated car type data to your server using Axios or a similar HTTP library
//       const response = await axios.put(
//         `http://localhost:5000/admin/carTypeEdit/${carTypeFormData._id}`,
//         carTypeFormData
//       );
//       if(response.data.message==="CarType updated successfully")
//       console.log("Car type updated successfully!");
//       closeModal();

//     } catch (error) {
//       console.error("Error updating car type:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCarTypeFormData((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg w-1/2">
//         <h2 className="text-xl font-semibold mb-4 text-center">
//           Car Type Details
//         </h2>
//         <form>
//           <div className="flex justify-evenly">
//             <p>
//               <strong>Car Type Name:</strong>
//               <input
//                 type="text"
//                 name="carTypeName"
//                 value={carTypeFormData.carTypeName}
//                 onChange={handleChange}
//               />
//             </p>
//             <p>
//               <strong>Hourly Rental Rate:</strong>
//               <input
//                 type="Number"
//                 name="hourlyRentalRate"
//                 value={carTypeFormData.hourlyRentalRate}
//                 onChange={handleChange}
//               />
//             </p>
//           </div>
//           <div className="flex justify-evenly">
//             <p>
//               <strong>Daily Rental Rate:</strong>
//               <input
//                 type="Number"
//                 name="dailyRentalRate"
//                 value={carTypeFormData.dailyRentalRate}
//                 onChange={handleChange}
//               />
//             </p>
//             <p>
//               <strong>Monthly Rental Rate:</strong>
//               <input
//                 type="Number"
//                 name="monthlyRentalRate"
//                 value={carTypeFormData.monthlyRentalRate}
//                 onChange={handleChange}
//               />
//             </p>
//           </div>
//           <div className="flex justify-evenly">
//             <button
//               type="submit"
//               onClick={handleUpdate}
//               className="mt-6 w-5/12 px-4 py-2 bg-green-600 text-white rounded hover:bg-indigo-700"
//             >
//               Update Car Type
//             </button>
//           </div>
//         </form>
//         <button
//           onClick={closeModal}
//           className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// const CarRentalRates = () => {
//   const [carTypes, setCarTypes] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCarTypeDetails, setSelectedCarTypeDetails] = useState(null);
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/admin/cartypeslist")
//       .then((response) => {
//         // Check if the response data is an array before setting the state
//         // console.log(response.data);
//         if (Array.isArray(response.data)) {
//           setCarTypes(response.data);
//         } else {
//           console.error(
//             "Invalid data received from the server:",
//             response.data
//           );
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const handleBlock = async (id) => {
//     const res = await axios.put(
//       `http://localhost:5000/admin/carTypeblock/${id}`
//     );
//     console.log(id);

//     console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//     const updatedCarType = carTypes.map((i) =>
//       i._id === id ? { ...i, blockStatus: true } : i
//     );
//     console.log(updatedCarType, "-----carType---------");
//     setCarTypes(updatedCarType);
//   };

//   const handleUnblock = async (id) => {
//     console.log(id, "");
//     console.log("hellooooooooooooooooooooooo");
//     const resss = await axios.put(
//       `http://localhost:5000/admin/carTypeunblock/${id}`
//     );
//     console.log(id);

//     console.log(resss, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//     const updatedCarType = carTypes.map((i) =>
//       i._id === id ? { ...i, blockStatus: false } : i
//     );
//     setCarTypes(updatedCarType);
//   };

//   const handleEditDetails = async (id) => {
//     console.log("inside view Details before response");
//     setIsModalOpen(true);
//     const fullCarTypeDetails = carTypes.filter((item) => item._id === id);
//     console.log(fullCarTypeDetails);
//     setSelectedCarTypeDetails(fullCarTypeDetails);
//     console.log(selectedCarTypeDetails, "transfered to modal");
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedCarTypeDetails(null);
//   };

//   return (
//     <div>
//       <AdminHeader />
//       <section className="container px-4 mx-auto">
//         <div className="flex items-center gap-x-3">
//           <h2 className="text-lg font-medium text-gray-800 dark:text-white">
//             Car Types
//           </h2>
//           <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
//             {carTypes.length} cartypes
//           </span>
//           <h2 className="text-lg font-medium text-gray-800 dark:text-white">
//             <Link to="/addnewcartype">Add New Car Types</Link>
//           </h2>
//         </div>

//         <div className="flex flex-col mt-6">
//           <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//             <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//               <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                   <thead className="bg-gray-50 dark:bg-gray-800">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
//                       >
//                         <div className="flex items-center gap-x-3">
//                           <span>Car Types</span>
//                         </div>
//                       </th>
//                       <th
//                         scope="col"
//                         className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
//                       >
//                         Rent/hr (Rs.)
//                       </th>
//                       <th
//                         scope="col"
//                         className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
//                       >
//                         Rent/day (Rs.)
//                       </th>
//                       <th
//                         scope="col"
//                         className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
//                       >
//                         Rent/month (Rs.)
//                       </th>
//                       <th
//                         scope="col"
//                         className="py-3.5 pr-4 text-sm font-normal text-right text-gray-500 dark:text-gray-400"
//                       >
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
//                     {carTypes.map((carType) => (
//                       <tr
//                         key={carType._id}
//                         className="bg-white dark:bg-gray-900"
//                       >
//                         <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
//                           {carType.carTypeName}
//                         </td>
//                         <td className="py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
//                           {carType.hourlyRentalRate}
//                         </td>
//                         <td className="py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
//                           {carType.dailyRentalRate}
//                         </td>
//                         <td className="py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
//                           {carType.monthlyRentalRate}
//                         </td>
//                         <td className="pr-4 py-3 text-sm font-medium text-right">
//                           <button
//                             onClick={() => handleEditDetails(carType._id)}
//                             className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600"
//                           >
//                             Edit
//                           </button>
//                           {carType.blockStatus ? (
//                             <button
//                               onClick={() => handleUnblock(carType._id)}
//                               className="ml-2 text-green-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
//                             >
//                               UnBlock
//                             </button>
//                           ) : (
//                             <button
//                               onClick={() => handleBlock(carType._id)}
//                               className="ml-2 text-red-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
//                             >
//                               Block
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {isModalOpen && (
//         <EditCarTypeModal
//           carTypeDetails={selectedCarTypeDetails}
//           closeModal={closeModal}
//         />
//       )}
//     </div>
//   );
// };

// export default CarRentalRates;
