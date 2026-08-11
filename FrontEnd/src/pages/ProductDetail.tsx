import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Newsletter from "../components/Newsletter";
import Breadcrumbs from "../components/Breadcrumbs";
import PDContent from "../components/PDContent1";
import PDContent2 from "../components/PDContent2";

const ProductDetail = () => {

    const { id } = useParams();
    const [Product, setProduct] = useState<any>("")

    const FetchProduct = async () => {
        try {
            const res = await axios.get("http://localhost:2026/products/" + id)
            setProduct(res.data.FoundedProduct)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        FetchProduct()
        window.scroll(0, 0)
    }, [])

    return (
        <div className="w-full min-h-screen bg-white px-7 lg:px-10 flex flex-col">

            <Breadcrumbs product={Product} />

            <PDContent productId={ id}  Product={Product}/>
            
            <PDContent2 Product={ Product} />

            <Newsletter />

        </div>
    );
};

export default ProductDetail;
