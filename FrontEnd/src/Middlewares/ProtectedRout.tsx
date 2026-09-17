import React from 'react'
import { useAuth } from '../context/AuthContext'
import { showWaringToast } from '../Utils/toast'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRout = () => {

    const { Token, Loading } = useAuth()
    if (Loading) {
        return <div className="h-screen w-full flex items-center justify-center bg-bg font-accent">Loading...</div>;
    }
    if (!Token) {
        return <Navigate to={"/auth"} />
    }
    return <Outlet />
}

export default ProtectedRout