import React, { useState } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import { useNavigate } from 'react-router-dom';

const CarouselRegister = () => {
  const [carouselName, setCarouselName] = useState('');
  const [carouselImages, setCarouselImages] = useState([]);
  const [carouselDescription, setCarouselDescription] = useState('');
  const navigate=useNavigate();

  const handleImageChange = (event) => {
    setCarouselImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(carouselImages,"----------carouselImages");
    const formData = new FormData();
    formData.append('carouselName', carouselName);
    formData.append('carouselDescription', carouselDescription);

    for (let i = 0; i < carouselImages.length; i++) {
      formData.append('carouselImages', carouselImages[i]);
    }


    try {
      const response = await axios.post('http://localhost:5000/admin/addCarousels', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
      console.log('Carousel registered successfully:', response.data);
      navigate('/admin/carousels');
    } catch (error) {
      console.error('Error registering carousel:', error);
    }
  };

  return (
    <div>
      <AdminHeader/>
      <h1>Add New Carousel</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="carouselName"
          placeholder="Enter Category Name"
          value={carouselName}
          onChange={(e) => setCarouselName(e.target.value)}
        />
        <br />
        <br />
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
          placeholder="Enter Carousel Description"
          value={carouselDescription}
          onChange={(e) => setCarouselDescription(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Add Carousel" />
        <br />
        <br />
      </form>
    </div>
  );
};

export default CarouselRegister;
