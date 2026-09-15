export const Title = ({name}:{name:string}) => {
    return (
        <div className="w-full flex justify-between ">
            <div className="lg:w-[80%] w-[50%] font-accent text-black flex flex-col">
                <span className="font-bold lg:text-3xl text-xl">{name} </span>
            </div>
        </div>
    )
}
