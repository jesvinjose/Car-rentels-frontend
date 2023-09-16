import React from "react";
import ownacar from "../../assets/ownacar.png";
import { Link } from "react-router-dom";
const VendorSignUpBar = () => {
  return (
    <div>
      {/* <div>
        <img src={ownacar}></img>
      </div>
      <div className="w-25 ml-5 mt-20 border border-black mb-5">
        <p>
          OWN A CAR? Sign up to BE A HOST TO SHARE YOUR CAR ON car--rentals.{" "}
        </p>
        <div className="flex justify-center border border-red-100">
          <button className="w-40 bg-red-400 mt-5 rounded-md">Sign Up</button>
        </div>
        <div className="flex justify-center border border-green-100 ">
          <div className="mt-35">
            <p className="mt-5">Own an host account?</p>
          </div>

          <div>
            <div className="flex justify-center border border-red-100">
              <button className="w-40 bg-red-400 mt-5 rounded-md">Login</button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="h-fit w-fit flex justify-center mt-5 mb-5">
        <div className="w-fit h-fit flex ">
          <div className=" w-fit h-1/2 ">
            <img className="w-fit h-64" src={ownacar}></img>
          </div>
          <div className="sign">
            <p className="ml-10 mt-10 text-xl font-semibold">
              OWN A CAR? Sign up to BE A HOST TO SHARE YOUR CAR ON car--rentals.{" "}
            </p>
            <div className="flex justify-center mt-3">
              <Link to="/vendorregister">
                <button className="bg-green-500 w-24 text-white rounded-md font-serif h-10 hover:bg-green-600 cursor-pointer">
                  Signup
                </button>
              </Link>
            </div>
            <div className="flex justify-center ">
              <div className=" mt-9">
                <p className="mt-5">Own an host account?</p>
              </div>
            </div>
            <div className="text-center ">
              <Link to="/vendorlogin">
                <button className="bg-green-500 w-24 text-white rounded-md font-serif h-10 hover:bg-green-600 cursor-pointer mt-5">
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
