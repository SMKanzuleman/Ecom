import { LiaFilterSolid } from "react-icons/lia";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

import AdminPagenation from "./AdminPagenation";

import logo from "../../assets/logo.svg"
import axios from "axios";




const ProductsTab = () => {

    const [Currentpage, setCurrentpage] = useState(0);
    const PostperPage = 8;
    const FirstIndex = Currentpage * PostperPage;
    const LastIndex = FirstIndex + PostperPage;


    const [Products, setProducts] = useState<any>([])

    const [Selected, setSelected] = useState("T-shirts")
    const [SelectedStatus, setSelectedStatus] = useState("Draft")
    const [SelectedUser, setSelectedUser] = useState<any>(null)
    const [Filter, setFilter] = useState(false)

    const FetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:2026/products")
            if (res.data.AllProducts) {
                setProducts(res.data.AllProducts)
            
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(()=>{
        FetchProducts()
    },[])

    const categories = ["T-shirts", "Shirts", "Jeans", "Hoodie"];
    const Status = ["Active", "Draft", "Saved"]

    return (
        <div className="w-full animate-fade-up">
            {/* Header */}
            <div className="w-full flex lg:flex-row flex-col lg:justify-between gap-5">
                <div className="font-accent text-3xl font-bold text-black">Products</div>
                <div className="w-full flex justify-between">
                    <div><button onClick={() => setFilter(true)} className="btn-primary lg:hidden" > <LiaFilterSolid /> Filters</button></div>
                    <div><button className="btn-primary" > <FaPlus /> Add Product</button></div>
                </div>
            </div>


            {/* Main Box */}
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_3fr] gap-5 py-5">

                {/* Left */}
                <div className="bg-wh shadow-xl rounded-lg px-5 h-125 lg:flex hidden  flex-col py-5">
                    {/* Filter + Icon */}
                    <div className="flex justify-between items-center border-b-2 border-gray-700/10 pb-5">
                        <div className=" font-accent text-2xl text-black font-bold">Filters</div>
                        <div><LiaFilterSolid className="text-3xl" /></div>
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
                {/* Right */}
                <div className="bg-wh rounded-lg shadow-xl flex flex-col">
                    {/* Showing 1-10 of 124 items */}
                    <div className="flex justify-start p-3 text-[14px] border-b-2 border-gray-700/10">
                        <span className="">
                            Showing {FirstIndex} -{LastIndex} of {Products.length} items
                        </span>
                    </div>
                    {/* Header */}
                    <div className="grid lg:grid-cols-[0.5fr_3fr_1fr_1fr_1fr_1fr] grid-cols-[0.5fr_2fr_1fr_1fr] gap-x-5 py-4 px-3 border-b-2 border-gray-700/10">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-700/30`}> </div>
                        <div>Product</div>
                        <div>Category</div>
                        <div className="lg:block hidden">Price</div>
                        <div className="lg:block hidden">Stock</div>
                        <div>Actions</div>
                    </div>
                    {/* Body */}
                    <div className="flex flex-col">
                        {Products.slice(FirstIndex, LastIndex).map((product: any, index: any) => {
                            return (
                                <div key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_3fr__1fr_1fr_1fr_1fr] gap-x-5 items-center py-2 px-3 border-b-2 border-gray-700/10 text-black">
                                    <div className={` cursor-pointer w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-700/30`}> </div>
                                    <div className="flex items-center gap-5">
                                        <div className="lg:w-10 aspect-square lg:h-10 w-12 h-12 bg-bg rounded-lg p-1 flex items-center justify-center">
                                            <img src={logo} alt="" className="w-full h-full" />

                                        </div>
                                        <div>
                                            {product.Name}</div>
                                    </div>
                                    <div>Category</div>
                                    <div className="lg:block hidden">{product.Price}</div>
                                    <div className="lg:block hidden">{product.Stock}</div>
                                    <div className="flex flex-col gap-2 items-center">
                                        <button className="bg-bg cursor-pointer w-7 h-7 flex justify-center items-center text-black rounded-sm hover:scale-105 duration-200"><MdEdit /></button>
                                        <button className="bg-bg cursor-pointer w-7 h-7 flex justify-center items-center text-black rounded-sm hover:scale-105 duration-200"><MdDelete /></button>
                                    </div>
                                </div>
                            )
                        })}

                        <AdminPagenation CurrentPage={Currentpage} setCurrentpage={setCurrentpage} FirstIndex={FirstIndex} LastIndex={LastIndex} PostPerPage={PostperPage} Capacity={Products.length} />

                    </div>


                </div>
            </div>

        </div>
    )
}

export default ProductsTab