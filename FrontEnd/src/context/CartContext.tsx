import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext';
import { showErrorToast, showSuccessToast } from '../Utils/toast';
import API from '../Utils/API';
import { useLocation, useNavigate } from 'react-router-dom';

type CartType = {
    Cart: any[]
    CartPrice: number
    setCart: (item: any) => void
    IsCartOpen: boolean
    setIsCartOpen: (open: boolean) => void

    AddToCart: (product: any, size: string, color: string, quantity: number) => void
    DeleteFromCart: (id: string, size: string, color: string, quantity: number) => void
    UpdateQuantity: (Id: string, Size: string, Color: string, newQuan: number) => void
    PlaceOrder: (e: React.FormEvent, ShippingAddress: any, PaymentDetail: any) => Promise<void>
    ClearCart: () => Promise<void>
}


const CartContext = createContext<CartType | undefined>(undefined)



const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const { Token } = useAuth()
    const Navigate = useNavigate()
    const Location = useLocation()

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
                    Imges: item.Images,
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

    const ClearCart = async () => {
        try {
            const res = await API.delete("/cart");
            if (res.data) {
                setCart([])
                localStorage.removeItem("User_Cart")
                showSuccessToast("Cart cleared.")
            }
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        localStorage.setItem("User_Cart", JSON.stringify(Cart))
    }, [Cart])

    useEffect(() => {
        if (Token) {
            SyncCart()
        }
    }, [Token])



    const AddToCart = async (product: any, size: string, color: string, quantity: number) => {
        try {

            if (!Token) {
                Navigate("/auth", { state: { from: Location.pathname } })
                return
            }

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
                        Imges: product.Images,
                        Name: product.Name,
                        Color: color,
                        Size: size,
                        Price: product.Price,
                        Quantity: quantity
                    }
                    return [...prev, NewItem]
                }
            });

            const res = await API.post(`/cart/${product._id}`, { Quantity: quantity, Size: size, Color: color })

            if (res.data) {
                showSuccessToast(`${product.Name} added to cart. 👌`)

            }

        } catch (error) {
            console.error(error)
        }
    }

    const DeleteFromCart = async (id: string, size: string, color: string, quantity: number) => {
        try {

            setCart((prev: any) => (
                prev.filter((item: any) =>
                    !(item._id === id && item.Color === color && item.Size === size, item.Quantity === quantity)
                )))

            const res = await API.delete(`/cart/${id}`, { data: { Quantity: quantity, Sizes: size, Colors: color } })

            if (res.data) {
                showSuccessToast("Item Deleted")
            }
        } catch (error) {
            console.error(error)
        }
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
        }

        try {
            const res = await API.put(`/cart/${Id}`, { q: newQuan })
            console.log(res.data)
            showSuccessToast("Quantity updated Everywhere")
            // console.log(`Quantity of ${Id} is changed to ${newQuan} and its resonce is`,res.data);

        } catch (error) {
            console.error(error)
        }
    }

    const PlaceOrder = async (e: React.FormEvent, ShippingAddress: any, PaymentDetail: any) => {
        try {
            e.preventDefault()
            const res = await API.post("/order", { Address: ShippingAddress, Payment: PaymentDetail })

            if (res.data) {
                showSuccessToast("🥳Congratulation.🎉")
                await ClearCart()
                Navigate("/")
            }
        } catch (error: any) {
            console.error(error)
            const message = error.response?.data?.message || error.message || "Something went wrong!";
            showErrorToast(message)

        }
    }

    return (
        <CartContext.Provider value={{ Cart, ClearCart, PlaceOrder, setCart, AddToCart, DeleteFromCart, IsCartOpen, setIsCartOpen, UpdateQuantity, CartPrice }}>
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