import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './Components/NotFound'
import Login from './Page/Auth/Login'
import SignUp from './Page/Auth/SignUp'
import Dashboard from './Page/Auth/Dashboard/Dashboard'
import Terms from "./Page/Auth/Terms";
import Private from "./Lib/Private";

function App() {

  return (
       <BrowserRouter>
         <Routes>
          <Route path="*" element={<NotFound />}/>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          <Route element= {<Private/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/terms" element={<Terms />} />
         </Routes>
       </BrowserRouter>
 
  )
}

export default App
