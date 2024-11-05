import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header"


const App = () => {
  return (

      <>

<div className="flex top-0 items-start my-auto">
<Navbar/>



 <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/Header" element={<Header />} />
      </Routes>
      </div>
      </>

  );
};

export default App;
