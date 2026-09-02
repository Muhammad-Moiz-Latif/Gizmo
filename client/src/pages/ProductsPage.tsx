"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../state/store"
import type { RootState } from "../state/store"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"
import { addToWishlistAsync, deleteFromWishListAsync } from "../state/features/wishSlice"
import bg from "../assets/fabian-albert-wJ_clVY0K-A-unsplash.jpg"
import { addToCartAsync, updateCartAsync } from "../state/features/cartSlice"
import toast from "react-hot-toast"
import { updateLocalCart, addCartItemtoLocalStorage, updateLocalCartItem } from "@/state/features/localcartSlice"
import { updateLocalStorage, addtoLocalStorage, removefromLocalStorage } from "@/state/features/localwishSlice"
import { ProductCardSkeleton } from "../components/ProductCardSkeleton"

export const ProductsPage: React.FC = () => {
  const { CategoryId, UserId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  // Redux state for devices and categories
  const devices = useSelector((state: RootState) => state.device.devices)
  const devicesLoading = useSelector((state: RootState) => state.device.isLoading)
  const devicesFetched = useSelector((state: RootState) => state.device.hasFetched)
  const categories = useSelector((state: RootState) => state.category.categories)
  const wishlist = useSelector((state: RootState) => state.wishList.list)
  const localWishList = useSelector((state: RootState) => state.localWishList.list)
  const cart = useSelector((state: RootState) => state.cart.list)
  const localCart = useSelector((state: RootState) => state.localCart.list)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const devicesPerPage = 8

  // Filter devices based on the selected category
  const devicesArray = Array.isArray(devices) ? devices : []
  //@ts-ignore
  const filteredDevices = CategoryId === "all" ? devicesArray : devicesArray.filter((device) => device.categoryid === CategoryId)

  const totalPages = Math.ceil(filteredDevices.length / devicesPerPage)

  // Function to update the categoryId in the URL without reloading the page
  const changeCategory = (categoryId: string) => {
    setCurrentPage(1)
    if (UserId == undefined) {
      navigate(`/dashboard/Category/${categoryId}`)
    } else {
      navigate(`/dashboard/${UserId}/Category/${categoryId}`)
    }
  }

  const goToPage = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setTimeout(() => setCurrentPage(page), 150)
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
        dispatch(updateLocalCartItem({ deviceId: deviceId, quantity: cartItem.quantity }))
        dispatch(updateLocalCart())
        toast.success("Cart updated")
      } else {
        //@ts-ignore
        dispatch(addCartItemtoLocalStorage({ deviceId: deviceId }))
        dispatch(updateLocalCart())
        toast.success("Item added to cart")
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
        toast.success("Item added to cart")
      }
    }
  }

  const categoriesArray = Array.isArray(categories) ? categories : []
  //@ts-ignore
  const activeCategoryName =
    CategoryId === "all"
      ? "All devices"
      //@ts-ignore
      : categoriesArray.find((c) => c.CategoryId === CategoryId)?.CategoryName || "Devices"

  return (
    <div className="font-roboto text-black">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative w-full overflow-hidden bg-black py-24 text-white sm:py-28">
        <img src={bg || "/placeholder.svg"} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[20vw] font-black leading-none tracking-[-0.08em] text-white/[0.04]">
          GIZMO
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-8 lg:px-14">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-white/30" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
              {activeCategoryName}
            </span>
            <span className="h-px w-8 bg-white/30" />
          </div>

          <h1 className="mx-auto max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl">
            Technology
            <br />
            <span className="font-light italic text-white/40">worth owning.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-white/45 sm:text-base">
            Shop gadgets, laptops and accessories, curated for people who
            care about the details.
          </p>
        </div>
      </section>

      {/* =====================================================
          BODY
      ===================================================== */}
      <div className="relative bg-[#f7f7f5] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
          {/* -------------------------------------------------
              CATEGORY FILTER
          ------------------------------------------------- */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => changeCategory("all")}
              className={`rounded-full px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${CategoryId === "all"
                  ? "bg-black text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
                  : "border border-black/10 bg-white text-black/60 hover:border-black/25 hover:text-black"
                }`}
            >
              All devices
            </button>

            {categoriesArray.map((category: any) => (
              <button
                onClick={() => changeCategory(category.CategoryId)}
                key={category.CategoryId}
                className={`rounded-full px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${category.CategoryId === CategoryId
                    ? "bg-black text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
                    : "border border-black/10 bg-white text-black/60 hover:border-black/25 hover:text-black"
                  }`}
              >
                {category.CategoryName}
              </button>
            ))}
          </div>

          {/* -------------------------------------------------
              PRODUCT GRID
          ------------------------------------------------- */}
          {!devicesFetched || devicesLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: devicesPerPage }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredDevices.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDevices
                .slice((currentPage - 1) * devicesPerPage, currentPage * devicesPerPage)
                .map((device: any, index: number) => {
                  const wishlisted = (UserId == undefined ? localWishList : wishlist).some(
                    (item) => item === device.DeviceId
                  )

                  return (
                    <motion.div
                      key={device.DeviceId}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: (index % devicesPerPage) * 0.05 }}
                      className="group flex flex-col overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)]"
                    >
                      {/* Image */}
                      <div
                        className="relative flex h-56 cursor-pointer items-center justify-center overflow-hidden bg-[#fafaf9]"
                        onClick={() =>
                          UserId == undefined
                            ? navigate(`/dashboard/Device/${device.DeviceId}`)
                            : navigate(`/dashboard/${UserId}/Device/${device.DeviceId}`)
                        }
                      >
                        <img
                          src={device.Images[0] || "/placeholder.svg"}
                          alt={device.DeviceName}
                          className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleWishlist(device.DeviceId)
                          }}
                          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white/85 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white"
                          aria-label="Add to wishlist"
                        >
                          <Heart
                            className={`h-4 w-4 transition-colors duration-300 ${wishlisted ? "fill-red-500 text-red-500" : "text-black/35"
                              }`}
                          />
                        </button>

                        <div className="absolute left-4 top-4 rounded-full border border-black/5 bg-white/85 px-3 py-1.5 text-[11px] font-semibold tracking-tight text-black backdrop-blur-md">
                          ${device.Price.toFixed(2)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-lg font-semibold leading-tight tracking-[-0.02em] text-black">
                          {device.DeviceName}
                        </h3>

                        <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-5 text-black/45">
                          {device.Description}
                        </p>

                        <button
                          className="group/btn mt-5 flex h-11 items-center justify-center gap-2 rounded-full bg-black text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
                          aria-label="Add to cart"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleCart(device.DeviceId)
                          }}
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          Add to bag
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-[2rem] border border-black/[0.06] bg-white py-20 text-center">
              <p className="text-lg font-medium text-black/70">Nothing here yet</p>
              <p className="text-sm text-black/40">This category doesn't have any devices right now.</p>
            </div>
          )}

          {/* -------------------------------------------------
              PAGINATION
          ------------------------------------------------- */}
          {filteredDevices.length > 0 && totalPages > 1 && (
            <div className="mt-14 flex items-center justify-between border-t border-black/[0.07] pt-6">
              <div className="flex items-baseline gap-1 font-mono text-xs text-black/40">
                <span className="text-xl font-medium text-black">
                  {String(currentPage).padStart(2, "0")}
                </span>
                <span>/</span>
                <span>{String(totalPages).padStart(2, "0")}</span>
              </div>

              <div className="hidden items-center gap-1.5 sm:flex">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    aria-label={`Go to page ${index + 1}`}
                    className={`h-1 rounded-full transition-all duration-500 ${currentPage === index + 1 ? "w-9 bg-black" : "w-2.5 bg-black/15 hover:bg-black/30"
                      }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-all duration-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-white disabled:hover:text-black"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:translate-y-0"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}