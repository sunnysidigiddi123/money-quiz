import "./App.css";
import Login from "./Pages/Login/Login";
import AdminSignUp from "./Pages/AdminSignup/AdminSignup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ForgetPassword/ResetPassword";
import AdminHome from "./Pages/AdminHome/AdminHome";
import Contest from "./Pages/Contest/Contest"




function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<AdminSignUp />} />
        <Route exact path="/forgetpassword" element={<ForgetPassword />} />
        <Route exact path="/resetPassword" element={<ResetPassword />} />
        <Route exact path="/adminhome" element={<AdminHome />} />
        <Route exact path="/contest" element={<Contest />} /> 
        
      </Routes>
    </Router>
  );
}

export default App;
