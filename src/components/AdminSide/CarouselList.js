import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import axiosInstanceforAdmin from "../../api/axiosInstanceforAdmin";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CarouselList = () => {
  const navigate = useNavigate();
  const [carouselData, setCarouselData] = useState([]);
  // const adminToken = localStorage.getItem("adminToken");
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    fetchCarouselData();
  }, []);

  useEffect(() => {}, [carouselData]);

  const fetchCarouselData = async () => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${adminToken}`, // Set the token in the headers
    //   },
    // };
    try {
      const response = await axiosInstanceforAdmin.get(
        "/admin/carouselslist"
        // config
      );
      if (Array.isArray(response.data)) {
        setCarouselData(response.data);
      } else {
        console.error("Invalid data received from the server:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(carouselData.length / itemsPerPage);

  const displayData = carouselData.filter((item, index) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return index >= startIndex && index < endIndex;
  });


  const handleBlock = async (id) => {
    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${adminToken}`, // Set the token in the headers
      //   },
      // };
      await axiosInstanceforAdmin.put(
        `/admin/carouselblock/${id}`,
        null
        // config
      );
      const updatedCarousel = carouselData.map((i) =>
        i._id === id ? { ...i, blockStatus: true } : i
      );
      setCarouselData(updatedCarousel);
    } catch (error) {
      console.error("Error blocking carousel:", error);
    }
  };

  const handleUnblock = async (id) => {
    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${adminToken}`, // Set the token in the headers
      //   },
      // };
      await axiosInstanceforAdmin.put(
        `/admin/carouselunblock/${id}`,
        null
        // config
      );
      const updatedCarousel = carouselData.map((i) =>
        i._id === id ? { ...i, blockStatus: false } : i
      );
      setCarouselData(updatedCarousel);
    } catch (error) {
      console.error("Error unblocking carousel:", error);
    }
  };

  const handleDelete = (carouselId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this carousel?"
    );
    if (confirmDelete) {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${adminToken}`
      //   }
      // };
      axiosInstanceforAdmin
        .delete(`/admin/delete-carousel/${carouselId}`)
        .then((response) => {
          console.log("Carousel deleted successfully");
          fetchCarouselData(); // Fetch updated carousel data
          navigate("/admin/carousels"); // Navigate to the carousel page
        })
        .catch((error) => {
          console.error("Error deleting carousel:", error);
        });
    }
  };

  return (
    <div>
      <AdminHeader />
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Carousels
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {carouselData.length} carousels
          </span>
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            <Link to="/addnewcarousel">Add New Carousel</Link>
          </h2>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-x-3">
                          <span>Carousel Name</span>
                        </div>
                      </th>
                      <th className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <button className="flex items-center gap-x-2">
                          <span>Carousel Images</span>
                          {/* <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Your SVG icon here */}
                          {/* </svg> */}
                        </button>
                      </th>
                      <th className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Carousel Description
                      </th>
                      <th className="py-3.5 pr-4 text-sm font-normal text-right text-gray-500 dark:text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {displayData.map((carousel) => (
                      <tr
                        key={carousel._id}
                        className="bg-white dark:bg-gray-900"
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {carousel.carouselName}
                        </td>
                        <td>
                          {carousel.carouselImages.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt=""
                              width="50px"
                              height="50px"
                            />
                          ))}
                        </td>
                        <td className="py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {carousel.carouselDescription}
                        </td>
                        <td className="pr-4 py-3 text-sm font-medium text-right">
                          {carousel.blockStatus ? (
                            <button
                              onClick={() =>
                                handleUnblock(carousel._id, "Enable")
                              }
                              className="ml-2 text-green-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                            >
                              Enable
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleBlock(carousel._id, "Disable")
                              }
                              className="ml-2 text-red-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                            >
                              Disable
                            </button>
                          )}
                          <Link
                            to={`/editcarousel/${carousel._id}`}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(carousel._id)}
                          >
                            Delete
                          </button>
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
    </div>
  );
};

export default CarouselList;
