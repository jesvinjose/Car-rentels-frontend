import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstanceforAdmin from "../../api/axiosInstanceforAdmin";
import AdminHeader from "./AdminHeader";

const UserDetailsModal = ({
  userDetails,
  closeModal,
  userData,
  setUserData,
}) => {
  // console.log(
  //   userDetails,
  //   ">>>>>>>>>y=userrrrrrrrrrrrrrrrrrrrrr>>>>>>>>>>>>.."
  // );
  // const [userData, setUserData] = useState(userDetails[0]);
  const handleAccept = async (id) => {
    console.log("userId:" + id);
    console.log("inside handle Accept");
    const res = await axiosInstanceforAdmin.put(
      `/admin/userVerificationAccept/${id}`
    );
    console.log(res, "return response");
    if (res.data.message === "User Account is Accepted") {
      // setUserData()
      const updatedUserData = userData.map((user) => {
        if (user._id === id) {
          return { ...user, verificationStatus: "Approved" };
        }
        return user;
      });
      setUserData(updatedUserData);
      console.log("user is verified successfully by the admin");
    }
  };

  const handleReject = async (id) => {
    console.log("userId:" + id);
    console.log("inside handle Reject");
    const res = await axiosInstanceforAdmin.put(
      `/admin/userVerificationReject/${id}`
    );
    console.log(res, "return response");
    if (res.data.message === "User Account is Rejected") {
      const updatedUserData = userData.map((user) => {
        if (user._id === id) {
          return { ...user, verificationStatus: "Rejected" };
        }
        return user;
      });
      setUserData(updatedUserData);
      console.log("user is rejected successfully by the admin");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-xl font-semibold mb-4 text-center">User Details</h2>
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "70vh" }} // Adjust maxHeight as needed
        >
          <div className="flex flex-col sm:flex-row justify-evenly">
            <p>
              <strong>First Name:</strong> {userDetails[0].firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {userDetails[0].lastName}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <p>
              <strong>Email ID:</strong> {userDetails[0].emailId}
            </p>
            <p>
              <strong>Address:</strong> {userDetails[0].address}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <p>
              <strong>Aadhar Number:</strong> {userDetails[0].aadharNumber}
            </p>
            <p>
              <strong>Driving License Number:</strong> {userDetails[0].dlNumber}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <p>
              <strong>Adhar Front Image</strong>
              <img
                src={userDetails[0].aadharFrontImage}
                alt="Aadhar Front Preview"
                className="max-w-full max-h-32"
              />
            </p>
            <p>
              <strong>Adhar Back Image</strong>
              <img
                src={userDetails[0].aadharBackImage}
                alt="Aadhar Back Preview"
                className="max-w-full max-h-32"
              />
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <p>
              <strong>DL Front Image</strong>
              <img
                src={userDetails[0].dlFrontImage}
                alt="DL Front Preview"
                className="max-w-full max-h-32"
              />
            </p>
            <p>
              <strong>DL Back Image</strong>
              <img
                src={userDetails[0].dlBackImage}
                alt="DL Front Preview"
                className="max-w-full max-h-32"
              />
            </p>
          </div>
          {/* Button section */}
          {/* <div className="flex flex-col sm:flex-row justify-evenly mt-6">
          {/* Accept button */}
          {/*
          <button
            onClick={() => handleAccept(userDetails[0]._id)}
            className="w-full sm:w-5/12 px-4 py-2 bg-green-600 text-white rounded hover:bg-indigo-700 mb-2 sm:mb-0"
          >
            Accept
          </button>*/}
          {/* Reject button */}{" "}
          {/*
          <button
            onClick={() => handleReject(userDetails[0]._id)}
            className="w-full sm:w-5/12 px-4 py-2 bg-red-600 text-white rounded hover:bg-indigo-700"
          >
            Reject
          </button>
        </div> */}
        </div>

        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 w-12 h-12 sm:relative sm:w-full sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const UsersList = () => {
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const adminToken = localStorage.getItem("adminToken");

  // console.log(userData,"------------full Users--------------");
  useEffect(() => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${adminToken}`  // Set the token in the headers
    //   }
    // };
    axiosInstanceforAdmin
      .get(
        "/admin/userslist"
        // config
      )
      .then((response) => {
        // Check if the response data is an array before setting the state
        // console.log(response.data);
        if (Array.isArray(response.data)) {
          setUserData(response.data);
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

  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const displayData = userData.filter((item, index) => {
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
    const res = await axiosInstanceforAdmin.put(
      `/admin/userblock/${id}`,
      null
      // config
    );
    console.log(id);

    // console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    const updatedUser = userData.map((i) =>
      i._id === id ? { ...i, blockStatus: true } : i
    );
    setUserData(updatedUser);
  };

  const handleUnblock = async (id) => {
    console.log(id, "");
    console.log("hellooooooooooooooooooooooo");
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${adminToken}`, // Set the token in the headers
    //   },
    // };
    const resss = await axiosInstanceforAdmin.put(
      `/admin/userunblock/${id}`,
      null
      // config
    );
    console.log(id);

    // console.log(resss, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    const updatedUser = userData.map((i) =>
      i._id === id ? { ...i, blockStatus: false } : i
    );
    setUserData(updatedUser);
  };

  const handleViewDetails = async (id) => {
    setIsModalOpen(true);
    console.log("inside view Details before response");
    const fullUserDetails = userData.filter((item) => item._id === id);
    console.log(fullUserDetails,"------fullUserDetails---------");
    setSelectedUserDetails(fullUserDetails);
    console.log(selectedUserDetails, "transfered to modal");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserDetails(null);
  };

  return (
    <div>
      <AdminHeader />
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Users
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {userData.length} users
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
                    {displayData.map((user) => (
                      <tr key={user._id} className="bg-white dark:bg-gray-900">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {user.emailId}
                        </td>
                        {/* <td className="px-12 py-3 text-sm text-green-500 dark:text-green-400 whitespace-nowrap">
                          {user.verificationStatus}
                        </td> */}
                        <td className="py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {user.mobileNumber}
                        </td>
                        <td className="py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleString()}
                        </td>
                        <td className="pr-4 py-3 text-sm font-medium text-right">
                          <button
                            onClick={() => handleViewDetails(user._id)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600"
                          >
                            View Details
                          </button>
                          {user.blockStatus ? (
                            <button
                              onClick={() => handleUnblock(user._id)}
                              className="ml-2 text-green-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                            >
                              UnBlock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBlock(user._id)}
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
                    disabled={currentPage == 1}
                    onClick={handlePrevPage}
                  >
                    Prev
                  </button>
                  <button
                    className="ml-10"
                    disabled={currentPage == totalPages}
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
        <UserDetailsModal
          userDetails={selectedUserDetails}
          closeModal={closeModal}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </div>
  );
};

export default UsersList;
