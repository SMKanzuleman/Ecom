type Paginnationtype = {
    Products: any[]
    PostPerPage: number
    setCurrentPage:(page:number)=>void
    CurrentPage:number
}
const Pagination = ({ Products, PostPerPage,setCurrentPage,CurrentPage }: Paginnationtype) => {
    let Pages: number[] = []
    for (let i = 1; i < Math.ceil(Products.length / PostPerPage); i++) {
        Pages.push(i)
    }

    return (
        <div className="flex justify-center items-center   w-full lg:gap-10 gap-4 pt-10 pb-10">
            {Pages.map(
                (Page, index) => {
                    return (
                        <button onClick={()=>setCurrentPage(Page)} key={index} className={`btn-primary  font-heading  w-5 ${Page === CurrentPage ? " rounded-sm" : "bg-blsck"}`}>
                            {Page}
                        </button>
                    )
                }
            )}
        </div>
    )
}

export default Pagination