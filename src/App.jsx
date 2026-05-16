import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './Components/NotFound'
import Login from './Page/Auth/Login'
import SignUp from './Page/Auth/SignUp'
import Dashboard from './Page/Auth/Dashboard/Dashboard'
import Terms from "./Page/Auth/Terms";

function App() {

  return (
       <BrowserRouter>
         <Routes>
          <Route path="*" element={<NotFound />}/>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/terms" element={<Terms />} />
         </Routes>
       </BrowserRouter>
 
  )
}

export default App
