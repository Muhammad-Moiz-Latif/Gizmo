import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import logo from '../assets/blockchain (1).png';
import cartimg from '../assets/shopping-cart1.png';
import search from '../assets/zoom.png';
import dropdown from "../assets/arrow-down-sign-to-navigate.png";
import wishlist from '../assets/wishlist1.png';
import { WishListDropDown } from './WishListDropDown';
import { CartDropDown } from './CartDropDown';
import defaultImg from '../assets/log-out.png';
import toast from 'react-hot-toast';


interface UserNavbarProps {
    ImageURl: string;
}

export const UserNavbar: React.FC<UserNavbarProps> = ({ ImageURl }) => {
    const { UserId } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isWishList, setIsWishList] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const wishList = useSelector((state: RootState) => state.wishList.list);
    const categories = useSelector((state: RootState) => state.category.categories);
    const cart = useSelector((state: RootState) => state.cart.list);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const Devices = useSelector((state: RootState) => state.device.devices);
    // Fix the state types and implement the search functionality
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [Query, setQuery] = useState<any>();
    const localWishList = useSelector((state: RootState) => state.localWishList.list);
    const localCart = useSelector((state: RootState) => state.localCart.list);
    const navigate = useNavigate();
    var wishlistCount = 0;
    var cartCount = 0;
    if (UserId == undefined) {
        wishlistCount = localWishList.length;
        cartCount = localCart.length;
    } else {
        wishlistCount = wishList.length;
        cartCount = cart.length
    }

    function handleLogout() {
        if (UserId == undefined) {
            navigate('/Login');

        } else {
            toast.success("Logout successful", {
                style: {}
            });
            localStorage.removeItem('Cart');
            localStorage.removeItem('WishList');
            setTimeout(() => {
                navigate('/dashboard', { replace: true })
                window.location.reload();
            }, 1000);

        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsCategoryOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };


        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };


    }, []);

    // Replace the commented out useEffect with this working implementation
    useEffect(() => {
        if (Query && Query.trim() !== "") {
            setFilteredProducts(Devices.filter((product) => product.DeviceName.toLowerCase().includes(Query.toLowerCase())))
        } else {
            setFilteredProducts([])
        }
    }, [Query, Devices])

    return (
        <nav className="fixed w-full h-16 font-roboto px-4 md:px-8 lg:px-16 border-b border-ghost_white-900 bg-black z-50">
            <div className='flex justify-between items-center h-full'>
                {/* Logo */}
                <NavLink to={(UserId == undefined) ? "/" : `/dashboard/${UserId}`} className='flex items-center'>
                    <img src={logo} alt="Gizmo logo" className='w-8 md:w-10' />
                    <span className='text-lg md:text-xl font-medium text-ghost_white-900 ml-1 tracking-wide'>GIZMO</span>
                </NavLink>

                {/* Center Section */}
                <div className='hidden md:flex justify-center items-center space-x-4 ml-20'>
                    <NavLink to={(UserId != undefined) ? `/dashboard/${UserId}` : "/"} className='text-base text-ghost_white-900 hover:opacity-70 transition-colors duration-300'>HOME</NavLink>
                    <div className='relative' ref={dropdownRef} onMouseEnter={() => setIsCategoryOpen(true)
                    }
                        onMouseLeave={() => setIsCategoryOpen(false)}>
                        <button
                            className='flex items-center gap-1 text-base text-ghost_white-900 hover:opacity-70 transition-colors duration-300'

                        >
                            CATEGORIES
                            <img src={dropdown} alt="Dropdown arrow" className={`w-3 transition-transform duration-300 ${isCategoryOpen ? 'transform rotate-180' : ''}`} />
                        </button>
                        {isCategoryOpen && (
                            <div className="absolute left-0 w-48 bg-black rounded-md shadow-lg py-1 z-50">
                                <ul className="divide-y divide-gray-600">
                                    {categories.map((category: any) => (
                                        <li key={category.CategoryName}>
                                            <NavLink
                                                key={category.CategoryId}
                                                to={`Category/${category.CategoryId}`}
                                                className="block px-4 py-2 text-sm text-ghost_white-900 hover:bg-ghost_white hover:text-black transition-colors duration-300"
                                            >
                                                {category.CategoryName}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        )}
                    </div>
                    <NavLink to="aboutus" className='bg-ghost_white-900 text-black rounded-md h-9 pt-[2px] px-4 hover:bg-black hover:text-ghost_white-900 border-ghost_white border-2 hover:border-ghost_white-900 transition-colors duration-300 ease-in-out active:opacity-50 text-lg font-roboto tracking-tight'>
                        About Us
                    </NavLink>
                </div>

                {/* Right Section */}
                <div className='flex items-center space-x-4 md:space-x-2'>
                    <div className="relative" ref={searchRef}>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 rounded-full transition-colors duration-300"
                        >
                            <img src={search || "/placeholder.svg"} alt="Search" className="w-5 h-5" />
                        </button>
                        {isSearchOpen && (
                            <div className="absolute -right-28 lg:right-0 mt-2 w-72 bg-ghost_white rounded-md shadow-lg p-2">
                                <input
                                    type="text"
                                    placeholder="Search for a product"
                                    className="w-full h-9 px-3 outline-none rounded-lg border border-indigo_dye-300 focus:border-black focus:ring-1 focus:ring-black transition-all duration-300"
                                    value={Query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                {filteredProducts && filteredProducts.length > 0 && (
                                    <div className="mt-2 max-h-60 overflow-y-auto bg-black rounded-md">
                                        {filteredProducts.map((product: any) => (
                                            <div
                                                key={product.DeviceId}
                                                className="flex items-center p-2 hover:opacity-55 cursor-pointer border-b border-gray-700"
                                                onClick={() => {
                                                    navigate(UserId ? `/dashboard/${UserId}/Device/${product.DeviceId}` : `/dashboard/Device/${product.DeviceId}`)
                                                    setIsSearchOpen(false)
                                                    setQuery("")
                                                }}
                                            >
                                                <img
                                                    src={product.Images && product.Images.length > 0 ? product.Images[0] : "/placeholder.svg"}
                                                    alt={product.DeviceName}
                                                    className="w-10 h-10 object-cover rounded-md mr-2"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-ghost_white-900 group-hover:text-black truncate">
                                                        {product.DeviceName}
                                                    </p>
                                                    <p className="text-xs text-ghost_white-500">${product.Price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <NavLink to={(UserId==undefined)?"/dashboard/wishlist":`/dashboard/${UserId}/wishlist`} className='p-2  rounded-full transition-colors duration-300 relative' onMouseEnter={() => setIsWishList(true)}
                        onMouseLeave={() => setIsWishList(false)}>
                        <img src={wishlist} alt="Wishlist" className='w-5 h-5' />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-engineering_orange-700 text-ghost_white-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                        {
                            isWishList && <WishListDropDown />
                        }
                    </NavLink>
                    <div className='p-2 rounded-full transition-colors duration-300 relative hover:cursor-pointer' onClick={() => setIsCart(!isCart)}>
                        <img src={cartimg} alt="Shopping cart" className='w-5 h-5' />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-engineering_orange-700 text-ghost_white-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                        {
                            isCart && <CartDropDown />
                        }
                    </div>
                    <div className="relative">
                        <div
                            className="relative"
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                        >
                            <button className="flex items-center space-x-1 p-1 rounded-full transition-colors duration-300 hover:opacity-70">
                                <img
                                    src={ImageURl || defaultImg}
                                    alt="User profile"
                                    className="rounded-full w-6 h-6"
                                />
                                <img src={dropdown} alt="Dropdown arrow" className={`w-3 transition-transform duration-300 ${!isOpen ? 'transform rotate-180' : ''}`} />
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 w-48 bg-black rounded-md shadow-lg py-1 z-50">
                                    <ul className="divide-y divide-gray-600">
                                        {[
                                            ...(UserId ? [{ name: 'Profile', path: 'profile' }] : []), // Ensures uniform structure
                                            { name: 'Help & Support', path: '#' }, // Use '#' instead of an empty string
                                        ].map((item, index) => (
                                            <li key={index}>
                                                <NavLink
                                                    to={item.path}
                                                    className="block px-4 py-2 text-sm text-ghost_white hover:bg-ghost_white-500 hover:text-rich_black transition-colors duration-300"
                                                >
                                                    {item.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>


                                    {/* Divider above Logout */}
                                    <div className="my-1 border-t border-gray-600"></div>

                                    <button
                                        onClick={handleLogout}
                                        className={`w-full pr-[120px] py-2 text-sm text-ghost_white ${UserId == undefined ? "hover:bg-green-700" : "hover:bg-red-700"} hover:text-ghost_white transition-colors duration-300`}
                                    >
                                        {UserId == undefined ? "Login" : "Logout"}
                                    </button>

                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};

