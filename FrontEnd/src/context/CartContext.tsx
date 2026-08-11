import React, { createContext, useContext, useEffect, useState } from 'react'


type CartType = {
    Cart: any[]
    AddTocart: (product: any, size: string, color: string, quantity: number)=>void
    RemoveFromCart: (id: string,quantity:number)=>void
    setCart: (item:any)=>void
}
const CartContext=createContext<CartType | undefined>(undefined)

const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const [Cart, setCart] = useState<any[]>(() => {
        const SavedCart = localStorage.getItem("User_Cart")
        return SavedCart? JSON.parse(SavedCart): [] 
    })

    useEffect(() => {
        localStorage.setItem("User_Cart", JSON.stringify(Cart)) 
    },[Cart])

    const AddTocart = (product: any, size: string, color: string, quantity: number) => {

        const NewItem = {
            _id: product._id,
            Name: product.Name,
            Color:color,
            Size: size,
            Price:product.pr, 
            Quantity:quantity
        }
        setCart((prev) => [...prev, NewItem]); 
    }
    const RemoveFromCart = (id: string)=>{ 
        setCart((prev) => prev.filter((item) => { return item._id !== id}))
    }
    return (
    <CartContext.Provider value={{Cart, setCart, AddTocart,RemoveFromCart }}>
            { children}
    </CartContext.Provider>
  )
}

export const useCart = () => { 
    const context = useContext(CartContext)
    if (!context) { 
        throw console.error("useCart must be inside cart provider");
    }
    return context
}

export default CartProvider