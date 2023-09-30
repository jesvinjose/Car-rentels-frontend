import React from "react";
import economy from "../../assets/02_economy_red-1.png";
import luxury from "../../assets/luxury-car-e1600161258813.png";
import standard from "../../assets/standard.png";

const CarTypes = () => {
  // Sample data for car types
  const carTypes = [
    {
      name: "Economy",
      description: "Affordable and compact cars",
      image: economy,
      offerPercentage: 15,
    },
    {
      name: "Standard",
      description: "Mid-range standard cars",
      image: standard,
      offerPercentage: 10,
    },
    {
      name: "Luxury",
      description: "Luxury high-end cars",
      image: luxury,
      offerPercentage: 20,
    },
  ];

  return (
    <div>
      <div className="flex justify-center">
        {carTypes.map((carType, index) => (
          <div
            className="car-type ml-5 border shadow-2xl mt-4 mb-3 w-full "
            key={index}
          >
            <div className="single_product_img pl-10">
              <img
                src={carType.image}
                className="img-fluid"
                alt={carType.name}
              />
            </div>
            <div className="single_product_content font-serif ml-4 mb-2">
              <h2>
                <a href="single-product">{carType.name} Collection</a>
              </h2>

              <button className="border border-black w-28 rounded-lg bg-lime-100 hover:bg-lime-400 shadow-md">
                <a
                  href={`/car_list?category=${carType.name}`}
                  className="btn_3"
                >
                  Explore Now
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarTypes;
