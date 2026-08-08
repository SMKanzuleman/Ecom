import { Routes, Route } from 'react-router-dom';
import { Auth } from './pages/Auth';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar';
export const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  )
}


