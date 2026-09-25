
import { useEffect, useState } from "react";
import Newsletter from "../components/Newsletter";
import Brands from '../components/Brands';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import { useAuth } from "../context/AuthContext";
import API from "../Utils/API";
import BrowsingSTyles from "../components/BrowsingSTyles";
import { motion } from "motion/react";
import { fadeInUp } from "../Utils/Motion";

const Home = () => {
    const [Products, setProducts] = useState<any>([])
    const { Token, Role, Name } = useAuth()
    const [ProductsLoading, setProductsLoading] = useState(false);

    const FetchProducts = async () => {
        try {

            setProductsLoading(true)
            const res = await API.get("/products")
            if (res.data.AllProducts) {
                setProducts(res.data.AllProducts)
                console.log("yy Home main token hie ", Token)
                console.log("Role", Role)
                console.log("Name of User in Home: ", Name);
            }
        } catch (err) {
            console.error(err)
        } finally {
            setProductsLoading(false)
        }

    }

    useEffect(() => {
        FetchProducts()
    }, [])

    return (
        <div className="animate-fade-up">
            <HeroSection />
            <Brands />
            <ProductsSection title={"Top Selling"} tag={"top_selling"} products={Products} ProductsLoading={ProductsLoading} />
            <div className="py-5 bg-wh"></div>
            <motion.div
                variants={fadeInUp}
                
                initial="hidden"
                whileInView="visible"                  
                viewport={{ amount: 0.2 }} 
                
                >
                <Newsletter />

            </motion.div>
            <ProductsSection title={"New Arrivals"} tag={"new_arrival"} products={Products} ProductsLoading={ProductsLoading} />
            <BrowsingSTyles />

        </div>
    );
};

export default Home;

