import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaRegEye, FaRegEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const users = useSelector(state => state.users);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  // const [errorMsg, setErrorMsg] = useState("");
  // const [errorMsg2, setErrorMsg2] = useState("");
  const [errorMsg3, setErrorMsg3] = useState({ err: false, name: "", msg: ""});

  const holdEmail = (e) => {
    const newEmail = e.target.value;
    setUserInfo({...userInfo, email: newEmail});

    if (newEmail.trim() === "") {
      setErrorMsg3({
        err: true,
        name: "email",
        msg: "You must add an Email"
      });
    } else if (!newEmail.includes("@")) {
      setErrorMsg3({
        err: true,
        name: "email",
        msg: "Email must include at least one @ symbol"
      });
    } else {
      setErrorMsg3({err: false, name: "", msg: ""});
    }

    // if (newEmail.trim() === "") {
    //   setErrorMsg2("You must add an email");
    // } else{
    //   setErrorMsg2("")
    // }
  };

  console.log("This is the error message", errorMsg3)

  const holdPassword = (e) => {
    const newPassword = e.target.value;
    setUserInfo({...userInfo, password: newPassword});

    const hasUpperCase = newPassword.match(/[A-Z]/);
    const hasLowerCase = newPassword.match(/[a-z]/);
    const hasSymbol = newPassword.match(/[^A-Za-z0-9]/);

    if (newPassword.trim() === "") {
      setErrorMsg3({
        err: true,
        name: "password",
        msg: "You must add a password"
      });
    } else if (newPassword.length < 8) {
      setErrorMsg3({
        err: true,
        name: "password",
        msg: "Password must be 8 or more characters"
      });
    } else if (!hasUpperCase) {
      setErrorMsg3({
        err: true,
        name: "password",
        msg: "Your password must contain uppercase",
      });
    } else if (!hasLowerCase) {
      setErrorMsg3({
        err: true,
        name: "password",
        msg: "Your password must contain lowercase"
      });
    } else if(!hasSymbol) {
      setErrorMsg3({
        err: true,
        name: "password",
        msg: "Your password must contain at least one symbol"
      });
    }
    
    else {
      setErrorMsg3({err: false, name: "", msg: ""});
    };
    

    // if (newPassword.trim() === "") {
    //   setErrorMsg("You must input a password");
    // } else{
    //   setErrorMsg("")
    // }
  };

  console.log("This is the error message", errorMsg3)

  const loginUser = (email, password) => {
  const user = users.find(user => user.email === email);
    if(user === undefined) {
      alert("Invalid credentials");
      return;
    }else if(password === user.password) {
      console.log("login user",user);
      setUser(user);
      navigate("/dashboard");
    } else if(password !== user.password) {
      alert("Invalid credentials");
      return;
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(userInfo.email, userInfo.password);
  }

  // const [password, setPassword] = useState("");

  // const allPassword = (e) => {
  //   const pass = e.target.value;
  //   setPassword(pass);
  // }

  

  return (
    <div className="login_container">
      <div className="login_card">
        <div className="login_header">
          <h1>Bank Login</h1>
          <p>Secure access to your account</p>
        </div>

        <form className="login_form" onSubmit={handleLogin}>

          <div className="form_group">
            <label htmlFor="email">Email Address</label>
            <div className="input_wrapper">
              <FaUser className="input_icon" />
              <input type="email" id="email" placeholder="Enter your email" 
                     required={true} 
                    //  onChange={(e) => setEmail(e.target.value)}
                    onChange={holdEmail}
                     />
            </div>
            <span style={{color: "red", fontSize: "14px"}}>
              {
                errorMsg3.msg && errorMsg3.name === "email" ? errorMsg3.msg : ""
              }
            </span>
          </div>

          <div className="form_group">
            <label htmlFor="password">Password</label>
            <div className="input_wrapper password_wrapper">
              <FaLock className="input_icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                required={true}
                // onChange={(e) => setPassword(e.target.value)}
                onChange={holdPassword}
              />
              <button
                type="button"
                className="toggle_password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <span style={{color: "red", fontSize: "14px"}}>
              {
                errorMsg3.msg && errorMsg3.name === "password" ? errorMsg3.msg : ""
              }
            </span>
          </div>

          <div className="remember_forgot">
            <label className="remember_me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="forgot_link">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login_btn">
            Login
          </button>
        </form>

        <div className="signup_link">
          <p>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
