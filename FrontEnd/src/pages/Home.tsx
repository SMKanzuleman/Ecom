import axios from "axios";
import { useEffect, useState } from "react";
import Newsletter from "../components/Newsletter";
import Brands from '../components/Brands';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';

const Home = () => {
    const [Products, setProducts] = useState<any>([])
    const FetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:2026/products")
            if (res.data.AllProducts) {
                setProducts(res.data.AllProducts)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        FetchProducts()
    }, [])

    return (
        <div className="">
            <HeroSection />
            <Brands />
            <ProductsSection title={"Top Selling"} tag={"top_selling"} products={Products} />
            <ProductsSection title={"New Arrivals"} tag={"new_arrival"} products={Products} />
            <div className="py-5 bg-wh"></div>
            <Newsletter />
        </div>
    );
};

export default Home;
