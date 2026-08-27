import { Link } from 'react-router-dom';

type ProductProp = {
    product: any
}
const Breadcrumbs = ({product}: ProductProp) => {
  return (
      <div className="w-full flex px-5 py-3 lg:px-50 justify-start text-text lg:text-sm text-[12px] lg:gap-2 gap-1 ">
          <Link to={"/"}>
              <p className="hover:text-black cursor-pointer transition-all duration-500">Home</p>
          </Link>
          <p className="hover:text-black cursor-pointer transition-all duration-500">&gt;</p>
          <p className="hover:text-black cursor-pointer transition-all duration-500">Shop</p>
          <p className="hover:text-black cursor-pointer transition-all duration-500">&gt;</p>
          <p className="hover:text-black cursor-pointer transition-all duration-500 hidden sm:block">{product?.category || "Clothing"}</p>
          <p className="hover:text-black cursor-pointer transition-all duration-500 hidden sm:block">&gt;</p>
          <p className="hover:text-black cursor-pointer transition-all duration-500">{product?.Name}</p>

      </div>
  )
}

export default Breadcrumbs