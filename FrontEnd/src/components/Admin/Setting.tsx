import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';

import { showErrorToast, showSuccessToast } from '../../Utils/toast';





const Setting = () => {

    const { Token } = useAuth()
    const [Categories, setCategories] = useState<any>([]);
    const [SCategories, setSCategories] = useState<any>([]);
    const [SName, setSName] = useState("");


    const FetchCategories = async () => {
        try {

            const res = await axios.get("http://localhost:2026/dashboard/Categories", {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            if (res.data) {
                const allValues = Object.values(res.data);
                const cleanCategoriesArray = allValues.filter(
                    (val) => typeof val === "string" && val !== res.data.message
                );

                setCategories(cleanCategoriesArray);

            }

        } catch (error) {
            console.error(error)
        }
    }

     const AddStyle = async () => {
        try {

            const res = await axios.post("http://localhost:2026/dashboard/Styles",{StyleName:SName,StyleCategories:SCategories}, {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            if (res.data) {
                showSuccessToast(`${SName} added!`)
            }

        } catch (error) {
            showErrorToast(`${error}`)
            console.error(error)
        }
    }

    useEffect(() => {
        if (Token) {
            FetchCategories()
        }
    }, [Token])

    return (
        <div className="w-full animate-fade-up flex flex-col gap-5">

            {/*Header Row*/}
            <div className="w-full flex justify-between">
                <div className="lg:w-[80%] w-[50%] font-accent text-black flex flex-col">
                    <span className="font-bold lg:text-3xl text-xl">Setting </span>
                    <span className="text-[14px] tracking-wide text-text lg:block hidden">Manage your shop base from here.</span>
                </div>
            </div>

            <div className='grid grid-cols-[1.3fr_1.7fr] gap-5'>
                {/* Left */}
                <div className=' bg-wh rounded-lg flex flex-col p-5 gap-4 items'>
                    <label className='text-black font-semibold'>Add Custom Style</label>
                    <input
                        type="text"
                        className='input-primary w-full'
                        placeholder='Style Name (e.g. Casual)'
                        value={SName}
                        onChange={(e) => setSName(e.target.value)}
                    />
                    <div className='flex flex-wrap gap-3'>
                        {Categories.map((cat:any) => (
                            <div className={` px-3 py-0 rounded-full cursor-pointer ${SCategories.includes(cat) ? 'bg-black text-wh' : 'bg-bg'}`} onClick={(() => setSCategories([...SCategories, cat]))}>
                                {cat}
                            </div>
                        ))}
                    </div>

                    <button className='btn-primary w-[30%]' onClick={()=>{
                        AddStyle()
                    }} >Save</button>
                </div>

                {/* Right */}

                <div className='bg-wh'>hi</div>



            </div>



        </div>
    )
}

export default Setting