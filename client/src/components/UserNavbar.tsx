import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

import logo from "../assets/blockchain (1).png";
import cartimg from "../assets/shopping-cart1.png";
import search from "../assets/zoom.png";
import dropdown from "../assets/arrow-down-sign-to-navigate.png";
import wishlist from "../assets/wishlist1.png";

import { WishListDropDown } from "./WishListDropDown";
import { CartDropDown } from "./CartDropDown";
import { getAvatarUrl, handleAvatarError } from "../utils/avatar";

import toast from "react-hot-toast";

interface UserNavbarProps {
    ImageURl: string;
}

export const UserNavbar: React.FC<UserNavbarProps> = ({ ImageURl }) => {
    const { UserId } = useParams();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isWishList, setIsWishList] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [Query, setQuery] = useState("");

    const wishList = useSelector(
        (state: RootState) => state.wishList.list
    );

    const categories = useSelector(
        (state: RootState) => state.category.categories
    );

    const cart = useSelector(
        (state: RootState) => state.cart.list
    );

    const Devices = useSelector(
        (state: RootState) => state.device.devices
    );

    const localWishList = useSelector(
        (state: RootState) => state.localWishList.list
    );

    const localCart = useSelector(
        (state: RootState) => state.localCart.list
    );

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const wishlistRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    /* ------------------------------------------------ */
    /* Scroll state                                     */
    /* ------------------------------------------------ */

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /* ------------------------------------------------ */
    /* Counts                                           */
    /* ------------------------------------------------ */

    const wishlistCount =
        UserId === undefined
            ? localWishList.length
            : wishList.length;

    const cartCount =
        UserId === undefined
            ? localCart.length
            : cart.length;

    /* ------------------------------------------------ */
    /* Logout / Login                                  */
    /* ------------------------------------------------ */

    function handleLogout() {
        if (UserId === undefined) {
            navigate("/Login");
            return;
        }

        toast.success("Logout successful");

        localStorage.removeItem("Cart");
        localStorage.removeItem("WishList");

        setTimeout(() => {
            navigate("/dashboard", { replace: true });
            window.location.reload();
        }, 1000);
    }


    /* ------------------------------------------------ */
    /* Outside click                                    */
    /* ------------------------------------------------ */

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(target)
            ) {
                setIsCategoryOpen(false);
            }

            if (
                searchRef.current &&
                !searchRef.current.contains(target)
            ) {
                setIsSearchOpen(false);
            }

            if (
                wishlistRef.current &&
                !wishlistRef.current.contains(target)
            ) {
                setIsWishList(false);
            }

            if (
                profileRef.current &&
                !profileRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /* ------------------------------------------------ */
    /* Product search                                   */
    /* ------------------------------------------------ */

    useEffect(() => {
        if (Query && Query.trim() !== "") {
            const devicesArray = Array.isArray(Devices)
                ? Devices
                : [];

            setFilteredProducts(
                devicesArray.filter((product) =>
                    product.DeviceName
                        ?.toLowerCase()
                        .includes(Query.toLowerCase())
                )
            );
        } else {
            setFilteredProducts([]);
        }
    }, [Query, Devices]);

    /* ------------------------------------------------ */
    /* Close mobile menu                                */
    /* ------------------------------------------------ */

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsCategoryOpen(false);
        setIsSearchOpen(false);
    };

    const homePath =
        UserId === undefined
            ? "/"
            : `/dashboard/${UserId}`;

    return (
        <>
            {/* ================================================== */}
            {/* NAVBAR                                              */}
            {/* ================================================== */}

            <nav
                className={`
          fixed
          left-0
          top-0
          z-50
          w-full
          px-3
          pt-3
          sm:px-5
          lg:px-8
          xl:px-12
          transition-all
          duration-500
        `}
            >
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`
            mx-auto
            flex
            max-w-[1500px]
            items-center
            justify-between
            rounded-full
            border
            px-3
            transition-all
            duration-500
            sm:px-4
            ${isScrolled
                            ? `
                  h-[56px]
                  border-black/[0.09]
                  bg-[#f7f7f5]/[0.94]
                  shadow-[0_10px_35px_rgba(0,0,0,0.09)]
                  backdrop-blur-2xl
                `
                            : `
                  h-[60px]
                  border-black/[0.06]
                  bg-[#f7f7f5]/[0.78]
                  shadow-[0_6px_28px_rgba(0,0,0,0.045)]
                  backdrop-blur-xl
                `
                        }
          `}
                >

                    {/* ================================================== */}
                    {/* LOGO                                                 */}
                    {/* ================================================== */}

                    <NavLink
                        to={homePath}
                        onClick={closeMobileMenu}
                        className="group flex shrink-0 items-center gap-2.5"
                    >
                        <div
                            className="
                flex
                h-9
                w-9
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-black
                transition-transform
                duration-500
                group-hover:scale-105
              "
                        >
                            <img
                                src={logo}
                                alt="Gizmo logo"
                                className="
                  w-[22px]
                  object-contain
                  brightness-0
                  invert
                "
                            />
                        </div>

                        <span
                            className="
                hidden
                text-[14px]
                font-semibold
                tracking-[0.15em]
                text-black
                sm:block
              "
                        >
                            GIZMO
                        </span>
                    </NavLink>

                    {/* ================================================== */}
                    {/* DESKTOP NAVIGATION                                  */}
                    {/* ================================================== */}

                    <div
                        className="
              hidden
              items-center
              gap-1
              lg:flex
            "
                    >

                        <NavLink
                            to={homePath}
                            className={({ isActive }) =>
                                `
                  relative
                  rounded-full
                  px-4
                  py-2.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  transition-all
                  duration-300
                  ${isActive
                                    ? "bg-black text-white"
                                    : "text-black/45 hover:bg-black/[0.045] hover:text-black"
                                }
                `
                            }
                        >
                            Home
                        </NavLink>

                        {/* Categories */}
                        <div
                            className="relative"
                            ref={dropdownRef}
                            onMouseEnter={() =>
                                setIsCategoryOpen(true)
                            }
                            onMouseLeave={() =>
                                setIsCategoryOpen(false)
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setIsCategoryOpen(!isCategoryOpen)
                                }
                                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  px-4
                  py-2.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-black/45
                  transition-all
                  duration-300
                  hover:bg-black/[0.045]
                  hover:text-black
                "
                            >
                                Categories

                                <motion.img
                                    animate={{
                                        rotate: isCategoryOpen ? 180 : 0,
                                    }}
                                    transition={{ duration: 0.25 }}
                                    src={dropdown}
                                    alt=""
                                    className="
                    h-2
                    w-2
                    brightness-0
                    opacity-40
                  "
                                />
                            </button>

                            <AnimatePresence>
                                {isCategoryOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -6,
                                            scale: 0.98,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -6,
                                            scale: 0.98,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="
                      absolute
                      left-1/2
                      top-full
                      mt-3
                      w-56
                      -translate-x-1/2
                      overflow-hidden
                      rounded-2xl
                      border
                      border-black/[0.07]
                      bg-[#f7f7f5]/95
                      p-2
                      shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                      backdrop-blur-2xl
                    "
                                    >
                                        <div
                                            className="
                        px-3
                        pb-2
                        pt-1
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.28em]
                        text-black/25
                      "
                                        >
                                            Browse collection
                                        </div>

                                        {(Array.isArray(categories)
                                            ? categories
                                            : []
                                        ).map((category: any) => (
                                            <NavLink
                                                key={category.CategoryId}
                                                to={`Category/${category.CategoryId}`}
                                                onClick={() => {
                                                    setIsCategoryOpen(false);
                                                    closeMobileMenu();
                                                }}
                                                className="
                          group
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          px-3
                          py-2.5
                          text-sm
                          font-medium
                          text-black/55
                          transition-all
                          duration-200
                          hover:bg-black
                          hover:text-white
                        "
                                            >
                                                {category.CategoryName}

                                                <span className="text-white opacity-0 transition-opacity duration-200 group-hover:opacity-60">
                                                    ↗
                                                </span>
                                            </NavLink>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <NavLink
                            to="aboutus"
                            className={({ isActive }) =>
                                `
                  rounded-full
                  px-4
                  py-2.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  transition-all
                  duration-300
                  ${isActive
                                    ? "bg-black text-white"
                                    : "text-black/45 hover:bg-black/[0.045] hover:text-black"
                                }
                `
                            }
                        >
                            About
                        </NavLink>
                    </div>

                    {/* ================================================== */}
                    {/* RIGHT ACTIONS                                       */}
                    {/* ================================================== */}

                    <div className="flex items-center gap-0.5 sm:gap-1">

                        {/* Search */}
                        <div
                            className="relative"
                            ref={searchRef}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSearchOpen(!isSearchOpen);
                                    setIsCart(false);
                                    setIsWishList(false);
                                    setIsOpen(false);
                                }}
                                className="
                  group
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-300
                  hover:bg-black/[0.06]
                "
                                aria-label="Search"
                            >
                                <img
                                    src={search}
                                    alt=""
                                    className="
                    h-[16px]
                    w-[16px]
                    object-contain
                    brightness-0
                    opacity-50
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                                />
                            </button>

                            <AnimatePresence>
                                {isSearchOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -6,
                                            scale: 0.98,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -6,
                                            scale: 0.98,
                                        }}
                                        className="
                      absolute
                      right-0
                      top-full
                      mt-3
                      w-[310px]
                      overflow-hidden
                      rounded-2xl
                      border
                      border-black/[0.07]
                      bg-[#f7f7f5]/95
                      p-3
                      shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                      backdrop-blur-2xl
                    "
                                    >
                                        <div
                                            className="
                        mb-2
                        px-1
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.28em]
                        text-black/25
                      "
                                        >
                                            Search Gizmo
                                        </div>

                                        <input
                                            type="text"
                                            autoFocus
                                            placeholder="Search for a product..."
                                            className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-black/[0.08]
                        bg-white
                        px-4
                        text-sm
                        text-black
                        outline-none
                        transition-all
                        placeholder:text-black/25
                        focus:border-black/20
                        focus:ring-2
                        focus:ring-black/[0.035]
                      "
                                            value={Query}
                                            onChange={(e) =>
                                                setQuery(e.target.value)
                                            }
                                        />

                                        {filteredProducts.length > 0 && (
                                            <div
                                                className="
                          mt-2
                          max-h-64
                          overflow-y-auto
                          rounded-xl
                          border
                          border-black/[0.06]
                          bg-white
                        "
                                            >
                                                {filteredProducts.map(
                                                    (product: any) => (
                                                        <div
                                                            key={product.DeviceId}
                                                            className="
                                flex
                                cursor-pointer
                                items-center
                                gap-3
                                border-b
                                border-black/[0.05]
                                p-3
                                last:border-0
                                hover:bg-black/[0.025]
                              "
                                                            onClick={() => {
                                                                navigate(
                                                                    UserId
                                                                        ? `/dashboard/${UserId}/Device/${product.DeviceId}`
                                                                        : `/dashboard/Device/${product.DeviceId}`
                                                                );

                                                                setIsSearchOpen(false);
                                                                setQuery("");
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    product.Images &&
                                                                        product.Images.length > 0
                                                                        ? product.Images[0]
                                                                        : "/placeholder.svg"
                                                                }
                                                                alt={product.DeviceName}
                                                                className="
                                  h-11
                                  w-11
                                  rounded-lg
                                  object-cover
                                "
                                                            />

                                                            <div className="min-w-0 flex-1">
                                                                <p
                                                                    className="
                                    truncate
                                    text-xs
                                    font-semibold
                                    text-black
                                  "
                                                                >
                                                                    {product.DeviceName}
                                                                </p>

                                                                <p
                                                                    className="
                                    mt-1
                                    text-[11px]
                                    text-black/40
                                  "
                                                                >
                                                                    ${product.Price.toFixed(2)}
                                                                </p>
                                                            </div>

                                                            <span className="text-xs text-black/20">
                                                                ↗
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Wishlist */}
                        <div
                            className="relative"
                            ref={wishlistRef}
                            onMouseEnter={() =>
                                setIsWishList(true)
                            }
                            onMouseLeave={() =>
                                setIsWishList(false)
                            }
                        >
                            <NavLink
                                to={
                                    UserId === undefined
                                        ? "/dashboard/wishlist"
                                        : `/dashboard/${UserId}/wishlist`
                                }
                                className="
                  group
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-300
                  hover:bg-black/[0.06]
                "
                                aria-label="Wishlist"
                            >
                                <img
                                    src={wishlist}
                                    alt=""
                                    className="
                    h-[16px]
                    w-[16px]
                    object-contain
                    brightness-0
                    opacity-50
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                                />

                                {wishlistCount > 0 && (
                                    <span
                                        className="
                      absolute
                      right-0
                      top-0
                      flex
                      h-[16px]
                      min-w-[16px]
                      items-center
                      justify-center
                      rounded-full
                      bg-black
                      px-1
                      text-[8px]
                      font-bold
                      text-white
                    "
                                    >
                                        {wishlistCount}
                                    </span>
                                )}
                            </NavLink>

                            {isWishList && (
                                <WishListDropDown />
                            )}
                        </div>

                        {/* Cart */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCart(!isCart);
                                    setIsSearchOpen(false);
                                    setIsWishList(false);
                                    setIsOpen(false);
                                }}
                                className="
                  group
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  transition-all
                  duration-300
                  hover:bg-black/[0.06]
                "
                                aria-label="Shopping cart"
                            >
                                <img
                                    src={cartimg}
                                    alt=""
                                    className="
                    h-[17px]
                    w-[17px]
                    object-contain
                    brightness-0
                    opacity-50
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                                />

                                {cartCount > 0 && (
                                    <span
                                        className="
                      absolute
                      right-0
                      top-0
                      flex
                      h-[16px]
                      min-w-[16px]
                      items-center
                      justify-center
                      rounded-full
                      bg-black
                      px-1
                      text-[8px]
                      font-bold
                      text-white
                    "
                                    >
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                        </div>

                        {/* Profile */}
                        <div
                            ref={profileRef}
                            className="relative ml-1"
                            onMouseEnter={() =>
                                setIsOpen(true)
                            }
                            onMouseLeave={() =>
                                setIsOpen(false)
                            }
                        >
                            <button
                                type="button"
                                className="
                  group
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  p-0.5
                  transition-all
                  duration-300
                  hover:bg-black/[0.05]
                "
                                aria-label="Account menu"
                            >
                                <img
                                    src={getAvatarUrl(ImageURl)}
                                    onError={handleAvatarError}
                                    alt="User profile"
                                    className="
                    h-8
                    w-8
                    rounded-full
                    bg-slate-100
                    object-cover
                    ring-1
                    ring-black/[0.07]
                    transition-all
                    duration-300
                    group-hover:ring-black/20
                  "
                                />

                                <img
                                    src={dropdown}
                                    alt=""
                                    className={`
                    hidden
                    h-2
                    w-2
                    brightness-0
                    opacity-30
                    transition-transform
                    duration-300
                    sm:block
                    ${isOpen
                                            ? "rotate-180"
                                            : ""
                                        }
                  `}
                                />
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -6,
                                            scale: 0.98,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -6,
                                            scale: 0.98,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="
                      absolute
                      right-0
                      top-full
                      mt-3
                      w-52
                      overflow-hidden
                      rounded-2xl
                      border
                      border-black/[0.07]
                      bg-[#f7f7f5]/95
                      p-2
                      shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                      backdrop-blur-2xl
                    "
                                    >
                                        {UserId && (
                                            <NavLink
                                                to="profile"
                                                className="
                          block
                          rounded-xl
                          px-3
                          py-2.5
                          text-sm
                          font-medium
                          text-black/55
                          transition-all
                          duration-200
                          hover:bg-black
                          hover:text-white
                        "
                                            >
                                                Profile
                                            </NavLink>
                                        )}

                                        <div className="my-1 border-t border-black/[0.07]" />

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="
                        w-full
                        rounded-xl
                        px-3
                        py-2.5
                        text-left
                        text-sm
                        font-medium
                        text-black/55
                        transition-all
                        duration-200
                        hover:bg-black
                        hover:text-white
                      "
                                        >
                                            {UserId === undefined
                                                ? "Login"
                                                : "Logout"}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile menu */}
                        <button
                            type="button"
                            onClick={() =>
                                setIsMobileMenuOpen(
                                    !isMobileMenuOpen
                                )
                            }
                            className="
                ml-1
                flex
                h-9
                w-9
                flex-col
                items-center
                justify-center
                gap-1.5
                rounded-full
                border
                border-black/[0.07]
                transition-all
                duration-300
                hover:border-black/20
                hover:bg-black/[0.04]
                lg:hidden
              "
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span
                                className={`
                  h-px
                  w-4
                  bg-black
                  transition-transform
                  duration-300
                  ${isMobileMenuOpen
                                        ? "translate-y-[3px] rotate-45"
                                        : ""
                                    }
                `}
                            />

                            <span
                                className={`
                  h-px
                  w-4
                  bg-black
                  transition-opacity
                  duration-300
                  ${isMobileMenuOpen
                                        ? "opacity-0"
                                        : ""
                                    }
                `}
                            />

                            <span
                                className={`
                  h-px
                  w-4
                  bg-black
                  transition-transform
                  duration-300
                  ${isMobileMenuOpen
                                        ? "-translate-y-[3px] -rotate-45"
                                        : ""
                                    }
                `}
                            />
                        </button>
                    </div>
                </motion.div>

                {/* ================================================== */}
                {/* MOBILE NAVIGATION                                  */}
                {/* ================================================== */}

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                height: 0,
                                y: -8,
                            }}
                            animate={{
                                opacity: 1,
                                height: "auto",
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                height: 0,
                                y: -8,
                            }}
                            transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="
                mx-auto
                mt-3
                w-full
                max-w-[1500px]
                overflow-hidden
                rounded-3xl
                border
                border-black/[0.07]
                bg-[#f7f7f5]/95
                shadow-[0_20px_50px_rgba(0,0,0,0.1)]
                backdrop-blur-2xl
                lg:hidden
              "
                        >
                            <div className="p-3">

                                {/* Home */}
                                <NavLink
                                    to={homePath}
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) =>
                                        `
                      block
                      rounded-2xl
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      transition-all
                      duration-300
                      ${isActive
                                            ? "bg-black text-white"
                                            : "text-black/55 hover:bg-black/[0.05] hover:text-black"
                                        }
                    `
                                    }
                                >
                                    Home
                                </NavLink>

                                {/* Categories */}
                                <div className="px-4 pb-1 pt-5">
                                    <span
                                        className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.28em]
                      text-black/25
                    "
                                    >
                                        Categories
                                    </span>
                                </div>

                                <div className="space-y-0.5">
                                    {(Array.isArray(categories)
                                        ? categories
                                        : []
                                    ).map((category: any) => (
                                        <NavLink
                                            key={category.CategoryId}
                                            to={`Category/${category.CategoryId}`}
                                            onClick={closeMobileMenu}
                                            className="
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        px-4
                        py-2.5
                        text-sm
                        text-black/50
                        transition-all
                        duration-200
                        hover:bg-black/[0.05]
                        hover:text-black
                      "
                                        >
                                            {category.CategoryName}

                                            <span className="text-black/20">
                                                ↗
                                            </span>
                                        </NavLink>
                                    ))}
                                </div>

                                {/* About */}
                                <NavLink
                                    to="aboutus"
                                    onClick={closeMobileMenu}
                                    className="
                    mt-2
                    block
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-black/55
                    transition-all
                    duration-300
                    hover:bg-black
                    hover:text-white
                  "
                                >
                                    About Us
                                </NavLink>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            <AnimatePresence>
                {isCart && <CartDropDown />}
            </AnimatePresence>
        </>
    );
};