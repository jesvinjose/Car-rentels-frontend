import React, { useEffect, useState } from "react";
import axiosInstanceforAdmin from "../../api/axiosInstanceforAdmin";
import AdminHeader from "./AdminHeader";

const VendorDetailsModal = ({
  vendorDetails,
  closeModal,
  vendorData,
  setVendorData,
}) => {
 
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Vendor Details
        </h2>
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "70vh" }} // Adjust maxHeight as needed
        >
          <div className="flex flex-col sm:flex-row justify-evenly">
            <p>
              <strong>First Name:</strong> {vendorDetails[0].firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {vendorDetails[0].lastName}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <p>
              <strong>Email ID:</strong> {vendorDetails[0].emailId}
            </p>
            <p>
              <strong>Aadhar Number:</strong> {vendorDetails[0].aadharNumber}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <p>
              <strong>Adhar Front Image</strong>
              <img
                src={vendorDetails[0].aadharFrontImage}
                alt="Aadhar Front Preview"
                className="max-w-full max-h-32"
              />
            </p>
            <p>
              <strong>Adhar Back Image</strong>
              <img
                src={vendorDetails[0].aadharBackImage}
                alt="Aadhar Back Preview"
                className="max-w-full max-h-32"
              />
            </p>
          </div>

          {/* Button section */}
          {/* <div className="flex flex-col sm:flex-row justify-evenly mt-6">
          {/* Accept button 
          <button
            onClick={() => handleAccept(vendorDetails[0]._id)}
            className="w-full sm:w-5/12 px-4 py-2 bg-green-600 text-white rounded hover:bg-indigo-700 mb-2 sm:mb-0"
          >
            Accept
          </button>
*/}
          {/* Reject button */}
          {/*
          <button
            onClick={() => handleReject(vendorDetails[0]._id)}
            className="w-full sm:w-5/12 px-4 py-2 bg-red-600 text-white rounded hover:bg-indigo-700"
          >
            Reject
          </button>
        </div> */}
        </div>

        {/* Close button */}
        <button
          onClick={closeModal}
          className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const VendorsList = () => {
  const [vendorData, setVendorData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendorDetails, setSelectedVendorDetails] = useState(null);
  // const adminToken=localStorage.getItem('adminToken');
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${adminToken}`  // Set the token in the headers
    //   }
    // };
    axiosInstanceforAdmin
      .get(
        "/admin/vendorslist"
        // config
      )
      .then((response) => {
        // Check if the response data is an array before setting the state
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setVendorData(response.data);
        } else {
          console.error(
            "Invalid data received from the server:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(vendorData.length / itemsPerPage);

  const displayData = vendorData.filter((item, index) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return index >= startIndex && index < endIndex;
  });

  const handleBlock = async (id) => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${adminToken}`, // Set the token in the headers
    //   },
    // };
    console.log("Handling block for vendor with id:", id);
   
    console.log(id);

    // console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    const updatedVendor = vendorData.map((i) =>
      i._id === id ? { ...i, blockStatus: true } : i
    );
    setVendorData(updatedVendor);
  };

  const handleUnblock = async (id) => {
    console.log(id, "");
    console.log("hellooooooooooooooooooooooo");
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${adminToken}`, // Set the token in the headers
    //   },
    // };
   
    console.log(id);

    const updatedVendor = vendorData.map((i) =>
      i._id === id ? { ...i, blockStatus: false } : i
    );
    setVendorData(updatedVendor);
  };

  const handleViewDetails = async (id) => {
    setIsModalOpen(true);
    console.log("inside view Details before response");
    const fullVendorDetails = vendorData.filter((item) => item._id === id);
    console.log(fullVendorDetails);
    setSelectedVendorDetails(fullVendorDetails);
    console.log(selectedVendorDetails, "transfered to modal");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVendorDetails(null);
  };

  return (
    <div>
      <AdminHeader />
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Vendors
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {vendorData.length} vendors
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>EmailId</span>
                        </div>
                      </th>
                      {/* <th
                        scope="col"
                        className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Verification Status
                      </th> */}
                      <th
                        scope="col"
                        className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Mobile Number
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Joining Date
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pr-4 text-sm font-normal text-right text-gray-500 dark:text-gray-400"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {displayData.map((vendor) => (
                      <tr
                        key={vendor._id}
                        className="bg-white dark:bg-gray-900"
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {vendor.emailId}
                        </td>
                        {/* <td className="px-12 py-3 text-sm text-green-500 dark:text-green-400 whitespace-nowrap">
                          {vendor.verificationStatus}
                        </td> */}
                        <td className="py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {vendor.mobileNumber}
                        </td>
                        <td className="py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {new Date(vendor.createdAt).toLocaleString()}
                        </td>
                        <td className="pr-4 py-3 text-sm font-medium text-right">
                          <button
                            onClick={() => handleViewDetails(vendor._id)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600"
                          >
                            View Details
                          </button>
                          {vendor.blockStatus ? (
                            <button
                              onClick={() => handleUnblock(vendor._id)}
                              className="ml-2 text-green-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                            >
                              UnBlock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBlock(vendor._id)}
                              className="ml-2 text-red-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                            >
                              Block
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <button
                    className="ml-5"
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                  >
                    Prev
                  </button>
                  <button
                    className="ml-10"
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <VendorDetailsModal
          vendorDetails={selectedVendorDetails}
          closeModal={closeModal}
          vendorData={vendorData}
          setVendorData={setVendorData}
        />
      )}
    </div>
  );
};

export default VendorsList;
