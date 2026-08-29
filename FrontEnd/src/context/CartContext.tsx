import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext';
import { showErrorToast, showSuccessToast } from '../Utils/toast';
import API from '../Utils/API';

type CartType = {
    Cart: any[]
    setCart: (item: any) => void
    IsCartOpen: boolean
    CartPrice: number
    setIsCartOpen: (open: boolean) => void
    AddTocart: (product: any, size: string, color: string, quantity: number) => void
    RemoveFromCart: (id: string, quantity: number) => void
    UpdateQuantity: (Id: string, Size: string, Color: string, newQuan: number) => void
    ClearCart:()=>void
}


const CartContext = createContext<CartType | undefined>(undefined)



const CartProvider = ({ children }: { children: React.ReactNode }) => {
    
    const { Token } = useAuth()
    
    const [Cart, setCart] = useState<any[]>(() => {
        const savedcart = localStorage.getItem("User_Cart");
        console.log("Cart loaded from localStorage")
        return savedcart ? JSON.parse(savedcart) : []
    })

    const CartPrice = Cart.reduce((total, item) => total + (item.Quantity * item.Price), 0);
    
    const [IsCartOpen, setIsCartOpen] = useState(false)

    const SyncCart = async () => {
        try {
            if (!Token) return;
            const res = await API.get("/cart",);

            if (res.data.FoundedCart?.Items) {

                const itemsFromDb = res.data.FoundedCart.Items.map((item: any) => ({
                    _id: item.ProductId?._id || item._id,
                    Name: item.ProductId?.Name || "Product",
                    Imges:item.Images,
                    Price: item.ProductId?.Price || 0,
                    Size: item.Sizes || "Large",
                    Color: item.Colors || "",
                    Quantity: item.Quantity
                }));
                setCart(itemsFromDb)
                localStorage.setItem("User_Cart", JSON.stringify(itemsFromDb));
                console.log("cart Synced")
            }
        } catch (error) {
            console.error("Cart sync error:", error);
        }
    };

    const ClearCart=()=>{
        setCart([])
        localStorage.removeItem("User_Cart")
        showSuccessToast("Cart cleared.")
    }

    useEffect(() => {
        localStorage.setItem("User_Cart", JSON.stringify(Cart))
        
    }, [Cart])

    useEffect(() => {
        if (Token) {
            SyncCart()
        }
    }, [Token])


    const AddTocart = (product: any, size: string, color: string, quantity: number) => {

        setCart((prev) => {

            const index = prev.findIndex((item: any) => item._id === product._id && item.Name === product.Name && item.Size === size && item.Color === color)

            if (index > -1) {
                const UpdatedCart = [...prev]
                UpdatedCart[index].Quantity += quantity
                console.log("Updated cart", UpdatedCart);
                return UpdatedCart
            }
            else {
                const NewItem = {
                    _id: product._id,
                    Imges:product.Images,
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

    const UpdateQuantity = async (Id: string, Size: string, Color: string, newQuan: number) => {
        if (newQuan < 1) {
            return
        }
        else {
            setCart((prev =>
            (
                prev.map((item) =>
                    item._id === Id && item.Size === Size && item.Color === Color ? { ...item, Quantity: newQuan } : item
                ))
            ))
            showSuccessToast("quantity updated in Localstorage+ frontend")
        }
        
        try {
            const res = await API.put(`/cart/${Id}`, { q: newQuan })
            console.log(res.data)
            showSuccessToast("quantity updated in backend")
            // console.log(`Quantity of ${Id} is changed to ${newQuan} and its resonce is`,res.data);

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <CartContext.Provider value={{ Cart,ClearCart, setCart, AddTocart, RemoveFromCart, IsCartOpen, setIsCartOpen, UpdateQuantity, CartPrice }}>
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