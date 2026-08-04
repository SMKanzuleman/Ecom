import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type ContextType = {
    Token: string | null
    SetToken: (token: string | null) => void
}


const AuthContext = createContext<ContextType | undefined>(undefined)



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [Token, SetToken] = useState<string | null>(null)

    useEffect(() => {
        const refresh = async () => {
            try {
                const res = await axios.post("http://localhost:2026/auth/refresh", {}, { withCredentials: true }); //! forces Axios to attach the HttpOnly cookie to the HTTP request headers so Express can read it.
                SetToken(res.data.accessToken)
            } catch (error) {
                SetToken(null)
            }
        }
        refresh()
    }, [])

    return (
        <AuthContext.Provider value={{ Token, SetToken }}>
            {children}
        </AuthContext.Provider>

    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context ? context : null
}

//* use  const {Token,SetToken}=useAuth
