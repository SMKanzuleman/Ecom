import { Routes, Route, useLocation } from 'react-router-dom';
import { Auth } from './pages/Auth';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Shop from './pages/Shop';
import AdminGuard from './Middlewares/AdminGuard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


export const App = () => {
  const location=useLocation()
  const IsAdminpage=location.pathname==="/dashboard"
  return (
    <div>
      <ToastContainer position='top-right'  style={{ top: "110px", right: "20px" }} />
      {!IsAdminpage && <Navbar />}
      {!IsAdminpage && <Cart />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />

        <Route path="/dashboard" element={
          <AdminGuard>
            <AdminDashboard />
          </AdminGuard>
        }>
        </Route>
        
      </Routes>
    </div>
  )
}


