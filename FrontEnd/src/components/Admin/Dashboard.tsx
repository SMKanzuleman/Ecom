//React
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { SaleChart } from "../SaleChart"
import axios from "axios";
import logo from '../../assets/logo.svg'
// icons
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { FaTruck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { FaPercent } from "react-icons/fa";



const Dashboard = () => {
    const [Orders, setOrders] = useState<any>([])
    const {Token} =useAuth()

    const FetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:2026/order/", { headers: { Authorization: `Bearer ${Token}` }, withCredentials: true })
            if (res.data.Order) {
                console.log("Setting orders")
                setOrders(res.data.Order)
            }
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        FetchOrders()
    }, [])

    return (
        <div className="w-full flex flex-col py-5 animate-fade-up">

            {/*Header Row*/}
            <div className="w-full flex justify-between py-5">
                <div className="lg:w-[80%] w-[50%] font-accent text-black flex flex-col">
                    <span className="font-bold lg:text-3xl text-xl">Dashboard <span className=" -mt-5 ">Overiew</span> </span>
                    <span className="text-[14px] tracking-wide text-text lg:block hidden">Welcome back,Here what is happening</span>
                </div>
                <div className="lg:w-[20%] w-[50%] justify-items-end"> <button className="btn-primary lg:text-sm text-[12px]"><FaDownload />Export Report</button></div>
            </div>
            {/*KPI Row*/}
            <div className="w-full grid lg:grid-cols-4 grid-cols-2  gap-5">
                {/*KPI */}
                <div className=" bg-wh p-5 flex flex-col rounded-lg gap-0.5 relative">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
                            <HiMiniCurrencyDollar className="w-[70%] h-[70%]" />
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                            <span className="text-xs text-gray-500">
                                This Month
                            </span>
                            <span className="py-0.5 rounded-full bg-green-300 text-sm text-black px-2">
                                Rs.1,239
                            </span>
                        </div>
                    </div>
                    <div className="w-full font-heading text-black font-semibold text-3xl">Rs.12,200</div>
                    <div className="w-full text-sm tracking-wider -mt-1">Total Revenue</div>
                </div>
                <div className=" bg-wh p-5 flex flex-col rounded-lg gap-0.5 relative">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
                            <FaUsers className="w-[70%] h-[70%]" />
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                            <span className="text-xs text-gray-500">
                                This Month
                            </span>
                            <span className="py-0.5 rounded-full bg-green-300 text-sm text-black px-2">
                                239
                            </span>
                        </div>
                    </div>
                    <div className="w-full font-heading text-black font-semibold text-3xl">900</div>
                    <div className="w-full text-sm tracking-wider -mt-1">Total Customers</div>
                </div>
                <div className=" bg-wh p-5 flex flex-col rounded-lg gap-0.5 relative">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
                            <FaTruck className="w-[70%] h-[70%]" />
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                            <span className="text-xs text-gray-500">
                                This Month
                            </span>
                            <span className="py-0.5 rounded-full bg-green-300 text-sm text-black px-2">
                                39
                            </span>
                        </div>
                    </div>
                    <div className="w-full font-heading text-black font-semibold text-3xl">200</div>
                    <div className="w-full text-sm tracking-wider -mt-1">Total Orders </div>
                </div>
                <div className=" bg-wh p-5 flex flex-col rounded-lg gap-0.5 relative">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
                            <FaPercent className="w-[40%] h-[40%]" />
                        </div>

                    </div>
                    <div className="w-full font-heading text-black font-semibold text-3xl">3.8</div>
                    <div className="w-full text-sm tracking-wider -mt-1">Conversion rate</div>
                </div>

            </div>
            {/* Graph Row */}
            <div className="w-full grid lg:grid-cols-[750px_1fr] gap-5 py-5 ">
                <div className="bg-wh rounded-lg flex flex-col justify-center items-center lg:pr-10 pr-5">

                    <div className=" w-full font-accent text-xl font-bold text-black flex justify-start px-10 py-5">Sales overview</div>
                    <SaleChart />
                </div>
                <div className="bg-wh rounded-lg p-5 flex flex-col">
                    <div className="flex justify-between items-center">
                        <div className="font-accent font-bold text-black text-xl">Top Product</div>
                        <div className="font-body text-[14px] ">View All</div>
                    </div>
                    {/* Top Product cards */}
                    <div className="w-full flex h-full  flex-col justify-center py-2 gap-5">

                        <div className="w-full flex justify-between bg-bg rounded-lg p-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-bg p-2 rounded-lg">
                                    <img src={logo} alt="" className="w-10 h-10" />
                                </div>
                                <div className="text-xl text-black">Cotton Button Down Shirt</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="text-black "> <span className="text-[12px]">Rs.</span>1500</div>
                                <div className="text-black text-[12px]">400</div>
                                <span className="text-[12px] font-medium text-text -mt-2">sales </span>

                            </div>
                        </div>
                        <div className="w-full flex justify-between bg-bg rounded-lg p-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-bg p-2 rounded-lg">
                                    <img src={logo} alt="" className="w-10 h-10" />
                                </div>
                                <div className="text-xl text-black">Cotton Button Down Shirt</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="text-black "> <span className="text-[12px]">Rs.</span>1500</div>
                                <div className="text-black text-[12px]">400</div>
                                <span className="text-[12px] font-medium text-text -mt-2">sales </span>

                            </div>
                        </div>
                        <div className="w-full flex justify-between bg-bg rounded-lg p-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-bg p-2 rounded-lg">
                                    <img src={logo} alt="" className="w-10 h-10" />
                                </div>
                                <div className="text-xl text-black">Cotton Button Down Shirt</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="text-black "> <span className="text-[12px]">Rs.</span>1500</div>
                                <div className="text-black text-[12px]">400</div>
                                <span className="text-[12px] font-medium text-text -mt-2">sales </span>

                            </div>
                        </div>
                        <div className="w-full flex justify-between bg-bg rounded-lg p-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-bg p-2 rounded-lg">
                                    <img src={logo} alt="" className="w-10 h-10" />
                                </div>
                                <div className="text-xl text-black">Cotton Button Down Shirt</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="text-black "> <span className="text-[12px]">Rs.</span>1500</div>
                                <div className="text-black text-[12px]">400</div>
                                <span className="text-[12px] font-medium text-text -mt-2">sales </span>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
            {/* Recent order Row */}

            <div className={`w-full bg-wh rounded-lg px-10 animate-fade-up`}>
                <div className="w-full py-5 font-accent font-bold text-xl text-black ">
                    Recent order
                </div>

                <div className="grid lg:grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr] grid-cols-[1.5fr_1.5fr_1fr] md:grid-cols-4 bg-bg/70 rounded-sm p-2 font-heading">
                    <div className="hidden lg:block">Order Id</div>
                    <div>Customer</div>
                    <div className="hidden lg:block">Payment</div>
                    <div >Status</div>
                    <div>Amount</div>
                </div>
                {Orders.slice(0,6).map((order:any, index:any) => {
                    return (
                        <div key={index} className="grid grid-cols-[1.5fr_1.5fr_1fr] lg:grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr] md:grid-cols-4 px-2 py-5 border-b-2 border-gray-700/10 text-black animate-fade-up">
                            <div className="hidden lg:block">{12}</div>
                            <div className="">{order.UserId.FName}</div>
                            <div className="hidden lg:block">{order.PaymentStatus}</div>
                            <div className="">{order.OrderStatus}</div>
                            <div className="">{order.OrderPrice}</div>
                        </div>
                    )
                })}
     


            </div>


        </div>
    )
}

export default Dashboard