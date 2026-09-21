import { RiDashboardFill } from "react-icons/ri";
import { FiPackage } from "react-icons/fi";
import { IoCartSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../Utils/API";
import { showWaringToast } from "../../Utils/toast";
import { LuPanelLeftClose } from "react-icons/lu";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import Button from "../../animated components/Button";
import { fadeInDown } from "../../Utils/Motion";

type SidebarProps = {
    Menu: string,
    setMenu: (m: string) => void
}



const Sidebar = ({ Menu, setMenu }: SidebarProps) => {

    const { setToken } = useAuth()
    const { ClearCart } = useCart()
    const Navigate = useNavigate()
    const [IsCollapsed, setIsCollapsed] = useState(false);
    const [OpenSubMenu, setOpenSubMenu] = useState<any>(null);


    const HnadleLogout = async () => {
        try {
            const res = await API.post("/auth/logout")
            if (res.data) {
                showWaringToast("Loged out.")
                setToken("")
                ClearCart()
                Navigate("/")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <motion.div 
        variants={fadeInDown}
        initial="hidden"
        animate="visible"
        className={`hidden bg-black lg:flex lg:flex-col py-5  relative shrink-0 ${IsCollapsed ? "lg:w-20" : "lg:w-[18%]"}`}>

            {/* Logo , collapse */}
            <div className={`w-full flex flex-col ${IsCollapsed ? "lg:px-3" : "lg:px-5"}`}>
                <div className={`flex ${IsCollapsed ? "justify-center" : "justify-between"}  items-center group overflow-hidden`}>
                    <div
                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${IsCollapsed ? "max-w-0 opacity-0 hidden" : "w-full opacity-100"}`}>
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
            {/* Links */}
            <div className="w-full flex flex-col gap-2 text-wh py-12 overflow-hidden">
                {[
                    {
                        key: "Dashboard",
                        label: "Dashboard",
                        icon: <RiDashboardFill className="text-xl shrink-0" />,
                    },
                    {
                        key: "Products",
                        label: "Products",
                        icon: <FiPackage className="text-xl shrink-0" />,
                    },
                    {
                        key: "Orders",
                        label: "Orders",
                        icon: <IoCartSharp className="text-xl shrink-0" />,
                    },
                    {
                        key: "Customers",
                        label: "Customers",
                        icon: <FaUsers className="text-xl shrink-0" />,
                    },
                    {
                        key: "Setting",
                        label: "Setting",
                        icon: <SiGoogleanalytics className="text-xl shrink-0" />,
                        SubMenu: [
                            { key: "AddStyles", label: "Add Styles" },
                            { key: "HomeStyles", label: "HomePage Styles" },
                            { key: "Footer", label: "Configure Footer " }
                        ]
                    },
                ].map((item, index) => {
                    const isSubActive = item.SubMenu?.some((sub: any) => sub.key === Menu);
                    const isActive = Menu === item.key || isSubActive;
                    return (
                        <div key={index} className="flex flex-col gap-3">
                            <motion.div
                                whileHover={{ x: IsCollapsed ? 0 : 4 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.15 }}
                                onClick={() => {
                                    if (item.SubMenu) {
                                        const isOpening = OpenSubMenu !== item.key;
                                        setOpenSubMenu(isOpening ? item.key : null);
                                        if (isOpening) {
                                            setMenu(item.SubMenu[0].key);
                                        }
                                    } else {
                                        setMenu(item.key);
                                        setOpenSubMenu(null);
                                    }
                                }}
                                title={item.label}
                                className={`flex items-center cursor-pointer rounded-xl transition-all duration-200
                            ${isActive ? "border-l-2 border-wh bg-wh/10 text-wh font-semibold" : "bg-black text-wh/70 hover:bg-white/10 hover:text-wh"}
                            ${IsCollapsed ? "justify-center p-3 mx-2" : "p-3 mx-3 pr-5 gap-4"}`}>
                                {/* icon */}
                                {item.icon}
                                {/* Label */}
                                <span
                                    className={`font-body whitespace-nowrap overflow-hidden transition-all duration-300 
                                ${IsCollapsed ? "max-w-0 opacity-0 hidden" : "max-w-37.5 opacity-100"}`}>
                                    {item.label}
                                </span>
                                {item.SubMenu && !IsCollapsed && (
                                    <FaChevronRight className={`${OpenSubMenu === item.key ? "rotate-90" : "rotate-0"} ml-auto shrink-0 transition-all duration-300 ease-in-out`} />
                                )}
                            </motion.div>

                            {/* SubMenu only when NOT collapsed */}
                            <AnimatePresence>
                                {!IsCollapsed && OpenSubMenu === item.key && item.SubMenu && (
                                    item.SubMenu.map((i, sIdx) => {
                                        const isSubActive = Menu === i.key;
                                        return (
                                            <motion.div
                                                whileHover={{ x: 4 }}
                                                whileTap={{ scale: 0.97 }}
                                                key={sIdx}
                                                onClick={() => {
                                                    setMenu(i.key);
                                                }}
                                                title={i.label}
                                                className={`flex items-center gap-2.5 py-2.5 px-6 mx-3  rounded-lg  cursor-pointer  ${isSubActive
                                                    ? "bg-white text-black font-semibold shadow-md"
                                                    : "text-wh/70 hover:text-wh hover:bg-white/10"
                                                    }`}
                                            >
                                                <span
                                                    className="font-body text-sm whitespace-nowrap overflow-hidden"
                                                >
                                                    {i.label}
                                                </span>
                                            </motion.div>
                                        );
                                    })
                                )}
                            </AnimatePresence>

                        </div>
                    );
                })}
            </div>
            {/* 3. Logout Button */}
            <div
                className={`w-full absolute bottom-2 transition-all duration-300 ${IsCollapsed ? "px-2 " : "px-5"}`}
            >
                <Button
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
                </Button>
            </div>




        </motion.div >
    )
}

export default Sidebar