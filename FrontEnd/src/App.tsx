import { Routes, Route } from 'react-router-dom';
import { Auth } from './pages/Auth';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  )
}


