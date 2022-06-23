import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import "./Signup.css"
import FormVanilla from "../../Components/Form/FormVanilla";


const Signup = () => {
  const [values, setValues ] = useState({});
  
  
   function pulldata(data) {

      setValues(data);
      
   }
   const pass = values.password
   const conf = values.confirmpassword
 
const nameValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === "") {
    return `${fieldName} is required`;
  }
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return "Invalid characters";
  }
  if (fieldValue.trim().length < 3) {
    return `${fieldName} needs to be at least three characters`;
  }
  return null;
};

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

  const confirmpass = confirmpassword => {
    
    if (confirmpassword.trim() == "") {
      return " Confirm Password is required";
   }
       if(pass != conf){
         return "Password Doesn't match";
       }
       
  }

// const confirmValidation = (confirmpassword,password,pass,conf) => {
//   if(
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/.test(
//       confirmpassword
//     )
//   ){
//     return null;
//   }
//   if (confirmpassword.trim() == "") {
//      return "Confirm Password is required";
//   }
//   if( pass != conf ){
//     return "Password Doesn't Match";
//   }
//   return "Please enter a valid confirm password"

// };


const validate = {
  firstName: name => nameValidation("First Name", name),
  email: emailValidation,
  password: passwordValidation,
  confirmpassword: confirmpass
};

const initialValues = {
  email: "",
  firstName: "",
  password: "",
  confirmpassword: ""
};



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
					<li><Link
                to="/"
              >Login</Link></li>
				</ul>
			</div>
		</div>
	</div>
  <div className="register-page-wrap d-flex align-items-center flex-wrap justify-content-center">
		<div className="container">
			<div className="row align-items-center">
				<div className="col-md-6 col-lg-7">
					<img src="vendors/images/register-page-img.png" alt="" />
				</div>
				<div className="col-md-6 col-lg-5">
					<div className="register-box bg-white box-shadow border-radius-10">
						<div className="wizard-content">

      
       <FormVanilla  validate={validate} initialValues={initialValues} func={pulldata}
       />

  
</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	
        </>
  );
};

export default Signup;
