import React, { useState } from "react";
import axios from "axios"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import "./Login.css"
import FormVanillaLogin from "../../Components/Form/FormVanillaLogin";

function Login() {
  
  
  


  const emailValidation = email => {
	if (
	  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	  )
	) {
	  return null;
	}
	if (email.trim() === "") {
	  return "Email is required";
	}
	return "Please enter a valid email";
  };
  
  
  
  const passwordValidation = password => {
  
	if(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/.test(
		password
	  )
	){
	  return null;
	}
	if (password.trim() == "") {
	   return "Password is required";
	}
// 	if (password.length < 5) {
// 	   return "Your password must be at least 5 characters"; 
// 	 }
// 	 if (password.search(/[a-z]/i) < 0) {
// 	  return "Your password must contain at least one letter";
//   }
//   if (password.search(/[0-9]/) < 0) {
// 	 return "Your password must contain at least one digit"; 
//   }
  
	return "Password should contain minimum five and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
  
  };


  const validate = {
	email: emailValidation,
	password: passwordValidation,
	
  };
  
  const initialValues = {
	email: "",
	password: "",
  };
  

  return (
    <>
      
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
            <Link to="/register">Register</Link></li>
				</ul>
			</div>
		</div>
	</div>
	<FormVanillaLogin validate={validate} initialValues={initialValues}  />
      
    </>
  );
}
export default Login;
