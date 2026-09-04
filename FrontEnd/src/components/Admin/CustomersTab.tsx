import { FaDownload } from "react-icons/fa6";
import { IoCartSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { RiCashLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';
import AdminPagenation from './AdminPagenation';
import API from "../../Utils/API";
import ExportCSV from "../../Utils/ExportCSV";

const CustomersTab = ({ Stats, Orders }: any) => {

    const [CurrentPage, setCurrentPage] = useState(1)
    const [PostPerPage, setPostPerPage] = useState(8)
    const [Users, setUsers] = useState<any>([])
    const [SelectedUser, setSelectedUser] = useState<any>(null)
    const FirstIndex = CurrentPage * PostPerPage;
    const LastIndex = FirstIndex + PostPerPage;
    const { Token } = useAuth()

    const FetchUsers = async () => {
        try {
            const res = await API.get("/dashboard/AllUsers",)
            if (res.data.Users) {
                setUsers(res.data.Users)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        FetchUsers()
    }, [])

    const GetCustomerSpending = (userId: string) => {
        return Orders.filter((o: any) => userId === o.UserId._id && o.OrderStatus === "delivered").reduce((sum, o) => sum + o.OrderPrice, 0)
    }

    const HandleExportCustumers = () => {

        const ExportData = Users.map((o: any) => ({
            "Customer_Name": `${o.FName}`,
            "Email": `${o.Email}`,
            "Password": `${o.Password}`,
            "Provider": `${o.Provider}`,
            "Joined": `${new Date(o.createdAt).toLocaleDateString()}`
        }))

    
        ExportCSV(ExportData, "Customer_list")
        

    }

    return (
        <div className="w-full animate-fade-up flex flex-col gap-5">


            {/*Header Row*/}
            <div className="w-full flex justify-between">
                <div className="lg:w-[80%] w-[50%] font-accent text-black flex flex-col">
                    <span className="font-bold lg:text-3xl text-xl">Customer </span>
                    <span className="text-[14px] tracking-wide text-text lg:block hidden">Manage and view your registered user base.</span>
                </div>
                <div className="lg:w-[20%] w-[50%] justify-items-end"> <button onClick={()=>HandleExportCustumers()} className="btn-primary lg:text-sm text-[12px]"><FaDownload />Export</button></div>
            </div>
            {/*KPI Row*/}
            <div className="w-full grid lg:grid-cols-3 grid-cols-2  gap-5">
                {/*KPI */}
                <div className=" bg-wh p-5 flex flex-col rounded-lg gap-0.5 relative hover:scale-101 duration-200">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
                            <FaUsers className="w-[70%] h-[70%]" />
                        </div>

                    </div>
                    <div className="w-full font-heading text-black font-semibold text-3xl">{Stats?.AllCustomers}</div>
                    <div className="w-full text-sm tracking-wider -mt-1">Total Customers</div>
                </div>
                <div className=" bg-wh p-5 flex flex-col rounded-lg gap-0.5 relative hover:scale-101 duration-200">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
                            <IoCartSharp className="w-[70%] h-[70%]" />
                        </div>

                    </div>
                    <div className="w-full font-heading text-black font-semibold text-3xl">Rs.{Math.round(Stats?.TotalRevenue)}</div>
                    <div className="w-full text-sm tracking-wider -mt-1">Total Revenue</div>
                </div>
                <div className=" bg-wh p-5 flex flex-col rounded-lg gap-0.5 relative hover:scale-101 duration-200">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
                            <RiCashLine className="w-[70%] h-[70%]" />
                        </div>

                    </div>
                    <div className="w-full font-heading text-black font-semibold text-3xl">Rs.{Stats?.AvgLifetime} </div>
                    <div className="w-full text-sm tracking-wider -mt-1">AVG Lifetime value</div>
                </div>

            </div>

            <div className="bg-wh rounded-lg shadow-xl flex flex-col">

                {/* Header */}
                <div className=" bg-bg font-semibold text-black  border-2 border-black grid lg:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] grid-cols-[1.5fr_1fr] gap-x-5 py-4 px-3 border-b-2 border-gray-700/10">
                    <div className="">Customer Name</div>
                    <div className="lg:block hidden">Email</div>
                    <div className="lg:block hidden">Password</div>
                    {/* <div className="lg:block hidden">Orders</div> */}
                    <div className="lg:block hidden">Provider</div>
                    <div className="lg:block hidden">Total Spent (PKR)</div>
                    <div className="lg:px-5">Joined</div>
                </div>

                {/* Body */}
                <div className="flex flex-col">
                    {Users.slice(FirstIndex, LastIndex).map((user: any, index: any) => {
                        return (
                            <div key={index} className="grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] gap-x-5 items-center py-2 px-3 border-b-2 border-gray-700/10 text-black">
                                <div className="px-10 ">{user.FName}</div>
                                <div className="lg:flex items-center gap-5 sm:text-sm hidden">
                                    <div className="lg:w-10 aspect-square lg:h-10 w-12 h-12 bg-bg rounded-full p-1 flex items-center justify-center text-2xl">
                                        {user.Email.slice(0, 1)}
                                    </div>
                                    <div>
                                        {user.Email}</div>
                                </div>
                                <div className="lg:block hidden">{user.Password}</div>
                                {/* <div>10</div> */}
                                <div className="lg:block hidden">{user.Provider}</div>
                                <div className="lg:block hidden"> Rs.{GetCustomerSpending(user._id).toLocaleString()}</div>
                                <div className="lg:block hidden">{new Date(user.createdAt).toLocaleDateString("en-GB")}</div>
                            </div>

                        )
                    })}

                    <AdminPagenation FirstIndex={FirstIndex} LastIndex={LastIndex} CurrentPage={CurrentPage} setCurrentpage={setCurrentPage} PostPerPage={PostPerPage} Capacity={Users.length} />

                </div>


            </div>

        </div>
    )
}

export default CustomersTab