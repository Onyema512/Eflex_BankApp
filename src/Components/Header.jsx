import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import '../Css/Header.css'
import axios from 'axios';
import { BaseURL, getInitials, GetProfile } from '../Lib/HighFunction';

const Header = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("Token")
      navigate("/")
    }

    const userId = localStorage.getItem("Id");
    const [userData, setUserData] = useState({});
    
    const handleGetOneUser = async () => {
      const userRes = await axios.get(`${BaseURL}/user/${userId}`);
      setUserData(userRes?.data?.data);
    }

    useEffect(() => {
      handleGetOneUser();
    }, [userId]);
    console.log("userData", userData);

  return (
    <header className='header_Container'>
      <article className="Header_Wrapper">
        <h3>
          Eflex <span>Bank App</span>
        </h3>

        <div className="Header_Wrapper_Right">
          <div className="header_Profile_Holder">
            <div className="Header_Profile">
              {/* {GetProfile(userData?.fullName)} */}
              {getInitials(userData?.fullName)}
            </div>
            <h5>{userData?.fullName}</h5>
          </div>
          <button className="Btn Header_Btn" 
          // onClick={() => navigate("/")}
          onClick={logout}
          >
            {userData?.fullName !== undefined ? "Log out" : "Login"}
            </button>

          <div className="Header_Mobile_Toggle" >
            <IoMenu className="Icon" />
          </div>
        </div>
      </article>
    </header>
  )
}

export default Header
