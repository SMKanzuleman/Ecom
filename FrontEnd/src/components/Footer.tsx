import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import API, { APIERROR } from "../Utils/API";

export const Footer = () => {

    // New link form inputs
    const [LinkLabel, setLinkLabel] = useState('')
    const [SelectedCategory, setSelectedCategory] = useState('')
    const [SelectedStyle, setSelectedStyle] = useState('')

    // Explore Pages list
    const [ExploreLinks, setExploreLinks] = useState<any[]>([])

    // Contact Details States
    const [ContactEmail, setContactEmail] = useState('')
    const [ContactPhone, setContactPhone] = useState('')
    const [BusinessAddress, setBusinessAddress] = useState('')
    const [BusinessTimings, setBusinessTimings] = useState('')

    // Brand & Social Links States
    const [BrandDescription, setBrandDescription] = useState('')
    const [FacebookUrl, setFacebookUrl] = useState('')
    const [InstagramUrl, setInstagramUrl] = useState('')
    const [TwitterUrl, setTwitterUrl] = useState('')


    const FetchFooterConfig = async () => {
        try {
            const res = await API.get("/site/footer");
            if (res.data?.Footer) {
                const f = res.data.Footer;
                if (f.ExplorePagesLinks) {
                    setExploreLinks(f.ExplorePagesLinks);
                }
                if (f.ContactEmail) setContactEmail(f.ContactEmail);
                if (f.ContactPhone) setContactPhone(f.ContactPhone);
                if (f.Address) setBusinessAddress(f.Address);
                if (f.BusinessTimings) setBusinessTimings(f.BusinessTimings);
                if (f.BrandDescription) setBrandDescription(f.BrandDescription);
                if (f.SocialLinks) {
                    if (f.SocialLinks.Facebook) setFacebookUrl(f.SocialLinks.Facebook);
                    if (f.SocialLinks.Instagram) setInstagramUrl(f.SocialLinks.Instagram);
                    if (f.SocialLinks.Twitter) setTwitterUrl(f.SocialLinks.Twitter);
                }
            }
        } catch (error) {
            APIERROR(error, "Error in Fetching Footer Config")
        }
    };

    useEffect(() => {
        FetchFooterConfig()
    }, [])

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
                        {BrandDescription}
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                        <a
                            href={`${FacebookUrl}`}
                            target="new"
                            aria-label="Facebook"
                            className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center hover:border-gray-500 transition-colors"
                        >
                            <FaFacebookF className="text-xs" />
                        </a>
                        <a
                            href={`${InstagramUrl}`}
                            aria-label="Instagram"
                            className="w-9 h-9 rounded-full border border-gray-800 flex items-center justify-center hover:border-gray-500 transition-colors"
                        >
                            <FaInstagram className="text-xs" />
                        </a>
                        <a
                            href={`${TwitterUrl}`}
                            target="new"
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

                            {ExploreLinks.map((link, index) => (
                                <li>
                                    <Link key={index} to={`${link.Url}`} className="hover:underline underline-offset-4 transition-all">
                                        {link.Label}
                                    </Link>
                                </li>
                            ))}

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
                            <span>{BusinessAddress}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaPhoneAlt className="text-sm shrink-0" />
                            <span>{ContactPhone}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-sm shrink-0" />
                            <span>{ContactEmail}</span>
                        </li>
                    </ul>
                    <div className="pt-2">
                        <span className="text-xs font-heading tracking-wide">
                            {BusinessTimings}
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
