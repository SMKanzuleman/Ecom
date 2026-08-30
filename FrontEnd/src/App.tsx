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
import { UserDashboard } from './pages/UserDashboard';
import ProtectedRout from './Middlewares/ProtectedRout';
import ForgetPassword from './components/User/ForgetPassword';


export const App = () => {
  const location = useLocation()
  const IsDashboard = location.pathname === "/dashboard" || location.pathname === "/userdashboard"




  return (
    <div>
      <ToastContainer position='top-right' style={{ top: "110px", right: "20px" }} />

      {!IsDashboard && <Navbar />}
      {!IsDashboard && <Cart />}


      <Routes>
        {/* unpretected Route */}
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />

        {/* Protected rout */}
        <Route element={<ProtectedRout />}>
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/password" element={<ForgetPassword />} />
        </Route>


        {/* Admin protected rout */}
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


