// import React from 'react'
// import categoryicon from "../../assets/categoryicon.png";
// import gearbox from "../../assets/gearbox.png";
// import gasstation from "../../assets/gas-station.png";

// const AvailableCars = ({ availableCars }) => {
//   return (
//     <div>
//       <h2>Available Cars</h2>
//       <div className="flex flex-wrap justify-center">
//         {availableCars.map((car, index) => (
//           <div key={index} className="m-4">
//             {!car.blockStatus && (
//               <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
//                 <img
//                   className="object-cover object-center w-full h-56"
//                   src={car.carImage}
//                   alt="avatar"
//                   style={{ width: "400px", height: "200px" }}
//                 />

//                 <div className="px-6 py-4 justify-between">
//                   <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
//                     {car.modelName}
//                   </h1>
//                   <div className="flex justify-evenly">
//                     <div>
//                       <img
//                         style={{ width: "50px", height: "50px" }}
//                         src={categoryicon}
//                       />
//                       <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
//                         {car.carTypeName}
//                       </h1>
//                     </div>
//                     <div>
//                       <img
//                         style={{ width: "50px", height: "50px" }}
//                         src={gasstation}
//                       />
//                       <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
//                         {car.fuelType}
//                       </h1>
//                     </div>
//                     <div>
//                     <img
//                         style={{ width: "50px", height: "50px" }}
//                         src={gearbox}
//                       />
//                     <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
//                       {car.gearBoxType}
//                     </h1>

//                     </div>

//                   </div>
//                   <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
//                     {/* <h1 className="px-2 text-sm">
//                       {car.hourlyRentalRate}Rs/hr
//                     </h1> */}
//                     <h1 className="px-2 text-lg">
//                       Rental-Rate:{car.dailyRentalRate} Rs/day
//                     </h1>
//                     {/* <h1 className="px-2 text-sm">
//                       {car.monthlyRentalRate}Rs/month
//                     </h1>  */}
//                     <button className="border border-black w-28 rounded-lg bg-orange-500-100 hover:bg-orange-800-400 shadow-md">
//                       <a
//                         href={`/car_details?carId=${car._id}`}
//                         className="btn_3"
//                       >
//                         View Details
//                       </a>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
      
//     </div>
//   )
// }

// export default AvailableCars
