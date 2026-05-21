import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {
    // const token = ""
    // const Token = JSON.parse (localStorage.getItem("Token"));
    const token = localStorage.getItem("Token");

  return token ? <Outlet /> : <Navigate to= "/" />; 
  
}

export default Private
