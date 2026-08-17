import { RiDashboardFill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { IoCartSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { SiGoogleanalytics } from "react-icons/si";
import logo from '../assets/logo.svg'
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";



export const AdminDashboard = () => {
    const [Menu, setMenu] = useState("Dashboard")
    return (
        <div className="w-full flex h-screen overflow-hidden">
            <div className="hidden lg:w-[17%] bg-black lg:flex lg:flex-col py-5 relative">

                <div className="w-full flex flex-col px-5">
                    <div className="font-accent text-3xl text-wh">
                        Ecom
                    </div>
                    <div className="font-accent text-sm tracking-wider">Admin Panel</div>
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
                    <div className={`flex cursor-pointer ${Menu === "Analytics" ? "border-l-4 border-white bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-3`} onClick={() => { setMenu("Analytics") }}>
                        <div><SiGoogleanalytics /></div>
                        <div className="font-body">Analytics</div>
                    </div>


                </div>

                <div className="w-full absolute bottom-2 px-5">
                    <button className="btn-primary bg-bg w-full text-black">
                        <div><BiLogOut className="font-bold" /></div>
                        <div className="font-body font-bold">Logout</div>
                    </button>

                </div>

            </div>

            <div className="w-full lg:w-[83%] overflow-y-auto bg-bg no-scrollbar">
                {Menu === "Dashboard" && (
                    <div className="w-full">
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                        <h1 className="font-body text-7xl"> dashboard</h1>
                    </div>
                )}
                {Menu === "Products" && (
                    <div className="w-full">
                        <h1 className="font-body text-7xl"> Products</h1>
                    </div>
                )}
                {Menu === "Orders" && (
                    <div className="w-full">
                        <h1 className="font-body text-7xl"> Orders</h1>
                    </div>
                )}
                {Menu === "Customers" && (
                    <div className="w-full">
                        <h1 className="font-body text-7xl"> Customers</h1>
                    </div>
                )}
                {Menu === "Analytics" && (
                    <div className="w-full">
                        <h1 className="font-body text-7xl"> Analytics</h1>
                    </div>
                )}
            </div>

            <div className="fixed -bottom-2 left-0 h-20 w-full bg-black lg:hidden flex gap-1 items-center justify-around">

                <div className={`flex flex-col cursor-pointer ${Menu === "Dashboard" ? "bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-1`} onClick={() => { setMenu("Dashboard") }}>
                    <div><RiDashboardFill className="text-2xl" /></div>
                    <div className="font-body text-sm">Dashboard</div>
                </div>

                <div className={`flex flex-col gap-0 cursor-pointer ${Menu === "Products" ? " bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center`} onClick={() => { setMenu("Products") }}>
                    <div><FiPackage className="text-2xl" /></div>
                    <div className="font-body text-sm">Products</div>
                </div>

                <div className={`flex flex-col  cursor-pointer ${Menu === "Orders" ? " bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-0`} onClick={() => { setMenu("Orders") }}>
                    <div><IoCartSharp className="text-2xl" /></div>
                    <div className="font-body text-sm">Orders</div>
                </div>
                <div className={`flex flex-col  cursor-pointer ${Menu === "Customers" ? " bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-0`} onClick={() => { setMenu("Customers") }}>
                    <div><FaUsers className="text-2xl" /></div>
                    <div className="font-body text-sm">Customers</div>
                </div>
                <div className={`flex flex-col  cursor-pointer ${Menu === "Analytics" ? " bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-0`} onClick={() => { setMenu("Analytics") }}>
                    <div><SiGoogleanalytics className="text-2xl" /></div>
                    <div className="font-body  text-sm">Analytics</div>
                </div>



            </div>
        </div>
    )
}
