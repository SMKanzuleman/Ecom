import { RiDashboardFill } from "react-icons/ri";
import { FiPackage } from "react-icons/fi";
import { IoCartSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";

type BottomNavProps = {
    Menu: string,
    setMenu: (m: string) => void
}
const BottomNav = ({ Menu, setMenu }: BottomNavProps) => {
    return (
        <div className="fixed -bottom-2 left-0 right-0 h-20 w-full bg-black lg:hidden flex gap-1 items-center justify-around py-0">

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
    )
}

export default BottomNav