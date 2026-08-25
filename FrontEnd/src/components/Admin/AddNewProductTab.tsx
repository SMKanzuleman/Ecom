import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ImImages } from "react-icons/im";
import logo from '../../assets/logo.svg'
import { RichTextEditor } from "./RichTextEditor";

type ProductTypeProp = {
    setMenu: (m: string) => void
}

const AddNewProductTab = ({ setMenu }: ProductTypeProp) => {

    const Defaultsizes = ["XS", "S", "MD", "LG", "XL"]

    const [Colors, setColors] = useState<any>([])
    const [InputColor, setInputColor] = useState("")
    const [Sizes, setSizes] = useState<any>([])
    const [Details, setDetails] = useState("")









    const [Imges, setImges] = useState<any>([])
    const [Previews, setPreviews] = useState<{ file: File, url: string }[]>([])
    const [SelectedImge, setSelectedImge] = useState<File | null>(null)


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
        const NewImges=Imges.filter((img: File, index: number) => index !== i)
        setImges(NewImges)
        
        if (SelectedImge?.name === RemovedImg?.name && SelectedImge?.size === RemovedImg?.size) {
            if (NewImges.length > 0) {
                const file = NewImges[0]
                setSelectedImge(file)
            }
            else{
                setSelectedImge(null)
            }
        }

    }

    useEffect(() => {

        const PUrls = Imges.map((img: File) => ({
            file: img,
            url: URL.createObjectURL(img)
        }))
        setPreviews(PUrls)
        console.log("New Previews set hogiyy")

    }, [Imges])






















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




    return (
        <div className="w-full flex flex-col">
            {/* Header */}
            <div className="w-full flex lg:flex-row flex-col lg:justify-between gap-5 lg:items-center py-5">
                <div className="font-accent text-3xl font-bold text-black w-[40%]">Add Product</div>
                <div className="w-full flex justify-end gap-5">
                    <div><button className="btn-primary bg-wh text-black w-[120px]" > Discard</button></div>
                    <div><button className="btn-primary w-[120px]" > Save</button></div>
                </div>
            </div>

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

                                <img src={Previews.find((p) => p.file === SelectedImge)?.url} alt="select image" className="object-contain h-full w-full rounded-lg" />

                            </div>


                        }

                        {Imges.length > 0 && (
                            <div className="flex items-center justify-between gap-3 mt-2">
                                <div className="flex items-center flex-wrap gap-3 mt-2">
                                    {Imges.map((file: File, index: number) => {
                                        return (
                                            <div className="w-15 h-15 cursor-pointer rounded-lg overflow-hidden shadow-2xl relative" onClick={(e) => {
                                                e.stopPropagation()
                                                setSelectedImge(file)
                                            }}>

                                                <img src={Previews.find((p) => p.file === file)?.url} alt="" className="w-full h-full object-cover" />

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        RemoveImage(index)}}
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
                                                onClick={() => setColors(Colors.filter((_, i) => i !== index))}
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
                            <label htmlFor="pn" className="text-[14px] px-2">Product <span className="text-red-500">*</span></label>
                            <input type="text" className="input-primary w-full" />
                        </div>
                        <div className="flex gap-5 justify-between">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="b" className="text-[14px] px-2">Brand <span className="text-red-500">*</span></label>
                                <input type="text" className="input-primary w-full" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="c" className="text-[14px] px-2">Gender <span className="text-red-500">*</span></label>
                                <input type="text" className="input-primary w-full" />
                            </div>
                              <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="c" className="text-[14px] px-2">Category <span className="text-red-500">*</span></label>
                                <input type="text" className="input-primary w-full" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="tagline" className="text-[14px] px-2">TagLine <span className="text-red-500">*</span></label>
                            <textarea
                                id="tagline"
                                rows="2"
                                className="input-primary w-full resize-none"
                            ></textarea>
                        </div>

                    </div>
                    <div className="w-full flex flex-col bg-wh rounded-lg px-5 gap-2 py-5">
                        <div className="w-full text-lg font-accent font-semibold text-black">Pricing & Inventory</div>

                        <div className="flex gap-5 justify-between">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="b" className="text-[14px] px-2">Regular Price <span className="text-red-500">*</span></label>
                                <input type="text" className="input-primary w-ful" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="c" className="text-[14px] px-2">Sale Price <span className="text-red-500">*</span></label>
                                <input type="text" className="input-primary w-full " />
                            </div>
                        </div>
                        <div className="flex gap-5 justify-between">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="b" className="text-[14px] px-2">SKU <span className="text-red-500">*</span></label>
                                <input type="text" className="input-primary w-full" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="c" className="text-[14px] px-2">Stock <span className="text-red-500">*</span></label>
                                <input type="text" className="input-primary w-full" />
                            </div>
                        </div>



                    </div>

                </div>


            </div>

            {/* Detail Desciption */}

            <div className="w-full px-5 bg-wh rounded-lg mt-5 py-5">

                {/* Header */}
                <div className="font-accent text-lg flex justify-start font-bold text-black py-5">Detail Description</div>
                <RichTextEditor content={Details} onChange={setDetails} />

                
            </div>

        </div>
    )
}

export default AddNewProductTab