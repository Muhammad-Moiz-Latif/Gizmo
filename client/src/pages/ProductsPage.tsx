"use client"

import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../state/store"
import { useParams, useNavigate } from "react-router-dom"
import { Heart, ShoppingCart } from "lucide-react"
import { addToWishlistAsync, deleteFromWishListAsync } from "../state/features/wishSlice"
import bg from "../assets/fabian-albert-wJ_clVY0K-A-unsplash.jpg"
import { addToCartAsync, updateCartAsync } from "../state/features/cartSlice"
import toast from "react-hot-toast"
import { updateLocalCart, addCartItemtoLocalStorage, updateLocalCartItem } from "@/state/features/localcartSlice"
import { updateLocalStorage, addtoLocalStorage, removefromLocalStorage } from "@/state/features/localwishSlice"

export const ProductsPage: React.FC = () => {
    const { CategoryId, UserId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Redux state for devices and categories
    const devices = useSelector((state: RootState) => state.device.devices)
    const categories = useSelector((state: RootState) => state.category.categories)
    const wishlist = useSelector((state: RootState) => state.wishList.list)
    const localWishList = useSelector((state: RootState) => state.localWishList.list);
    const cart = useSelector((state: RootState) => state.cart.list)
    const localCart = useSelector((state: RootState) => state.localCart.list)

    // Filter devices based on the selected category
    //@ts-ignore
    const filteredDevices = CategoryId === "all" ? devices : devices.filter((device) => device.categoryid === CategoryId)

    // Function to update the categoryId in the URL without reloading the page
    const changeCategory = (categoryId: string) => {
        if (UserId == undefined) {
            navigate(`/dashboard/Category/${categoryId}`)
        } else {
            navigate(`/dashboard/${UserId}/Category/${categoryId}`)
        }
    }

    const toggleWishlist = (deviceId: string) => {
        const isInReduxWishlist = wishlist.some(item => item === deviceId);
        const isInLocalReduxWishlist = localWishList.some(item => item === deviceId);
        if (UserId == undefined) {
            if (isInLocalReduxWishlist) {
                //@ts-ignore
                dispatch(removefromLocalStorage(deviceId));
                dispatch(updateLocalStorage())
            } else {
                //@ts-ignore
                dispatch(addtoLocalStorage(deviceId));
                dispatch(updateLocalStorage());
            }
        } else {
            if (isInReduxWishlist) {
                //@ts-ignore
                dispatch(deleteFromWishListAsync({ productId: deviceId, UserId }));
            } else {
                //@ts-ignore
                dispatch(addToWishlistAsync({ productId: deviceId, UserId }));
            }
        }

    };


    const toggleCart = (deviceId: string) => {
        if (UserId == undefined) {
            const cartItem = localCart.find((item) => item.deviceId === deviceId);
            if (cartItem) {
                //@ts-ignore
                dispatch(updateLocalCartItem({ deviceId: deviceId, quantity: cartItem.quantity }))
                dispatch(updateLocalCart());
                toast.success('Cart Updated');
            } else {
                //@ts-ignore
                dispatch(addCartItemtoLocalStorage({ deviceId: deviceId }))
                dispatch(updateLocalCart());
                toast.success('Item added to Cart')

            }
        } else {
            const cartItem = cart.find((item) => item.DeviceId === deviceId);
            if (cartItem) {
                //@ts-ignore
                dispatch(updateCartAsync({ UserId, Quantity: cartItem.Quantity + 1, DeviceId: deviceId }));
                toast.success('Cart Updated');
            } else {
                //@ts-ignore
                dispatch(addToCartAsync({ UserId, Quantity: 1, DeviceId: deviceId }));
                toast.success('Item added to Cart')
            }
        }
    };

    return (
        <div className="font-roboto">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-b from-black to-gray-800 text-white py-20 px-4">
                <img
                    src={bg || "/placeholder.svg"}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-wide text-white animate-pulse">
                        Discover Tech at Its Best
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
                        Shop gadgets, laptops, and accessories with a sleek, modern touch.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Category Selection */}
                <div className="mb-12 text-center">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {/* All Devices Button */}
                        <button
                            onClick={() => changeCategory("all")}
                            className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-transform transform duration-300 ease-in-out border ${CategoryId === "all"
                                ? "bg-gradient-to-r from-black to-gray-800 text-white border-white shadow-lg scale-110"
                                : "bg-white text-black hover:bg-gray-100 border-black"
                                }`}
                        >
                            All Devices
                        </button>

                        {/* Category Buttons */}
                        {categories.map((category: any) => (
                            <button
                                //@ts-ignore
                                onClick={() => changeCategory(category.CategoryId)}
                                //@ts-ignore
                                key={category.CategoryId}
                                //@ts-ignore
                                className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-transform transform duration-300 ease-in-out border ${category.CategoryId === CategoryId
                                    ? "bg-gradient-to-r from-black to-gray-800 text-white border-white shadow-lg scale-110"
                                    : "bg-white text-black hover:bg-gray-100 border-black"
                                    }`}
                            >
                                {category.CategoryName}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                {filteredDevices.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {filteredDevices.map((device) => (
                            <div
                                key={device.DeviceId}
                                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col justify-between group border-[1px] border-gray-200 "
                            >
                                {/* Image Section */}
                                <div
                                    className="relative cursor-pointer h-64"
                                    onClick={() =>
                                        UserId == undefined
                                            ? navigate(`/dashboard/Device/${device.DeviceId}`)
                                            : navigate(`/dashboard/${UserId}/Device/${device.DeviceId}`)
                                    }
                                >
                                    <img
                                        src={device.Images[1] || "/placeholder.svg"}
                                        alt={device.DeviceName}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleWishlist(device.DeviceId)
                                        }}
                                        className="absolute top-4 right-4 z-30 p-2 rounded-full shadow-md hover:shadow-lg transition-all"
                                    >
                                        <Heart
                                            className={`w-6 h-6 transition-colors duration-300 ${((UserId == undefined) ? localWishList : wishlist).some(item => item === device.DeviceId)
                                                ? 'fill-red-500 text-red-500'
                                                : 'text-gray-700'
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* Content Section */}
                                <div className="px-6 pt-2 pb-3 flex flex-col bg-ghost_white-700">
                                    {/* Title and Price */}
                                    <h1 className="text-lg font-normal text-black">${device.Price.toFixed(2)}</h1>
                                    <h2 className="text-lg font-semibold text-black tracking-tight group-hover:text-gray-800 transition-colors">
                                        {device.DeviceName}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 mb-6 line-clamp-3">{device.Description}</p>

                                    {/* Add to Cart Button */}
                                    <button
                                        className="mt-auto px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white rounded-md text-sm hover:opacity-90 transition-opacity flex items-center justify-center shadow-md"
                                        aria-label="Add to cart"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleCart(device.DeviceId)
                                        }}
                                    >
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-8">No products available in this category.</p>
                )}

                {/* Pagination (simplified) */}
                <div className="mt-10 flex justify-center gap-4">
                    <button className="w-28 py-2 bg-gradient-to-r from-black to-gray-800 text-white rounded-lg hover:opacity-90 transition-opacity">
                        Previous
                    </button>
                    <button className="w-28 py-2 bg-gradient-to-r from-black to-gray-800 text-white rounded-lg hover:opacity-90 transition-opacity">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

