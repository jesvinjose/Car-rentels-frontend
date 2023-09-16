import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/UserSide/Home";
import AdminLogin from "./components/AdminSide/AdminLogin";
import AdminHome from "./components/AdminSide/AdminHome"; // Import your AdminHome component
import VerifyOTP from "./components/UserSide/VerifyOTP";
import RegisterForm from "./components/UserSide/registerForm";
import UserLogin from "./components/UserSide/UserLogin";
import UsersList from "./components/AdminSide/UsersList";
import './index.css'
import VendorRegisterForm from "./components/VendorSide/VendorRegisterForm";
import VendorVerifyOTP from "./components/VendorSide/VendorVerifyOTP";
import VendorLogin from "./components/VendorSide/VendorLogin";
import VendorHome from "./components/VendorSide/VendorHome";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/verifyOTP" element={<VerifyOTP/>}/>
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/logout" element={<UserLogin/>}/>
          {/* Define your Home component */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminHome />} /> {/* Add this route */}
          <Route path="/userslist" element={<UsersList/>}/>
          <Route path="/vendorregister" element={<VendorRegisterForm/>}/>
          <Route path="/vendorverifyOTP" element={<VendorVerifyOTP/>}/>
          <Route path="/vendorlogin" element={<VendorLogin/>}/>
          <Route path="/vendorHome" element={<VendorHome/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
