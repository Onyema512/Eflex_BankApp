import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash, FaUser, FaEnvelope, FaLock, FaIdCard,} from "react-icons/fa";

  
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showRequirements, setShowRequirements] = useState(false);

  const [errorMsg, setErrorMsg] = useState({ err: false, name: "", msg: ""});
  const [passwordStrength, setPasswordStrength] =  useState({
    err: false,
    strength: "weak"
  })


  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const passwordStrengthRegex = {
  //   weak: /^.{0,7}$/,
  //   good: /^(?=.[a-zA-Z])(?=.\d).{8,}$/,
  //   strong:
  //     /^(?=.[a-zA-Z])(?=.\d)(?=.[!@#$%^&()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/,
  // };

  // const weekPasswordRegex = /^(?=.*[a-zA-Z]).{0,7}$/;
  // const goodPasswordRegex = /^(?=.[a-zA-Z])(?=.\d).{8,}$/;
  // const strongPasswordRegex =
  //   /^(?=.[a-zA-Z])(?=.\d)(?=.[@#$!%?&=_-]).{8,}$/;

  // const emailRegex = "";
  const passwordStrengthRegex = {
    weak: /^.{0,7}$/,
    good: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
    strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/,
  };
  
  const showRequirementsRegex = {
  passwordLength : userInfo.password.length >= 8,
  upperCase : /[A-Z]/.test(userInfo.password),
  lowerCase : /[a-z]/.test(userInfo.password),
  specialCharacter : /[^A-Za-z0-9]/.test(userInfo.password),
  number : /[0-9]/.test(userInfo.password),
  }

  const holdName = (e) => {
    const newName = e.target.value;
    setUserInfo({...userInfo, fullName: newName});

    if (newName.trim() === "") {
      setErrorMsg({
        err: true,
        name: "fullName",
        msg: "You must add your fullname"
      });
    } else if (newName[0] !== newName[0].toUpperCase()) {
      setErrorMsg({
        err: true,
        name: "fullName",
        msg: "Name must start with capital letter"
      });
    }
    
    else {
      setErrorMsg({err: false, name: "", msg: ""});
    }
  };

  const holdEmail = (e) => {
    const newEmail = e.target.value;
    setUserInfo ({...userInfo, email: newEmail});

    if (newEmail.trim() === "") {
      setErrorMsg({
        err: true,
        name: "email",
        msg: "Please enter a valid email"
      });
    } else if (!newEmail.includes("@")) {
      setErrorMsg({
        err: true,
        name: "email",
        msg: "Email must include at least one @ symbol"
      });
    } else {
      setErrorMsg({err: false, name: "", msg: ""});
    }
  };

  const holdPassword = (e) => {
    const newPassword = e.target.value;
    setUserInfo({...userInfo, password: newPassword})

    if (newPassword.trim() === "") {
      setPasswordStrength({
        err: true,
        name: "password",
        msg: "Enter a new password"
      });

      setPasswordStrength({
        err: false,
        strength: "",
      })
    } else if (passwordStrengthRegex.strong.test(newPassword)) {
      setPasswordStrength({
        err: true,
        strength: "Strong"
      })
    } else if (passwordStrengthRegex.good.test(newPassword)) {
      setPasswordStrength({
        err: true,
        strength: "Good"
      })
    } else {
      setPasswordStrength({
        err: true,
        strength: "Weak"
      })
    }
  }

  // const holdPassWord = (e) => {
  //   const newPassword = e.target.value;
  //   setUserInfo ({...userInfo, password: newPassword});

  //   const hasUpperCase = newPassword.match(/[A-Z]/);
  //   const hasLowerCase = newPassword.match(/[a-z]/);
  //   const hasSymbol = newPassword.match(/[^A-Za-z0-9]/);

    // const emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"

    // if(!emailRegex.test(newPassword)){
    //   setErrorMsg({
    //     err: true,
    //     name: "email",
    //     msg: "Please enter a valid email"
    //   })
    // }

    // if (newPassword.trim() === "") {
    //   setErrorMsg({
    //     err: true,
    //     name: "password",
    //     msg: "Enter a new password"
    //   });
    // } else if (newPassword.length < 8) {
    //   setErrorMsg({
    //     err: true,
    //     name: "password",
    //     msg: "Password must be 8 or more characters"
    //   });
    // } else if (newPassword === !hasUpperCase) {
    //   setErrorMsg({
    //     err: true,
    //     name: "password",
    //     msg: "Your password must contain uppercase",
    //   });
    // } else if (newPassword === !hasLowerCase) {
    //   setErrorMsg({
    //     err: true,
    //     name: "password",
    //     msg: "Your password must contain lowercase"
    //   });
    // } else if(!hasSymbol) {
    //   setErrorMsg({
    //     err: true,
    //     name: "password",
    //     msg: "Your password must contain at least one symbol"
    //   });
    // }
    
    // else {
    //   setErrorMsg({err: false, name: "", msg: ""});
    // };
  // };

  const confirmPassword = (e) => {
    const updatedPassword = e.target.value;
    setUserInfo({...userInfo, confirmPassword: updatedPassword});

    if (updatedPassword !== userInfo.password) {
      setErrorMsg({
        err: true,
        name: "confirmPassword",
        msg: "Passwords do not match",
      });
    } else {
      setErrorMsg({
        err: false,
        name: "",
        msg: "",
      });
    }
  };

  return (
    <div className='login_container'>
      <div className="login_card signup_card">
        <div className="login_header">
          <h1>Create Your Account</h1>
          <p>Join our bank and manage your finances</p>
        </div>

        <form className="login_form" onSubmit={""}>

          <div className="form_group">
            <label htmlFor="name">Full Name</label>
            <div className="input_wrapper">
              <FaUser className="input_icon" />
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                onChange={holdName}
              />
            </div>
            <span style={{color: "red", fontSize: "12px"}}>
              {
                errorMsg.msg && errorMsg.name === "fullName" ? errorMsg.msg : ""
              }
            </span>
          </div>

          <div className="form_group">
            <label htmlFor="email">Email Address</label>
            <div className="input_wrapper">
              <FaEnvelope className="input_icon" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={holdEmail}
              />
            </div>
            <span style={{color: "red", fontSize: "12px"}}>
              {
                errorMsg.msg && errorMsg.name === "email" ? errorMsg.msg : ""
              }
            </span>
            
          </div>

          <div className="form_group">
            <label htmlFor="password">Password</label>
            {/* <span style={{color: "blue", fontSize: "12px"}}>Password should be at least 8 characters</span> */}
            <div className="input_wrapper password_wrapper">
              <FaLock className="input_icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a strong password"
                onChange={holdPassword}
                onClick={() => setShowRequirements (true)}
                onBlur={() => setShowRequirements (false)}
              />
              <button
                type="button"
                className="toggle_password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {/* <span style={{color: "blue", fontSize: "12px"}}>Password should contain at least</span> */}
            <div>
            {showRequirements && (
           <div className='show_ReqText'>
            <span>Password should contain at least</span>
              <div className='show_req'>
                <span style={{
                  color: showRequirementsRegex.passwordLength ? "Green" : "Black",
                  fontSize: showRequirementsRegex.passwordLength ? "18px" : "",
                  fontWeight: showRequirementsRegex.passwordLength ? "600" : "",
                }}>
                  . 8 characters
                  </span>
                 <span style={{
                  color: showRequirementsRegex.upperCase ? "Green" : "Black",
                  fontSize: showRequirementsRegex.upperCase ? "18px" : "",
                  fontWeight: showRequirementsRegex.upperCase ? "600" : "",
                }}>
                  . one uppercase
                  </span>
                 <span style={{
                  color: showRequirementsRegex.lowerCase ? "Green" : "Black",
                  fontSize: showRequirementsRegex.lowerCase ? "18px" : "",
                  fontWeight: showRequirementsRegex.lowerCase ? "600" : "",
                }}>
                  . one lowercase
                  </span>
                 <span style={{
                  color: showRequirementsRegex.specialCharacter ? "Green" : "Black",
                  fontSize: showRequirementsRegex.specialCharacter ? "18px" : "",
                  fontWeight: showRequirementsRegex.specialCharacter ? "600" : "",
                }}>
                  . one special character
                  </span>
                 <span style={{
                  color: showRequirementsRegex.number ? "Green" : "Black",
                  fontSize: showRequirementsRegex.number ? "18px" : "",
                  fontWeight: showRequirementsRegex.number ? "600" : "",
                }}>
                  . one number
                  </span>
              </div>
           </div>
            )}
            </div>
            {/* <span style={{color: "red", fontSize: "12px"}}>
              {
                errorMsg.msg && errorMsg.name === "password" ? errorMsg.msg : ""
              }
            </span> */}
            {/* {passwordStrength.err && (
            <div
            style={{
              width: `${passwordStrength.strength === "Weak" ? "30%" : passwordStrength.strength === "Good" ? "70%" : passwordStrength.strength === "Strong" ? "100%" : ""}`,
              height: "2px",
              backgroundColor: `${passwordStrength.strength === "Weak" ? "red" : passwordStrength.strength === "Good" ? "Yellow" : passwordStrength.strength === "Strong" ? "Green" : ""}`
            }}
            />
            )} */}
          </div>

          <div className="form_group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input_wrapper password_wrapper">
              <FaLock className="input_icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                onChange={confirmPassword}
              />
              <button
                type="button"
                className="toggle_password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <span style={{color: "red", fontSize: "12px"}}>
              {
                errorMsg.msg && errorMsg.name === "confirmPassword" ? errorMsg.msg : ""
              }
            </span>
          </div>

          <div className="form_group">
            <label className="terms_checkbox">
              <input type="checkbox" />
              <span>
                I agree to the{" "}
                <a href="#terms" className="terms_link" >
                 <Link to="/terms"> Terms and Conditions </Link>
                </a>
              </span>
            </label>
          </div>

          <button type="submit" className="login_btn">
            Sign Up
          </button>
        </form>

        <div className="signup_link">
          <p>
            Already have an account? <Link to="/">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
