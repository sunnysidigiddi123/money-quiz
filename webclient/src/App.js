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
import QuizTodayList from "./Components/QuizTodayList/QuizTodayList";
import SingleQuestion from "./Components/SingleQuestion/SingleQuestion";


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
        <Route exact path="/quiztodaylist" element={<QuizTodayList />} />
        <Route exact path="/singlequestion" element={<SingleQuestion />} />
        
        
        

        
      </Routes>
    </Router>
  );
}

export default App;
