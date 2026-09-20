import Button from "../../animated components/Button";

type AdminPagenationProps = {
    CurrentPage: number
    PostPerPage: number
    Capacity: number
    setCurrentpage: (n: number) => void
    FirstIndex: number
    LastIndex: number

}

const AdminPagenation = ({ CurrentPage, PostPerPage, setCurrentpage, Capacity, FirstIndex, LastIndex }: AdminPagenationProps) => {

    return (
        <div className="w-full flex justify-between items-center py-3 px-5">
            <div className="w-30">
                <Button disabled={FirstIndex <= 0} onClick={() => setCurrentpage(CurrentPage - 1)} className={`py-2 ${FirstIndex <= 0 ? "bg-bg text-black/40" : "bg-black"}`}>Previous</Button>
            </div>
            <div className="flex-1 text-center ">{FirstIndex} to {Math.min(LastIndex, Capacity)} of {Capacity}</div>

            <div className="w-30">
                <Button disabled={LastIndex >= Capacity} onClick={() => setCurrentpage(CurrentPage + 1)} className={`py-2 ${LastIndex >= Capacity ? "bg-bg text-black/40" : "bg-black"}`}>Next</Button>

            </div>
        </div>
    )
}

export default AdminPagenation