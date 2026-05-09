import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaRegEye, FaRegEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const users = useSelector(state => state.users);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
    loginUser(email, password);
  }

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
              <input type="email" id="email" placeholder="Enter your email" required={true} onChange={(e) => setEmail(e.target.value)}/>
            </div>
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle_password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
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
