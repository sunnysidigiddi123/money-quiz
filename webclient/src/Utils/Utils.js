export const passwordValidation = (password) => {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,10}$/.test(
        password
      )
    ) {
      return "";
    }
    if (password.trim() === "") {
      return "Password is required";
    }
  
    return "Password should contain minimum five and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character";
  };
  
  export const emailValidation = (email) => {
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return "";
    }
    if (email.trim() === "") {
      return "Email is required";
    }
    return "Email Address must be in valid formate with @ symbol";
  };
  
  export const nameValidation = (name) => {
    if (name.trim() === "") {
      return `Name is required`;
    }
    if (/[^a-zA-Z -]/.test(name)) {
      return "Invalid Characters";
    }
    if (name.trim().length < 3) {
      return `Name needs to be at least three characters`;
    }
    return "";
  };
  
  export const confPasswordValidation = (password, confPassword) => {
    if (confPassword.trim() === "") {
      return "Confirm Password is required";
    }
    if (password !== confPassword) {
      return "Password doesn't match";
    }
    return "";
  };
  
  export const charactersValidation = (string) => {
    if (/[^a-zA-Z -]/.test(string)) {
      return true;
    }
    return false;
  };
  
  export const numberValidation = (number) => {
    if (/^[0-9]*$/.test(number)) {
      return false;
    }
    return true;
  };
  
  export const alternateEmailValidation = (email) => {
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return "";
    }
    if (email.trim() === "") {
      return "";
    }
    return "Email Address must be in valid formate with @ symbol";
  };
  
  export const isNumberKey = (evt) => {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
  }