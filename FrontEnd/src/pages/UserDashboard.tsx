import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import BottomNav from "../components/Admin/BottomNav";
import { RiDashboardFill } from "react-icons/ri";
import { FiPackage } from "react-icons/fi";
import { IoCartSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { BiLogOut } from "react-icons/bi";


export const UserDashboard = () => {

    const [Menu, setMenu] = useState("Dashboard")
    const { Token,setToken } = useAuth()

    return (
        
        <div className="w-full flex h-screen overflow-hidden">


       
            <div className="hidden lg:w-[17%] bg-black lg:flex lg:flex-col py-5 relative">

                <div className="w-full flex flex-col px-5">
                    <div className="font-accent text-3xl text-wh">
                        Ecom
                    </div>
                    <div className="font-accent text-sm tracking-wider">User Dashboard</div>
                </div>

                <div className="w-full flex flex-col gap-2 text-wh py-12">
                    <div className={`flex cursor-pointer ${Menu === "Dashboard" ? "border-l-4 border-white bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-3`} onClick={() => { setMenu("Dashboard") }}>
                        <div><RiDashboardFill /></div>
                        <div className="font-body">Dashboard</div>
                    </div>
                    <div className={`flex cursor-pointer ${Menu === "Products" ? "border-l-4 border-white bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-3`} onClick={() => { setMenu("Products") }}>
                        <div><FiPackage /></div>
                        <div className="font-body">Products</div>
                    </div>
                    <div className={`flex cursor-pointer ${Menu === "Orders" ? "border-l-4 border-white bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-3`} onClick={() => { setMenu("Orders") }}>
                        <div><IoCartSharp /></div>
                        <div className="font-body">Orders</div>
                    </div>
                    <div className={`flex cursor-pointer ${Menu === "Customers" ? "border-l-4 border-white bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-3`} onClick={() => { setMenu("Customers") }}>
                        <div><FaUsers /></div>
                        <div className="font-body">Customers</div>
                    </div>
                    <div className={`flex cursor-pointer ${Menu === "Analytics" ? "border-l-4 border-white bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-3`} onClick={() => { setMenu("Setting") }}>
                        <div><SiGoogleanalytics /></div>
                        <div className="font-body">Setting</div>
                    </div>
                </div>

                <div className="w-full absolute bottom-2 px-5">

                    <button className="btn-primary bg-bg w-full text-black" onClick={() => {
                        setToken("")
                        
                       
                    }}>
                        <div><BiLogOut className="font-bold" /></div>
                        <div className="font-body font-bold">Logout</div>
                    </button>



                </div>

            </div>
            



            <BottomNav Menu={Menu} setMenu={setMenu} />

        </div>
    )
}
