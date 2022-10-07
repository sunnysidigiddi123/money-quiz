import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import SidenavBar from "../../Components/SidenavBar";
import "./Contest.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const QuestionForm = () => {
  const [user, setUser] = useState("");
  const [option, setoption] = useState("");

  const getUser = async () => {
    const token = sessionStorage.getItem("token");
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}/home`;
    try {
      let data = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data.user);
    } catch (e) {
      // console.log(e.response)
    }
  };

  const handleChange = (e) =>{
    setoption(e.target.value);
    //console.log(e.target.value);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header user={user} />

      <SidenavBar />

      <div className="mobile-menu-overlay"></div>

      <div className="main-container admincontainer">
        <div className="pd-ltr-20">
          <div className="card-box mb-30 admincreate">
            <p>
              Create Questions
            </p>
            <div>
                {" "}
                <div className="form-group col-md-6">
                  <label for="exampleFormControlSelect1">Select Question Type</label>
                  <select className="form-control" id="exampleFormControlSelect1" onChange={handleChange}>
                  <option>Select</option>
                    <option>MCQ</option>
                    <option>Yes/No</option>
                  </select>
                </div>
              </div>
              {option === "MCQ" &&
              <>
            <form>
              <div className="form-row">
                <div className="col">
                  <label for="question">
                    <h5>Question</h5>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your question here"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label for="inputOptionA">Option-A</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Option-A"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label for="inputOptionB">Option-B</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Option-B"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label for="inputOptionC">Option-C</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Option-C"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label for="inputOptionD">Option-D</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Option-D"
                  />
                </div>
              </div>
              <div>
                {" "}
                <div className="form-group col-md-6">
                  <label for="exampleFormControlSelect1">Select Correct Answer</label>
                  <select className="form-control" id="exampleFormControlSelect1">
                    <option>Option-A</option>
                    <option>Option-B</option>
                    <option>Option-C</option>
                    <option>Option-D</option>
                  </select>
                </div>
              </div>
            </form>
            </>}
            {option === "Yes/No" &&
              <>
            <form>
             
              <div className="form-row">
                <div className="col">
                  <label for="question">
                    <h5>Question</h5>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your question here"
                  />
                </div>
              </div>
              <div>
                {" "}
                <div className="form-group col-md-6">
                  <label for="exampleFormControlSelect1">Select Correct Answer</label>
                  <select className="form-control" id="exampleFormControlSelect1">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
            </form>
            </>}
          </div>
          {/* <div className="footer-wrap pd-20 mb-20 card-box adminfooter">
            MoneyQuiz - Copyright © 2022 By <Link to="/adminhome">Calance</Link>
          </div> */}
          {/* <Footer /> */}
        </div>
      </div>

      <ToastContainer autoClose={7000} />
    </>
  );
};

export default QuestionForm;


