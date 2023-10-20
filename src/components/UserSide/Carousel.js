import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import axiosInstance from "../../api/axiosInstance";

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get("/user/usershome");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const splideOptions = {
    type: "fade",
    rewind: true,
    pagination: false,
    gap: "1rem",
    autoHeight: true,
    breakpoints: {
      768: {
        fixedWidth: "80%",
      },
      576: {
        fixedWidth: "90%",
      },
      480: {
        fixedWidth: "95%",
      },
    },
  };

  return (
    <div className="carousel-container">
      <Splide options={splideOptions}>
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <img src={image} alt="" className="carousel-image" />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Carousel;
