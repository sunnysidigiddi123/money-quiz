import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import hidePasswordImg from "./eyesslash.svg";
import showPasswordImg from "./eyes.svg";
import { ToastContainer, toast } from 'react-toastify';
import  CONSTANTS from '../../Constants/global'

const Formlogin = ({
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    backendvalue,
    values
  }) => {

    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");
    const [error, setError] = useState({ errorName: "", errorMsg: "" });
    const [backerror, setBackerror] = useState(" ");
    const [showPass, setShowPass] = useState(false);
    const [showmessage, setshowMesaage] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastColor, setToastColor] = useState("");
    const navigate = useNavigate();


    const showHidePassword = () => {
      setShowPass(!showPass);  
    } 

    async function loginn(e) {
        e.preventDefault();
        const email = values.email;
        const password = values.password;
        handleSubmit();
        const sendData = {
             email,
            password
        }
        const API_URL = CONSTANTS.USERLOGIN;
        try {
          const data =  await axios.post(API_URL, sendData);

        if (data.data.auth) {
         
          toast.success(data.data.message);
          sessionStorage.setItem("token", "Bearer " + data.data.token);
          localStorage.setItem(
            "refreshToken",
            "Bearer " + data.data.refreshToken
          );
          localStorage.setItem("name", data.data.details.name);
          localStorage.setItem("email", data.data.details.email);
          localStorage.setItem("loginStatus", true);
         
          setTimeout(() => {
            if(data.data.details.role == "user") {
              navigate("/appuserhome");
              window.location.reload();

           }else
          {
         
            toast.error("Invalid User")
        
          }
          }, 1000);
        }
        } catch (e) {
        //console.log(e.response);
        toast.error(e.response.data.message);
       }
  
       

    
    }

    useEffect(() => {
      let status = localStorage.getItem("loginStatus");
      if (status) {
        navigate("/appuserhome"); 
      }
    }, []);

  return (
  <>
    <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
		<div className="container">
			<div className="row align-items-center">
				{/* <div className="col-md-6 col-lg-7">
					<img src="vendors/images/login-page-img.png" alt="" />
				</div> */}
				<div className="col-md-12 col-lg-12">
					<div className="login-box bg-white box-shadow border-radius-10 px-5">
						<div className="login-title">
							<h2 className="text-start ">Sign In</h2>
						</div>
            <div className="input-group mb-0">									
								<button className="btn btn-primary btn-sm btn-block facebook-shadow mb-1 py-1" type="submit" ><i class="fab fa-facebook-f" aria-hidden="true"></i> Sign In with Facebook</button>
                <button className="btn btn-sm btn-block btn-google text-white google-shadow" type="submit" ><i class="fab fa-google" aria-hidden="true"></i> Sign In with Google</button>
						</div>
            <section className="remaining-quiz">
                        <div className="row pt-5 pb-3 b-radius-25">
                            <div className="col-12 text-center">
                                <div className="trophy-circle">
                                  <img src="assets/images/trophy.png" alt="Icon" />
                                {/* <i className="fa fa-trophy fa-4x trophy" aria-hidden="true"></i> */}
                                </div>
                            </div>
                            
                        </div>
                    </section>

						<form onSubmit={loginn} autoComplete="off">
							<div className="select-role">
								<div className="btn-group btn-group-toggle" data-toggle="buttons">
									<label className= "btn active" >
										<input type="radio" name="options"  id="admin"/>
										<div className="icon"><img src="vendors/images/briefcase.svg" className="svg" alt="" /></div>
										<span>I'm</span>
										Admin
									</label>
									<label className="btn">
										<input type="radio" name="options" id="user" />
										<div className="icon"><img src="vendors/images/person.svg" className="svg" alt="" /></div>
										<span>I'm</span>
										User
									</label>
								</div>
							</div>
							<div className="input-group custom">
              <div className="input-group-prepend custom">
									<span className="input-group-text"><i class="fas fa-user"></i></span>
								</div>
								<input 
								type="email" 
                                className={errors.email? 'form-control red' :'form-control'}
                                id="email"
                                placeholder='Enter Email'
                                value={values.email}
                                                        onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                name='email'
								/>
								{/* <div className="input-group-prepend custom">
									<span className="input-group-text"><i className="icon-copy dw dw-user1"></i></span>
								</div> */}
							</div>
                            {errors.email ?(
                                      <div className="errormsgs"  style={{ color: "red" }}>{touched.email && errors.email}</div>
                    ):(
                      <></>
                    )}
							<div className="input-group custom">
              <div className="input-group-prepend custom">
									<span className="input-group-text"><i class="fas fa-lock"></i></span>
								</div>
              
								<input 
							
                type={showPass? "text" : "password"}
								className={errors.password? 'form-control form-control red' :'form-control'}
                                                id="password"
                                                placeholder="*********"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="password"
                                                required
								
								/>
								<div className="input-group-append custom">
									<span className="input-group-text"> <img className="input-img" src={showPass? showPasswordImg: hidePasswordImg} alt="Show/Hide icon" onClick={showHidePassword}/></span>
								</div>
							</div>
                            {errors.password ?(
                                      <div className="errormsgs"  style={{ color: "red" }}>{touched.password && errors.password}</div>
                    ):(
                      <></>
                    )}
							<div className="row pb-30">
								<div className="col-6">
									<div className="custom-control custom-checkbox" style={{display:'none'}}>
										<input type="checkbox" className="custom-control-input" id="customCheck1" />
										<label className="custom-control-label" htmlFor="customCheck1">Remember</label>
									</div>
								</div>
								<div className="col-xs-12 col-md-6 text-right">
									<div className="forgot-password">
										<Link to="/forgetpassword" >Forgot Password ?</Link></div>
								</div>
							</div>
							{ backerror == " " ? (
                                            <> </>
                                                ) :
                                                (
                                                  <div class="alert alert-danger" role="alert">
                                                  {backerror}
                                                  </div>
    
                                                )
                                                }
                                        
							<div className="row">
								<div className="col-sm-12">
									<div className="input-group mb-0">
									
											<button className="btn  btn-sm btn-block bg-dark-orange text-white d-flex justify-content-between" type="submit" ><span>Sign In</span> <i class="fas fa-sign-in-alt"></i></button>
										
										{/* <a className="btn btn-primary btn-lg btn-block" href="index.html">Sign In</a> */}
									</div>
									<div className="font-16 weight-600 pt-10 pb-10 text-center" data-color="#707373">OR</div>
									<div className="input-group mb-0">
									<Link to="/register" className="btn btn-outline-primary btn-sm btn-block">Register To Create Account</Link>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
  <ToastContainer  autoClose={3000} />
      
  
  </>
  )
};

export default Formlogin;
