import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header"
import SignUp from "./Components/SuperAdmin/SignUp";
import LoginPage from "./Components/Login";
import Invitation from "./Components/Invitation";


const App = () => {
  return (

      <>

<div className="flex top-0 items-start my-auto">
<Navbar/>



 <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Header" element={<Header />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Invitation" element={<Invitation />} />
      </Routes>
      </div>
      </>

  );
};

export default App;
