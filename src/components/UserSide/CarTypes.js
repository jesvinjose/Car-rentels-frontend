import React from "react";
import economy from "../../assets/02_economy_red-1.png";
import luxury from "../../assets/luxury-car-e1600161258813.png";
import standard from "../../assets/standard.png";

const CarTypes = () => {
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
    <div className="container">
      <div className="row justify-content-center">
        {carTypes.map((carType, index) => (
          <div
            className="col-lg-4 col-md-6 col-sm-12 mb-4"
            key={index}
          >
            <div className="border shadow-lg p-4 h-100 mt-5">
              <div className="single_product_img">
                <img
                  src={carType.image}
                  className="img-fluid"
                  alt={carType.name}
                />
              </div>
              <div className="single_product_content mt-3">
                <h2>
                  <p>{carType.name} Collection</p>
                </h2>

                <button className="btn btn-outline-dark w-100 mt-3">
                  <a
                    href={`/car_list?category=${carType.name}`}
                    className="btn_3"
                  >
                    Explore Now
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarTypes;
