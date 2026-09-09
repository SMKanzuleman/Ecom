import { useEffect, useState } from "react";
import Sidebar from "../components/User/Sidebar";
import Overview from "../components/User/Overview";
import RecentOrders from "../components/User/RecentOrders";
import Profile from "../components/User/Profile";
import ForgetPassword from "../components/User/ForgetPassword";
import BottomNav from "../components/User/BottomNav";
import API from "../Utils/API";
import { showSuccessToast } from "../Utils/toast";
import { ResetPassword } from "../components/User/ResetPassword";


export const UserDashboard = () => {

    const [Menu, setMenu] = useState("Overview")

    const [Orders, setOrders] = useState<any>([]);

    const [TotalOrders, setTotalOrders] = useState(0);

    const [Inprogress, setInprogress] = useState(0);

    const [UserSpending, setUserSpending] = useState(0);

    const [CancelledOrders, setCancelledOrders] = useState(0);

    const [UserName, setUserName] = useState("");

    const [UserEmail, setUserEmail] = useState();

    const [DefaultAddress, setDefaultAddress] = useState<any>({});

    const FetchStats = async () => {
        try {
            const res = await API.get("/user/dashboard/stats")
            if (res.data) {
                showSuccessToast("stats setted")
                setTotalOrders(res.data.TotalOrders)
                setInprogress(res.data.TotalInProgressOrders)
                setUserSpending(res.data.UserTotalSpending)
                setCancelledOrders(res.data.TotalInCancelOrders)
            }
        } catch (error) {
            console.error(error)

        }
    }
    const FetchOrders = async () => {
        try {
            const res = await API.get("/order/userorders")
            if (res.data) {
                setOrders(res.data.OrderUser)
                showSuccessToast("orders setted")
                console.log(res.data.OrderUser);
            }
        } catch (error) {
            console.error(error)
        }
    }
    const FetchUserInfo = async () => {
        try {
            const res = await API.get("/user/dashboard/info")
            if (res.data) {
                setUserName(res.data.UserName)
                setUserEmail(res.data.UserEmail)
                setDefaultAddress(res.data.DefaultAddress)
                showSuccessToast("Info setted")
                console.log(res.data);
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        FetchStats()
        FetchOrders()
        FetchUserInfo()
    }, [])

    return (
        <div className="w-full flex h-screen overflow-hidden">

            <Sidebar Menu={Menu} setMenu={setMenu} />

            <div className="w-full pb-20 lg:pb-5 py-5 lg:w-[83%] overflow-y-auto bg-bg no-scrollbar lg:px-10 px-5">
                {Menu === "Overview" && (<Overview recentOrder={Orders?.[0] || null} TotalOrders={TotalOrders} TotalInProgress={Inprogress} TotalUserSpending={UserSpending} CancelledOrders={CancelledOrders} />)}
                {Menu === "RecentOrders" && (<RecentOrders MyOrders={Orders} />)}
                {Menu === "Profile" && (<Profile setMenu={setMenu} UserName={UserName} UserEmail={UserEmail} DefaultAddress={DefaultAddress} setDefaultAddress={setDefaultAddress} />)}
                {Menu === "Password" && (<ResetPassword setMenu={setMenu} />)}
            </div>

            <BottomNav Menu={Menu} setMenu={setMenu} />

        </div>
    )
}
