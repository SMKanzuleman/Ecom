import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Newsletter from "../components/Newsletter";
import Breadcrumbs from "../components/Breadcrumbs";
import PDContent from "../components/PDContent1";
import PDContent2 from "../components/PDContent2";
import API from "../Utils/API";

const ProductDetail = () => {

    const { id } = useParams();
    const [Product, setProduct] = useState<any>(null)

    const FetchProduct = async () => {
        try {
            const res = await API.get("/products/" + id)
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

           
            <PDContent Product={Product} />
             

            <PDContent2 Product={Product} />

            <Newsletter />

        </div>
    );
};

export default ProductDetail;
