import React, { createContext, useContext, useEffect, useState } from 'react'
import Cart from '../pages/Cart';


type CartType = {
    Cart: any[]
    AddTocart: (product: any, size: string, color: string, quantity: number) => void
    IsCartOpen: boolean
    setIsCartOpen: (open: boolean) => void
    RemoveFromCart: (id: string, quantity: number) => void
    setCart: (item: any) => void
    UpdateQuantity: (id:string,newQuan:number)=>void
}
const CartContext = createContext<CartType | undefined>(undefined)

const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const [Cart, setCart] = useState<any[]>(() => {
        const SavedCart = localStorage.getItem("User_Cart")
        return SavedCart ? JSON.parse(SavedCart) : []
    })

    const [IsCartOpen, setIsCartOpen] = useState(false)

    useEffect(() => {
        localStorage.setItem("User_Cart", JSON.stringify(Cart))
    }, [Cart])

    const AddTocart = (product: any, size: string, color: string, quantity: number) => {


        setCart((prev) => {

            const index = prev.findIndex((item) => item._id === product._id && item.Name === product.Name && item.Size === size && item.Color === color)

            if (index > -1) {
                const UpdatedCart = [...prev]
                UpdatedCart[index].Quantity += quantity
                console.log("Updated cart", UpdatedCart);

                return UpdatedCart
            }
            else {
                const NewItem = {
                    _id: product._id,
                    Name: product.Name,
                    Color: color,
                    Size: size,
                    Price: product.Price,
                    Quantity: quantity
                }
                return [...prev, NewItem]
            }

        });
    }
    const RemoveFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => { return item._id !== id }))
    }
    const UpdateQuantity = (id: string, newQuan: number) => {
        if (newQuan < 1) {
            return
        }
        else {
            setCart((prev => 
                 (
                    prev.map((item) =>
                        item._id === id ? { ...item, Quantity: newQuan } : item
                    ))
            ))
        }
    }

    return (
        <CartContext.Provider value={{ Cart, setCart, AddTocart, RemoveFromCart, IsCartOpen, setIsCartOpen,UpdateQuantity }}>
            {children}
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