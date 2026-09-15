import logo from '../assets/photo.png'
const BrowsingSTyles = () => {
    return (
        <div className="w-full flex  justify-center bg-wh py-10">
            <div className="w-3/4 bg-bg rounded-4xl py-10">
                <div className="w-full font-accent text-4xl uppercase text-black font-bold p-10 text-center">Browse By Styles</div>
                {/* grid */}
                <div className="flex flex-col gap-3 items-center">
                    {/* row-1 */}
                    <div className="flex gap-3 w-3/4">
                        {/* left */}
                        <div className="w-[40%] bg-wh rounded-2xl h-52 hover:scale-x-101 transition-all duration-500 cursor-pointer relative">
                            <div className="p-5 text-2xl font-semibold text-">PlaceHolder</div>
                            <img src={logo} alt="" className="absolute bottom-0 right-5 opacity-10 w-30 " />

                        </div>
                        {/* right */}
                        <div className="w-[60%] bg-wh rounded-2xl hover:scale-x-101 transition-all duration-500 cursor-pointer relative">
                            <div className="p-5 text-2xl font-semibold text-">PlaceHolder</div>
                            <img src={logo} alt="" className="absolute bottom-0 right-5 opacity-10 w-50 " />
                        </div>

                    </div>
                    {/* row-2 */}
                    <div className="flex gap-3 w-3/4">
                        {/* left */}
                        <div className="w-[60%] bg-wh rounded-2xl hover:scale-x-101 transition-all duration-500 cursor-pointer relative">
                            <div className="p-5 text-2xl font-semibold text-">PlaceHolder</div>
                            <img src={logo} alt="" className="absolute bottom-0 right-5 opacity-10 w-50 " />
                        </div>
                        {/* roght */}
                        <div className="w-[40%] bg-wh rounded-2xl h-52 hover:scale-x-101 transition-all duration-500 cursor-pointer relative">
                            <div className="p-5 text-2xl font-semibold text-">PlaceHolder</div>
                            <img src={logo} alt="" className="absolute bottom-0 right-5 opacity-10 w-30 " />
                        </div>


                    </div>

                </div>

            </div>

        </div>
    )
}

export default BrowsingSTyles