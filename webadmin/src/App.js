import "./App.css";
import Login from "./Pages/Login/Login";
import AdminSignUp from "./Pages/AdminSignup/AdminSignup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ForgetPassword/ResetPassword";
import AdminHome from "./Pages/AdminHome/AdminHome";
import AdHome from "./Pages/AdHome/AdHome";
import Contest from "./Pages/Contest/Contest"
import Ads from "./Pages/Ads/Ads";




function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<AdminSignUp />} />
        <Route exact path="/forgetpassword" element={<ForgetPassword />} />
        <Route exact path="/resetPassword" element={<ResetPassword />} />
        <Route exact path="/adminhome" element={<AdminHome />} />
        <Route exact path="/adhome" element={<AdHome />} />
        <Route exact path="/contest" element={<Contest />} /> 
        <Route exact path="/contestlist" element={<Contest />} /> 
        <Route exact path="/adslist" element={<Contest />} /> 
        <Route exact path="/ads" element={<Ads />} /> 
        
      </Routes>
    </Router>
  );
}

export default App;
