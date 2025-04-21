"use client"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../state/store"
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react"
import { addToWishlistAsync, deleteFromWishListAsync, setWishListAsync } from "../state/features/wishSlice"
import { useNavigate, useParams } from "react-router-dom"
import { addToCartAsync, setCartAsync, updateCartAsync } from "../state/features/cartSlice"
import { addtoLocalStorage, removefromLocalStorage, updateLocalStorage } from "../state/features/localwishSlice"
import { addCartItemtoLocalStorage, updateLocalCart, updateLocalCartItem } from "../state/features/localcartSlice"
import toast from "react-hot-toast"

export const FeaturedProducts: React.FC = () => {
  const { UserId } = useParams()
  const dispatch = useDispatch()
  const allDevices = useSelector((state: RootState) => state.device.devices)
  const wishlist = useSelector((state: RootState) => state.wishList.list)
  const localWishList = useSelector((state: RootState) => state.localWishList.list)
  const cart = useSelector((state: RootState) => state.cart.list)
  const localCart = useSelector((state: RootState) => state.localCart.list)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  // Track screen size for responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) // 768px is typical md breakpoint
    }

    // Check on initial load
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const featuredDevices = React.useMemo(() => {
    const uniqueBrands = new Set()
    return allDevices
      .filter((device) => {
        if (uniqueBrands.size < 5 && !uniqueBrands.has(device.Brand)) {
          uniqueBrands.add(device.Brand)
          return true
        }
        return false
      })
      .slice(0, 5)
  }, [allDevices])

  // Number of products to show at once based on screen size
  const productsToShow = isMobile ? 1 : 3

  // Calculate the maximum valid index based on the number of products to show at once
  const maxIndex = Math.max(0, featuredDevices.length - productsToShow)

  const nextSlide = () => {
    if (!isAnimating && currentIndex < maxIndex) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const prevSlide = () => {
    if (!isAnimating && currentIndex > 0) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

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

  const toggleCart = (deviceId: string) => {
    if (UserId == undefined) {
      const cartItem = localCart.find((item) => item.deviceId === deviceId)
      if (cartItem) {
        //@ts-ignore
        dispatch(updateLocalCartItem({ deviceId: deviceId, quantity: cartItem.quantity + 1 }))
        dispatch(updateLocalCart())
        toast.success("Cart updated")
      } else {
        //@ts-ignore
        dispatch(addCartItemtoLocalStorage({ deviceId: deviceId }))
        dispatch(updateLocalCart())
        toast.success("Item added to Cart")
      }
    } else {
      const cartItem = cart.find((item) => item.DeviceId === deviceId)
      if (cartItem) {
        //@ts-ignore
        dispatch(updateCartAsync({ UserId, Quantity: cartItem.Quantity + 1, DeviceId: deviceId }))
        toast.success("Cart updated")
      } else {
        //@ts-ignore
        dispatch(addToCartAsync({ UserId, Quantity: 1, DeviceId: deviceId }))
        toast.success("Item added to Cart")
      }
    }
  }

  useEffect(() => {
    //@ts-ignore
    dispatch(setWishListAsync({ UserId }))
    //@ts-ignore
    dispatch(setCartAsync({ UserId }))
  }, [dispatch, UserId])

  return (
    <section className="h-screen lg:h-[34rem] mb-8 w-full bg-black text-white relative overflow-hidden flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black opacity-90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full relative">
        <h2 className="text-4xl lg:text-3xl font-bold text-center mt-20 lg:mt-10 mb-4 lg:mb-3">Featured Products</h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / productsToShow)}%)` }}
            >
              {featuredDevices.map((device: any, index) => (
                <div key={index} className={`${isMobile ? "w-full" : "w-1/3"} flex-shrink-0 px-2 md:px-3`}>
                  <div className="w-full mx-auto rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 bg-gradient-to-b from-gray-900 to-black mb-10">
                    <div className="relative group bg-white">
                      <img
                        src={device.Images[1] || "/placeholder.svg"}
                        alt={device.DeviceName}
                        onClick={() => navigate(`Device/${device.DeviceId}`)}
                        className={`w-full ${isMobile ? "h-60" : "h-40 md:h-48"} object-contain transition-all duration-500 transform group-hover:scale-105 cursor-pointer p-4`}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(device.DeviceId)
                        }}
                        className="absolute top-4 right-4 p-2 md:p-3 rounded-full bg-black/10 hover:bg-black/20 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                      >
                        <Heart
                          className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                            (UserId == undefined ? localWishList : wishlist).some((item) => item === device.DeviceId)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-700"
                          }`}
                        />
                      </button>
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-500 to-transparent" />
                    </div>

                    <div className="p-4 md:p-6">
                      <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                        <h3
                          className={`${isMobile ? "text-2xl" : "text-lg md:text-xl"} font-bold text-white line-clamp-1`}
                        >
                          {device.DeviceName}
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base">
                          {device.Brand} {device.Model}
                        </p>
                        <p className={`${isMobile ? "text-3xl" : "text-xl md:text-2xl"} font-bold text-white`}>
                          ${device.Price.toFixed(2)}
                        </p>
                        <button
                          onClick={() => toggleCart(device.DeviceId)}
                          className={`w-full ${isMobile ? "py-4 text-base" : "py-2 md:py-3 text-sm md:text-base"} mt-1 bg-white text-black rounded-xl flex items-center justify-center space-x-2 font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95`}
                        >
                          <ShoppingBag className={`${isMobile ? "w-5 h-5" : "w-4 h-4 md:w-5 md:h-5"}`} />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            disabled={isAnimating || currentIndex === 0}
            className="absolute -left-1 top-1/2 transform -translate-y-1/2 bg-white/10 text-white p-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating || currentIndex >= maxIndex}
            className="absolute -right-1 top-1/2 transform -translate-y-1/2 bg-white/10 text-white p-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => !isAnimating && setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
