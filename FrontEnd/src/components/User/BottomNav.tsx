import { RiDashboardFill } from "react-icons/ri";
import { FiPackage } from "react-icons/fi";
import { IoCartSharp } from "react-icons/io5";

type BottomNavProps = {
    Menu: string,
    setMenu: (m: string) => void
}
const BottomNav = ({ Menu, setMenu }: BottomNavProps) => {
    return (
        <div className="fixed -bottom-2 left-0 right-0 h-20 w-full bg-black lg:hidden flex gap-1 items-center justify-around py-0">

            <div className={`flex flex-col cursor-pointer ${Menu === "Overview" ? "bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-1`} onClick={() => { setMenu("Overview") }}>
                <div><RiDashboardFill className="text-2xl" /></div>
                <div className="font-body text-sm">Overview</div>
            </div>

            <div className={`flex flex-col gap-0 cursor-pointer ${Menu === "RecentOrders" ? " bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center`} onClick={() => { setMenu("RecentOrders") }}>
                <div><FiPackage className="text-2xl" /></div>
                <div className="font-body text-sm">RecentOrders</div>
            </div>

            <div className={`flex flex-col  cursor-pointer ${Menu === "Profile" ? " bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-0`} onClick={() => { setMenu("Profile") }}>
                <div><IoCartSharp className="text-2xl" /></div>
                <div className="font-body text-sm">Profile</div>
            </div>



        </div>
    )
}

export default BottomNav