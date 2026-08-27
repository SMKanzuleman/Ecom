import { toast } from "react-toastify";


export const showSuccessToast = (message: string) => {
    toast.success(message, {
        style: {
            background: "#0a0a0a",
            color: "#fff",
            border: "2px solid rgba(255,255,255,0.12)",
            borderRadius: "50px",
            minHeight: "50px",
            fontSize: "14px",
            fontWeight: "500",
            fontFamily: "var(--font-accent)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        },
        hideProgressBar: true,
        autoClose: 1500,
    });
};

export const showErrorToast = (message: string) => {
    toast.error(message, {
        style: {
            background: "#0a0a0a",
            color: "#ff4d4d",
            border: "2px solid rgba(255,77,77,0.3)",
            borderRadius: "50px",
            minHeight: "50px",
            fontSize: "14px",
            fontWeight: "500",
            fontFamily: "var(--font-accent)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        },
        hideProgressBar: true,
        autoClose: 2000,
    });
};

{/* <div className="flex lg:gap-1.5 gap-0.5">
    {[1, 2, 3, 4, 5].map((index) => {
        if (item.Rating >= index) {
            return (<FaStar className="text-yellow-400" />)
        }
        else if (item.Rating >= index - 0.5) {
            return (<FaStarHalfAlt className="text-yellow-400" />)
        }
        else {
            return (<FaRegStar />)
        }
    })}

</div> */}