
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { OrdersTab } from "../components/Admin/OrdersTab";
import Sidebar from "../components/Admin/Sidebar";
import BottomNav from "../components/Admin/BottomNav";
import Dashboard from "../components/Admin/Dashboard";
import ProductsTab from "../components/Admin/ProductsTab";
import CustomersTab from "../components/Admin/CustomersTab";
import AddNewProductTab from "../components/Admin/AddNewProductTab";
import Setting from "../components/Admin/Setting";
import API from "../Utils/API";
import EditProduct from "../components/Admin/EditProduct";

export const AdminDashboard = () => {

    const [Products, setProducts] = useState<any>([])
    const [Orders, setOrders] = useState<any>([])
    const [Users, setUsers] = useState<any>([])
    const [SelectedProductId, setSelectedProductId] = useState(null);


    const [Filter, setFilter] = useState(false)
    const [Menu, setMenu] = useState("Dashboard")


    const [Selected, setSelected] = useState("T-shirts")
    const [SelectedStatus, setSelectedStatus] = useState("Draft")
    const [SelectedUser, setSelectedUser] = useState<any>(null)

    const { Token } = useAuth()



    const categories = ["T-shirts", "Shirts", "Jeans", "Hoodie"];
    const Status = ["Active", "Draft", "Saved"]

    const FetchProducts = async () => {
        try {
            const res = await API.get("/products")
            if (res.data.AllProducts) {
                setProducts(res.data.AllProducts)
            }
        } catch (err) {
            console.error(err)
        }
    }
    const FetchUsers = async () => {
        try {
            const res = await API.get("/dashboard/AllUsers")
            if (res.data.Users) {
                setUsers(res.data.Users)

            }
        } catch (err) {
            console.error(err)
        }
    }
    const FetchOrders = async () => {
        try {
            const res = await API.get("order")
            if (res.data.Order) {
                console.log("Setting orders")
                setOrders(res.data.Order)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        FetchProducts()
        FetchUsers();
        FetchOrders();
    }, [])




    return (
        <div className="w-full flex h-screen overflow-hidden">

            {Filter && (
                <div className="fixed inset-0 lg:hidden z-50  flex items-end">
                    <div className="w-full bg-wh rounded-t-4xl p-5 animate-fade-up flex flex-col px-10">
                        {/* Filter + Icon */}
                        <div className="flex justify-between items-center border-b-2 border-gray-700/10 pb-5">
                            <div className=" font-accent text-2xl text-black font-bold">Filters</div>
                            <div onClick={() => setFilter(false)}><IoMdCloseCircle className="text-3xl text-black" /></div>
                        </div>
                        {/* Categories */}
                        <div className="w-full py-5 flex flex-col gap-2">
                            <div className=" font-heading text-[14px]">Category</div>
                            {categories.map((cat, index) => {
                                return (
                                    <label key={index} className="w-full px-5 flex text-black items-center justify-start gap-2">
                                        <div onClick={() => setSelected(cat)} className={`w-5 h-5 rounded-full flex items-center justify-center ${Selected === cat ? "bg-black" : "border-2 border-gray-700/30"}`}>{Selected === cat && (<FaCheck className="text-wh text-xs" />)} </div>
                                        <span>{cat}</span>
                                    </label>
                                )
                            })}
                        </div>
                        {/* Status */}
                        <div className="w-full py-5 flex flex-col gap-2">
                            <div className=" font-heading text-[14px]">Status</div>
                            {Status.map((st, index) => {
                                return (
                                    <label key={index} className="w-full px-5 flex text-black items-center justify-start gap-2">
                                        <div onClick={() => setSelectedStatus(st)} className={`w-5 h-5 rounded-full flex items-center justify-center ${SelectedStatus === st ? "bg-black" : "border-2 border-gray-700/30"}`}>{SelectedStatus === st && (<FaCheck className="text-wh text-xs" />)} </div>
                                        <span>{st}</span>
                                    </label>
                                )
                            })}
                        </div>
                        {/* Apply Filter btn */}
                        <div className="w-full py-5">
                            <button className="w-full btn-primary">Apply Filter</button>
                        </div>



                    </div>

                </div>
            )}
            {SelectedUser && (
                <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-xs flex items-end lg:hidden animate-fade-up">
                    <div className="w-full flex flex-col justify-between bg-wh rounded-t-4xl p-10 gap-5">
                        <div className="w-full flex justify-between">
                            <div className="font-accent text-black text-2xl font-semibold">User Details</div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="text-black tex text-2xl t-2xl">&#123;</div>
                            <div className="font-med px-10 text-lg">FName:      <span className="text-xl px-5 bg-bg rounded-lg p-0.5 text-black">{SelectedUser.FName}</span> </div>
                            <div className="font-med px-10 text-lg">Email:      <span className="text-xl px-5 bg-bg rounded-lg p-0.5 text-black">{SelectedUser.Email}</span> </div>
                            <div className="font-med px-10 text-lg">Password:   <span className="text-xl px-5 bg-bg rounded-lg p-0.5 text-black">{SelectedUser.Password}</span> </div>
                            <div className="font-med px-10 text-lg">Orders:     <span className="text-xl px-5 bg-bg rounded-lg p-0.5 text-black">15</span></div>
                            <div className="font-med px-10 text-lg">Total Spent:<span className="text-xl px-5 bg-bg rounded-lg p-0.5 text-black">12,999</span> </div>
                            <div className="font-med px-10 text-lg">Provider:   <span className="text-xl px-5 bg-bg rounded-lg p-0.5 text-black">{SelectedUser.Provider}</span> </div>
                            <div className="text-black text-2xl">&#125;</div>

                        </div>
                        <div> <button onClick={() => setSelectedUser(null)} className="btn-primary w-full">Close</button></div>


                    </div>



                </div>

            )}

            <Sidebar Menu={Menu} setMenu={setMenu} />

            <div className="w-full pb-20 lg:pb-5 py-5 lg:w-[83%] overflow-y-auto bg-bg no-scrollbar px-10">
                {Menu === "Dashboard" && (<Dashboard />)}
                {Menu === "Products" && (<ProductsTab setMenu={setMenu}  setSelectedProductId={setSelectedProductId} />)}
                {Menu === "Orders" && (<OrdersTab />)}
                {Menu === "Customers" && (<CustomersTab />)}
                {Menu === "Setting" && (<Setting />)}
                {Menu === "AddNewProduct" && (
                    <AddNewProductTab setMenu={setMenu} />
                )}
                {Menu=="EditProduct" && (<EditProduct EditId={SelectedProductId} />) }

            </div>

            <BottomNav Menu={Menu} setMenu={setMenu} />

        </div>
    )
}
