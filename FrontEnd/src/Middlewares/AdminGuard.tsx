import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const AdminGuard = ({children}:{children:React.ReactNode}) => {
    const {Role,Token}=useAuth()
    if(!Token){
        return <Navigate to={`/auth`} replace />;
    }
    if(Role!="Admin"){
        return <Navigate to={`/`}replace />
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default AdminGuard