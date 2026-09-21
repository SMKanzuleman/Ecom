import { useEffect, useState } from "react";
import { Title } from "../Title";
import { showErrorToast, showSuccessToast } from "../../Utils/toast";
import API from "../../Utils/API";
import Button from "../../animated components/Button";

export const SetHomeStyle = ({ Styles, FetchStyles }: any) => {

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


    return (
        <div className="w-full flex flex-col gap-6 animate-fade-up p-5">

            <div className="flex justify-between items-center bg-wh rounded-xl p-5">
                <div>
                    <Title name="Home Page Style" />
                    <p className="text-sm text-gray-500 mt-1">
                        Assign styles to the 4 featured showcase slots on the customer Home Page.
                    </p>
                </div>

                <div>
                    <Button
                        type="button"
                        onClick={handleSaveHomeSlots}
                        disabled={savingSlots}
                        className="px-8 py-2.5 w-auto rounded-xl font-semibold shadow disabled:opacity-50"
                    >
                        {savingSlots ? "Saving..." : "Save"}
                    </Button>
                </div>
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

    )

}
