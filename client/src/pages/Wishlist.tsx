"use client"

import type React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../state/store"
import type { RootState } from "../state/store"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Trash2, ArrowLeft, ArrowUpRight } from "lucide-react"
import { deleteFromWishListAsync } from "../state/features/wishSlice"
import { removefromLocalStorage, updateLocalStorage } from "@/state/features/localwishSlice"
import { addToCartAsync, updateCartAsync } from "../state/features/cartSlice"
import { addCartItemtoLocalStorage, updateLocalCart, updateLocalCartItem } from "@/state/features/localcartSlice"
import toast from "react-hot-toast"
import { Skeleton } from "../components/Skeleton"

export const WishlistPage: React.FC = () => {
  const { UserId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  // Get data from Redux store
  const allDevices = useSelector((state: RootState) => state.device.devices)
  const devicesLoading = useSelector((state: RootState) => state.device.isLoading)
  const devicesFetched = useSelector((state: RootState) => state.device.hasFetched)
  const wishlist = useSelector((state: RootState) => state.wishList.list)
  const localWishList = useSelector((state: RootState) => state.localWishList.list)
  const cart = useSelector((state: RootState) => state.cart.list);
  const localCart = useSelector((state: RootState) => state.localCart.list);

  // Determine which wishlist to use based on whether user is logged in
  const activeWishlist = UserId ? wishlist : localWishList

  // Filter devices to only include those in the active wishlist
  const allDevicesArray = Array.isArray(allDevices) ? allDevices : []
  const wishlistItems = allDevicesArray.filter((device) => activeWishlist.includes(device.DeviceId))

  // Handle removing item from wishlist
  const removeFromWishlist = (deviceId: string) => {
    if (UserId) {
      // For logged-in users
      //@ts-ignore
      dispatch(deleteFromWishListAsync({ productId: deviceId, UserId }))
      toast.success("Item removed from wishlist")
    } else {
      // For non-logged-in users
      dispatch(removefromLocalStorage(deviceId))
      dispatch(updateLocalStorage())
      toast.success("Item removed from wishlist")
    }
  }

  // Handle adding item to cart
  const addToCart = (deviceId: string) => {
    if (UserId == undefined) {
      const cartItem = localCart.find((item) => item.deviceId === deviceId);
      if (cartItem) {
        //@ts-ignore
        dispatch(updateLocalCartItem({ deviceId: deviceId, quantity: cartItem.quantity + 1 }))
        dispatch(updateLocalCart());
        toast.success("Cart updated")
      } else {
        //@ts-ignore
        dispatch(addCartItemtoLocalStorage({ deviceId: deviceId }))
        dispatch(updateLocalCart());
        toast.success("Item added to Cart")
      }
    } else {
      const cartItem = cart.find((item) => item.DeviceId === deviceId);
      if (cartItem) {
        //@ts-ignore
        dispatch(updateCartAsync({ UserId, Quantity: cartItem.Quantity + 1, DeviceId: deviceId }));
        toast.success("Cart updated")
      } else {
        //@ts-ignore
        dispatch(addToCartAsync({ UserId, Quantity: 1, DeviceId: deviceId }));
        toast.success("Item added to Cart")
      }
    }
  };

  // Navigate to product details
  const viewProductDetails = (deviceId: string) => {
    if (UserId) {
      navigate(`/dashboard/${UserId}/Device/${deviceId}`)
    } else {
      navigate(`/dashboard/Device/${deviceId}`)
    }
  }

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#f7f7f5] font-roboto text-black">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute left-1/2 top-[6%] -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-[-0.08em] text-black/[0.02]">
          GIZMO
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-8 sm:pt-28 lg:px-14 xl:px-20">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate(UserId ? `/dashboard/${UserId}` : "/dashboard")}
            className="mb-6 flex items-center gap-2 text-[13px] font-medium text-black/45 transition-colors hover:text-black"
          >
            <ArrowLeft size={15} />
            Back to shopping
          </button>

          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-black/25" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
            </span>
          </div>

          <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl">
            Your <span className="font-light italic text-black/35">wishlist.</span>
          </h1>
        </div>

        {/* Wishlist Items */}
        {!devicesFetched || devicesLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-96 w-full rounded-[2rem]" />
            ))}
          </div>
        ) : wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((device, index) => (
              <motion.div
                key={device.DeviceId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)]"
              >
                {/* Image */}
                <div
                  className="relative flex h-56 cursor-pointer items-center justify-center overflow-hidden bg-[#fafaf9]"
                  onClick={() => viewProductDetails(device.DeviceId)}
                >
                  <img
                    src={device.Images[0] || "/placeholder.svg"}
                    alt={device.DeviceName}
                    className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromWishlist(device.DeviceId)
                    }}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white/85 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-red-200 hover:bg-red-50"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={15} className="text-black/50 transition-colors" />
                  </button>

                  {device.Condition === "New" && (
                    <div className="absolute left-4 top-4 rounded-full border border-black/5 bg-white/85 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-emerald-700 backdrop-blur-md">
                      New
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/35">
                    {device.Brand}
                  </span>
                  <h2
                    className="mt-1.5 line-clamp-1 cursor-pointer text-lg font-semibold leading-tight tracking-[-0.02em] transition-colors hover:text-black/70"
                    onClick={() => viewProductDetails(device.DeviceId)}
                  >
                    {device.DeviceName}
                  </h2>

                  <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-5 text-black/45">
                    {device.Description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold tracking-[-0.03em]">${device.Price.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => addToCart(device.DeviceId)}
                    className="mt-4 flex h-11 items-center justify-center gap-2 rounded-full bg-black text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
                  >
                    <ShoppingBag size={14} />
                    Add to bag
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-[2rem] border border-black/[0.06] bg-white py-20 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-[#fafaf9]">
              <Heart size={26} className="text-black/30" />
            </div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">Your wishlist is empty</h2>
            <p className="mt-2 max-w-xs text-sm text-black/45">
              Save items you love and find them here anytime.
            </p>
            <button
              onClick={() => navigate(UserId ? `/dashboard/${UserId}` : "/dashboard")}
              className="group mt-6 flex h-12 items-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
            >
              Start shopping
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}