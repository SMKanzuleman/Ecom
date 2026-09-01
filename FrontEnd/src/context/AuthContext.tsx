import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../Utils/API";

type ContextType = {
    Token: string | null
    Name: string | null
    Role: string
    Loading:boolean
    setRole: (r: string) => void
    setToken: (t: string | null) => void
    setName: (n: string | null) => void
}


const AuthContext = createContext<ContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [Token, setToken] = useState<string | null>(null)
    const [Name, setName] = useState<string | null>("User")
    const [Role, setRole] = useState("")
    const [Loading, setLoading] = useState(true);


    useEffect(() => {
        const refresh = async () => {
            try {
                const res = await axios.post("http://localhost:2026/auth/refresh", {}, { withCredentials: true }); //! forces Axios to attach the HttpOnly cookie to the HTTP request headers so Express can read it.
                setToken(res.data.token)
                const r = JSON.parse(atob(res.data.token.split('.')[1]));
                setRole(r.Role)
                setName(res.data.UserName)
                API.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`
            } catch (error) {
                setToken(null)
            }finally{
                setLoading(false)
            }

        }
        refresh()
    }, [])

    useEffect(() => {
        const handleRefresh = (event: any) => {
            const NewToken = event.detail;
            setToken(NewToken)
        }
        window.addEventListener("Token_Refreshed", handleRefresh);

        return () => window.removeEventListener("Token_Refreshed", handleRefresh);

    }, [])

    return (
        <AuthContext.Provider value={{ Token, setToken, Name, setName, Role, setRole,Loading }}>
            { children}
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
