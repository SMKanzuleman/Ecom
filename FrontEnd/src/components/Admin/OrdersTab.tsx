import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import AdminPagenation from "./AdminPagenation";
import { useAuth } from "../../context/AuthContext";
import API from "../../Utils/API";
import { showSuccessToast } from "../../Utils/toast";
import { FaSave } from "react-icons/fa";
import ExportCSV from "../../Utils/ExportCSV";



export const OrdersTab = () => {


    const [OrderMenu, setOrderMenu] = useState("All")
    const [Orders, setOrders] = useState<any>([])
    const [SelectedStatus, setSelectedStatus] = useState("");
    const [SelectedOrder, setSelectedOrder] = useState<string | null>(null);


    const [CurrentPage, setCurrentPage] = useState(0)
    const [PostPerPage, setPostPerPage] = useState(10)
    const FirstIndex = CurrentPage * PostPerPage;
    const LastIndex = FirstIndex + PostPerPage;

    const { Token } = useAuth()

    const FetchOrders = async () => {
        try {
            const res = await API.get("/order",)
            if (res.data.Order) {
                setOrders(res.data.Order)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const HandleUpdateStatus = async (orderid: string) => {
        try {
            const res = await API.put(`/order/${orderid}`, { NewStatus: SelectedStatus })
            if (res.data) {
                showSuccessToast("Status Updated")
                console.log(res.data);
                FetchOrders()
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => { FetchOrders() }, [])

    const HandleExportOrders = () => {

        const ExportData = Orders.map((o: any) => ({
            "Customer": `${o.UserId.FName}`,
            "PaymentStatus": `${o.PaymentStatus}`,
            "OrderStatus": `${o.OrderStatus}`,
            "OrderPrice": `${o.OrderPrice}`
        }))
        ExportCSV(ExportData, "Orders_list")

    }


    return (
        <div className="w-full animate-fade-up flex flex-col gap-5">


            {/*Header Row*/}

            <div className="w-full flex justify-between">
                <div className="lg:w-[80%] w-[50%] font-accent text-black flex flex-col">
                    <span className="font-bold lg:text-3xl text-xl">Orders </span>
                    <span className="text-[14px] tracking-wide text-text lg:block hidden">Manage and track your customer Orders</span>
                </div>
                <div className="lg:w-[20%] w-[50%] justify-items-end"> <button onClick={() => HandleExportOrders()} className="btn-primary lg:text-sm text-[12px]"><FaDownload />Export</button></div>
            </div>

            {/* Menu Selection */}

            <div className="w-fit flex py-1 px-2 bg-wh rounded-full lg:gap-5 items-center  lg:justify-start justify-between ">
                <div onClick={() => setOrderMenu("All")} className={`cursor-pointer ${OrderMenu === "All" ? "text-wh bg-black rounded-full px-3 py-1" : "text-text"}`}>All</div>
                <div onClick={() => setOrderMenu("shipped")} className={`cursor-pointer ${OrderMenu === "shipped" ? "text-wh bg-black rounded-full px-3 py-1" : "text-text"}`}>Shipped</div>
                <div onClick={() => setOrderMenu("delivered")} className={`cursor-pointer ${OrderMenu === "delivered" ? "text-wh bg-black rounded-full px-3 py-1" : "text-text"}`}>Delivered</div>
                <div onClick={() => setOrderMenu("processing")} className={`cursor-pointer ${OrderMenu === "processing" ? "text-wh bg-black rounded-full px-3 py-1" : "text-text"}`}>Processing</div>
                <div onClick={() => setOrderMenu("cancelled")} className={`cursor-pointer ${OrderMenu === "cancelled" ? "text-wh bg-black rounded-full px-3 py-1" : "text-text"}`}>Cancelled</div>
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
                    <div className=" lg:block hidden">Update Status</div>
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
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.OrderStatus === "shipped" ? "bg-blue-100 text-blue-800" :
                                        order.OrderStatus === "delivered" ? "bg-emerald-100 text-emerald-800" :
                                            order.OrderStatus === "cancelled" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                                        }`}>
                                        {order.OrderStatus}
                                    </span>
                                </div>
                                <div className="">Rs.{Math.floor(order.OrderPrice)}</div>
                                <div className="flex justify-start flex-row gap-5 cursor-pointer">

                                    <select onChange={(e) => {
                                        setSelectedStatus(e.target.value)
                                        setSelectedOrder(order._id)
                                    }} defaultValue={order.OrderStatus} className="cursor-pointer">
                                        <option value={"processing"}>Processing</option>
                                        <option value={"delivered"}>Delivered</option>
                                        <option value={"cancelled"}>Cancelled</option>
                                        <option value={"shipped"}>Shipped</option>
                                    </select>


                                    {SelectedOrder === order._id && SelectedStatus !== order.OrderStatus && (
                                        <button onClick={() => HandleUpdateStatus(order._id)} className="btn-primary py-1 px-3 rounded-full text-[14px]"><FaSave /></button>

                                    )}



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
