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
import CONSTANTS from '../../Constants/global'


const Form = ({
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    backendvalue,
    values
  }) => {

   
    const [backerroremail, setBackerroremail] = useState(" ");
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
   const [backerrorpassword, setBackerrorpassword] = useState(" ");
   const [signupsucess, setSignupsucess] = useState(" ");
   const [showmessage, setshowMesaage] = useState(false);
   const [toastMessage, setToastMessage] = useState("");
   const [toastColor, setToastColor] = useState("");

   const navigate = useNavigate();
   
   const showHidePassword = () => {
    setShowPass(!showPass);  
  } 

  const showHideconfirmPassword = () => {
    setShowConfirmPass(!showConfirmPass);  
  } 
    
    // console.log(JSON.stringify(errors))

  

    async function signupp(e) {
      e.preventDefault();
      const API_URL = CONSTANTS.USERSIGNUP;
      const email = values.email;
      const user = values.firstName;
      const password = values.password;
      const organization = values.organization;
      let sendData = {
        name:user,
        email,
        password,
        Wallet:0,
     
      };
      try{
      
      const data = await axios.post(API_URL, sendData);
      handleSubmit();
      if( JSON.stringify(errors) == '{}'){
      if(data.data.auth){
        sessionStorage.setItem("token", "Bearer " + data.data.token);
        localStorage.setItem(
          "refreshToken",
          "Bearer " + data.data.refreshToken
        );
        localStorage.setItem("name", data.data.details.name);
        localStorage.setItem("email", data.data.details.email);
        localStorage.setItem("loginStatus", true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
    }
  }
      
    } catch (e) {
  
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
  
  <form className="tab-wizard2 wizard-circle wizard px-5"  onSubmit={signupp} autoComplete="off">
								
                <h2 className="text-start ">Sign Up</h2>
                                <br></br>
                                
                                <div className="input-group mb-0">									
								<button className="btn btn-primary btn-sm btn-block facebook-shadow mb-1 py-1" type="submit" ><i className="fab fa-facebook-f" aria-hidden="true"></i> Sign In with Facebook</button>
                <button className="btn btn-sm btn-block btn-google text-white google-shadow" type="submit" ><i className="fab fa-google" aria-hidden="true"></i> Sign In with Google</button>
						</div>
								<section>
									<div className="form-wrap max-width-600 mx-auto">
									<div className="form-group row">
											<label className="col-sm-4 col-form-label">Username<span style={{ color: "red" }}>*</span></label>
											<div className="col-sm-8">
												<input 
												type="text" 
												className={errors.firstName? 'form-control form-control red' :'form-control'}
                                                id="first-name-input"
                                                placeholder='Enter UserName'
                                                value={values.firstName}
											                         	onChange={handleChange}
                                                onBlur={handleBlur}
                                                name='firstName'
                                                required
												/>
											</div>
										</div>
										{errors.firstName ?(
                                      <div className="errormsg"  style={{ color: "red" }}>{touched.firstName && errors.firstName}</div>
                    ):(
                      <></>
                    )}
										<div className="form-group row">
											<label className="col-sm-4 col-form-label">Email Address<span style={{ color: "red" }}>*</span></label>
											<div className="col-sm-8">
												<input 
												type="email" 
												className={errors.email? 'form-control form-control red' :'form-control'}
                                                id="email"
                                                placeholder='Enter Email'
                                                value={values.email}
											                        	onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                name='email'
												
												/>
											</div>
										</div>
                    {errors.email ?(
                                      <div className="errormsg"  style={{ color: "red" }}>{touched.email && errors.email}</div>
                    ):(
                      <></>
                    )}
										<div className="form-group row">
											<label className="col-sm-4 col-form-label">Password<span style={{ color: "red" }}>*</span></label>
											<div className="col-sm-8">
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
									<span className="input-group-texts"> <img className="input-img" src={showPass? showPasswordImg: hidePasswordImg} alt="Show/Hide icon" onClick={showHidePassword}/></span>
								</div>
											</div>
										</div>
                    {errors.password ?(
                                      <div className="errormsg"  style={{ color: "red" }}>{touched.password && errors.password}</div>
                    ):(
                      <></>
                    )}
										<div className="form-group row">
											<label className="col-sm-4 col-form-label">Confirm Password<span style={{ color: "red" }}>*</span></label>
											<div className="col-sm-8">
												<input  
                               type={showConfirmPass? "text" : "password"}
                                                className={errors.confirmpassword? 'form-control form-control red' :'form-control'}
                                                id="confirmpassword"
                                                placeholder="*********"
                                                value={values.confirmpassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="confirmpassword"
                                                required
                                                />
                                                <div className="input-group-append custom">
									<span className="input-group-texts"> <img className="input-img" src={showConfirmPass? showPasswordImg: hidePasswordImg} alt="Show/Hide icon" onClick={showHideconfirmPassword}/></span>
								</div>
											</div>
										</div>
                    {errors.confirmpassword ?(
                                      <div className="errormsg"  style={{ color: "red" }}>{touched.confirmpassword && errors.confirmpassword}</div>
                    ):(
                      <></>
                    )}
                                      

                                        { backerrorpassword == " " ? (
                                            <> </>
                                                ) :
                                                (
                                                  <div className="alert alert-danger" role="alert">
                                                  {backerrorpassword}
                                                  </div>
    
                                                )
                                                }
                                                   { backerroremail == " " ? (
                                            <> </>
                                                ) :
                                                (
                                                  <div className="alert alert-danger" role="alert">
                                                  {backerroremail}
                                                  </div>
    
                                                )
                                                }




<button className="btn  btn-sm btn-block bg-dark-orange text-white d-flex justify-content-between" type="submit" ><span>Sign Up</span> <i className="fas fa-sign-in-alt"></i></button>
                                        {/* <button type="submit" className="btn btn-primary">Submit</button> */}
									</div>
                  <div className="row">
                  <div className=" col-sm-12 pt-3">
                    <p className="fs-5">Already have an account?  <Link
                to="/"
              ><span className="text-dark-orange fw-bold">Sign In</span></Link></p>
                  </div>
                  </div>
								</section>
						
								
							</form>
        

              <ToastContainer  autoClose={2000} />
  
  </>
  )
};

export default Form;
