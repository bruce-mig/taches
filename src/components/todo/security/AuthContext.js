import { createContext, useContext, useState } from "react";

// 1: Create a Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// 2: Share the created context with other components
export default function AuthProvider({children}) {
    // 3: Put some state in the context
    const [number, setNumber] = useState(0)

    setInterval(() => setNumber(number+1),10000)

    return(
        <AuthContext.Provider value={{number}}>
            {children}
        </AuthContext.Provider>
    )
}