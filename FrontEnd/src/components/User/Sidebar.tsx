import BottomNav from "../Admin/BottomNav"
import { RiDashboardFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { GiShoppingBag } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

type SidebarProps = {
    Menu: any
    setMenu: (m: any) => void
}


const Sidebar = ({ Menu, setMenu }: SidebarProps) => {

    const { setToken } = useAuth()

    return (

        <div className="hidden lg:w-[17%] bg-black lg:flex lg:flex-col py-5 relative">

            <div className="w-full flex flex-col px-5">
                <Link to={`/`}>
                    <div className="font-accent text-3xl text-wh">
                        Ecom
                    </div>
                    <div className="font-accent text-sm tracking-wider">User Dashboard</div>
                </Link>
            </div>

            <div className="w-full flex flex-col gap-2 text-wh py-12">
                <div className={`flex cursor-pointer ${Menu === "Overview" ? "border-l-4 border-white bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-3`} onClick={() => { setMenu("Overview") }}>
                    <div><RiDashboardFill /></div>
                    <div className="font-body">Overview</div>
                </div>
                <div className={`flex cursor-pointer ${Menu === "RecentOrders" ? "border-l-4 border-white bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-3`} onClick={() => { setMenu("RecentOrders") }}>
                    <div><GiShoppingBag /></div>
                    <div className="font-body">RecentOrders</div>
                </div>
                <div className={`flex cursor-pointer ${Menu === "Profile" ? "border-l-4 border-white bg-wh/10 animate-fadding rounded-sm" : "bg-black"} w-full p-3 items-center gap-3`} onClick={() => { setMenu("Profile") }}>
                    <div><CgProfile /></div>
                    <div className="font-body">Profile</div>
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



            <BottomNav Menu={Menu} setMenu={setMenu} />

        </div>
    )
}

export default Sidebar