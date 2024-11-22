import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import SignUp from "./Components/SuperAdmin/SignUp";
import LoginPage from "./Components/Login";
import OtpPage from "./Components/SuperAdmin/OtpPage";
import ForgotPassword from "./Components/SuperAdmin/ForgotPassword";
// import Invitation from "./Components/Invitation";
// import LoginSignup from "./Navigation/LoginSignUp";
import SubAdminLoginPage from "./Components/SubAdmin/SubAdminLoginPage";
import MyProfile from "./Components/SuperAdmin/AddNamesAdmin/MyProfile";
// import AdminName from "./Components/SuperAdmin/AddNamesAdmin/AdminName";
import AllFeatures from "./Components/SuperAdmin/Features/AllFeatures/AllFeatures";
import UpdateAdminName from "./Components/SuperAdmin/AddNamesAdmin/UpdateAdminName";
import Dashboard from "./Components/Dashboard/Dashboard";
import SubAdminPassword from "./Components/SubAdmin/SubAdminPassword";
import SubAdminProfile from "./Components/SubAdmin/SubAdminProfile";
import RootNavigation from "./Navigation/RootNavigation";



const App = () => {
  return (
    <>
      <div className="flex top-0 items-start my-auto">
        {localStorage.getItem("token") && <Navbar />}

        <Routes>
          {/* {localStorage.getItem("token") ? (
            <>
              <Route path="/" element={<AllFeatures />} />
              <Route path="/Header" element={<Header />} />
              <Route path="/AllFeatures" element={<AllFeatures />} />
              <Route path="/MyProfile" element={<MyProfile/>} />

              <Route path="/UpdateAdminName" element={<UpdateAdminName />} />
              <Route path="/Dashboard" element={<Dashboard/>} />
              <Route path="/navbar" element={<Navbar/>} />
              <Route path="/passwordPage" element={<SubAdminPassword/>} />
              <Route path="/subAdminProfile" element={<SubAdminProfile/>} />



            </>
          ):(<>          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/SubAdminLoginPage" element={<SubAdminLoginPage />} />
          <Route path="/OtpPage" element={<OtpPage />} /></>)} */}

<Route path="/" element={<Dashboard/>} />
              <Route path="/Header" element={<Header />} />
              <Route path="/AllFeatures" element={<AllFeatures />} />
              <Route path="/MyProfile" element={<MyProfile/>} />

              <Route path="/UpdateAdminName" element={<UpdateAdminName />} />
              <Route path="/Dashboard" element={<Dashboard/>} />
              <Route path="/navbar" element={<Navbar/>} />
              <Route path="/passwordPage" element={<SubAdminPassword/>} />
              <Route path="/subAdminProfile" element={<SubAdminProfile/>} />
<Route path="/SignUp" element={<SignUp />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/SubAdminLoginPage" element={<SubAdminLoginPage />} />
          <Route path="/OtpPage" element={<OtpPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
