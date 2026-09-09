import { useEffect, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import API from "../Utils/API";
import { showErrorToast, showSuccessToast } from "../Utils/toast";


const PDContent2 = ({ Product }: any) => {


    const [ActiveTab, setActiveTab] = useState("Product Details")
    const [OpenIndex, setOpenIndex] = useState<Number | null>(null)
    const [OpenReviewPopup, setOpenReviewPopup] = useState(false);
    const [Reviews, setReviews] = useState<any>([]);
    // Sort state: default to "newest"
    const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");


    const [Recomended, setRecomended] = useState(true);
    const [Comment, setComment] = useState("");
    const [Rating, setRating] = useState(5);

    const sortedReviews = [...Reviews].sort((a: any, b: any) => {
        if (sortBy === "newest") {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === "oldest") {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === "highest") {
            return b.Rating - a.Rating;
        }
        if (sortBy === "lowest") {
            return a.Rating - b.Rating;
        }
        return 0;
    });


    const faqs = [
        { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days across the country." },
        { q: "What is your return policy?", a: "We offer a 30-day hassle-free return and exchange policy." },
        { q: "Is the material machine washable?", a: "Yes, wash cold inside out with similar colors." },
        { q: "How do I choose the right size?", a: "Check our Size Guide chart above for exact chest and length measurements." }
    ];



    const HandleAddReview = async () => {
        try {
            const res = await API.post(`reviews/${Product._id}`, { Comment, Recomended, Rating })
            if (res.data) {
                showSuccessToast("your Review is sent for admin approval.😊")
                setOpenReviewPopup(false)
                //clearing after publish
                setComment("")
                setRating(5)
                setRecomended(true)
            }
        } catch (error) {

            console.error(error)
        }
    }
    const FetchReviews = async () => {
        try {
            const res = await API.get(`reviews/${Product._id}`)
            if (res.data) {
                setReviews(res.data.FoundedReviews)
                showSuccessToast("reviews came😊")
            }
        } catch (error) {

            console.error(error)
        }
    }

    useEffect(() => {
        if (Product?._id) {
            FetchReviews();
        }
    }, [Product?._id]);

    return (
        <div className="w-full">
            <div className="w-full h-25 bg-wh">
                <div className="w-full h-full px-30 py-2 flex lg:justify-evenly justify-center items-end text-text font-accent border-b-2 border-gray-700/10 lg:text-2xl text-lg lg:gap-0 gap-10">
                    <button className={` cursor-pointer ${ActiveTab === "Product Details" ? "text-black font-bold" : "text-text"}`} onClick={() => { setActiveTab("Product Details") }}>Product Details</button>
                    <button className={` cursor-pointer ${ActiveTab === "Reviews" ? "text-black font-bold" : "text-text"}`} onClick={() => { setActiveTab("Reviews") }}>Reviews</button>
                    <button className={` cursor-pointer ${ActiveTab === "FAQ's" ? "text-black font-bold" : "text-text"}`} onClick={() => { setActiveTab("FAQ's") }}>FAQ's</button>
                </div>
            </div>

            <div className="w-full py-5 bg-wh flex justify-center ">
                {ActiveTab === "Product Details" && (
                    <div className="animate-fade-up lg:w-[80%] w-[90%] flex flex-col gap-10 py-8 px-2 lg:px-6 font-body text-zinc-700 animate-fade-in">

                        {/* 1. Overview Paragraph */}
                        <div>
                            <h3 className="text-xl font-bold font-heading text-black uppercase tracking-tight mb-3">
                                Product Overview
                            </h3>
                            <p className="[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:my-2 text-text" dangerouslySetInnerHTML={{ __html: Product?.Description }}>
                            </p>

                        </div>

                        {/* 3. Two-Column Detailed Breakdown (Features & Care) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Left: Design Highlights */}
                            <div className="flex flex-col gap-3">
                                <h4 className="font-bold text-black text-base uppercase tracking-tight">
                                    Design &amp; Construction Highlights
                                </h4>
                                <ul className="flex flex-col gap-2.5 text-sm text-zinc-600">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Pre-shrunk fabric to minimize shrinkage after laundering
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        1-inch high-density ribbed collar that retains shape
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Tonal coverstitch along shoulder and neckline seams
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Breathable natural fiber suitable for all seasons
                                    </li>
                                </ul>
                            </div>

                            {/* Right: Care & Washing Instructions */}
                            <div className="flex flex-col gap-3">
                                <h4 className="font-bold text-black text-base uppercase tracking-tight">
                                    Care &amp; Maintenance
                                </h4>
                                <ul className="flex flex-col gap-2.5 text-sm text-zinc-600">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Machine wash cold inside out with like colors (30°C max)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Do not bleach or use fabric softeners
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Hang dry in the shade to preserve garment shape &amp; color
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Iron on reverse side using low to medium heat
                                    </li>
                                </ul>
                            </div>

                        </div>

                        {/* 4. Model / Sizing Note */}
                        <div className="border-t border-zinc-200 pt-4 text-xs text-zinc-500">
                            <span className="font-semibold text-black">Model Sizing Note: </span>
                            Male model is 6&apos;1&quot; (185 cm) wearing size Large. Female model is 5&apos;8&quot; (173 cm) wearing size Medium.
                        </div>

                    </div>
                )}
                {ActiveTab === "Reviews" && (
                    <div className="w-full flex flex-col gap-">

                        <div className="w-full flex justify-between items-center px-6 py-2">
                            {/* 🌟 Sort Dropdown */}
                            <div className="flex items-center gap-2 text-sm text-black font-semibold outline-none">
                                <span className="text-lg">Sort By:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e: any) => setSortBy(e.target.value)}
                                    className="bg-bg border border-gray-300 rounded-full px-3 py-1.5 text-xs  cursor-pointer focus:outline"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="highest">Highest Rating</option>
                                    <option value="lowest">Lowest Rating</option>
                                </select>
                            </div>

                            {/* Write Review Button */}
                            <button onClick={() => setOpenReviewPopup(true)} className="btn-primary">
                                Write Review
                            </button>
                        </div>
                        <div className="w-full  h-auto   columns-1 lg:columns-3 gap-5  py-8 px-6 animate-fade-up">

                            {sortedReviews.map((r: any, index) => {
                                return (
                                    <div key={index} className="w-full lg:inline-block break-inside-avoid mb-6 bg-bg rounded-2xl flex flex-col">
                                        <div className="w-full font-body flex items-center justify-between border-b-2 border-gray-700/10 text-black text-sm font-bold py-1 px-5  tracking-wider bg-amber-00">
                                            <div>{r.UserId.FName}</div>
                                            <div className="flex items-center gap-1">
                                                <span>{r.Rating}/5</span>

                                                {[1, 2, 3, 4, 5].map((a) => (
                                                    <FaStar key={r}

                                                        className={`cursor-pointer ${a <= r.Rating ? "text-yellow-400" : "text-text"} `}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="font-body text-text px-5 text-sm py-5 overflow-hidden border-b-2 border-gray-700/10">
                                            {r.Comment}

                                        </div>
                                        <div className="flex w-full justify-between items-center py-1  px-5">
                                            <div className="flex gap-1.5 items-center  p-0.5 whitespace-nowrap shrink-0">
                                                <span className={` rounded-full font-medium px-2 py-1 text-xs ${r.IsRecomended ? "bg-green-400 text-green-950" : "bg-red-300 text-red-600"}`}>{r.IsRecomended ? "Recommended" : "Not Recommended"}</span>
                                            </div>
                                            <div className="whitespace-nowrap shrink-0 text-text font-accent py-0.5 text-sm text-right">
                                                {new Date(r.createdAt).toLocaleDateString("en-GB")}
                                            </div>

                                        </div>


                                    </div>
                                )
                            })}

                        </div>
                    </div>

                )}
                {ActiveTab === "FAQ's" && (
                    <div className="w-full px-2 py-5 animate-fade-up flex flex-col items-center gap-4">


                        {faqs.map((faq, index) => {
                            return (

                                <div key={index} className="w-[90%] lg:w-[60%] bg-bg py-5 px-3 rounded-md flex flex-col justify-between">
                                    <div className="w-full flex items-center justify-between" >
                                        <div className="text-black" >{faq.q}</div>
                                        <div onClick={() => { OpenIndex === index ? setOpenIndex(null) : setOpenIndex(index) }} className="text-black text-lg px-5 hover:scale-125 duration-300 cursor-pointer"><IoIosArrowDropdownCircle /></div>
                                    </div>
                                    {OpenIndex === index && (
                                        <div className="text-text" >{faq.a}</div>

                                    )}
                                </div>

                            )
                        })}



                    </div>
                )}
                {OpenReviewPopup && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        {/* Popup */}
                        <div className="w-1/2 h-1/2 bg-wh rounded-lg shadow-2xl flex flex-col gap-5 px-5 animate-fade-up">
                            {/* Header */}
                            <div className="w-full p-5 font-accent  flex justify-between">
                                <span className="text-2xl font-semibold text-black">
                                    Write your review
                                </span>
                                <button onClick={() => setOpenReviewPopup(false)} className="text-black text-xl hover:scale-90 duration-150 cursor-pointer"><FaWindowClose /></button>
                            </div>
                            {/* Body */}
                            <div className="flex flex-col gap-5 flex-1 min-h-0">
                                {/* Rating + Recommend toggle */}
                                <div className="w-full flex justify-between items-center px-5">

                                    {/* Rating */}
                                    <div className="flex items-center gap-1">
                                        <span>Rating:</span>

                                        {[1, 2, 3, 4, 5].map((r) => (
                                            <FaStar key={r}
                                                onClick={() => setRating(r)}
                                                className={`cursor-pointer ${r <= Rating ? "text-yellow-400" : "text-text"} `}
                                            />
                                        ))}
                                    </div>

                                    {/* Recommend */}
                                    <div className="flex items-center gap-2">
                                        <span className="font-heading">Recommend</span>

                                        <button
                                            type="button"
                                            onClick={() => setRecomended(!Recomended)}
                                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer ${Recomended ? "bg-green-500" : "bg-gray-300"
                                                }`}
                                        >
                                            <div
                                                className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${Recomended ? "translate-x-6" : "translate-x-0"
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                </div>
                                <textarea name="" id="" value={Comment} onChange={(e) => setComment(e.target.value)}
                                    className="flex-1 min-h-0 p-5 h-full text-LG focus:outline-none no-scrollbar border-2 rounded-lg border-gray-700/20">
                                </textarea>
                                <div className="flex justify-end py-5">
                                    <button
                                        onClick={() => HandleAddReview()}
                                        className="btn-primary py-2">Publish</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PDContent2