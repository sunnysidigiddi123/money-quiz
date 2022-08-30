import React, { useState } from "react";
import { useNavigate, useLocation,Link } from "react-router-dom";
import hidePasswordImg from "./images/eyesslash.svg";
import showPasswordImg from "./images/eyes.svg";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";


function ResetPassword() {
  const [currentPage, setcurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  //const { email } = location.state;
  const [otpCode, setotpCode] = useState();
  const [newPassword, setnewPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [error, setError] = useState({ errorName: "", errorMsg: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const [showmessage, setshowMesaage] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  const handleOTPVerification = (e) =>{
	e.preventDefault();
	if(validations()){
		handleSubmit();
	}
  }

  function validations() {
    if (!otpCode) {
      setError({
        errorName: "otpCode",
        errorMsg: "Invalid OTP",
      });
      return false;
    }
    return true;
  }

  async function handleSubmit() {
	const { email } = location.state;
   
      const sendData = {
        email,
        otpCode,
      };
      const BASE_URL = `${process.env.REACT_APP_BASE_URL}/otp-verification`;
      try {
        const data = await axios.post(BASE_URL, sendData);
        //navigate("/reset-password");
        //console.log(data);
        setToastMessage(data.data.message);
        setshowMesaage(true);
		if(data.data.status===1){
      setToastColor("success");
			setcurrentPage(2);
		} else {
      setToastColor("danger");
    }
      } catch (e) {
        setToastColor("danger");
        setshowMesaage(true);
        setToastMessage("You have entered an invalid OTP");
      }
  }
  
  function passwordValidation(password) {
    const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*€])[a-zA-Z0-9!@#$%^&*€]{6,}$/;
    return reg.test(password);
  }

  function handleForm() {
    if (!newPassword) {
      setError({
        errorName: "new password",
        errorMsg: "Please enter your password",
      });
      return false
    }
    if (!passwordValidation(newPassword)) {
      setError({
        errorName: "new password",
        errorMsg: "Password length should be 8 or more characters with a mix of letters, numbers & symbols",
      });
      return false
    }
    if (!confPassword) {
      setError({
        errorName: "confirm password",
        errorMsg: "Please re-enter your password",
      });
      return false
    }

    if (newPassword !== confPassword) {
      setError({
        errorName: "confirm password",
        errorMsg: "Password doesn't match",
      });
      return false
    }
    return true
  }

  async function resetPass(e) {
    const { email } = location.state;
    const sendData = {
      email,
      newPassword,
    };
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}/reset-password`;
    try {
      const data = await axios.put(BASE_URL, sendData);
      //navigate("/reset-password");
      console.log(data);
      setToastMessage(data.data.message);
        setshowMesaage(true);
      
  if(data.data.status===2){
    setToastColor("success");
    setTimeout(() => {
      navigate("/");
    }, [2000]);
  }else {
    setToastColor("danger");
  }
    } catch (e) {
      setToastColor("danger");
        setshowMesaage(true);
        setToastMessage("Something went wrong");
    }
    }
  

  const submitReset=(e)=>{
    e.preventDefault();
    if(handleForm()){
      resetPass()
    }
  }

  const showHidePassword = () => {
    setShowPass(!showPass);  
  }
  //console.log(location);
  
  const showHideConfPassword = () => {
    setShowConfPass(!showConfPass);  
  }

  return (
    <div>
      <div className="login-header box-shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="brand-logo">
            <Link to="/">
              <img src="vendors/images/money3.png" alt="" />
            </Link>
          </div>
          <div className="login-menu">
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src="vendors/images/forgot-password.png" alt="" />
            </div>
            <div className="col-md-6">
              {currentPage === 1 && (
                <div className="login-box bg-white box-shadow border-radius-10 px-5">
                  <div className="login-title">
                    <h2 className="text-center text-primary">
                      OTP Verification
                    </h2>
                  </div>
                  <h6 className="mb-20">Enter OTP to reset your password</h6>
                  <form>
                    <div className="input-group custom">
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Enter OTP"
                        onChange={(e) => {
                          setotpCode(e.target.value);
                          setError({
                            errorName: "",
                            errorMsg: "",
                          });
                        }}
                      />
                      <div className="input-group-append custom"></div>
                    </div>
                    {error && error.errorName === "otpCode" && (
                      <div style={{ color: "red" }}>{error.errorMsg}</div>
                    )}
                    <div className="row align-items-center">
                      <div className="col-5">
                        <div className="input-group mb-0">
                          <button
                            className="btn btn-primary btn-lg btn-block"
                            onClick={(e)=>handleOTPVerification(e)}>Submit</button>
                          

                          {/* <a className="btn btn-primary btn-lg btn-block" href="index.html">Submit</a> */}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {currentPage === 2 && (
                <div className="login-box bg-white box-shadow border-radius-10 px-5">
                  <div className="login-title">
                    <h2 className="text-center text-primary">Reset Password</h2>
                  </div>
                  <h6 className="mb-20">
                    Enter your new password, confirm and submit
                  </h6>
                  <form>
                    <div className="input-group custom">
                      <input
                        type={showPass? "text" : "password"}
                        className="form-control form-control-lg"
                        placeholder="New Password"
                        onChange={(e) => {
                          setnewPassword(e.target.value);
                          setError({
                            errorName: "",
                            errorMsg: "",
                          });
                        }}
                      />
                      <div className="input-group-append custom">
                        <span className="input-group-text">
                        <img className="input-img" src={showPass? showPasswordImg: hidePasswordImg} alt="Show/Hide icon" onClick={showHidePassword}/>
                        </span>
                      </div>
                    </div>
                    {error && error.errorName === "new password" && (
                      <div style={{ color: "red" }}>{error.errorMsg}</div>
                    )}
                    <div className="input-group custom">
                      <input
                        type={showConfPass? "text" : "password"}
                        className="form-control form-control-lg"
                        placeholder="Confirm New Password"
                        onChange={(e) => {
                          setconfPassword(e.target.value);
                          setError({
                            errorName: "",
                            errorMsg: "",
                          });
                        }}
                      />
                      <div className="input-group-append custom">
                        <span className="input-group-text">
                        <img className="input-img" src={showConfPass? showPasswordImg: hidePasswordImg} alt="Show/Hide icon" onClick={showHideConfPassword}/>
                        </span>
                      </div>
                    </div>
                    {error && error.errorName === "confirm password" && (
                      <div style={{ color: "red" }}>{error.errorMsg}</div>
                    )}
                    <div className="row align-items-center">
                      <div className="col-5">
                        <div className="input-group mb-0">
                        <button
                            className="btn btn-primary btn-lg btn-block"
                            onClick={(e)=>submitReset(e)}>Submit</button>

                          {/* <a className="btn btn-primary btn-lg btn-block" href="index.html">Submit</a> */}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <ToastContainer position="top-end" style={{paddingTop:"3rem",width:'166px',right:'7px',top:'25px'}} >
          <Toast
            show={showmessage}
            bg={toastColor}
            onClose={() => setshowMesaage(false)}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto"></strong>
              <small className="text-muted"></small>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
}

export default ResetPassword;
