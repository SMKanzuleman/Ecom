import { useEffect, useState } from 'react'
import { Title } from '../Title'
import API, { APIERROR } from '../../Utils/API'
import { MdDelete } from 'react-icons/md'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg'
import { showSuccessToast, showWaringToast } from '../../Utils/toast'
import Button from '../../animated components/Button'

export const ConfigFooter = () => {

    const [Categories, setCategories] = useState<string[]>([])
    const [Styles, setStyles] = useState<any[]>([])

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

    // Button Loading States
    const [SavingContact, setSavingContact] = useState(false)
    const [SavingBrand, setSavingBrand] = useState(false)

    // Fetch categories, styles and footer config
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const catRes = await API.get('/products/FilterData')
                if (catRes.data?.Categories) {
                    setCategories(catRes.data.Categories)
                }
                const styleRes = await API.get('/products/Styles')
                if (styleRes.data?.success) {
                    const { success, message, ...stylesObj } = styleRes.data
                    setStyles(Object.values(stylesObj) as any[])
                }
            } catch (err) {
                console.error(err)
            }
        }

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
        FetchFooterConfig()
        fetchFilters()
    }, [])


    const handleSaveContactInfo = async () => {
        setSavingContact(true);
        try {
            const res = await API.put("/site/contact", {
                ContactEmail,
                ContactPhone,
                Address: BusinessAddress,
                BusinessTimings,
            });
            if (res.data) {
                showSuccessToast("Contact details saved successfully!");
            }
        } catch (error) {
            APIERROR(error, "Failed to save contact details");
        } finally {
            setSavingContact(false);
        }
    };

    const handleSaveBrandDetails = async () => {
        setSavingBrand(true);
        try {
            const res = await API.put("/site/brand", {
                BrandDescription,
                SocialLinks: {
                    Facebook: FacebookUrl,
                    Instagram: InstagramUrl,
                    Twitter: TwitterUrl,
                }
            });
            if (res.data) {
                showSuccessToast("Brand & Social details saved successfully!");
            }
        } catch (error) {
            APIERROR(error, "Failed to save brand details");
        } finally {
            setSavingBrand(false);
        }
    };

    const handleAddLink = async () => {
        if (!LinkLabel.trim()) {
            showWaringToast('Please enter a Label Name')
            return
        }

        let generatedUrl = '/shop'
        if (SelectedCategory && SelectedStyle) {
            generatedUrl = `/shop?category=${encodeURIComponent(SelectedCategory)}&style=${encodeURIComponent(SelectedStyle)}`
        } else if (SelectedCategory) {
            generatedUrl = `/category/${encodeURIComponent(SelectedCategory)}`
        } else if (SelectedStyle) {
            generatedUrl = `/style/${encodeURIComponent(SelectedStyle)}`
        }

        const res = await API.post("site/link", { LinkLabel, LinkURL: generatedUrl })
        if (res.data) {
            setExploreLinks(res.data.ExploreLink)
        }

        setLinkLabel('')
        setSelectedCategory('')
        setSelectedStyle('')
    }

    const handleDeleteLink = async (id: string) => {
        try {
            const res = await API.delete("site/link", { data: { id } })
            if (res?.data) {
                setExploreLinks(res.data.Footer.ExplorePagesLinks)
                showWaringToast("deleting")
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className='flex flex-col gap-5'>

            <div className="p-5 flex flex-col">
                <Title name='Configure Footer' />
                <div className='text-sm text-gray-500'>Make it yours.</div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

                {/* Explore Pages */}
                <div className='flex flex-col bg-wh rounded-2xl shadow-sm border border-gray-200/70 p-6 gap-4'>

                    <div className='flex flex-col border-b border-gray-200/60 pb-3'>
                        <div className='font-accent text-xl font-bold text-black'>Explore Pages</div>
                        <p className='text-xs text-gray-500 font-body'>Add custom links for categories and styles to show in footer.</p>
                    </div>

                    {/* Form row: Label Name, Category Dropdown, Style Dropdown, Add Button */}
                    <div className='flex flex-col gap-3 p-4 bg-bg rounded-xl border border-gray-200/60'>

                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2.5'>
                            {/* Label input */}
                            <div className='flex flex-col gap-1'>
                                <label className='text-xs font-semibold text-gray-700'>Label Name</label>
                                <input
                                    type='text'
                                    value={LinkLabel}
                                    onChange={(e) => setLinkLabel(e.target.value)}
                                    placeholder='e.g. Summer Tops'
                                    className='input-primary text-xs w-full py-2 bg-wh'
                                />
                            </div>

                            {/* Category Dropdown */}
                            <div className='flex flex-col gap-1'>
                                <label className='text-xs font-semibold text-gray-700'>Choose Category</label>
                                <select
                                    value={SelectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className='input-primary text-xs w-full py-2 bg-wh cursor-pointer'
                                >
                                    <option value=''>All / None</option>
                                    {Categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Style Dropdown */}
                            <div className='flex flex-col gap-1'>
                                <label className='text-xs font-semibold text-gray-700'>Choose Style</label>
                                <select
                                    value={SelectedStyle}
                                    onChange={(e) => setSelectedStyle(e.target.value)}
                                    className='input-primary text-xs w-full py-2 bg-wh cursor-pointer'
                                >
                                    <option value=''>All / None</option>
                                    {Styles.map((s, idx) => (
                                        <option key={idx} value={s.Name}>{s.Name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Add Button */}
                        <div className='flex justify-between items-center pt-1'>
                            <div className='text-[11px] text-gray-700 font-mono line-clamp-1'>
                                URL: {SelectedCategory && SelectedStyle ? `/shop?category=${SelectedCategory}&style=${SelectedStyle}` : SelectedCategory ? `/category/${SelectedCategory}` : SelectedStyle ? `/style/${SelectedStyle}` : '/shop'}
                            </div>
                            <Button
                                type='button'
                                onClick={handleAddLink}
                                className='px-5 py-1.5 w-auto rounded-lg text-xs font-semibold'
                            >
                                + Add Link
                            </Button>
                        </div>
                    </div>

                    {/* Table View matching user sketch */}
                    <div className='overflow-hidden rounded-xl border border-gray-200 shadow-2xs'>

                        <table className='w-full text- text-xs'>

                            <thead className='bg-black text-wh  font-heading text-[11px] tracking-wider'>
                                <tr>
                                    <th className='py-2.5 px-3 border-r border-white/10'>Label Name</th>
                                    <th className='py-2.5 px-3 border-r border-white/10'>Generated Link</th>
                                    <th className='py-2.5 px-3 text-'>Action</th>
                                </tr>
                            </thead>

                            <tbody className='divide-y divide-gray-800 bg-wh'>
                                {ExploreLinks.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className='text-center py-4 text-gray-400'>No explore links added yet.</td>
                                    </tr>
                                ) : (
                                    ExploreLinks.map((item) => (
                                        <tr key={item._id} className='hover:bg-bg/60 transition-colors'>
                                            <td className='py-2.5 px-3 font-semibold text-black'>{item.Label}</td>
                                            <td className='py-2.5 px-3 text-gray-500 font-mono text-[11px]'>{item.Url}</td>
                                            <td className='py-2.5 px-3 text-right'>
                                                <button
                                                    type='button'
                                                    onClick={() => handleDeleteLink(item._id)}
                                                    className='p-1.5 text-black hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer'
                                                    title='Delete'
                                                >
                                                    <MdDelete className='text-base' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Contact Detail */}
                <div className='flex flex-col bg-wh rounded-2xl shadow-sm border border-gray-200/70 p-6 gap-4'>
                    <div className='flex flex-col border-b border-gray-200/60 pb-3'>
                        <div className='font-accent text-xl font-bold text-black'>Contact Details</div>
                        <p className='text-xs '>Enter your official support email, phone, business address and operating hours.</p>
                    </div>

                    <div className='flex flex-col gap-3.5'>
                        {/* Support Email */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-heading font-semibold text-gray-700 tracking-wide'>Support Email</label>
                            <input
                                type='email'
                                value={ContactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                placeholder='e.g. support@ecomstore.com'
                                className='input-primary w-full text-sm'
                            />
                        </div>

                        {/* Phone Number */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-heading font-semibold text-gray-700 tracking-wide'>Contact Phone</label>
                            <input
                                type='text'
                                value={ContactPhone}
                                onChange={(e) => setContactPhone(e.target.value)}
                                placeholder='e.g. +92 300 1234567'
                                className='input-primary w-full text-sm'
                            />
                        </div>

                        {/* Business Address */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-heading font-semibold text-gray-700 tracking-wide'>Business Address</label>
                            <input
                                type='text'
                                value={BusinessAddress}
                                onChange={(e) => setBusinessAddress(e.target.value)}
                                placeholder='e.g. 123 Fashion Avenue, Commercial Zone, Karachi, Pakistan'
                                className='input-primary w-full text-sm'
                            />
                        </div>

                        {/* Business Timings */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-xs font-heading font-semibold text-gray-700 tracking-wide'>Business Hours / Timings</label>
                            <input
                                type='text'
                                value={BusinessTimings}
                                onChange={(e) => setBusinessTimings(e.target.value)}
                                placeholder='e.g. Mon - Sat: 9:00 AM – 9:00 PM PKT'
                                className='input-primary w-full text-sm'
                            />
                        </div>

                        {/* Save Button */}
                        <div className='pt-2 flex justify-end'>
                            <Button
                                type='button'
                                disabled={SavingContact}
                                onClick={handleSaveContactInfo}
                                className='px-8 py-2 w-auto rounded-lg font-semibold text-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'
                            >
                                {SavingContact && <CgSpinner className='animate-spin text-lg' />}
                                <span>{SavingContact ? 'Saving...' : 'Save Contact Info'}</span>
                            </Button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Brand & Social Details */}

            <div className='flex flex-col bg-wh rounded-2xl shadow-sm border border-gray-200/70 p-6 gap-5'>
                <div className='flex flex-col border-b border-gray-200/60 pb-3'>
                    <div className='font-accent text-xl font-bold text-black'>Brand & Social Details</div>
                    <p className='text-xs text-gray-500 font-body'>Configure the brand bio shown in the footer and your social media profiles.</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {/* Left: Brand Description Textarea */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-xs font-heading font-semibold text-gray-700 tracking-wide'>
                            Brand Description
                        </label>
                        <textarea
                            rows={5}
                            value={BrandDescription}
                            onChange={(e) => setBrandDescription(e.target.value)}
                            placeholder='e.g. Crafting modern streetwear and timeless essentials. Designed for those who express individuality through refined aesthetics...'
                            className='input-primary w-full text-sm resize-none rounded-xl p-3 leading-relaxed'
                        />
                        <span className='text-[11px] text-gray-400 font-body'>This text appears directly beneath your brand logo in the footer.</span>
                    </div>

                    {/* Right: Social Media Links (Facebook, Instagram, Twitter) */}
                    <div className='flex flex-col gap-3.5'>
                        <label className='text-xs font-heading font-semibold text-gray-700 tracking-wide'>
                            Social Media Links
                        </label>

                        {/* Facebook */}
                        <div className='flex items-center gap-2.5'>
                            <span className='w-9 h-9 rounded-lg bg-bg border border-gray-200 flex items-center justify-center text-black shrink-0'>
                                <FaFacebookF className='text-sm' />
                            </span>
                            <input
                                type='url'
                                value={FacebookUrl}
                                onChange={(e) => setFacebookUrl(e.target.value)}
                                placeholder='https://facebook.com/yourbrand'
                                className='input-primary w-full text-sm'
                            />
                        </div>

                        {/* Instagram */}
                        <div className='flex items-center gap-2.5'>
                            <span className='w-9 h-9 rounded-lg bg-bg border border-gray-200 flex items-center justify-center text-black shrink-0'>
                                <FaInstagram className='text-sm' />
                            </span>
                            <input
                                type='url'
                                value={InstagramUrl}
                                onChange={(e) => setInstagramUrl(e.target.value)}
                                placeholder='https://instagram.com/yourbrand'
                                className='input-primary w-full text-sm'
                            />
                        </div>

                        {/* Twitter */}
                        <div className='flex items-center gap-2.5'>
                            <span className='w-9 h-9 rounded-lg bg-bg border border-gray-200 flex items-center justify-center text-black shrink-0'>
                                <FaTwitter className='text-sm' />
                            </span>
                            <input
                                type='url'
                                value={TwitterUrl}
                                onChange={(e) => setTwitterUrl(e.target.value)}
                                placeholder='https://twitter.com/yourbrand'
                                className='input-primary w-full text-sm'
                            />
                        </div>
                    </div>
                </div>

                {/* Save Brand & Social Button */}
                <div className='pt-2 flex justify-end border-t border-gray-100'>
                    <Button
                        type='button'
                        disabled={SavingBrand}
                        onClick={handleSaveBrandDetails}
                        className='px-8 py-2.5 w-auto rounded-xl font-semibold text-sm shadow flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'
                    >
                        {SavingBrand && <CgSpinner className='animate-spin text-lg' />}
                        <span>{SavingBrand ? 'Saving...' : 'Save Brand & Social Details'}</span>
                    </Button>
                </div>
            </div>

        </div>
    )
}
