import { RiDashboardFill } from "react-icons/ri";
import { IoCartSharp } from "react-icons/io5";
import { FiPackage } from "react-icons/fi";
import { SiGoogleanalytics } from "react-icons/si";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { FaTruck } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

import { FaUsers } from "react-icons/fa";
import { FaPercent } from "react-icons/fa";

import logo from '../assets/logo.svg'
import { SaleChart } from "../components/SaleChart";

export const AdminDashboard = () => {
    const [Menu, setMenu] = useState("Dashboard")
    const [LoadAllorder, setLoadAllorder] = useState(false)
    const orders = [
        {
            id: "#ORD-0924",
            customer: "Samantha M.",
            initials: "SM",
            date: "Aug 24, 2023",
            status: "Completed",
            amount: 452.00,
        },
        {
            id: "#ORD-0925",
            customer: "Ethan R.",
            initials: "ER",
            date: "Aug 24, 2023",
            status: "Processing",
            amount: 180.00,
        },
        {
            id: "#ORD-0925",
            customer: "Ethan R.",
            initials: "ER",
            date: "Aug 24, 2023",
            status: "Processing",
            amount: 180.00,
        },
        {
            id: "#ORD-0925",
            customer: "Ethan R.",
            initials: "ER",
            date: "Aug 24, 2023",
            status: "Processing",
            amount: 180.00,
        },
        {
            id: "#ORD-0925",
            customer: "Ethan R.",
            initials: "ER",
            date: "Aug 24, 2023",
            status: "Processing",
            amount: 180.00,
        },
        {
            id: "#ORD-0925",
            customer: "Ethan R.",
            initials: "ER",
            date: "Aug 24, 2023",
            status: "Processing",
            amount: 180.00,
        },
        {
            id: "#ORD-0925",
            customer: "Ethan R.",
            initials: "ER",
            date: "Aug 24, 2023",
            status: "Processing",
            amount: 180.00,
        },
        {
            id: "#ORD-0925",
            customer: "Ethan R.",
            initials: "ER",
            date: "Aug 24, 2023",
            status: "Processing",
            amount: 180.00,
        },
        {
            id: "#ORD-0925",
            customer: "Ethan R.",
            initials: "ER",
            date: "Aug 24, 2023",
            status: "Processing",
            amount: 180.00,
        },
        {
            id: "#ORD-0925",
            customer: "Ethan R.",
            initials: "ER",
            date: "Aug 24, 2023",
            status: "Processing",
            amount: 180.00,
        },

    ];



    return (
        <div className="w-full flex h-screen overflow-hidden">
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
                    <button className="btn-primary bg-bg w-full text-black">
                        <div><BiLogOut className="font-bold" /></div>
                        <div className="font-body font-bold">Logout</div>
                    </button>

                </div>

            </div>

            <div className="w-full pb-20 lg:pb-5 lg:w-[83%] overflow-y-auto bg-bg no-scrollbar px-10">
                {Menu === "Dashboard" && (
                    <div className="w-full flex flex-col py-5 animate-fade-up">
                        {/*Header Row*/}
                        <div className="w-full flex justify-between py-5">
                            <div className="lg:w-[80%] w-[50%] font-accent text-black flex flex-col">
                                <span className="font-bold lg:text-3xl text-xl">Dashboard <span className="lg:block -mt-5">Overiew</span> </span>
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
                            <div className="bg-wh rounded-lg flex flex-col justify-center items-center pr-10">

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
                                <div className="hidden lg:block">Date</div>
                                <div >Status</div>
                                <div>Amount</div>
                            </div>
                            {orders.slice(0,LoadAllorder? orders.length : 5).map((order, index) => {
                                return (
                                    <div key={index} className="grid grid-cols-[1.5fr_1.5fr_1fr] lg:grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr] md:grid-cols-4 px-2 py-5 border-b-2 border-gray-700/10 text-black animate-fade-up">
                                        <div className="hidden lg:block">{order.id}</div>
                                        <div className="">{order.customer}</div>
                                        <div className="hidden lg:block">{order.date}</div>
                                        <div className="">{order.status}</div>
                                        <div className="">{order.amount}</div>

                                    </div>
                                )
                            })}
                            <div className="w-full flex justify-center items-center py-5">
                                <button onClick={() => setLoadAllorder(!LoadAllorder)} className="btn-primary">{LoadAllorder? "Show less": "Load more"}</button>
                            </div>


                        </div>


                    </div>
                )}
                {Menu === "Products" && (
                    <div className="w-full">
                        <h1 className="font-body text-7xl"> Products</h1>
                    </div>
                )}
                {Menu === "Orders" && (
                    <div className="w-full">
                        <h1 className="font-body text-7xl"> Orders</h1>
                    </div>
                )}
                {Menu === "Customers" && (
                    <div className="w-full">
                        <h1 className="font-body text-7xl"> Customers</h1>
                    </div>
                )}
                {Menu === "Analytics" && (
                    <div className="w-full">
                        <h1 className="font-body text-7xl"> Analytics</h1>
                    </div>
                )}
            </div>

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
        </div>
    )
}
