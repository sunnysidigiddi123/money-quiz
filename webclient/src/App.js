import "./App.css";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ForgetPassword/ResetPassword"
import UserHome from "./Pages/UserHome/UserHome";
import Livecontest from "./Pages/Livecontest/Livecontest"
import Livecontestnew from "./Pages/Livecontest2/Livecontestnew";
import AppUserHome from "./Pages/AppUserHome/AppUserHome";
import SingleQuizDetail from "./Components/SingleQuizDetail/SingleQuizDetail";
import AppliedContestList from "./Components/AppliedContestList/AppliedContestList";
import SingleQuestion from "./Components/SingleQuestion/SingleQuestion";
import UserProfile from "./Pages/UserProfile/UserProfile";
import UpdateProfile from "./Pages/UserProfile/UpdateProfile";



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
        <Route exact path="/appuserhome" element={<AppUserHome />} />
        <Route exact path="/singlequizdetail" element={<SingleQuizDetail />} />
        <Route exact path="/appliedcontest" element={<AppliedContestList />} />
        <Route exact path="/singlequestion" element={<SingleQuestion />} />
        <Route exact path="/userprofile" element={<UserProfile />} />
        <Route exact path="/updateprofile" element={<UpdateProfile />} />

        
        
        
        
        

        
      </Routes>
    </Router>
  );
}

export default App;
