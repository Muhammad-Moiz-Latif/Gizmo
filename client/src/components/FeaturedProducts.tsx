"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../state/store"
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react"
import {
  addToWishlistAsync,
  deleteFromWishListAsync,
  setWishListAsync,
} from "../state/features/wishSlice"
import { useNavigate, useParams } from "react-router-dom"
import {
  addToCartAsync,
  setCartAsync,
  updateCartAsync,
} from "../state/features/cartSlice"
import {
  addtoLocalStorage,
  removefromLocalStorage,
  updateLocalStorage,
} from "../state/features/localwishSlice"
import {
  addCartItemtoLocalStorage,
  updateLocalCart,
  updateLocalCartItem,
} from "../state/features/localcartSlice"
import toast from "react-hot-toast"
import { ProductCardSkeleton } from "./ProductCardSkeleton"

export const FeaturedProducts: React.FC = () => {
  const { UserId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const allDevices = useSelector(
    (state: RootState) => state.device.devices
  )

  const devicesLoading = useSelector(
    (state: RootState) => state.device.isLoading
  )

  const devicesFetched = useSelector(
    (state: RootState) => state.device.hasFetched
  )

  const wishlist = useSelector(
    (state: RootState) => state.wishList.list
  )

  const localWishList = useSelector(
    (state: RootState) => state.localWishList.list
  )

  const cart = useSelector(
    (state: RootState) => state.cart.list
  )

  const localCart = useSelector(
    (state: RootState) => state.localCart.list
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  /*
   * ---------------------------------------------------------
   * RESPONSIVE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()

    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  /*
   * ---------------------------------------------------------
   * FEATURED PRODUCTS
   *
   * Keep one product per brand so the section feels curated.
   * ---------------------------------------------------------
   */

  const featuredDevices = useMemo(() => {
    const devicesArray = Array.isArray(allDevices)
      ? allDevices
      : []

    const uniqueBrands = new Set<string>()

    return devicesArray
      .filter((device: any) => {
        if (
          uniqueBrands.size < 5 &&
          !uniqueBrands.has(device.Brand)
        ) {
          uniqueBrands.add(device.Brand)
          return true
        }

        return false
      })
      .slice(0, 5)
  }, [allDevices])

  const showSkeletons =
    devicesLoading || !devicesFetched

  /*
   * ---------------------------------------------------------
   * CAROUSEL
   * ---------------------------------------------------------
   */

  const goToSlide = (index: number) => {
    if (isAnimating || featuredDevices.length === 0) return

    const normalizedIndex =
      (index + featuredDevices.length) %
      featuredDevices.length

    setIsAnimating(true)
    setActiveIndex(normalizedIndex)

    window.setTimeout(() => {
      setIsAnimating(false)
    }, 650)
  }

  const nextSlide = () => {
    goToSlide(activeIndex + 1)
  }

  const prevSlide = () => {
    goToSlide(activeIndex - 1)
  }

  /*
   * ---------------------------------------------------------
   * HELPERS
   * ---------------------------------------------------------
   */

  const getImage = (device: any) => {
    if (
      device?.Images &&
      Array.isArray(device.Images) &&
      device.Images.length > 1
    ) {
      return device.Images[1]
    }

    if (
      device?.Images &&
      Array.isArray(device.Images) &&
      device.Images.length > 0
    ) {
      return device.Images[0]
    }

    return "/placeholder.svg"
  }

  const isWishlisted = (deviceId: string) => {
    const activeWishlist =
      UserId === undefined
        ? localWishList
        : wishlist

    return activeWishlist.some(
      (item) => item === deviceId
    )
  }

  /*
   * ---------------------------------------------------------
   * WISHLIST
   * ---------------------------------------------------------
   */

  const toggleWishlist = (deviceId: string) => {
    const isInReduxWishlist = wishlist.some(
      (item) => item === deviceId
    )

    const isInLocalReduxWishlist =
      localWishList.some(
        (item) => item === deviceId
      )

    if (UserId === undefined) {
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
        dispatch(
          deleteFromWishListAsync({
            productId: deviceId,
            UserId,
          })
        )
      } else {
        //@ts-ignore
        dispatch(
          addToWishlistAsync({
            productId: deviceId,
            UserId,
          })
        )
      }
    }
  }

  /*
   * ---------------------------------------------------------
   * CART
   * ---------------------------------------------------------
   */

  const toggleCart = (deviceId: string) => {
    if (UserId === undefined) {
      const cartItem = localCart.find(
        (item) => item.deviceId === deviceId
      )

      if (cartItem) {
        //@ts-ignore
        dispatch(
          updateLocalCartItem({
            deviceId,
            quantity: cartItem.quantity + 1,
          })
        )

        dispatch(updateLocalCart())

        toast.success("Cart updated")
      } else {
        //@ts-ignore
        dispatch(
          addCartItemtoLocalStorage({
            deviceId,
          })
        )

        dispatch(updateLocalCart())

        toast.success("Item added to Cart")
      }
    } else {
      const cartItem = cart.find(
        (item) => item.DeviceId === deviceId
      )

      if (cartItem) {
        //@ts-ignore
        dispatch(
          updateCartAsync({
            UserId,
            Quantity: cartItem.Quantity + 1,
            DeviceId: deviceId,
          })
        )

        toast.success("Cart updated")
      } else {
        //@ts-ignore
        dispatch(
          addToCartAsync({
            UserId,
            Quantity: 1,
            DeviceId: deviceId,
          })
        )

        toast.success("Item added to Cart")
      }
    }
  }

  /*
   * ---------------------------------------------------------
   * INITIAL DATA
   * ---------------------------------------------------------
   */

  useEffect(() => {
    //@ts-ignore
    dispatch(setWishListAsync({ UserId }))

    //@ts-ignore
    dispatch(setCartAsync({ UserId }))
  }, [dispatch, UserId])

  /*
   * ---------------------------------------------------------
   * ACTIVE PRODUCT
   * ---------------------------------------------------------
   */

  const activeDevice = featuredDevices[activeIndex]

  const secondaryDevices = useMemo(() => {
    if (!featuredDevices.length) return []

    return [
      featuredDevices[
      (activeIndex + 1) % featuredDevices.length
      ],
      featuredDevices[
      (activeIndex + 2) % featuredDevices.length
      ],
    ]
  }, [featuredDevices, activeIndex])

  /*
   * ---------------------------------------------------------
   * SKELETON
   * ---------------------------------------------------------
   */

  if (showSkeletons) {
    return (
      <section className="relative w-full overflow-hidden bg-[#f7f7f5] px-4 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-black/[0.02] via-white to-black/[0.02] blur-3xl" />

          <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]" />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[22vw] font-black leading-none tracking-[-0.08em] text-black/[0.025]">
            GIZMO
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-black/40" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                Selected for you
              </span>

              <span className="h-px w-10 bg-black/20" />
            </div>

            <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl md:text-7xl">
              The
              <br />
              <span className="font-light italic text-black/35">
                edit.
              </span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-[1.65fr_1fr]">
            <div className="rounded-[2rem] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-8">
              <ProductCardSkeleton />
            </div>

            <div className="flex flex-col gap-5">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!activeDevice) {
    return null
  }

  /*
   * ---------------------------------------------------------
   * DESKTOP SPOTLIGHT
   * ---------------------------------------------------------
   */

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f7f5] py-20 text-black sm:py-24 lg:py-28">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-white blur-3xl" />

        <div className="absolute right-[-180px] top-1/4 h-[600px] w-[600px] rounded-full bg-black/[0.025] blur-3xl" />

        <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[22vw] font-black leading-none tracking-[-0.09em] text-black/[0.025]">
          GIZMO
        </div>

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-12 flex flex-col justify-between gap-7 md:mb-16 md:flex-row md:items-end">

          <div>

            <div className="mb-5 flex items-center gap-3">

              <Sparkles className="h-4 w-4 text-black/35" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                Selected for you
              </span>

              <span className="h-px w-10 bg-black/20" />

            </div>

            <h2 className="text-5xl font-semibold leading-[0.88] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-[5.8rem]">

              The

              <br />

              <span className="font-light italic text-black/35">
                edit.
              </span>

            </h2>

          </div>

          <div className="flex max-w-sm flex-col gap-5">

            <p className="text-sm leading-6 text-black/45 sm:text-base">
              A considered collection of standout
              technology, chosen for people who
              appreciate the little details.
            </p>

            <div className="flex items-center gap-3">

              <span className="h-px w-8 bg-black/20" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-black/30">
                Discover something better
              </span>

            </div>

          </div>

        </div>

        {/* =====================================================
            MOBILE
        ===================================================== */}

        {isMobile ? (
          <div className="relative">

            <div className="overflow-hidden rounded-[2rem]">

              <div
                className="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >

                <div className="overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                  {/* IMAGE */}

                  <div
                    className="group relative flex h-[330px] cursor-pointer items-center justify-center overflow-hidden bg-[#fafaf9]"
                    onClick={() =>
                      navigate(
                        `Device/${activeDevice.DeviceId}`
                      )
                    }
                  >

                    <div className="absolute left-5 top-5 z-10 font-mono text-[9px] tracking-[0.25em] text-black/25">
                      {String(activeIndex + 1).padStart(
                        2,
                        "0"
                      )}{" "}
                      /{" "}
                      {String(featuredDevices.length).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <img
                      src={getImage(activeDevice)}
                      alt={activeDevice.DeviceName}
                      onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src =
                          "/device-fallback.svg"
                      }}
                      className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    />

                    <button
                      onClick={(event) => {
                        event.stopPropagation()
                        toggleWishlist(
                          activeDevice.DeviceId
                        )
                      }}
                      className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white/85 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`h-4 w-4 ${isWishlisted(
                          activeDevice.DeviceId
                        )
                          ? "fill-red-500 text-red-500"
                          : "text-black/35"
                          }`}
                      />
                    </button>

                    <div className="absolute bottom-5 left-5 flex items-center gap-1.5 rounded-full border border-black/5 bg-white/85 px-3 py-1.5 backdrop-blur-md">
                      <Star className="h-3 w-3 fill-black text-black" />

                      <span className="text-[10px] font-medium">
                        4.9
                      </span>
                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-6">

                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-black/30">
                      {activeDevice.Brand}
                    </span>

                    <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em]">
                      {activeDevice.DeviceName}
                    </h3>

                    {activeDevice.Model && (
                      <p className="mt-1 text-sm text-black/35">
                        {activeDevice.Model}
                      </p>
                    )}

                    <div className="mt-6 flex items-center justify-between gap-4">

                      <span className="text-3xl font-bold tracking-[-0.05em]">
                        ${Number(activeDevice.Price).toFixed(2)}
                      </span>

                      <button
                        onClick={() =>
                          toggleCart(
                            activeDevice.DeviceId
                          )
                        }
                        className="flex h-11 items-center gap-2 rounded-full bg-black px-5 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Add to bag
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* MOBILE CONTROLS */}

            <div className="mt-6 flex items-center justify-between">

              <div className="flex items-center gap-2">

                {featuredDevices.map(
                  (_device: any, index: number) => (
                    <button
                      key={index}
                      onClick={() =>
                        goToSlide(index)
                      }
                      className={`h-1 rounded-full transition-all duration-500 ${index === activeIndex
                        ? "w-9 bg-black"
                        : "w-2 bg-black/15"
                        }`}
                      aria-label={`Go to product ${index + 1
                        }`}
                    />
                  )
                )}

              </div>

              <div className="flex gap-2">

                <button
                  onClick={prevSlide}
                  disabled={isAnimating}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-all hover:bg-black hover:text-white disabled:opacity-30"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={nextSlide}
                  disabled={isAnimating}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all hover:-translate-y-0.5 disabled:opacity-30"
                  aria-label="Next product"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

              </div>

            </div>

          </div>
        ) : (

          /* ===================================================
             DESKTOP
             =================================================== */

          <div className="grid gap-5 lg:grid-cols-[1.55fr_0.85fr]">

            {/* =================================================
                MAIN FEATURE
                ================================================= */}

            <div
              className={`group relative overflow-hidden rounded-[2.5rem] border border-black/[0.06] bg-white shadow-[0_15px_50px_rgba(0,0,0,0.045)] transition-all duration-700 ${isAnimating
                ? "opacity-70"
                : "opacity-100"
                }`}
            >

              {/* PRODUCT IMAGE */}

              <div
                className="relative flex h-[500px] cursor-pointer items-center justify-center overflow-hidden bg-[#fafaf9] lg:h-[570px]"
                onClick={() =>
                  navigate(
                    `Device/${activeDevice.DeviceId}`
                  )
                }
              >

                {/* Number */}

                <div className="absolute left-7 top-7 z-10">

                  <div className="font-mono text-[10px] tracking-[0.25em] text-black/25">
                    {String(activeIndex + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                </div>

                {/* Small label */}

                <div className="absolute bottom-7 left-7 z-10 flex items-center gap-3">

                  <span className="h-px w-8 bg-black/20" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-black/30">
                    Featured product
                  </span>

                </div>

                {/* Wishlist */}

                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    toggleWishlist(
                      activeDevice.DeviceId
                    )
                  }}
                  className="absolute right-7 top-7 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-black/5 bg-white/85 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted(
                      activeDevice.DeviceId
                    )
                      ? "fill-red-500 text-red-500"
                      : "text-black/30"
                      }`}
                  />
                </button>

                {/* Image */}

                <img
                  src={getImage(activeDevice)}
                  alt={activeDevice.DeviceName}
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src =
                      "/device-fallback.svg"
                  }}
                  className="h-full w-full object-contain p-12 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] xl:p-16"
                />

                {/* Rating */}

                <div className="absolute bottom-7 right-7 flex items-center gap-2 rounded-full border border-black/5 bg-white/85 px-4 py-2 backdrop-blur-md">

                  <Star className="h-3.5 w-3.5 fill-black text-black" />

                  <span className="text-[10px] font-semibold">
                    4.9
                  </span>

                  <span className="text-[9px] text-black/30">
                    Editor rated
                  </span>

                </div>

              </div>

              {/* PRODUCT INFO */}

              <div className="p-7 lg:p-9">

                <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">

                  <div className="min-w-0">

                    <div className="mb-2 flex items-center gap-2">

                      <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-black/30">
                        {activeDevice.Brand}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-black/20" />

                      <span className="text-[9px] uppercase tracking-[0.2em] text-black/25">
                        Featured
                      </span>

                    </div>

                    <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl lg:text-[2.2rem]">
                      {activeDevice.DeviceName}
                    </h3>

                    {activeDevice.Model && (
                      <p className="mt-1 text-sm text-black/35">
                        {activeDevice.Model}
                      </p>
                    )}

                  </div>

                  <div className="flex shrink-0 items-center gap-5">

                    <span className="text-3xl font-bold tracking-[-0.05em] lg:text-4xl">
                      ${Number(activeDevice.Price).toFixed(2)}
                    </span>

                    <button
                      onClick={() =>
                        toggleCart(
                          activeDevice.DeviceId
                        )
                      }
                      className="group/bag flex h-12 items-center gap-2 rounded-full bg-black px-5 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(0,0,0,0.18)]"
                    >
                      <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover/bag:-translate-x-0.5" />

                      <span>
                        Add to bag
                      </span>
                    </button>

                  </div>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `Device/${activeDevice.DeviceId}`
                    )
                  }
                  className="group/view mt-7 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-black/35 transition-colors hover:text-black"
                >
                  View product

                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5" />
                </button>

              </div>

            </div>

            {/* =================================================
                SECONDARY PRODUCTS
                ================================================= */}

            <div className="flex flex-col gap-5">

              {secondaryDevices.map(
                (device: any, secondaryIndex: number) => {

                  const actualIndex =
                    (activeIndex +
                      secondaryIndex +
                      1) %
                    featuredDevices.length

                  return (
                    <button
                      key={`${device.DeviceId}-${actualIndex}`}
                      onClick={() =>
                        goToSlide(actualIndex)
                      }
                      className="group relative flex min-h-[250px] flex-1 overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white text-left shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)]"
                    >

                      {/* IMAGE */}

                      <div className="relative flex w-[48%] items-center justify-center overflow-hidden bg-[#fafaf9]">

                        <img
                          src={getImage(device)}
                          alt={device.DeviceName}
                          onError={(event) => {
                            event.currentTarget.onerror =
                              null
                            event.currentTarget.src =
                              "/device-fallback.svg"
                          }}
                          className="h-full w-full object-contain p-7 transition-transform duration-700 ease-out group-hover:scale-110"
                        />

                        <span className="absolute left-5 top-5 font-mono text-[9px] tracking-[0.2em] text-black/20">
                          {String(
                            actualIndex + 1
                          ).padStart(2, "0")}
                        </span>

                      </div>

                      {/* INFO */}

                      <div className="flex flex-1 flex-col justify-between p-6">

                        <div>

                          <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-black/30">
                            {device.Brand}
                          </span>

                          <h4 className="mt-2 line-clamp-2 text-lg font-semibold leading-tight tracking-[-0.03em]">
                            {device.DeviceName}
                          </h4>

                          {device.Model && (
                            <p className="mt-1 line-clamp-1 text-xs text-black/30">
                              {device.Model}
                            </p>
                          )}

                        </div>

                        <div className="mt-5 flex items-end justify-between gap-3">

                          <span className="text-xl font-bold tracking-[-0.04em]">
                            ${Number(device.Price).toFixed(2)}
                          </span>

                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:bg-black group-hover:text-white">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>

                        </div>

                      </div>

                    </button>
                  )
                }
              )}

              {/* =================================================
                  NAVIGATION PANEL
                  ================================================= */}

              <div className="flex items-center justify-between rounded-[2rem] border border-black/[0.06] bg-white/60 p-5 backdrop-blur-sm">

                <div>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-black/25">
                    The collection
                  </span>

                  <div className="mt-1 flex items-baseline gap-1 font-mono">

                    <span className="text-xl font-medium text-black">
                      {String(
                        activeIndex + 1
                      ).padStart(2, "0")}
                    </span>

                    <span className="text-[10px] text-black/25">
                      /
                    </span>

                    <span className="text-[10px] text-black/30">
                      {String(
                        featuredDevices.length
                      ).padStart(2, "0")}
                    </span>

                  </div>

                </div>

                <div className="flex items-center gap-2">

                  <button
                    onClick={prevSlide}
                    disabled={isAnimating}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-all duration-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Previous product"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    onClick={nextSlide}
                    disabled={isAnimating}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Next product"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* =====================================================
            BOTTOM SIGNATURE
            ===================================================== */}

        <div className="mt-8 flex items-center justify-between border-t border-black/[0.06] pt-5">

          <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-black/20">
            Gizmo / Curated technology
          </span>

          <span className="font-mono text-[9px] tracking-[0.2em] text-black/20">
            EDIT / {String(activeIndex + 1).padStart(2, "0")}
          </span>

        </div>

      </div>
    </section>
  )
}