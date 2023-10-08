import React, { useState, useEffect } from "react";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/user/usershome"
        );
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);


//   console.log(images, "imagessssssssssssss"); // Add this line

  return (
    <div>
      <Splide options={{ rewind: true }} aria-label="React Splide Example">
        {images.map((image, index) => (
          <SplideSlide>
            <img src={image} alt="" />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Carousel;
