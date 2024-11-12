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
import AdminName from "./Components/SuperAdmin/AddNamesAdmin/AdminName";

const App = () => {
  return (
    <>
      <div className="flex top-0 items-start my-auto">
        {localStorage.getItem("authAdmin") && <Navbar />}

        <Routes>
          {localStorage.getItem("adminAuth") && (
            <>
              <Route path="/" element={<Navbar />} />
              <Route path="/Header" element={<Header />} />
              <Route path="/MyProfile" element={<MyProfile/>} />
              <Route path="/AdminName" element={<AdminName />} />


            </>
          )}

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
