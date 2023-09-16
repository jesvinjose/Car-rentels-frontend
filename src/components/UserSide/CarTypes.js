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
      name: "Luxurious",
      description: "Luxury high-end cars",
      image: luxury,
      offerPercentage: 20,
    },
  ];

  return (
  //   <section className="single_product_list ">
  //     <div className="container flex">
  //       <div className="row">
  //         {carTypes.map((carType, index) => (
  //           <div className="car-type" key={index}>
  //             <div className="single_product_img">
  //               <img
  //                 src={carType.image}
  //                 className="img-fluid"
  //                 alt={carType.name}
  //               />
  //             </div>
  //             <div className="single_product_content">
  //               <h5>{carType.name}</h5>
  //               <h2>
  //                 <a href="single-product">{carType.name}'s Collection</a>
  //               </h2>
  //               <a
  //                 href={`/product_list?category=${carType.name}`}
  //                 className="btn_3"
  //               >
  //                 Explore Now
  //               </a>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </section>
    <div>
      <div className="flex justify-center">
      {carTypes.map((carType, index) => (
            <div className="car-type ml-5 border shadow-2xl mt-4 mb-3 w-full " key={index}>
              <div className="single_product_img pl-10">
                <img
                  src={carType.image}
                  className="img-fluid"
                  alt={carType.name}
                />
              </div>
              <div className="single_product_content font-serif ml-4 mb-2">
                <h5>{carType.name}</h5>
                <h2>
                  <a href="single-product">{carType.name}'s Collection</a>
                </h2>
                {/* <a
                  href={`/product_list?category=${carType.name}`}
                  className="btn_3"
                >
                  Explore Now
                </a> */}
                <button className="border border-black w-28 rounded-lg bg-lime-100 hover:bg-lime-400 shadow-md">Explore Now</button>
              </div>
            </div>
          ))}

      </div>

    </div>
  );
  
};

export default CarTypes;
