import "./App.css";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ForgetPassword/ResetPassword"
import UserHome from "./Pages/UserHome/UserHome";
import Livecontest from "./Pages/Livecontest/Livecontest"
import Livecontestnew from "./Pages/Livecontest2/Livecontestnew";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/forgetpassword" element={<ForgetPassword />} />
        <Route exact path="/resetPassword" element={<ResetPassword />} />
        <Route exact path="/userhome" element={<UserHome />} />
        <Route exact path="/livecontest" element={<Livecontest />} />
        <Route exact path="/livecontestnew" element={<Livecontestnew />} />
      </Routes>
    </Router>
  );
}

export default App;
