import { AiFillEdit } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { showErrorToast, showSuccessToast } from '../../Utils/toast';
import API from '../../Utils/API';
import { FiX } from 'react-icons/fi';
import { Title } from '../Title';

const Setting = ({ Styles, FetchStyles }: any) => {
    const { Token } = useAuth();
    const [Categories, setCategories] = useState<any>([]);
    const [SCategories, setSCategories] = useState<any>([]);
    const [SName, setSName] = useState("");
    const [Section, setSection] = useState("Styles");
    const [DeletingId, setDeletingId] = useState<null | string>(null);

    const [homeSlots, setHomeSlots] = useState([
        { slot: 1, styleName: "" },
        { slot: 2, styleName: "" },
        { slot: 3, styleName: "" },
        { slot: 4, styleName: "" },
    ]);

    const [savingSlots, setSavingSlots] = useState(false);

    useEffect(() => {
        if (Styles && Styles.length > 0) {
            const s1 = Styles.find((s: any) => s.HomeSlot === 1)?.Name || "";
            const s2 = Styles.find((s: any) => s.HomeSlot === 2)?.Name || "";
            const s3 = Styles.find((s: any) => s.HomeSlot === 3)?.Name || "";
            const s4 = Styles.find((s: any) => s.HomeSlot === 4)?.Name || "";
            setHomeSlots([
                { slot: 1, styleName: s1 },
                { slot: 2, styleName: s2 },
                { slot: 3, styleName: s3 },
                { slot: 4, styleName: s4 },
            ]);
        }
    }, [Styles]);

    const handleSaveHomeSlots = async () => {
        setSavingSlots(true);
        try {
            const slots = homeSlots.map((s) => ({ slot: s.slot, StyleName: s.styleName }))
            const seen: string[] = [];

            for (const s of slots) {
                if (s.StyleName) {
                    if (seen.includes(s.StyleName)) {
                        showErrorToast(`${s.StyleName} is selected more than once!`);
                        return;
                    }
                    seen.push(s.StyleName);
                }
            }

       
            const res = await API.put("/products/HomeStyles", { slots });
            if (res.data) {
                showSuccessToast("Home styles updated successfully!");
                FetchStyles();
            }
        } catch (error) {
            showErrorToast("Failed to save home styles");
        } finally {
            setSavingSlots(false);
        }
    };

    const FetchCategories = async () => {
        try {
            const res = await API.get("/products/FilterData");
            if (res.data) {
                setCategories(res.data.Categories);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const AddStyle = async () => {
        try {
            const res = await API.post("/dashboard/Styles", { StyleName: SName, StyleCategories: SCategories });
            if (res.data) {
                showSuccessToast(`${SName} added!`);
                setSName("");
                setSCategories([]);
                FetchStyles();
            }
        } catch (error) {
            showErrorToast(`${error}`);
            console.error(error);
        }
    };

    const DeleteStyle = async (sid: string) => {
        try {
            setDeletingId(sid);
            const res = await API.delete("/products/Styles", { data: { styleId: sid } });
            if (res.data) {
                showSuccessToast(`${sid} deleted!`);
                FetchStyles();
            }
        } catch (error) {
            showErrorToast(`${error}`);
            console.error(error);
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        if (Token) {
            FetchCategories();
        }
    }, [Token]);

    const toggleCategory = (cat: string) => {
        setSCategories((prev: string[]) =>
            prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat]
        );
    };

    return (
        <div className="w-full animate-fade-up flex flex-col gap-5 p-5">
            {/* Tab Navigation */}
            <div className="w-full border-b border-gray-200 flex mb-2">
                <div className="flex gap-4">
                    {[
                        { key: 'Styles', label: 'All Styles' },
                        { key: 'HomePage', label: 'Home Page Styles' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            className={`px-5 py-3 text-lg font-accent font-semibold transition-all border-b-2 cursor-pointer ${Section === tab.key
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-400 hover:text-black'
                                }`}
                            onClick={() => setSection(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {Section === 'Styles' && (
                <>
                    <Title name="Add Custom Style" />

                    <div className="bg-wh rounded-2xl flex px-5 py-10 gap-4 items shadow w-full animate-fadding">
                        <div className="flex flex-col gap-4 w-[45%]">
                            <label className="text-black font-semibold">Name your Style</label>
                            <input
                                type="text"
                                className="input-primary w-full"
                                placeholder="Style Name (e.g. Casual)"
                                value={SName}
                                onChange={(e) => setSName(e.target.value)}
                            />

                            <div className="flex justify-end w-full items-center rounded-full bg px-4 py-0 font-semibold text-black">
                                <span>
                                    {SCategories.length === 0
                                        ? 'No categories selected'
                                        : `${SCategories.length} selected category${SCategories.length > 1 ? 'ies' : 'y'}`}
                                </span>
                            </div>

                            <button
                                className="btn-primary mt-auto w-[30%]"
                                onClick={AddStyle}
                            >
                                Save
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 w-[55%]">
                            <div className="flex justify-between items-center py-1 pr-5">
                                <label className="text-black font-semibold">Select Categories</label>
                                <button
                                    type="button"
                                    className="text-xs font-medium text-gray-600 hover:text-black underline underline-offset-2"
                                    onClick={() => setSCategories([])}
                                >
                                    Clear All
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {Categories.map((cat: any) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => toggleCategory(cat)}
                                        className={`group inline-flex items-center px-5 py-2.5 rounded-full font-medium text-sm cursor-pointer select-none transition-all duration-300 ease-out active:scale-95 ${SCategories.includes(cat)
                                            ? "bg-black text-white shadow-md"
                                            : "bg-bg text-black"
                                            }`}
                                    >
                                        <span>{cat}</span>
                                        <span
                                            className={`inline-flex items-center justify-center overflow-hidden transition-all duration-300 ease-out ${SCategories.includes(cat)
                                                ? "max-w-6 opacity-100 scale-100 ml-2"
                                                : "max-w-0 opacity-0 scale-0 ml-0 pointer-events-none"
                                                }`}
                                        >
                                            <FiX className="text-sm transition-transform duration-200 group-hover:rotate-90" />
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="py-5">
                        <Title name="Styles" />
                    </div>

                    <div className="bg-wh rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-up">
                        <div className="grid grid-cols-[0.5fr_2fr_0.5fr] gap-5 bg-black px-20 py-3 border-b border-gray-200 text-[16px] font-semibold text-wh tracking-wide">
                            <div>Style Name</div>
                            <div>Categories</div>
                            <div className="text-right">Actions</div>
                        </div>

                        {Styles.length === 0 ? (
                            <div className="px-5 py-5 text-gray-500">No styles available yet.</div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {Styles.map((s: any) => (
                                    <div key={s._id} className="grid grid-cols-[0.5fr_2fr_0.5fr] gap-5 px-20 py-4 items-center text-sm">
                                        <div className="text-black text-[16px] uppercase font-bold">{s.Name}</div>

                                        <div className="flex flex-wrap gap-2">
                                            {s.Categories.length === 0 ? (
                                                <div className="text-gray-400">No categories added</div>
                                            ) : (
                                                (s.Categories ?? s.StyleCategories ?? []).map((cat: any) => (
                                                    <div key={cat} className="w-fit px-4 py-1 rounded-full bg-bg text-black text-xs font-medium">
                                                        {cat}
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        <div className="flex justify-end gap-2 items-center">
                                            <AiFillEdit className="text-black bg-bg rounded-2xl p-1 py-2 text-3xl hover:scale-95 duration-200 cursor-pointer" />
                                            {DeletingId === s._id ? (
                                                <div className="bg-bg rounded-2xl p-1.5 flex items-center justify-center w-[36px] h-[36px]">
                                                    <CgSpinner className="animate-spin text-black text-xl" />
                                                </div>
                                            ) : (
                                                <AiFillDelete
                                                    onClick={() => DeleteStyle(s._id)}
                                                    className="text-black bg-bg rounded-2xl p-1 py-2 text-3xl hover:scale-95 duration-200 cursor-pointer"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}

            {Section === 'HomePage' && (
                <div className="w-full flex flex-col gap-6 animate-fade-up p-5">

                    <div className="flex justify-between items-center bg-wh rounded-xl p-5">
                        <div>
                            <Title name="Home Page Style" />
                            <p className="text-sm text-gray-500 mt-1">
                                Assign styles to the 4 featured showcase slots on the customer Home Page.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleSaveHomeSlots}
                            disabled={savingSlots}
                            className="btn-primary px-8 py-2.5 rounded-xl font-semibold shadow hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {savingSlots ? "Saving..." : "Save"}
                        </button>
                    </div>

                    {/* Visual 4-Slot Layout Selector */}
                    <div className="w-full    px-10 flex flex-col gap-5 border shadow-2xs border-gray-200/80 relative py-20">

                        <div className="absolute inset-0 z-0 pointer-events-none  bg-[linear-gradient(to_right,rgba(0,0,0,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.09)_1px,transparent_1px)] bg-size-[40px_40px] rounded-3xl border border-[rgba(0,0,0,0.09)] shadow-xs" />

                        <div className=" z-10 grid grid-cols-1 md:grid-cols-5 gap-4">

                            {/* Slot 1: 40% (2 cols of 5) */}
                            <div className="md:col-span-2 bg-wh rounded-2xl p-6 shadow-sm flex flex-col justify-between h-48 border border-gray-200">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider">
                                            Slot 1
                                        </span>
                                        <div className="text-xs text-gray-400 line-clamp-1">
                                            {homeSlots[0].styleName
                                                ? `Selected: ${homeSlots[0].styleName}`
                                                : "No style selected"}
                                        </div>

                                    </div>
                                    <label className="block text-black font-semibold  mb-1 py-2">Select Style</label>
                                    <select
                                        value={homeSlots[0].styleName}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setHomeSlots((prev) => {
                                                const copy = [...prev];
                                                copy[0].styleName = val;
                                                return copy;
                                            });
                                        }}
                                        className="w-full p-2.5 bg-black border border-gray-200 rounded-xl text-wh font-semibold text-base focus:outline-none cursor-pointer "
                                    >
                                        <option className="text-black bg-bg" value=""> None</option>
                                        {Styles.map((s: any) => (
                                            <option key={s._id} value={s.Name} className="text-black bg-bg">
                                                {s.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            {/* Slot 2: 60% (3 cols of 5) */}
                            <div className="md:col-span-3 bg-wh text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between h-48 border ">
                                <div>

                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Slot 2
                                        </span>
                                        <div className="text-xs text-gray-400 line-clamp-1">
                                            {homeSlots[1].styleName
                                                ? `Selected: ${homeSlots[1].styleName}`
                                                : "No style selected"}
                                        </div>
                                    </div>
                                    <label className="block text-black font-semibold  mb-1 py-2">Select Style</label>
                                    <select
                                        value={homeSlots[1].styleName}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setHomeSlots((prev) => {
                                                const copy = [...prev];
                                                copy[1].styleName = val;
                                                return copy;
                                            });
                                        }}
                                        className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-semibold text-base focus:outline-none focus:border-white cursor-pointer"
                                    >
                                        <option value="" className="text-black bg-bg">None</option>
                                        {Styles.map((s: any) => (
                                            <option key={s._id} value={s.Name} className="text-black bg-bg">
                                                {s.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="z-10 grid grid-cols-1 md:grid-cols-5 gap-4">

                            {/* Slot 3: 60% (3 cols of 5) */}
                            <div className="md:col-span-3 bg-wh text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between h-48 border">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Slot 3
                                        </span>
                                        <div className="text-xs text-gray-400 line-clamp-1">
                                            {homeSlots[2].styleName
                                                ? `Selected: ${homeSlots[2].styleName}`
                                                : "No style selected"}
                                        </div>

                                    </div>
                                    <label className="block text-black font-semibold py-2 mb-1">Select Style</label>
                                    <select
                                        value={homeSlots[2].styleName}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setHomeSlots((prev) => {
                                                const copy = [...prev];
                                                copy[2].styleName = val;
                                                return copy;
                                            });
                                        }}
                                        className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-semibold text-base focus:outline-none focus:border-white cursor-pointer"
                                    >
                                        <option value="" className="text-black bg-bg">None</option>
                                        {Styles.map((s: any) => (
                                            <option key={s._id} value={s.Name} className="text-black bg-bg">
                                                {s.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            {/* Slot 4: 40% (2 cols of 5) */}
                            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between h-48 border border-gray-200">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Slot 4
                                        </span>
                                        <div className="text-xs text-gray-400 line-clamp-1">
                                            {homeSlots[3].styleName
                                                ? `Selected: ${homeSlots[3].styleName}`
                                                : "No style selected"}
                                        </div>

                                    </div>
                                    <label className="block text-black font-semibold py-2 mb-1">Select Style</label>
                                    <select
                                        value={homeSlots[3].styleName}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setHomeSlots((prev) => {
                                                const copy = [...prev];
                                                copy[3].styleName = val;
                                                return copy;
                                            });
                                        }}
                                        className="w-full p-2.5 bg-black border border-gray-200 rounded-xl text-wh font-semibold text-base focus:outline-none  cursor-pointer"
                                    >
                                        <option className="text-black bg-bg" value="">None</option>
                                        {Styles.map((s: any) => (
                                            <option key={s._id} value={s.Name} className="text-black bg-bg">
                                                {s.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                            </div>

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
};

export default Setting;
