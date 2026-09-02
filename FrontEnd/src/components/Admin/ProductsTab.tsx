import { LiaFilterSolid } from "react-icons/lia";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import AdminPagenation from "./AdminPagenation";
import API from "../../Utils/API";

type ProductTypeProp = {
    setMenu: (m: string) => void
    setSelectedProductId: (i:any)=>void
}



const ProductsTab = ({ setMenu,setSelectedProductId }: ProductTypeProp) => {

    const [Currentpage, setCurrentpage] = useState(0);
    const PostperPage = 10;
    const FirstIndex = Currentpage * PostperPage;
    const LastIndex = FirstIndex + PostperPage;


    const [Products, setProducts] = useState<any>([])
    const [Categories, setCategories] = useState<any>([]);
    const [SCategory, setSCategory] = useState(null);




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
    const FetchFiltersData = async () => {
        try {
            const res = await API.get("/products/FilterData")
            if (res.data) {
                setCategories(res.data.Categories)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        FetchProducts()
        FetchFiltersData()
    }, [])

    const FilteredProducts = SCategory === null ? Products : Products.filter((p: any) => p.Category === SCategory)
    useEffect(() => {
    }, [SCategory])


    return (
        <div className="w-full animate-fade-up">

            {/* Header */}

            <div className="w-full flex lg:flex-row flex-col lg:justify-between gap-5">
                <div className="font-accent text-3xl font-bold text-black">Products</div>
                <div className="w-full flex justify-between">
                    <div><button className="btn-primary lg:hidden" > <LiaFilterSolid /> Filters</button></div>
                    <div><button onClick={() => setMenu("AddNewProduct")} className="btn-primary" > <FaPlus /> Add Product</button></div>
                </div>
            </div>

            {/* Main Box */}

            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_3fr] gap-5 py-5">

                {/* Left */}
                <div className="bg-wh shadow-xl rounded-lg px-5  lg:flex hidden h-fit flex-col py-5">
                    {/* Filter + Icon */}
                    <div className="flex justify-between items-center border-b-2 border-gray-700/10 pb-5">
                        <div className=" font-accent text-2xl text-black font-bold">Filters</div>
                        <div onClick={() => { setSCategory(null) }}>{SCategory===null? <LiaFilterSolid className="text-3xl" /> : <MdClear className="text-3xl text-red-600" />}</div>
                    </div>
                    {/* Categories */}
                    <div className="w-full py-5 flex flex-col gap-2">
                        <div className=" font-heading text-[14px]">Category</div>
                        {Categories.slice(6).map((cat, index) => {
                            return (
                                <label key={index} className="w-full px-5 flex text-black items-center justify-start gap-2">
                                    <div onClick={() => setSCategory(cat)} className={`w-5 h-5 rounded-full flex items-center justify-center ${SCategory === cat ? "bg-black" : "border-2 border-gray-700/30"}`}>{SCategory === cat && (<FaCheck className="text-wh text-xs" />)} </div>
                                    <span>{cat}</span>
                                </label>
                            )
                        })}
                    </div>
                    {/* Status */}
                    {/* <div className="w-full py-5 flex flex-col gap-2">
                        <div className=" font-heading text-[14px]">Status</div>
                        {Status.map((st, index) => {
                            return (
                                <label key={index} className="w-full px-5 flex text-black items-center justify-start gap-2">
                                    <div onClick={() => setSelectedStatus(st)} className={`w-5 h-5 rounded-full flex items-center justify-center ${SelectedStatus === st ? "bg-black" : "border-2 border-gray-700/30"}`}>{SelectedStatus === st && (<FaCheck className="text-wh text-xs" />)} </div>
                                    <span>{st}</span>
                                </label>
                            )
                        })}
                    </div> */}
                    {/* Apply Filter btn */}
                    {/* <div className="w-full py-5">
                        <button className="w-full btn-primary">Apply Filter</button>
                    </div> */}

                </div>
                {/* Right */}
                <div className="bg-wh rounded-lg shadow-xl flex flex-col h-fit">
                    {/* Showing 1-10 of 124 items */}

                    {/* Header */}
                    <div className="grid lg:grid-cols-[0.5fr_3fr_1fr_1fr_1fr_1fr] grid-cols-[0.5fr_2fr_1fr_1fr] gap-x-5 py-4 px-3  bg-bg rounded-t-lg border-2 border-gray-700/10">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-700/30`}> </div>
                        <div>Product</div>
                        <div>Category</div>
                        <div className="lg:block hidden">Price</div>
                        <div className="lg:block hidden">Stock</div>
                        <div>Actions</div>
                    </div>
                    {/* Body */}
                    <div className="flex flex-col">
                        {FilteredProducts.slice(FirstIndex, LastIndex).map((product: any, index: any) => {
                            return (
                                <div className="flex flex-col">
                                    <div key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_3fr__1fr_1fr_1fr_1fr] gap-x-5 items-center py-2 px-3 border-b-2 border-gray-700/10 text-black">
                                        <div className={` cursor-pointer w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-700/30`}> </div>
                                        <div className="flex items-center gap-5">
                                            <div className="lg:w-10 aspect-square lg:h-10 w-12 h-12 bg-bg rounded-lg p-0 flex items-center justify-center">
                                                <img src={product.Images[0]} alt="" className="w-full h-full rounded-lg object-cover" />

                                            </div>
                                            <div>
                                                {product.Name}</div>
                                        </div>
                                        <div>{product.Category}</div>
                                        <div className="lg:block hidden">{product.Price}</div>
                                        <div className="lg:block hidden">{product.Stock}</div>
                                        <div className="flex gap-2 items-center ">
                                            <button onClick={() => {
                                                setSelectedProductId(product._id)
                                                setMenu("EditProduct")
                                            }} className="bg-bg cursor-pointer w-7 h-7 flex justify-center items-center text-black rounded-sm hover:scale-105 duration-200"><MdEdit /></button>
                                            <button className="bg-bg cursor-pointer w-7 h-7 flex justify-center items-center text-black rounded-sm hover:scale-105 duration-200"><MdDelete /></button>
                                        </div>
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