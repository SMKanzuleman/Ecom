import { Routes, Route } from 'react-router-dom';
import { Auth } from './pages/Auth';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
export const App = () => {
  return (
    <div>
      <Navbar />
      <Cart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  )
}


