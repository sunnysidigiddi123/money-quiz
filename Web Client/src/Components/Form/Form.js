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
    const email = values.email;
    const user = values.firstName;
    const password = values.password;
    handleSubmit();
    if( JSON.stringify(errors) == '{}'){
    sessionStorage.setItem("login", true);
    const BASE_URL = `${process.env.REACT_APP_BASE_URL}/signup`;
    let sendData = {
      user,
      email,
      password,
      role: "User",
    };
    try {
      const data = await axios.post(BASE_URL, sendData);
      toast.success("Signup Successfully");
      setTimeout(() => {
			  navigate("/");
			}, [2000]);
      console.log("success")
      // navigate("/")
    } catch (e) {

      toast.error(e.response.data);
      
      if (e?.response?.data?.email?.message) {
        // return alert(e?.response?.data?.email?.message)
        return setBackerroremail(e?.response?.data?.email?.message);
      }
      if (e?.response?.data?.password?.message) {
        // return alert(e?.response?.data?.password?.message)
        return setBackerrorpassword(e?.response?.data?.password?.message);
      }
     
    }
  }
  }




  return (
  <>
  
  <form className="tab-wizard2 wizard-circle wizard" style={{padding:'25px'}} onSubmit={signupp} autoComplete="off">
								<h5>Basic Account Credentials</h5>
                                <br></br>
                                <br></br>
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
                                        <br></br>

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





                                        <button type="submit" className="btn btn-primary">Submit</button>
									</div>
								</section>
						
								
							</form>
        

              <ToastContainer  autoClose={2000} />
  
  </>
  )
};

export default Form;
