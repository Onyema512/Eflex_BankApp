import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash, FaUser, FaEnvelope, FaLock, FaIdCard,} from "react-icons/fa";

const Terms = () => {
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userInfo, setUserInfo] = useState({
        password: "",
    })
    const [showRequirement, setShowRequirement] = useState(false);

    const holdPassword = (e) => {
        const newPasswword = e.target.value;
        setUserInfo({...userInfo, password: newPasswword})
    }

  return (
    <div>
        {showRequirement && (
            <div>
                <p>. 8 characters</p>
                <p>. one uppercase</p>
                <p>. one lowercase</p>
                <p>. one special character</p>
                <p>. one number</p>
            </div>
        )}
       
        <div>
            <input
            type='text'
            id='password'
            placeholder='Enter a strong password'
            onChange={holdPassword}
            onClick={() => setShowRequirement(true)} 
            onBlur={() => setShowRequirement(false)}
            />
        </div>
    </div>
  )
}

export default Terms
