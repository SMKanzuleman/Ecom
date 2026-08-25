import { RiDashboardFill } from "react-icons/ri";
import { FiPackage } from "react-icons/fi";
import { IoCartSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

type SidebarProps = {
    Menu: string,
    setMenu: (m: string) => void
}
const Sidebar = ({ Menu, setMenu }: SidebarProps) => {
    return (
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
                <Link to="/" >
                <button className="btn-primary bg-bg w-full text-black">
                    <div><BiLogOut className="font-bold" /></div>
                    <div className="font-body font-bold">Logout</div>
                </button>
                
                </Link>

            </div>

        </div>
    )
}

export default Sidebar