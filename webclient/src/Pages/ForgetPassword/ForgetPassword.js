import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";


const ForgetPassword = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState({ errorName: "", errorMsg: "" });
	const [showmessage, setshowMesaage] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastColor, setToastColor] = useState("");
	const navigate = useNavigate();
  
	function handleForm(event) {
	  if (!email) {
		setError({ errorName: "email", errorMsg: "please enter your email" });
		return;
	  }
	  if (!isEmail(email)) {
		setError({
		  errorName: "email",
		  errorMsg: "Invalid email!",
		});
		return;
	  }
	  return true;
	}
	function isEmail(val) {
	  let regEmail =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  if (!regEmail.test(val)) {
		return false;
	  }
	  return true;
	}
  
	async function handleSubmit(e) {
	  e.preventDefault();
	  if (handleForm()) {
		const sendData = {
		  email,
		};
		const BASE_URL = `${process.env.REACT_APP_BASE_URL}/forgot`;
		try {
		  const data = await axios.post(BASE_URL, sendData);
		  console.log(data);
		  setToastMessage(data.data.message);
		  setshowMesaage(true);
		  if (data.data.status === 1) {
			setToastColor("success");
			setTimeout(() => {
			  navigate("/resetPassword", { state: { email: email } });
			}, [2000]);
		  } else {
			setToastColor("danger");
		  }
		} catch (e) {
		  setToastColor("danger");
		  setshowMesaage(true);
		  setToastMessage("You have entered an invalid email");
		}
	  }
	}
    return (
        <>
            <div className="login-header box-shadow">
		<div className="container-fluid d-flex justify-content-between align-items-center">
			<div className="brand-logo">
				<Link to='/'>
					<img src="vendors/images/money3.png" alt="" />
				</Link>
			</div>
			<div className="login-menu">
				<ul>
					<li><Link to="/">Login</Link></li>
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
					<div className="login-box bg-white box-shadow border-radius-10">
						<div className="login-title">
							<h2 className="text-center text-primary">Forgot Password</h2>
						</div>
						<h6 className="mb-20">Enter your email address to reset your password</h6>
						<form onSubmit={handleSubmit}>
                  <div className="input-group custom">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError({
                          errorName: "",
                          errorMsg: "",
                        });
                      }}
                    />

                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>
                  {error && error.errorName === "email" && (
                    <div style={{ color: "red" }}>{error.errorMsg}</div>
                  )}
                  <div className="row align-items-center">
                    <div className="col-5">
                      <div className="input-group mb-0">
                        <input
                          className="btn btn-primary btn-lg btn-block"
                          type="submit"
                          value="Submit"
                        />
                        {/* <a className="btn btn-primary btn-lg btn-block" href="index.html">Submit</a> */}
                      </div>
                    </div>
                    <div className="col-2">
                      <div
                        className="font-16 weight-600 text-center"
                        data-color="#707373"
                      >
                        OR
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="input-group mb-0">
                        <Link
                          to="/"
                          className="btn btn-outline-primary btn-lg btn-block"
                        >
                          Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
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
    </>
    )
}

export default ForgetPassword
