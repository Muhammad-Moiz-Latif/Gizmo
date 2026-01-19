"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../state/store"
import { useParams } from "react-router-dom"
import { addToCartAsync, updateCartAsync } from "../state/features/cartSlice"
import { ChevronLeft, ChevronRight, Plus, Minus, ShoppingCart, Heart, Check, Truck, Shield } from "lucide-react"
import toast from "react-hot-toast"
import { addToWishlistAsync, deleteFromWishListAsync } from "../state/features/wishSlice"
import { updateLocalCart, addCartItemtoLocalStorage, updateLocalCartItem } from "@/state/features/localcartSlice"
import { updateLocalStorage, addtoLocalStorage, removefromLocalStorage } from "@/state/features/localwishSlice"

export const ProductPage: React.FC = () => {
    const { DeviceId, UserId } = useParams()
    const devices = useSelector((state: RootState) => state.device.devices)
    const wishlist = useSelector((state: RootState) => state.wishList.list)
    const localWishList = useSelector((state: RootState) => state.localWishList.list)
    const Cart = useSelector((state: RootState) => state.cart.list)
    const localCart = useSelector((state: RootState) => state.localCart.list)
    const devicesArray = Array.isArray(devices) ? devices : []
    const device = devicesArray.find((d) => d.DeviceId === DeviceId)
    const cart = device ? Cart.find((item) => item.DeviceId === device.DeviceId) : undefined
    const localcart = device ? localCart.find((item) => item.deviceId == DeviceId) : undefined
    const dispatch = useDispatch()
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [activeSpec, setActiveSpec] = useState<string | null>(null)
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    useEffect(() => {
        if (hasMounted) {
            window.scroll(0, 0)
        }
    }, [hasMounted])

    if (!device) {
        return <div className="text-center py-10 text-gray-700">Device not found</div>
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1 >= device.Images.length ? 0 : prevIndex + 1))
    }

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 < 0 ? device.Images.length - 1 : prevIndex - 1))
    }

    function toggleIncrementCart(deviceId: string) {
        if (UserId == undefined) {
            const CartItem = localCart.find((item) => item.deviceId == deviceId);
            if (CartItem) {
                const Quantity = CartItem.quantity + 1;
                dispatch(updateLocalCartItem({ deviceId: deviceId, quantity: Quantity }));
                dispatch(updateLocalCart());
            }
        } else {
            const CartItem = Cart.find((item) => item.DeviceId === deviceId);
            if (CartItem) {
                const Quantity = CartItem.Quantity + 1;

                //@ts-ignore
                dispatch(updateCartAsync({ UserId, Quantity: Quantity, DeviceId: deviceId }));
            }
        }
    };

    function toggleDecrementCart(deviceId: string) {
        if (UserId == undefined) {
            const CartItem = localCart.find((item) => item.deviceId == deviceId);
            if (CartItem) {
                const Quantity = CartItem.quantity - 1;
                dispatch(updateLocalCartItem({ deviceId: deviceId, quantity: Quantity }));
                dispatch(updateLocalCart());
            }
        } else {
            const CartItem = Cart.find((item) => item.DeviceId === deviceId);
            if (CartItem) {
                const Quantity = CartItem.Quantity - 1;

                //@ts-ignore
                dispatch(updateCartAsync({ UserId, Quantity: Quantity, DeviceId: deviceId }));
            }
        }

    }


    // Group specifications by category for better organization
    const groupedSpecs = Object.entries(device.Specifications).reduce(
        (acc, [key, value]) => {
            const category = key.includes("_") ? key.split("_")[0] : "General"
            if (!acc[category]) {
                acc[category] = []
            }
            acc[category].push({ key, value })
            return acc
        },
        {} as Record<string, { key: string; value: any }[]>,
    )

    const toggleWishlist = (deviceId: string) => {
        const isInReduxWishlist = wishlist.some((item) => item === deviceId)
        const isInLocalReduxWishlist = localWishList.some((item) => item === deviceId)
        if (UserId == undefined) {
            if (isInLocalReduxWishlist) {
                //@ts-ignore
                dispatch(removefromLocalStorage(deviceId))
                dispatch(updateLocalStorage())
            } else {
                //@ts-ignore
                dispatch(addtoLocalStorage(deviceId))
                dispatch(updateLocalStorage())
            }
        } else {
            if (isInReduxWishlist) {
                //@ts-ignore
                dispatch(deleteFromWishListAsync({ productId: deviceId, UserId }))
            } else {
                //@ts-ignore
                dispatch(addToWishlistAsync({ productId: deviceId, UserId }))
            }
        }
    }

    function addCart(DeviceId: string) {
        if (UserId == undefined) {
            const cartItem = localCart.find((item) => item.deviceId == DeviceId)
            if (cartItem) {
                dispatch(updateLocalCartItem({ deviceId: DeviceId, quantity: cartItem.quantity + 1 }))
                dispatch(updateLocalCart())
                toast.success("Cart updated")
            } else {
                dispatch(addCartItemtoLocalStorage({ deviceId: DeviceId }))
                dispatch(updateLocalCart())
                toast.success("Item added to Cart")
            }
        } else {
            const cartItem = Cart.find((item) => item.DeviceId === DeviceId)
            if (cartItem) {
                //@ts-ignore
                dispatch(updateCartAsync({ UserId, Quantity: cartItem.Quantity + 1, DeviceId: DeviceId }))
                toast.success("Cart updated")
            } else {
                //@ts-ignore
                dispatch(addToCartAsync({ UserId, Quantity: 1, DeviceId: DeviceId }))
                toast.success("Item added to Cart")
            }
        }
    }

    return (
        <div className="bg-white text-black min-h-screen font-sans pt-16 px-4 sm:px-6 lg:px-16">
            <div className="max-w-7xl mx-auto py-8">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-500">
                    <span className="hover:text-black cursor-pointer">Home</span> /
                    <span className="hover:text-black cursor-pointer"> {device.Brand}</span> /
                    <span className="text-black font-medium"> {device.Model}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="bg-white rounded-xl overflow-hidden">
                        <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-xl border border-gray-100">
                            <img
                                src={device.Images[currentImageIndex] || "/placeholder.svg"}
                                alt={device.DeviceName}
                                className="w-full h-full object-contain p-4 transition-all duration-300 transform hover:scale-105"
                            />

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-200 z-10"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-200 z-10"
                                aria-label="Next image"
                            >
                                <ChevronRight size={20} />
                            </button>

                            {/* Image counter */}
                            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-full">
                                {currentImageIndex + 1} / {device.Images.length}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex mt-4 space-x-3 overflow-x-auto py-2 px-1">
                            {device.Images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${index === currentImageIndex
                                        ? "ring-2 ring-black ring-offset-2 shadow-md"
                                        : "border border-gray-200 opacity-70 hover:opacity-100"
                                        }`}
                                >
                                    <img
                                        src={img || "/placeholder.svg"}
                                        alt={`${device.DeviceName} thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        {/* Brand and badges */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{device.Brand}</div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => toggleWishlist(device.DeviceId)}
                                    className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                                >
                                    <Heart
                                        className={`w-5 h-5 transition-colors duration-300 ${(UserId == undefined ? localWishList : wishlist).some((item) => item === device.DeviceId)
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-700"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Product title */}
                        <h1 className="text-3xl font-bold mb-2">{device.DeviceName}</h1>
                        <p className="text-gray-600 mb-4">{device.Model}</p>

                        {/* Price */}
                        <div className="mb-6 flex items-baseline">
                            <p className="text-4xl font-bold mr-3">${device.Price.toFixed(2)}</p>
                            {device.Price > 1000 && (
                                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Free shipping</span>
                            )}
                        </div>

                        {/* Availability */}
                        <div className="flex items-center mb-6 text-green-600">
                            <Check size={18} className="mr-2" />
                            <span>In Stock</span>
                        </div>

                        {/* Description */}
                        <div className="mb-6 bg-gray-50 p-4 rounded-lg border-l-4 border-gray-200">
                            <h2 className="text-xl font-semibold mb-2">About this item</h2>
                            <p className="text-gray-700 leading-relaxed">{device.Description}</p>
                        </div>

                        {/* Benefits */}
                        <div className="mb-6 grid grid-cols-2 gap-3">
                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <Truck className="text-gray-700 mr-3" size={20} />
                                <span className="text-sm">Fast Delivery</span>
                            </div>
                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <Shield className="text-gray-700 mr-3" size={20} />
                                <span className="text-sm">1 Year Warranty</span>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-3">Quantity</h2>
                            <div className="flex items-center">
                                <button
                                    onClick={() => {
                                        if (UserId == undefined ? localcart && localcart.quantity > 1 : cart && cart.Quantity > 1) {
                                            toggleDecrementCart(device.DeviceId)
                                        }
                                    }}
                                    disabled={UserId == undefined ? !localcart || localcart.quantity <= 1 : !cart || cart.Quantity <= 1}
                                    className={`p-3 border border-gray-300 rounded-l-md ${UserId == undefined
                                        ? !localcart || localcart.quantity <= 1
                                        : (!cart || cart.Quantity <= 1)
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-white hover:bg-gray-100"
                                        }`}
                                >
                                    <Minus size={16} />
                                </button>
                                <div className="px-6 py-3 border-t border-b border-gray-300 min-w-[60px] text-center font-medium">
                                    {UserId == undefined ? localcart?.quantity || 0 : cart?.Quantity || 0}
                                </div>
                                <button
                                    onClick={() => toggleIncrementCart(device.DeviceId)}
                                    className="p-3 border border-gray-300 rounded-r-md bg-white hover:bg-gray-100"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                            <button
                                className="flex-1 bg-black text-white py-4 px-6 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                                onClick={() => addCart(device.DeviceId)}
                            >
                                <ShoppingCart size={20} className="mr-2" />
                                <span className="font-medium">Add to Cart</span>
                            </button>
                            <button className="flex-1 bg-white text-black py-4 px-6 rounded-lg border-2 border-black hover:bg-gray-50 transition-all duration-300 font-medium shadow-sm hover:shadow-md">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Specifications */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200 flex items-center">
                        <span className="bg-black text-white w-8 h-8 inline-flex items-center justify-center rounded-full mr-3 text-sm">
                            S
                        </span>
                        Specifications
                    </h2>

                    {/* Spec categories */}
                    <div className="mb-8 flex flex-wrap gap-3">
                        {Object.keys(groupedSpecs).map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveSpec(activeSpec === category ? null : category)}
                                className={`px-4 py-2 rounded-full transition-all ${activeSpec === category ? "bg-black text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(groupedSpecs).map(([category, specs]) => (
                            <div
                                key={category}
                                className={`transition-all duration-300 ${activeSpec && activeSpec !== category ? "opacity-50" : ""}`}
                            >
                                <h3 className="text-lg font-bold mb-4 capitalize text-gray-800 border-b border-gray-200 pb-2">
                                    {category}
                                </h3>
                                <div className="space-y-4">
                                    {specs.map(({ key, value }, index) => (
                                        <div
                                            key={index}
                                            className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                                        >
                                            <h4 className="text-base font-medium capitalize mb-2 text-gray-800">
                                                {key.replace(/_/g, " ").replace(category, "").trim()}
                                            </h4>
                                            <p className="text-gray-700 break-words">
                                                {typeof value === "object" ? JSON.stringify(value, null, 2) : value.toString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

