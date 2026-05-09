import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    // const [userContextData, setUserContextData] = useState(null);
  const [user, setUser] = useState(null);
  const [fromAccount, setFromAccount] = useState(null);

  useEffect(() =>{
    // console.log("context",user);
  }, [user]);

    return
    <AuthContext.Provider value={{user, setUser, setFromAccount, fromAccount }}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;