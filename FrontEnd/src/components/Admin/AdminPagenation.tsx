type AdminPagenationProps = {
    CurrentPage: number
    PostPerPage: number
    Capacity: number
    setCurrentpage: (n: number) => void
    FirstIndex:number
    LastIndex:number

}

const AdminPagenation = ({ CurrentPage, PostPerPage, setCurrentpage, Capacity,FirstIndex,LastIndex }: AdminPagenationProps) => {

    return (
        <div className="w-full flex justify-between py-3 px-5">
            <button disabled={FirstIndex <= 0} onClick={() => setCurrentpage(CurrentPage - 1)} className={`btn-primary py-2 ${FirstIndex <= 0 ? "bg-bg text-black/40" : "bg-black"}`}>Previous</button>
            <div>{FirstIndex} to {Math.min(LastIndex,Capacity)} of {Capacity}</div>
            <button disabled={LastIndex >= Capacity} onClick={() => setCurrentpage(CurrentPage + 1)} className={`btn-primary py-0 ${LastIndex >= Capacity ? "bg-bg text-black/40" : "bg-black"}`}>Next</button>
        </div>
    )
}

export default AdminPagenation