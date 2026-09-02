import { showErrorToast, showSuccessToast } from "../../Utils/toast"
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RichTextEditor } from "./RichTextEditor";

import API from "../../Utils/API";



const EditProduct = ({ EditId,setMenu }: any) => {
    const Defaultsizes = ["XS", "S", "MD", "LG", "XL"]
    const [Imges, setImges] = useState<any>([])
    const [Sizes, setSizes] = useState<any>([])
    const [Colors, setColors] = useState<any>([])
    const [Details, setDetails] = useState("")
    const [ProductName, setProductName] = useState("")
    const [Brand, setBrand] = useState("")
    const [Gender, setGender] = useState("Men")
    const [Category, setCategory] = useState('T-Shirt');
    const [Tagline, setTagline] = useState("");
    const [Price, setPrice] = useState(0);
    const [SalePrice, setSalePrice] = useState(0);
    const [SKU, setSKU] = useState("PR-01");
    const [Stock, setStock] = useState<number>(0);

    const PreFill = async () => {
        try {
            const p = await API.get(`/products/${EditId}`)
            if (p.data?.FoundedProduct) {
                setProductName(p.data.FoundedProduct.Name)
                setStock(p.data.FoundedProduct.Stock)
                setSKU(p.data.FoundedProduct.SKU)
                setPrice(p.data.FoundedProduct.Price)
                setSalePrice(p.data.FoundedProduct.SalePrice)
                setTagline(p.data.FoundedProduct.Tagline)
                setGender(p.data.FoundedProduct.Gender)
                setCategory(p.data.FoundedProduct.Category)
                setBrand(p.data.FoundedProduct.Brand)
                setDetails(p.data.FoundedProduct.Description)
                setColors(p.data.FoundedProduct.Colors)
                setSizes(p.data.FoundedProduct.Sizes)
                setImges(p.data.FoundedProduct.Images)
                if (p.data.FoundedProduct.Images.length >= 1) {
                    setSelectedImge(p.data.FoundedProduct.Images[0])
                }
            }

        } catch (error) {
            showErrorToast("Error in Prefiling")
            console.error(error)
        }
    }
    const GetSelectedImageUrl = () => {
        if (SelectedImge === null) return ""
        if (typeof (SelectedImge) === "string") return SelectedImge
        return Previews.find((p) => p.file === SelectedImge)?.url
    }



    const formData = new FormData();

    formData.append("Name", ProductName)
    formData.append("Brand", Brand)
    formData.append("Gender", Gender)
    formData.append("Category", Category)
    formData.append("Tagline", Tagline)
    formData.append("Price", String(Price))
    formData.append("SalePrice", String(SalePrice))
    formData.append("SKU", SKU)
    formData.append("Stock", String(Stock))
    formData.append("Description", Details)
    Colors.forEach((c: string) => { formData.append("Colors", c) });
    Sizes.forEach((s: string) => { formData.append("Sizes", s) });
    Imges.forEach((i: string) => { formData.append("Imges", i) });

    const [InputColor, setInputColor] = useState("")
    const [Previews, setPreviews] = useState<{ file: File, url: string }[]>([])
    const [SelectedImge, setSelectedImge] = useState<File | String | null>(null)


    const AddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImges([...Imges, e.target.files[0]])
            const file = e.target.files[0];
            setSelectedImge(file)
        }
        else {
            return
        }
    }

    const RemoveImage = (i: number) => {

        const RemovedImg = Imges[i]
        const NewImges = Imges.filter((img: File, index: number) => index !== i)
        setImges(NewImges)

        if (SelectedImge?.name === RemovedImg?.name && SelectedImge?.size === RemovedImg?.size) {
            if (NewImges.length > 0) {
                const file = NewImges[0]
                setSelectedImge(file)
            }
            else {
                setSelectedImge(null)
            }
        }

    }

    const AddColor = () => {
        if (InputColor !== "" && !Colors.includes(InputColor)) {
            setColors([...Colors, InputColor])
            setInputColor("")
        }
    }

    const AddSize = (input: string) => {
        if (Sizes.includes(input)) {
            setSizes(Sizes.filter((s: string) => s !== input))
        }
        else {
            setSizes([...Sizes, input])
        }
    }

    const ADDPRODUCT = async () => {
        try {
            const res = await API.post("/products", formData,)


            if (res.data) {
                showSuccessToast(`${ProductName} added!`)

            }
            else {
                showErrorToast("There is some error")
            }

        } catch (error) {
            console.error(error)

        }
    }

    useEffect(() => {

        const PUrls = Imges.map((img: File) => {

            if (typeof (img) === "string") {
                return {
                    file: null, url: img
                }
            }
            return {
                file: img,
                url: URL.createObjectURL(img)
            }
        })
        setPreviews(PUrls)
        console.log("New Previews set hogiyy")

    }, [Imges])

    useEffect(() => { PreFill() }, [])

    const HandleEditProduct = async () => {
        try {
            const res = await API.put(`/products/${EditId}`,formData)
            console.log(res.data)
            showSuccessToast("saved")
            setMenu("Products")
            setTimeout(()=>{

            },2000)
            
            
        } catch (error) {
            showSuccessToast("Error")
            console.error(error)

        }
    }



    return (

        <div className="w-full flex flex-col">

            {/* Header */}
            <div className="w-full flex justify-between py-5">
                <span className=" font-accent text-black  font-bold lg:text-3xl text-xl decoration-dotted underline underline-offset-8">Edit Product </span>
                <button onClick={()=>HandleEditProduct()} className="btn-primary py-1">Save</button>
            </div>

            {/* Edit Product */}


            {/* Outer Container */}

            <div className="lg:grid grid-cols-[1fr_1.8fr] gap-5  animate-fade-up">

                {/* Left */}

                <div className="w-full flex flex-col gap-5">

                    {/* Images */}
                    <div className="w-full flex flex-col gap-5 p-5 bg-wh rounded-lg">

                        {SelectedImge === null ?
                            <label htmlFor="imges" className={`w-full bg-bg h-48 flex flex-col cursor-pointer rounded-2xl justify-center items-center " }`}>
                                <input onChange={(e) => AddImage(e)} type="file" id="imges" className="hidden" accept="image/png,image/jpeg,image/webp" />
                                <FaCloudUploadAlt className="text-2xl" />
                                <p>Click,Drag to Upload Images</p>
                                <span className="text-red-500 text-xs">*Warning JPEG,PNG,WEBP only*</span>
                            </label>
                            :
                            <div className="w-full h-72 bg-bg">

                                <img src={
                                    GetSelectedImageUrl()
                                } alt="select image" className="object-contain h-full w-full rounded-lg" />

                            </div>


                        }

                        {Imges.length > 0 && (
                            <div className="flex items-center justify-between gap-3 mt-2">
                                <div className="flex items-center flex-wrap gap-3 mt-2">
                                    {Imges.map((img: any, index: number) => {
                                        return (
                                            <div className="w-15 h-15 cursor-pointer rounded-lg overflow-hidden shadow-2xl relative" onClick={(e) => {
                                                e.stopPropagation()
                                                setSelectedImge(img)
                                            }}>

                                                <img src={typeof img === "string" ? img : Previews.find((p) => p.file === img)?.url} alt="" className="w-full h-full object-cover" />

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        RemoveImage(index)
                                                    }}
                                                    type="button" className="absolute top-0.5 right-0.5 bg-black/70 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] hover:bg-red-500 cursor-pointer"
                                                    title="Remove Image">✕</button>
                                            </div>

                                        );
                                    })}
                                </div>

                                <label htmlFor="imges" className={` bg-black h-20 w-20 flex flex-col cursor-pointer rounded-2xl justify-center items-center  }`}>
                                    <input onChange={(e) => AddImage(e)} type="file" id="imges" className="hidden" accept="image/png,image/jpeg,image/webp" />
                                    <FaCloudUploadAlt className="text-2xl" />
                                    <span className="text-xs">Upload</span>
                                </label>
                            </div>

                        )}


                    </div>

                    {/* Variants */}

                    <div className="w-full flex flex-col bg-wh rounded-lg px-5 gap-2 py-5">

                        <div className="w-full text-lg font-accent font-bold text-black">Variants</div>

                        {/* Colors */}

                        <div className="flex flex-col gap-2">
                            <div className=" w-full flex justify-between text-black">
                                <span>Colors</span>
                                <div className="flex gap-2">
                                    <label htmlFor="picker" className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 hover:border-black hover:scale-105 transition-all duration-100 relative">
                                        <input type="color" value={InputColor} onChange={(e) => setInputColor(e.target.value)} className="w-full h-full opacity-0 cursor-pointer absolute inset-0 z-10" id="picker" />
                                        <div className="w-full h-full rounded-full absolute inset-0 z-10" style={{ background: InputColor ? InputColor : "linear-gradient(135deg, #8B5CF6, #EC4899)" }} />
                                    </label>
                                    <button onClick={() => AddColor()} className="font-semibod p-2 rounded-lg bg-black text-wh btn-primary">+Add</button>
                                </div>
                            </div>
                            <div className="flex items-center justify-start gap-x-5 gap-y-2 flex-wrap">
                                {Colors.map((color: string, index: any) => {
                                    return (
                                        <div key={index} className="w-10 relative h-10 rounded-full z-10 cursor-pointer border-2 border-gray-300 hover:border-black hover:scale-105 transition-all duration-100" style={{ background: color }} >
                                            <button
                                                type="button"
                                                onClick={() => setColors(Colors.filter((_: any, i) => i !== index))}
                                                className="absolute -top-1 -right-1 bg-wh rounded-full p-0.5 text-black hover:text-red-500 shadow-md border border-gray-300 transition-transform hover:scale-110 z-20 cursor-pointer"
                                                title="Remove Color"
                                            >
                                                <MdDelete className="text-xs" />
                                            </button>
                                        </div>
                                    )
                                })}

                            </div>

                        </div>

                        {/* Size */}

                        <div className="flex flex-col gap-2">
                            <span className="text-black">Size</span>

                            <div className="flex items-center justify-start gap-x-5 gap-y-2 flex-nowrap">

                                {Defaultsizes.map((Size, index) => {
                                    return (
                                        <button
                                            onClick={() => {
                                                AddSize(Size)
                                            }} key={index} className={`btn-primary py-1 ${Sizes.includes(Size) ? "bg-black text-wh" : "bg-bg text-text"}`}>
                                            {Size}
                                        </button>
                                    )
                                })}

                            </div>

                        </div>







                    </div>


                </div>

                {/* Right */}


                <div className="w-full flex flex-col gap-5">

                    <div className="w-full flex flex-col bg-wh rounded-lg px-5 gap-2 py-5">

                        <div className="w-full text-lg font-accent font-semibold text-black">Basic Information</div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="pn" className="text-[14px] px-2">Product Name <span className="text-red-500">*</span></label>
                            <input type="text" className="input-primary w-full" onChange={(e) => setProductName(e.target.value)} value={ProductName} />
                        </div>

                        <div className="flex gap-5 justify-between">

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="b" className="text-[14px] px-2">Brand <span className="text-red-500">*</span></label>
                                <input type="text" className="input-primary w-full" value={Brand} onChange={(e) => setBrand(e.target.value)} />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="c" className="text-[14px] px-2">Gender <span className="text-red-500">*</span></label>
                                <select className="input-primary w-full relative" value={Gender} onChange={(e) => { setGender(e.target.value) }} >
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kids">Kids</option>
                                </select>


                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="c" className="text-[14px] px-2">Category <span className="text-red-500">*</span></label>
                                <select className="input-primary w-full" value={Category} onChange={(e) => { setCategory(e.target.value) }}>
                                    <option value="T-Shirt">T-Shirt</option>
                                    <option value="Shirt">Shirt</option>
                                    <option value="Trouser">Trouser</option>
                                    <option value="Jeans">Jeans</option>
                                    <option value="Hoodie">Hoodie</option>
                                    <option value="Jacket">Jacket</option>
                                    <option value="Sweater">Sweater</option>
                                    <option value="Polo">Polo</option>
                                    <option value="Shorts">Shorts</option>
                                    <option value="Activewear">Activewear</option>
                                </select>

                            </div>

                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="tagline" className="text-[14px] px-2">TagLine <span className="text-red-500">*</span></label>
                            <textarea
                                id="tagline"
                                rows="2"
                                className="input-primary w-full resize-none"
                                value={Tagline}
                                onChange={(e) => setTagline(e.target.value)}
                            ></textarea>
                        </div>

                    </div>

                    <div className="w-full flex flex-col bg-wh rounded-lg px-5 gap-2 py-5">
                        <div className="w-full text-lg font-accent font-semibold text-black">Pricing & Inventory</div>

                        <div className="flex gap-5 justify-between">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="b" className="text-[14px] px-2">Regular Price <span className="text-red-500">*</span></label>
                                <input type="number" className="input-primary w-full" value={Price} onChange={(e) => setPrice(Number(e.target.value))} />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="c" className="text-[14px] px-2">Sale Price <span className="text-red-500">*</span></label>
                                <input type="number" className="input-primary w-full" value={SalePrice} onChange={(e) => setSalePrice(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className="flex gap-5 justify-between">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="b" className="text-[14px] px-2">SKU <span className="text-red-500">*</span></label>
                                <input type="text" className="input-primary w-full" value={SKU} onChange={(e) => setSKU(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="c" className="text-[14px] px-2">Stock <span className="text-red-500">*</span></label>
                                <input type="number" className="input-primary w-full" value={Stock} onChange={(e) => setStock(Number(e.target.value))} />
                            </div>
                        </div>



                    </div>

                </div>


            </div>

            {/* Detail Desciption */}

            <div className="w-full px-5 bg-wh rounded-lg mt-5 py-5">

                {/* Header */}
                <div className="font-accent text-lg flex justify-start font-bold text-black py-5">Detail Description</div>

                <RichTextEditor key={Details} content={Details} onChange={setDetails} />


            </div>

        </div>

    )
}
export default EditProduct