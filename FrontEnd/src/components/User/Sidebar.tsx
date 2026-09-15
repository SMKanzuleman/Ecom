import BottomNav from "../Admin/BottomNav"
import { RiDashboardFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { GiShoppingBag } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import API from "../../Utils/API";
import { showWaringToast } from "../../Utils/toast";
import { useState } from "react";
import { LuPanelLeftClose } from "react-icons/lu";

type SidebarProps = {
    Menu: any
    setMenu: (m: any) => void
}

const Sidebar = ({ Menu, setMenu }: SidebarProps) => {

    const { setToken } = useAuth()
    const Navigate = useNavigate()
    const [IsCollapsed, setIsCollapsed] = useState(false);
    const HnadleLogout = async () => {
        try {
            const res = await API.post("/auth/logout")
            if (res.data) {
                showWaringToast("Loged out.")
                setToken("")
                Navigate("/")
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (

       <div className={`hidden bg-black lg:flex lg:flex-col py-5 transition-all duration-300 ease-in-out relative ${IsCollapsed ? "lg:w-16" : "lg:w-[17%]"}`}>

            <div className={`w-full flex flex-col ${IsCollapsed ? "lg:px-2" : "lg:px-5"}`}>
                <div className={`flex ${IsCollapsed ? "justify-center" : "justify-between"}  items-center group overflow-hidden`}>
                    
                    <div
                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${IsCollapsed ? "max-w-0 opacity-0" : "w-full opacity-100"}`}>
                        <Link to={`/`}>
                            <div className="font-accent text-3xl text-wh">Ecom</div>
                            <div className="font-accent text-sm tracking-wider text-gray-400">Admin Panel</div>
                        </Link>

                    </div>

                    <span>
                        <LuPanelLeftClose
                            onClick={() => setIsCollapsed(!IsCollapsed)}
                            className={`text-2xl  ${IsCollapsed ? "hover:rotate-180 text-wh" : "rotate-0"} cursor-pointer duration-500`} />
                    </span>
                </div>
            </div>

            <div className="w-full flex flex-col gap-2 text-wh py-12 overflow-hidden">
                {[
                    {
                        key: "Overview",
                        label: "Overview",
                        icon: <RiDashboardFill className="text-xl shrink-0" />,
                    },
                    {
                        key: "RecentOrders",
                        label: "RecentOrders",
                        icon: <GiShoppingBag className="text-xl shrink-0" />,
                    },
                    {
                        key: "Profile",
                        label: "Profile",
                        icon: <CgProfile className="text-xl shrink-0" />,
                    }
                ].map((item, index) => {
                    const isActive = Menu === item.key
                    return (
                        <div
                            key={index}
                            onClick={() => setMenu(item.key)}
                            title={item.label}
                            className={`flex items-center p-3 cursor-pointer 
                            ${isActive ? "border-l-2 border-wh bg-wh/10" : "bg-black hover:bg-white/10"}
                            ${IsCollapsed ? "justify-center" : "gap-4"}`}>
                            {/* icon */}
                            {item.icon}
                            {/* Label */}
                            <span
                                className={`font-body whitespace-nowrap overflow-hidden transition-all duration-300 
                                ${IsCollapsed ? "max-w-0 opacity-0" : "max-w-37.5 opacity-100"}`}>
                                {item.label}
                            </span>

                        </div>
                    )
                })}

            </div>

            {/* 3. Logout Button */}
            <div
                className={`w-full absolute bottom-2 transition-all duration-300 ${IsCollapsed ? "px-2 " : "px-5"}`}
            >
                <button
                    className="btn-primary bg-bg w-full text-black flex items-center justify-center rounded-lg p-2  gap-2 overflow-hidden"
                    onClick={() => HnadleLogout()}
                    title={IsCollapsed ? "Logout" : ""}
                >
                    <BiLogOut className="text-xl font-bold shrink-0" />
                    <span
                        className={`font-body font-bold text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${IsCollapsed ? "max-w-0 opacity-0" : "max-w-[100px] opacity-100"
                            }`}
                    >
                        Logout
                    </span>
                </button>
            </div>




        </div >
    )
}

export default Sidebar


 