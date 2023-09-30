import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/UserSide/Home";
import AdminLogin from "./components/AdminSide/AdminLogin";
import AdminHome from "./components/AdminSide/AdminHeader"; // Import your AdminHome component
import VerifyOTP from "./components/UserSide/VerifyOTP";
import RegisterForm from "./components/UserSide/registerForm";
import UserLogin from "./components/UserSide/UserLogin";
import UsersList from "./components/AdminSide/UsersList";
import "./index.css";
import VendorRegisterForm from "./components/VendorSide/VendorRegisterForm";
import VendorVerifyOTP from "./components/VendorSide/VendorVerifyOTP";
import VendorLogin from "./components/VendorSide/VendorLogin";
import VendorHome from "./components/VendorSide/VendorHome";
import VendorsList from "./components/AdminSide/VendorsList";
import UserProfile from "./components/UserSide/UserProfile";
import ForgotPassword from "./components/UserSide/ForgotPassword";
import VerifyOTP4PasswordReset from "./components/UserSide/VerifyOTP4PasswordReset";
import PasswordReset from "./components/UserSide/PasswordReset";
import VendorProfile from "./components/VendorSide/VendorProfile";
// import CarRentalRates from "./components/AdminSide/CarRentalRates";
// import CarTypeRegister from "./components/AdminSide/CarTypeRegister";
import CarsList from "./components/VendorSide/CarsList";
import CarRegister from "./components/VendorSide/CarRegister";
import CarsListAdminSide from "./components/AdminSide/CarsListAdminSide";
import UsersHome from "./components/UserSide/UsersHome";
import { PrivateRoutes } from "./components/utils/PrivateRoutes";
import AllCars from "./components/UserSide/AllCars";
import { PrivateRoutesVendorSide } from "./components/utils/PrivateRoutesVendorSide";
import ForgotPassword4Vendor from "./components/VendorSide/ForgotPassword4Vendor";
import VerifyOTP4PasswordReset4Vendor from "./components/VendorSide/VerifyOTP4PasswordReset4Vendor";
import PasswordReset4Vendor from "./components/VendorSide/PasswordReset4Vendor";
import CategorywiseCars from "./components/UserSide/CategorywiseCars";
import CarouselList from "./components/AdminSide/CarouselList";
import CarouselRegister from "./components/AdminSide/CarouselRegister";

function App() {
  const vendorId = localStorage.getItem("vendorId");
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/userprofile/:userId" element={<PrivateRoutes Component={UserProfile} />} />
          <Route path="/vendorprofile/:vendorId" element={<PrivateRoutesVendorSide Component={VendorProfile} />} />

          
          <Route element={<UsersHome />} path="/usershome" />
          <Route path="/" element={<Home />} />
          <Route element={<RegisterForm />} path="/register" />
          <Route element={<VerifyOTP />} path="/verifyOTP" />
          <Route element={<UserLogin />} path="/login" />
          <Route element={<UserLogin />} path="/logout" />
          <Route element={<ForgotPassword />} path="/forgotpassword" />
          <Route element={<ForgotPassword4Vendor/>} path="/forgotpassword4vendor"/>
          <Route
            path="/verifyOTP4PasswordReset"
            element={<VerifyOTP4PasswordReset />}
          />
          <Route path="/verifyOTP4PasswordReset4Vendor"element={<VerifyOTP4PasswordReset4Vendor/>}/>
          <Route path="/allcars" element={<AllCars />} />
          <Route path="/PasswordReset" element={<PasswordReset />} />
          <Route path="/PasswordReset4Vendor" element={<PasswordReset4Vendor />} />
          <Route path="/car_list" element={<CategorywiseCars/>}/>
          
          {/* Define your Home component */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminHome />} />{" "}
          <Route path="/admin/userslist" element={<UsersList />} />
          <Route path="/admin/vendorslist" element={<VendorsList />} />
          <Route path="/vendorregister" element={<VendorRegisterForm />} />
          <Route path="/vendorverifyOTP" element={<VendorVerifyOTP />} />
          <Route path="/vendorlogin" element={<VendorLogin />} />
          <Route path="/vendorHome" element={<VendorHome />} />
          
          {/* <Route path="/admin/carrentalrates" element={<CarRentalRates />} /> */}
          {/* <Route path="/addnewcartype" element={<CarTypeRegister />} /> */}
          <Route path="/carsList" element={<CarsList vendorId={vendorId} />} />
          <Route path="/addnewcar" element={<CarRegister />} />
          <Route
            path="/admin/carslistadminside"
            element={<CarsListAdminSide />}
          />
          <Route path="/admin/carousels" element={<CarouselList/>}/>
          <Route path="/addnewcarousel" element={<CarouselRegister/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
