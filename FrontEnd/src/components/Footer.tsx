import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export const Footer = () => {
 

    return (
        <footer className="w-full bg-black mt-auto">
            {/* Main Content: 4 Columns */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                
                {/* 1st Section: About Brand */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl text-wh font-bold font-accent tracking-wider">
                        ECOM
                    </h2>
                    <p className="text-sm font-body leading-relaxed max-w-sm">
                        Crafting modern streetwear and timeless essentials. Designed for those who express individuality through refined aesthetics and effortless comfort.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center hover:border-gray-500 transition-colors"
                        >
                            <FaFacebookF className="text-xs" />
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center hover:border-gray-500 transition-colors"
                        >
                            <FaInstagram className="text-xs" />
                        </a>
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center hover:border-gray-500 transition-colors"
                        >
                            <FaTwitter className="text-xs" />
                        </a>
                    </div>
                </div>

                {/* 2nd & 3rd Sections: Side-by-side flex row on mobile, separate grid items on sm/md/lg */}
                <div className="flex flex-row justify-between gap-6 sm:contents">
                    {/* Explore */}
                    <div className="flex-1 flex flex-col gap-4">
                        <h3 className="text-lg text-wh font-bold font-accent tracking-wide uppercase">
                            Explore
                        </h3>
                        <ul className="flex flex-col gap-2.5 text-sm font-body">
                            <li>
                                <Link to="/shop" className="hover:underline underline-offset-4 transition-all">
                                    Shop All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop?category=T-Shirts" className="hover:underline underline-offset-4 transition-all">
                                    T-Shirts & Tops
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop?category=Jackets" className="hover:underline underline-offset-4 transition-all">
                                    Jackets & Coats
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop?style=Casual" className="hover:underline underline-offset-4 transition-all">
                                    Casual Style
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop?style=Business" className="hover:underline underline-offset-4 transition-all">
                                    Formal & Business
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop?onSale=true" className="hover:underline underline-offset-4 transition-all">
                                    Special Offers & Sale
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Care / Help */}
                    <div className="flex-1 flex flex-col gap-4">
                        <h3 className="text-lg text-wh font-bold font-accent tracking-wide uppercase">
                            Customer Care
                        </h3>
                        <ul className="flex flex-col gap-2.5 text-sm font-body">
                            <li>
                                <Link to="/userdashboard" className="hover:underline underline-offset-4 transition-all">
                                    Track Your Order
                                </Link>
                            </li>
                            <li>
                                <Link to="/userdashboard" className="hover:underline underline-offset-4 transition-all">
                                    Order History
                                </Link>
                            </li>
                            <li>
                                <a href="#shipping" className="hover:underline underline-offset-4 transition-all">
                                    Shipping & Delivery
                                </a>
                            </li>
                            <li>
                                <a href="#returns" className="hover:underline underline-offset-4 transition-all">
                                    Returns & Exchanges
                                </a>
                            </li>
                            <li>
                                <a href="#terms" className="hover:underline underline-offset-4 transition-all">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#privacy" className="hover:underline underline-offset-4 transition-all">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 4th Section: Contact Details */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg text-wh font-bold font-accent tracking-wide uppercase">
                        Contact Us
                    </h3>
                    <ul className="flex flex-col gap-3 text-sm font-body">
                        <li className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-sm mt-1 shrink-0" />
                            <span>123 Fashion Avenue, Commercial Zone, Karachi, Pakistan</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaPhoneAlt className="text-sm shrink-0" />
                            <span>+92 300 1234567</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-sm shrink-0" />
                            <span>support@ecomstore.com</span>
                        </li>
                    </ul>
                    <div className="pt-2">
                        <span className="text-xs font-heading tracking-wide">
                            Mon - Sat: 9:00 AM &ndash; 9:00 PM PKT
                        </span>
                    </div>
                </div>

            </div>

            {/* Bottom Copyright Bar */}
            <div className="border-t border-gray-900 py-6 px-6 text-center text-xs font-heading tracking-wider">
                <p>&copy; {new Date().getFullYear()} ECOM. All rights reserved.</p>
            </div>
        </footer>
    );
};
