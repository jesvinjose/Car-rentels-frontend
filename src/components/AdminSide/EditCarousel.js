import React, { useEffect, useState } from "react";
import axiosInstanceforAdmin from "../../api/axiosInstanceforAdmin";
import AdminHeader from "./AdminHeader";
import { useParams, useNavigate } from "react-router-dom";

const EditCarousel = () => {
  const { carouselId } = useParams(); // Extract carouselId from URL
  // console.log(carouselId,"carouselId");
  const navigate = useNavigate();

  const [carouselDetails, setCarouselDetails] = useState({});

  
  const fetchData = async () => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${adminToken}`, // Set the token in the headers
    //   },
    // };
    const response = await axiosInstanceforAdmin.get(
      `/admin/loadEditCarousel/${carouselId}`,
      // config
    );
    setCarouselDetails(response.data);
    console.log(carouselDetails, "carouselsdata");
  };

  useEffect(() => {
    fetchData();
  }, []);


  console.log(carouselDetails);
  const [carouselName, setCarouselName] = useState("");
  const [carouselImages, setCarouselImages] = useState("");
  const [carouselDescription, setCarouselDescription] = useState("");

  const handleImageChange = (event) => {
    setCarouselImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(carouselImages, "----------carouselImages");
    const formData = new FormData();
    formData.append("carouselName", carouselName);
    formData.append("carouselDescription", carouselDescription);

    for (let i = 0; i < carouselImages.length; i++) {
      formData.append("carouselImages", carouselImages[i]);
    }

    try {
      const config = {
        headers: {
          // Authorization: `Bearer ${adminToken}`, // Set the token in the headers
          "Content-Type": "multipart/form-data", // Set the content type for multipart form data
        },
      };
      const response = await axiosInstanceforAdmin.put(
        `/admin/editCarousel/${carouselId}`,
        formData,
        config
      );
      console.log("Carousel editted successfully:", response.data);
      if (navigate) {
        navigate("/admin/carousels");
      }
    } catch (error) {
      console.error("Error registering carousel:", error);
    }
  };

  return (
    <div>
      <AdminHeader />
      <h1>Edit Carousel</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="carouselName"
          placeholder={carouselDetails.carouselName}
          value={carouselName}
          onChange={(e) => setCarouselName(e.target.value)}
        />
        <br />
        <br />
        <p>Preview</p>
        {carouselDetails.carouselImages && (
          <div className="flex justify-center">
            {carouselDetails.carouselImages.map((image, index) => (
              <div key={index} style={{ marginRight: "10px" }}>
                <img
                  src={image}
                  alt={`Carousel Preview ${index}`}
                  style={{ maxWidth: "100%", maxHeight: "100px" }}
                />
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          name="carouselImages"
          placeholder="Upload files"
          multiple
          onChange={handleImageChange}
        />
        <br />
        <br />

        <input
          type="text"
          name="carouselDescription"
          placeholder={carouselDetails.carouselDescription}
          value={carouselDescription}
          onChange={(e) => setCarouselDescription(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Update Carousel" />
        <br />
        <br />
      </form>
    </div>
  );
};

export default EditCarousel;
