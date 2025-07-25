import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
import ForgotPassword from "./components/UserSide/ForgotPassword";
import VerifyOTP4PasswordReset from "./components/UserSide/VerifyOTP4PasswordReset";
import PasswordReset from "./components/UserSide/PasswordReset";
import VendorProfile from "./components/VendorSide/VendorProfile";
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
import EditCarousel from "./components/AdminSide/EditCarousel";
import GoogleSignUpForm from "./components/UserSide/GoogleSignUpForm";
import CarDetails from "./components/UserSide/CarDetails";
import { PrivateRoutesAdminSide } from "./components/utils/PrivateRoutesAdminSide";
import GoogleSignUpFormVendorSide from "./components/VendorSide/GoogleSignUpFormVendorSide";

import BookingInfo from "./components/UserSide/BookingInfo";
import BookingsList from "./components/VendorSide/BookingsList";
import BookingSuccessPage from "./components/UserSide/BookingSuccessPage";
import BookingHistory from "./components/UserSide/BookingHistory";
import BookingsListAdminSide from "./components/AdminSide/BookingsListAdminSide";
import NotFound from "./components/UserSide/NotFound";
import AdminDashboard from "./components/AdminSide/AdminDashboard";
import ChatContainer from "./components/UserSide/ChatContainer";
import ChatContainerVendorSide from "./components/VendorSide/ChatContainerVendorSide";
import VenderDashBoard from "./components/VendorSide/VenderDashBoard";
import AboutPage from "./components/UserSide/About";
import Contact from "./components/UserSide/Contact";
import Profile from "./components/UserSide/Profile";


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route
            path="/userprofile/:userId"
            element={<PrivateRoutes Component={UserProfile} />}
          /> */}

          <Route path="/usershome" element={<UsersHome />} />
          <Route path="/" element={<Home />} />
          <Route path="/allcars" element={<AllCars />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<UserLogin />}/>

          <Route
            path="/userprofile/:userId"
            element={<PrivateRoutes Component={Profile} />}
          />
          {/* <Route path="/bookingslist" element={<BookingsList />} /> */}

          <Route
            path="/bookingslist"
            element={<PrivateRoutesVendorSide Component={BookingsList} />}
          />

          <Route
            path="/booking_history"
            element={<PrivateRoutes Component={BookingHistory} />}
          />

          <Route
            path="/booking_details"
            element={<PrivateRoutes Component={BookingInfo} />}
          />

          <Route
            path="/booking_success"
            element={<PrivateRoutes Component={BookingSuccessPage} />}
          />

          <Route element={<RegisterForm />} path="/register" />
          <Route
            path="/googlesignupform/:email"
            element={<GoogleSignUpForm />}
          />
          <Route
            path="/googlesignupformvendorside/:email"
            element={<GoogleSignUpFormVendorSide />}
          />
          <Route element={<VerifyOTP />} path="/verifyOTP" />

          <Route element={<UserLogin />} path="/logout" />
          <Route element={<ForgotPassword />} path="/forgotpassword" />
          <Route path="/car_list" element={<CategorywiseCars />} />
          <Route path="/car_details" element={<CarDetails />} />


          <Route
            element={<ForgotPassword4Vendor />}
            path="/forgotpassword4vendor"
          />
          <Route
            path="/verifyOTP4PasswordReset"
            element={<VerifyOTP4PasswordReset />}
          />
          <Route
            path="/verifyOTP4PasswordReset4Vendor"
            element={<VerifyOTP4PasswordReset4Vendor />}
          />

          <Route path="/PasswordReset" element={<PasswordReset />} />
          <Route
            path="/PasswordReset4Vendor"
            element={<PasswordReset4Vendor />}
          />

          <Route path="/vendorregister" element={<VendorRegisterForm />} />
          <Route path="/vendorverifyOTP" element={<VendorVerifyOTP />} />
          <Route path="/vendorlogin" element={<VendorLogin />} />
          <Route path="/vendorHome" element={<VendorHome />} />

          <Route
            path="/vendorprofile/:vendorId"
            element={<PrivateRoutesVendorSide Component={VendorProfile} />}
          />
          {/* <Route path="/carsList/:vendorId" element={<CarsList/>} /> */}
          <Route
            path="/carsList/:vendorId"
            element={<PrivateRoutesVendorSide Component={CarsList} />}
          />
          {/* <Route path="/addnewcar/:vendorId" element={<CarRegister/>} /> */}
          <Route
            path="/addnewcar/:vendorId"
            element={<PrivateRoutesVendorSide Component={CarRegister} />}
          />

          {/* <Route path="/admin/home" element={<AdminHome />} />{" "} */}
          <Route
            path="/admin/home"
            element={<PrivateRoutesAdminSide Component={AdminHome} />}
          />

          {/* Define your AdminHome component */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* <Route path="/admin/userslist" element={<UsersList />} /> */}
          <Route
            path="/admin/userslist"
            element={<PrivateRoutesAdminSide Component={UsersList} />}
          />

          <Route path="/vendorDashboard" element={<VenderDashBoard />} />

          {/* <Route path="/admin/vendorslist" element={<VendorsList />} /> */}
          <Route
            path="/admin/vendorslist"
            element={<PrivateRoutesAdminSide Component={VendorsList} />}
          />

          {/* <Route
            path="/admin/carslistadminside"
            element={<CarsListAdminSide />}
          /> */}
          <Route
            path="/admin/carslistadminside"
            element={<PrivateRoutesAdminSide Component={CarsListAdminSide} />}
          />

          {/* <Route path="/admin/carrentalrates" element={<CarRentalRates />} /> */}
          {/* <Route path="/addnewcartype" element={<CarTypeRegister />} /> */}

          {/* <Route path="/admin/carousels" element={<CarouselList />} /> */}
          <Route
            path="/admin/carousels"
            element={<PrivateRoutesAdminSide Component={CarouselList} />}
          />

          {/* <Route path="/addnewcarousel" element={<CarouselRegister />} /> */}
          <Route
            path="/addnewcarousel"
            element={<PrivateRoutesAdminSide Component={CarouselRegister} />}
          />

          {/* <Route path="/editcarousel/:carouselId" element={<EditCarousel />} /> */}
          <Route
            path="/editcarousel/:carouselId"
            element={<PrivateRoutesAdminSide Component={EditCarousel} />}
          />

          <Route
            path="/bookings_list_adminside"
            element={
              <PrivateRoutesAdminSide Component={BookingsListAdminSide} />
            }
          />

          <Route path="/404" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />

          <Route
            path="/admin/dashboard"
            element={<PrivateRoutesAdminSide Component={AdminDashboard} />}
          />

          <Route
            path="/chat_with_vendor/:bookingId/:userId/:vendorId"
            element={<PrivateRoutes Component={ChatContainer} />}
          />

          <Route
            path="/chat_with_user/:bookingId/:userId/:vendorId"
            element={
              <PrivateRoutesVendorSide Component={ChatContainerVendorSide} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
