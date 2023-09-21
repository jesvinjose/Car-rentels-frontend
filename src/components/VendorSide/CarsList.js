import React, { useEffect } from "react";
import axios from 'axios';
import VendorHeader from './VendorHeader';

const CarsList=()=>{
    const [carData,setCarData]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/vendor/carslist")
    })
}