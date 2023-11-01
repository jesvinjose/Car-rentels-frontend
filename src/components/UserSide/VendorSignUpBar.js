import React from "react";
import ownacar from "../../assets/ownacar.png";
import { Link } from "react-router-dom";
const VendorSignUpBar = () => {
  return (
    <div>
      <div className="h-fit w-fit flex flex-col justify-center mt-5 mb-5 md:flex-row">
        <div className="w-fit h-fit flex flex-col md:flex-row">
          <div className="w-fit h-1/2">
            <img className="w-full h-auto" src={ownacar} alt="Own a car" />
          </div>
          <div className="sign mt-5 md:mt-0 md:ml-10 text-center">
            <p className="text-xl font-semibold">
              OWN A CAR? Sign up to BE A HOST TO SHARE YOUR CAR ON car--rentals.
            </p>
            <div className="flex flex-col items-center mt-3 md:flex-row">
              <Link to="/vendorregister">
                <button className="bg-green-500 w-24 text-white rounded-md font-serif h-10 hover:bg-green-600 cursor-pointer mt-3 md:mt-0 md:ml-3">
                  Signup
                </button>
              </Link>
              <div className="mt-3 md:mt-0 md:ml-5">
                <p className="md:text-center">Own a host account?</p>
              </div>
              <Link to="/vendorlogin">
                <button className="bg-green-500 w-24 text-white rounded-md font-serif h-10 hover:bg-green-600 cursor-pointer mt-3 md:mt-0 md:ml-3">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSignUpBar;
