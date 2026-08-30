import { useState } from "react";
import Sidebar from "../components/User/Sidebar";
import Overview from "../components/User/Overview";
import RecentOrders from "../components/User/RecentOrders";
import Profile from "../components/User/Profile";
import ForgetPassword from "../components/User/ForgetPassword";


export const UserDashboard = () => {

    const [Menu, setMenu] = useState("Overview")

    return (
        <div className="w-full flex h-screen overflow-hidden">
            
            <Sidebar Menu={Menu} setMenu={setMenu} />

            <div className="w-full pb-20 lg:pb-5 py-5 lg:w-[83%] overflow-y-auto bg-bg no-scrollbar lg:px-10 px-5">
                {Menu === "Overview" && (<Overview />)}
                {Menu === "RecentOrders" &&( <RecentOrders />)}
                {Menu === "Profile" && (<Profile setMenu={setMenu} />)}
                {Menu === "Password" && (<ForgetPassword />)}
            </div>




        </div>
    )
}
