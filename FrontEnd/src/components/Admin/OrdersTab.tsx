import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import axios from "axios";
import AdminPagenation from "./AdminPagenation";
import { useAuth } from "../../context/AuthContext";
import API from "../../Utils/API";



export const OrdersTab = () => {


    const [OrderMenu, setOrderMenu] = useState("All")
    const [Orders, setOrders] = useState<any>([])
    const [CurrentPage, setCurrentPage] = useState(1)
    const [PostPerPage, setPostPerPage] = useState(10)
    const FirstIndex = CurrentPage * PostPerPage;
    const LastIndex = FirstIndex + PostPerPage;

    const { Token } = useAuth()

    const FetchOrders = async () => {
        try {
            const res = await API.get("/order",)
            if (res.data.Order) {
                console.log("Setting orders")
                console.log(res.data.Order);

                setOrders(res.data.Order)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => { FetchOrders() }, [])


    return (
        <div className="w-full animate-fade-up flex flex-col gap-5">

            {/*Header Row*/}
            <div className="w-full flex justify-between">
                <div className="lg:w-[80%] w-[50%] font-accent text-black flex flex-col">
                    <span className="font-bold lg:text-3xl text-xl">Orders </span>
                    <span className="text-[14px] tracking-wide text-text lg:block hidden">Manage and track your customer Orders</span>
                </div>
                <div className="lg:w-[20%] w-[50%] justify-items-end"> <button className="btn-primary lg:text-sm text-[12px]"><FaDownload />Export</button></div>
            </div>

            {/* Menu Selection */}

            <div className="w-full flex p-3 bg-wh rounded-lg lg:gap-10  lg:justify-start justify-between ">
                <div onClick={() => setOrderMenu("All")} className={`cursor-pointer ${OrderMenu === "All" ? "text-black" : "text-text"}`}>All</div>
                <div onClick={() => setOrderMenu("shipped")} className={`cursor-pointer ${OrderMenu === "shipped" ? "text-black" : "text-text"}`}>Shipped</div>
                <div onClick={() => setOrderMenu("delivered")} className={`cursor-pointer ${OrderMenu === "delivered" ? "text-black" : "text-text"}`}>Delivered</div>
                <div onClick={() => setOrderMenu("processing")} className={`cursor-pointer ${OrderMenu === "processing" ? "text-black" : "text-text"}`}>Processing</div>
                <div onClick={() => setOrderMenu("cancelled")} className={`cursor-pointer ${OrderMenu === "cancelled" ? "text-black" : "text-text"}`}>Cancelled</div>
            </div>

            <div className="text-red-500 flex justify-center lg:hidden">*Use Desktop site to change order status*</div>

            <div className="bg-wh rounded-lg shadow-xl flex flex-col">
                {/* Header */}
                <div className=" bg-bg font-semibold text-black  border-2 rounded-t-lg grid lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] grid-cols-[1fr_1fr_1fr_1fr] gap-x-5 py-4 px-3 border-b-2 border-gray-700/10">
                    <div className="lg:block hidden">Order Id</div>
                    <div className="">Customer</div>
                    {/* <div className="lg:block hidden">Date</div> */}
                    {/* <div className="lg:block hidden">Orders</div> */}
                    <div className=""> Payment</div>
                    <div className=""> Status</div>
                    <div className="">Amount</div>
                    <div className="lg:px-5 lg:block hidden">Action</div>
                </div>
                {/* Body */}
                <div className="flex flex-col">
                    {Orders.slice(FirstIndex, LastIndex).map((order: any, index: any) => {

                        if (OrderMenu !== "All" && order.OrderStatus?.toLowerCase() !== OrderMenu.toLowerCase()) {
                            return null;
                        }
                        return (
                            <div key={index} className="grid grid-cols-[1fr_1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-x-5 items-center py-2 px-3 border-b-2 border-gray-700/10 text-black">
                                <div className="px-10 lg:block hidden ">{12}</div>
                                <div className="flex items-center gap-5 sm:text-sm ">

                                    <div> {order.UserId.FName}</div>
                                </div>
                                {/* <div className="lg:block hidden">{user.Password}</div> */}
                                <div className="">{order.PaymentStatus}</div>
                                {/* <div>10</div> */}
                                <div className="">{order.OrderStatus}</div>
                                <div className=""> {order.OrderPrice}</div>
                                <div className="flex flex-row gap-2 lg:block hidden">
                                    <button className=" cursor-pointer w h-7 flex justify-center items-center text-black rounded-xl hover:scale-105 duration-200 bg-amber-950 px-3 text-xs text-wh/80">Update Status</button>
                                </div>
                            </div>

                        )
                    })}

                    <AdminPagenation FirstIndex={FirstIndex} LastIndex={LastIndex} CurrentPage={CurrentPage} setCurrentpage={setCurrentPage} PostPerPage={PostPerPage} Capacity={Orders.length} />

                </div>


            </div>

        </div>
    )
}
