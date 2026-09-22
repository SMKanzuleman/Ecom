import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import API from "../Utils/API";

const BrowsingSTyles = () => {
    const [homeStyles, setHomeStyles] = useState<any[]>([]);

    useEffect(() => {
        const fetchHomeStyles = async () => {
            try {
                const res = await API.get("/products/HomeStyles");
                if (res.data?.homeStyles) {
                    setHomeStyles(res.data.homeStyles);
                }
            } catch (error) {
                console.error("Failed to fetch home styles:", error);
            }
        };
        fetchHomeStyles();
    }, []);

    const getSlotData = (slotNum: number) => {
        const found = homeStyles.find((s: any) => s.HomeSlot === slotNum);
        if (found) {
            return {
                name: found.Name,
                link: `/styles/${found.Name}`,
            };
        } else {
            return {
                name: "Not configured",
                link: null,
            };

        }
    };

    const slot1 = getSlotData(1);
    const slot2 = getSlotData(2);
    const slot3 = getSlotData(3);
    const slot4 = getSlotData(4);

    return (
        <div className="w-full flex justify-center bg-wh py-12">
            <div className="w-3/4 bg-bg rounded-3xl p-5 lg:p-10 shadow-sm border border-gray-100">

                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold  text-black font-accent">
                        Browse By Style
                    </h2>
                    <p className="text-sm mt-2 font-medium tracking-wide">
                        Explore curated aesthetics tailored for every occasion
                    </p>
                </div>

                {/* Grid */}
                <div className="flex flex-col gap-4 items-center">

                    {/* Row 1 */}
                    <div className="flex flex-col md:flex-row gap-4 w-full">

                        {/* Slot 1: 40% */}
                        <Link
                            to={`${slot1.link}`}
                            className="w-full md:w-[40%]  bg-white text-black hover:scale-x-101  ease-in-out hover:text-white h-48 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl group border border-gray-200/80 cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-bold tracking-widest opacity-60">01</span>
                                <div className="w-9 h-9 rounded-full bg-gray-100/90 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                                    <FiArrowUpRight className="text-lg" />
                                </div>
                            </div>
                            <div>
                                <h3 className="lg:text-5xl text-4xl font-semibold font-heading  uppercase tracking-wider">{slot1.name}</h3>
                            </div>
                        </Link>

                        {/* Slot 2: 60% */}
                        <Link
                            to={slot2.link}
                            className="w-full md:w-[60%] bg-black text-white hover:bg-zinc-900 h-48 hover:scale-x-101 ease-in-out rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl group border border-gray-800 cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-bold tracking-widest opacity-60">02</span>
                                <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                                    <FiArrowUpRight className="text-lg" />
                                </div>
                            </div>
                            <div>
                                <h3 className="lg:text-5xl text-4xl font-semibold font-heading tracking-wider uppercase text-wh/30 ">{slot2?.name}</h3>
                            </div>
                        </Link>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        {/* Slot 3: 60% */}
                        <Link
                            to={slot3.link}
                            className="w-full md:w-[60%] bg-black text-white hover:bg-zinc-900 hover:scale-x-101 ease-in-out h-48 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl group border border-gray-800 cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-bold tracking-widest opacity-60">03</span>
                                <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                                    <FiArrowUpRight className="text-lg" />
                                </div>
                            </div>
                            <div>
                                <h3 className="lg:text-5xl text-4xl font-semibold font-heading tracking-wider  text-wh/30  uppercase ">{slot3.name}</h3>
                            </div>
                        </Link>

                        {/* Slot 4: 40% */}
                        <Link
                            to={slot4.link}
                            className="w-full md:w-[40%] bg-white text-black hover:scale-x-101 ease-in-out hover:text-white h-48 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl group border border-gray-200/80 cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-bold tracking-widest opacity-60">04</span>
                                <div className="w-9 h-9 rounded-full bg-gray-100/90 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                                    <FiArrowUpRight className="text-lg" />
                                </div>
                            </div>
                            <div>
                                <h3 className="lg:text-5xl text-4xl font-semibold font-heading   text-black uppercase tracking-wider">{slot4.name}</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowsingSTyles