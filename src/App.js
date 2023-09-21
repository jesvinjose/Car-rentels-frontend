import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/UserSide/Home";
import AdminLogin from "./components/AdminSide/AdminLogin";
import AdminHome from "./components/AdminSide/AdminHeader"; // Import your AdminHome component
import VerifyOTP from "./components/UserSide/VerifyOTP";
import RegisterForm from "./components/UserSide/registerForm";
import UserLogin from "./components/UserSide/UserLogin";
import UsersList from "./components/AdminSide/UsersList";
import './index.css'
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
import CarRentalRates from "./components/AdminSide/CarRentalRates";
import CarTypeRegister from "./components/AdminSide/CarTypeRegister";




function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/verifyOTP" element={<VerifyOTP/>}/>
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/logout" element={<UserLogin/>}/>
          <Route path="/userprofile/:userId" element={<UserProfile/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/verifyOTP4PasswordReset" element={<VerifyOTP4PasswordReset/>}/>
          <Route path="/PasswordReset" element={<PasswordReset/>}/>
          {/* Define your Home component */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminHome />} /> {/* Add this route */}
          <Route path="/userslist" element={<UsersList/>}/>
          <Route path="/vendorslist" element={<VendorsList/>}/>
          <Route path="/vendorregister" element={<VendorRegisterForm/>}/>
          <Route path="/vendorverifyOTP" element={<VendorVerifyOTP/>}/>
          <Route path="/vendorlogin" element={<VendorLogin/>}/>
          <Route path="/vendorHome" element={<VendorHome/>}/>
          <Route path="/vendorprofile/:vendorId" element={<VendorProfile/>}/>
          <Route path="/carrentalrates" element={<CarRentalRates/>}/>
          <Route path="/addnewcartype" element={<CarTypeRegister/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
