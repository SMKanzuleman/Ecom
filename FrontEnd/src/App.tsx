import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
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
import ResetPassword from './components/User/ResetPassword';

import { Footer } from './components/Footer';

import {
  OrderSuccess

} from './components/OrderSuccess';
import { NotFound } from './pages/NotFound';


const ShowNavAndFooter = () => {
  return (
    <>
      <Navbar />
      <Cart />
      <Outlet />
      <Footer />
    </>

  )
}



export const App = () => {

  return (
    <div>

      <ToastContainer position='top-right' style={{ top: "110px", right: "20px" }} />


      <Routes>
        {/* unpretected Route */}
        <Route element={<ShowNavAndFooter />}>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/:type/:name" element={<Shop />} />
        </Route>

        <Route path="cart" element={<Cart />} />

        {/* Protected rout */}
        <Route element={<ProtectedRout />}>
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/password" element={<ResetPassword />} />
        </Route>


        {/* Admin protected rout */}
        <Route path="/dashboard" element={
          <AdminGuard>
            <AdminDashboard />
          </AdminGuard>
        }>
        </Route>

        {/* NOtFound */}
        <Route path='*' element={<NotFound />} />

      </Routes>


    </div>
  )
}


