import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './context/CartContext';
import { ScrollToTop } from './Utils/ScrollToTop';

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </AuthProvider>
    </BrowserRouter>
)
