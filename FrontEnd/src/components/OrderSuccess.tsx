import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaCheck } from 'react-icons/fa6';
import confetti from 'canvas-confetti';
import API from '../Utils/API';
import { showSuccessToast } from '../Utils/toast';
import { useAuth } from '../context/AuthContext';

export const OrderSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { ClearCart } = useCart();
    const { Token } = useAuth()
    const Hasverified=useRef(false)

    const verifySession = async () => {
        try {
            const res = await API.post("/order/verify-stripe", { SessionId: sessionId })
            if (res.data) {
                showSuccessToast("Order placed")
                fireConfetti()
                ClearCart();
            }

        } catch (error) {
            console.error(error)
        }
    }
    const fireConfetti = () => {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#000000', '#f59e0b', '#ec4899', '#3b82f6', '#10b981'], // vibrant luxury palette
        });
    };
    
    fireConfetti();
    useEffect(() => {
        if (Token && sessionId) {
            verifySession()
            Hasverified.current=true
        }

    }, [Token,sessionId]);

    return Token ? (

        <div className="w-full min-h-[85vh] flex flex-col items-center justify-center bg-bg px-4 select-none">

            <div className="bg-wh border border-gray-200/80 p-8 sm:p-12 rounded-3xl shadow-sm max-w-md w-full flex flex-col items-center text-center gap-5 animate-fade-up">

                {/* Minimalist Checkmark Badge */}
                <div className="w-16 h-16 rounded-full bg-green-500 text-wh flex items-center justify-center text-2xl shadow-md">
                    <FaCheck />
                </div>

                {/* Minimal Luxury Typography */}
                <div className="flex flex-col gap-1">
                    <h1 className="font-accent text-3xl font-bold text-black tracking-tight">
                        Order Placed!
                    </h1>
                    <p className=" text-sm ">
                        Thank you for your order. We’ve received your payment and are getting it ready.
                    </p>
                </div>

                {/* Action Button */}
                <Link
                    to="/"
                    className="btn-primary w-full py-3.5 mt-2  text-center font-heading font-medium tracking-wide shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    Continue Shopping
                </Link>

            </div>

        </div>
    ) : (

        <div className='flex w-full h-screen flex-col justify-center items-center gap-4 bg-bg'>
            <div className='h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-500' />
            <p className='text-lg font-medium text-black animate-pulse'>
                Confirming your Order...
            </p>
        </div>
    )

};

export default OrderSuccess;