import React from 'react'
import { useAuth } from '../context/AuthContext'
import { showWaringToast } from '../Utils/toast'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRout = () => {

    const { Token } = useAuth()
    if (!Token) {
        showWaringToast("Please Login first")
        return <Navigate to={"/auth"} />
    }
    return <Outlet />
}

export default ProtectedRout