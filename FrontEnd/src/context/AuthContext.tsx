import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type ContextType = {
    Token: string | null
    Name: string | null
    setToken: (t: string | null) => void
    setName: (n: string | null) => void
}


const AuthContext = createContext<ContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [Token, setToken] = useState<string | null>(null)
    const [Name, setName] = useState<string | null>("User")

    useEffect(() => {
        const refresh = async () => {
            try {
                const res = await axios.post("http://localhost:2026/auth/refresh", {}, { withCredentials: true }); //! forces Axios to attach the HttpOnly cookie to the HTTP request headers so Express can read it.
                setToken(res.data.token)
            } catch (error) {
                setToken(null)
            }
        }
        refresh()
    }, [])

    return (
        <AuthContext.Provider value={{ Token, setToken,Name,setName }}>
            {children}
        </AuthContext.Provider>

    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) { 
        throw console.error("useAuth must be used inside an AuthProvider");
    }
    return context
}

//* use  const {Token,SetToken}=useAuth
