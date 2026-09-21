import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { showErrorToast, showSuccessToast } from "../../Utils/toast";
import API from "../../Utils/API";
import { Title } from "../Title";
import { AiFillEdit } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import { FiX } from 'react-icons/fi';
import Button from "../../animated components/Button";
import { motion } from "motion/react";


export const AddStyle = ({ Styles, FetchStyles }: any) => {
    const { Token } = useAuth();
    const [Categories, setCategories] = useState<any>([]);
    const [SCategories, setSCategories] = useState<any>([]);
    const [SName, setSName] = useState("");
    const [DeletingId, setDeletingId] = useState<null | string>(null);
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
        <div className="py-10 flex flex-col gap-5">
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

                    <Button
                        className="mt-auto w-[30%]"
                        onClick={AddStyle}
                    >
                        Save
                    </Button>
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
        </div>


    )
}
