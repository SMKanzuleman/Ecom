import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { showWaringToast } from '../Utils/toast'

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
    const { Role, Token } = useAuth()
    if (!Token) {
        showWaringToast("Please login first")
        return <Navigate to={`/auth`} replace />;
    }
    if (Role != "Admin") {
        return <Navigate to={`/userdashboard`} replace />
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default AdminGuard