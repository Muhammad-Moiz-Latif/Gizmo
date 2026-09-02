"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../state/store"
import type { RootState } from "../state/store"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { addToCartAsync, updateCartAsync } from "../state/features/cartSlice"
import { ChevronLeft, ChevronRight, Plus, Minus, ShoppingBag, Heart, Check, Truck, Shield, ArrowUpRight } from "lucide-react"
import toast from "react-hot-toast"
import { addToWishlistAsync, deleteFromWishListAsync } from "../state/features/wishSlice"
import { updateLocalCart, addCartItemtoLocalStorage, updateLocalCartItem } from "@/state/features/localcartSlice"
import { updateLocalStorage, addtoLocalStorage, removefromLocalStorage } from "@/state/features/localwishSlice"
import { ProductDetailSkeleton } from "../components/ProductDetailSkeleton"

export const ProductPage: React.FC = () => {
    const { DeviceId, UserId } = useParams()
    const devices = useSelector((state: RootState) => state.device.devices)
    const devicesLoading = useSelector((state: RootState) => state.device.isLoading)
    const devicesFetched = useSelector((state: RootState) => state.device.hasFetched)
    const wishlist = useSelector((state: RootState) => state.wishList.list)
    const localWishList = useSelector((state: RootState) => state.localWishList.list)
    const Cart = useSelector((state: RootState) => state.cart.list)
    const localCart = useSelector((state: RootState) => state.localCart.list)
    const devicesArray = Array.isArray(devices) ? devices : []
    const device = devicesArray.find((d) => d.DeviceId === DeviceId)
    const cart = device ? Cart.find((item) => item.DeviceId === device.DeviceId) : undefined
    const localcart = device ? localCart.find((item) => item.deviceId == DeviceId) : undefined
    const dispatch = useDispatch<AppDispatch>()
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
        if (devicesLoading || !devicesFetched) return <ProductDetailSkeleton />
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-[#f7f7f5] text-center">
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/30">Gizmo</span>
                <p className="text-2xl font-semibold tracking-[-0.03em] text-black/70">Device not found</p>
                <p className="text-sm text-black/40">This listing may have been removed or the link is incorrect.</p>
            </div>
        )
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
                toast.success("Item added to cart")
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
                toast.success("Item added to cart")
            }
        }
    }

    const wishlisted = (UserId == undefined ? localWishList : wishlist).some((item) => item === device.DeviceId)
    const quantity = UserId == undefined ? localcart?.quantity || 0 : cart?.Quantity || 0
    const canDecrement = UserId == undefined ? !!localcart && localcart.quantity > 1 : !!cart && cart.Quantity > 1

    return (
        <div className="relative min-h-screen bg-[#f7f7f5] font-roboto text-black">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]" />
                <div className="absolute left-1/2 top-[10%] -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-[-0.08em] text-black/[0.02]">
                    GIZMO
                </div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-8 sm:pt-28 lg:px-14 xl:px-20">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/35">
                    <span className="cursor-pointer transition-colors hover:text-black">Home</span>
                    <span className="text-black/20">/</span>
                    <span className="cursor-pointer transition-colors hover:text-black">{device.Brand}</span>
                    <span className="text-black/20">/</span>
                    <span className="text-black">{device.Model}</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
                >
                    {/* =================================================
                        IMAGE GALLERY
                    ================================================= */}
                    <div>
                        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-black/[0.06] bg-[#fafaf9]">
                            <img
                                src={device.Images[currentImageIndex] || "/placeholder.svg"}
                                alt={device.DeviceName}
                                className="h-full w-full object-contain p-10 transition-transform duration-700 ease-out hover:scale-105"
                            />

                            <button
                                onClick={prevImage}
                                className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/85 text-black shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-black hover:text-white"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/85 text-black shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-black hover:text-white"
                                aria-label="Next image"
                            >
                                <ChevronRight size={18} />
                            </button>

                            <div className="absolute bottom-5 right-5 rounded-full border border-black/5 bg-white/85 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-black/60 backdrop-blur-md">
                                {String(currentImageIndex + 1).padStart(2, "0")} / {String(device.Images.length).padStart(2, "0")}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="mt-4 flex gap-3 overflow-x-auto py-1">
                            {device.Images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl transition-all duration-300 ${index === currentImageIndex
                                        ? "ring-2 ring-black ring-offset-2 ring-offset-[#f7f7f5]"
                                        : "border border-black/10 opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <img
                                        src={img || "/placeholder.svg"}
                                        alt={`${device.DeviceName} thumbnail ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* =================================================
                        PRODUCT INFO
                    ================================================= */}
                    <div className="flex flex-col">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                                {device.Brand}
                            </span>
                            <button
                                onClick={() => toggleWishlist(device.DeviceId)}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white/85 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white"
                                aria-label="Add to wishlist"
                            >
                                <Heart className={`h-4.5 w-4.5 transition-colors duration-300 ${wishlisted ? "fill-red-500 text-red-500" : "text-black/35"}`} />
                            </button>
                        </div>

                        <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl">
                            {device.DeviceName}
                        </h1>
                        <p className="mt-2 text-sm text-black/40">{device.Model}</p>

                        {/* Price */}
                        <div className="mt-6 flex flex-wrap items-baseline gap-3">
                            <span className="text-4xl font-bold tracking-[-0.04em]">${device.Price.toFixed(2)}</span>
                            {device.Price > 1000 && (
                                <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/50">
                                    Free shipping
                                </span>
                            )}
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-emerald-700">
                            <Check size={15} />
                            <span className="text-[13px] font-medium">In stock</span>
                        </div>

                        {/* Description */}
                        <div className="mt-7 rounded-[2rem] border border-black/[0.06] bg-white p-6">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">About this item</span>
                            <p className="mt-3 text-sm leading-6 text-black/55">{device.Description}</p>
                        </div>

                        {/* Benefits */}
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4">
                                <Truck className="text-black/50" size={18} />
                                <span className="text-[13px] font-medium text-black/70">Fast delivery</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4">
                                <Shield className="text-black/50" size={18} />
                                <span className="text-[13px] font-medium text-black/70">1 year warranty</span>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mt-7">
                            <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">Quantity</span>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        if (canDecrement) toggleDecrementCart(device.DeviceId)
                                    }}
                                    disabled={!canDecrement}
                                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${canDecrement
                                        ? "border-black/10 bg-white hover:bg-black hover:text-white"
                                        : "cursor-not-allowed border-black/5 bg-black/[0.02] text-black/20"
                                        }`}
                                >
                                    <Minus size={15} />
                                </button>
                                <div className="min-w-[48px] text-center text-lg font-semibold tracking-[-0.02em]">{quantity}</div>
                                <button
                                    onClick={() => toggleIncrementCart(device.DeviceId)}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:bg-black hover:text-white"
                                >
                                    <Plus size={15} />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                className="group flex h-14 flex-1 items-center justify-center gap-2.5 rounded-full bg-black text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
                                onClick={() => addCart(device.DeviceId)}
                            >
                                <ShoppingBag size={17} />
                                Add to bag
                            </button>
                            <button className="group flex h-14 flex-1 items-center justify-center gap-2 rounded-full border border-black/15 bg-white text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:border-black/30">
                                Buy now
                                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* =====================================================
                    SPECIFICATIONS
                ===================================================== */}
                <div className="mt-20">
                    <div className="mb-8 flex items-center gap-3">
                        <span className="h-px w-8 bg-black/25" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">Details</span>
                    </div>
                    <h2 className="mb-10 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                        Full <span className="font-light italic text-black/35">specifications.</span>
                    </h2>

                    {/* Category filter */}
                    <div className="mb-8 flex flex-wrap gap-2.5">
                        {Object.keys(groupedSpecs).map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveSpec(activeSpec === category ? null : category)}
                                className={`rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${activeSpec === category
                                    ? "bg-black text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
                                    : "border border-black/10 bg-white text-black/60 hover:border-black/25 hover:text-black"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(groupedSpecs).map(([category, specs], groupIndex) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: groupIndex * 0.06 }}
                                className={`transition-opacity duration-300 ${activeSpec && activeSpec !== category ? "opacity-40" : ""}`}
                            >
                                <h3 className="mb-4 border-b border-black/[0.07] pb-3 text-sm font-semibold uppercase tracking-[0.15em] text-black/50">
                                    {category}
                                </h3>
                                <div className="space-y-3">
                                    {specs.map(({ key, value }, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-black/[0.06] bg-white p-4 transition-shadow duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)]"
                                        >
                                            <h4 className="mb-1.5 text-[13px] font-medium capitalize text-black/45">
                                                {key.replace(/_/g, " ").replace(category, "").trim()}
                                            </h4>
                                            <p className="break-words text-[15px] text-black">
                                                {typeof value === "object" ? JSON.stringify(value, null, 2) : value.toString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom signature */}
                <div className="mt-16 flex items-center justify-between border-t border-black/[0.07] pt-5">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-black/30">Gizmo / Product details</span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-black/25">SKU / {device.DeviceId}</span>
                </div>
            </div>
        </div>
    )
}