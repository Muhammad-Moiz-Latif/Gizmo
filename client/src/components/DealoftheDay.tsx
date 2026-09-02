"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Clock, ShoppingCart, ArrowUpRight, Zap } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../state/store"
import { useParams } from "react-router-dom"

import {
  updateLocalCart,
  addCartItemtoLocalStorage,
  updateLocalCartItem,
} from "@/state/features/localcartSlice"

import {
  updateCartAsync,
  addToCartAsync,
} from "@/state/features/cartSlice"

import toast from "react-hot-toast"
import { Skeleton } from "./Skeleton"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const DealOfTheDay: React.FC = () => {

  /* =====================================================
     REDUX
  ===================================================== */

  const devices = useSelector(
    (state: RootState) => state.device.devices
  )

  const devicesLoading = useSelector(
    (state: RootState) => state.device.isLoading
  )

  const devicesFetched = useSelector(
    (state: RootState) => state.device.hasFetched
  )

  const cart = useSelector(
    (state: RootState) => state.cart.list
  )

  const localCart = useSelector(
    (state: RootState) => state.localCart.list
  )

  const dispatch = useDispatch()

  const { UserId } = useParams()

  const devicesArray = Array.isArray(devices)
    ? devices
    : []

  const dealDevice = devicesArray[0]


  /* =====================================================
     COUNTDOWN
  ===================================================== */

  // IMPORTANT:
  // Create the end time ONCE rather than on every render.

  const [endTime] = useState(
    () => Date.now() + 24 * 60 * 60 * 1000
  )

  const calculateTimeLeft = (): TimeLeft => {

    const difference = endTime - Date.now()

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    return {
      days: Math.floor(
        difference / (1000 * 60 * 60 * 24)
      ),

      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),

      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),

      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    }
  }


  const [timeLeft, setTimeLeft] =
    useState<TimeLeft>(calculateTimeLeft())


  useEffect(() => {

    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => window.clearInterval(timer)

  }, [endTime])


  const formatTime = (time: number) =>
    time.toString().padStart(2, "0")


  /* =====================================================
     PRICE
  ===================================================== */

  const discountedPrice = dealDevice
    ? dealDevice.Price * 0.8
    : 0


  /* =====================================================
     CART
  ===================================================== */

  const handleClick = (deviceId: string) => {

    if (UserId === undefined) {

      const cartItem = localCart.find(
        (item) => item.deviceId === deviceId
      )

      if (cartItem) {

        dispatch(
          updateLocalCartItem({
            deviceId,
            quantity: cartItem.quantity,
          }) as any
        )

        dispatch(updateLocalCart())

        toast.success("Cart updated")

      } else {

        dispatch(
          addCartItemtoLocalStorage({
            deviceId,
          }) as any
        )

        dispatch(updateLocalCart())

        toast.success("Item added to Cart!")

      }

    } else {

      const cartItem = cart.find(
        (item) => item.DeviceId === deviceId
      )

      if (cartItem) {

        dispatch(
          updateCartAsync({
            UserId,
            Quantity: cartItem.Quantity + 1,
            DeviceId: deviceId,
          }) as any
        )

        toast.success("Cart updated")

      } else {

        dispatch(
          addToCartAsync({
            UserId,
            Quantity: 1,
            DeviceId: deviceId,
          }) as any
        )

        toast.success("Item added to Cart!")

      }
    }
  }


  /* =====================================================
     LOADING
  ===================================================== */

  if (!dealDevice) {

    if (devicesLoading || !devicesFetched) {

      return (
        <section className="w-full bg-black px-5 py-24">

          <div className="
            mx-auto
            flex
            max-w-6xl
            flex-col
            items-center
            gap-12

            md:flex-row
          ">

            <Skeleton
              className="
                h-[420px]
                w-full
                max-w-xl
                rounded-[2rem]
                bg-white/10
              "
            />

            <div className="w-full max-w-xl space-y-5">

              <Skeleton className="h-4 w-32 bg-white/10" />

              <Skeleton className="h-12 w-3/4 bg-white/10" />

              <Skeleton className="h-6 w-full bg-white/10" />

              <Skeleton className="h-14 w-48 bg-white/10" />

            </div>

          </div>

        </section>
      )
    }

    return null
  }


  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-black
        py-24
        text-white

        sm:py-28

        lg:py-32
      "
    >

      {/* =================================================
          GIANT BACKGROUND BRAND
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          whitespace-nowrap
          text-[25vw]
          font-black
          leading-none
          tracking-[-0.09em]
          text-white/[0.025]
          select-none
        "
      >
        GIZMO
      </div>


      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1400px]
          px-5

          sm:px-8

          lg:px-14

          xl:px-20
        "
      >

        {/* ===============================================
            SECTION HEADER
        =============================================== */}

        <div
          className="
            mb-14
            flex
            flex-col
            gap-5

            md:flex-row
            md:items-end
            md:justify-between
          "
        >

          <div>

            <div
              className="
                mb-4
                flex
                items-center
                gap-3
              "
            >

              <Zap
                className="
                  h-4
                  w-4
                  fill-white
                "
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-white/50
                "
              >
                Limited drop
              </span>

            </div>


            <h2
              className="
                text-4xl
                font-semibold
                leading-[0.95]
                tracking-[-0.05em]

                sm:text-5xl

                md:text-6xl
              "
            >
              Deal of the day.
            </h2>

          </div>


          <p
            className="
              max-w-sm
              text-sm
              leading-6
              text-white/40
            "
          >
            One product. One special price.
            When the clock runs out, this deal
            disappears.
          </p>

        </div>


        {/* ===============================================
            DEAL CARD
        =============================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/10
            bg-[#111111]

            lg:min-h-[560px]
          "
        >

          {/* Decorative circle */}

          <div
            className="
              absolute
              -right-32
              -top-32
              h-[500px]
              w-[500px]
              rounded-full
              border
              border-white/[0.04]
            "
          />

          <div
            className="
              absolute
              -right-16
              -top-16
              h-[350px]
              w-[350px]
              rounded-full
              border
              border-white/[0.04]
            "
          />


          <div
            className="
              relative
              flex
              min-h-[560px]
              flex-col

              lg:flex-row
            "
          >

            {/* =========================================
                IMAGE
            ========================================= */}

            <div
              className="
                relative
                flex
                min-h-[360px]
                w-full
                items-center
                justify-center
                overflow-hidden

                lg:w-[55%]
                lg:min-h-[560px]
              "
            >

              {/* Glow */}

              <div
                className="
                  absolute
                  h-[320px]
                  w-[320px]
                  rounded-full
                  bg-white/[0.035]
                  blur-3xl
                "
              />


              {/* Product image */}

              <img
                src={
                  dealDevice.Images?.length
                    ? dealDevice.Images[0]
                    : "/placeholder.svg"
                }
                alt={dealDevice.DeviceName}
                onError={(event) => {

                  event.currentTarget.onerror = null

                  event.currentTarget.src =
                    "/device-fallback.svg"
                }}
                className="
                  relative
                  z-10
                  w-[75%]
                  max-w-[500px]
                  object-contain

                  transition-transform
                  duration-700

                  hover:scale-105
                "
              />


              {/* Image label */}

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-white/25

                  lg:bottom-8
                  lg:left-8
                "
              >
                GIZMO / 001
              </div>

            </div>


            {/* =========================================
                DETAILS
            ========================================= */}

            <div
              className="
                flex
                w-full
                flex-col
                justify-center
                p-7

                sm:p-10

                lg:w-[45%]
                lg:p-14
                xl:p-16
              "
            >

              {/* Product label */}

              <span
                className="
                  mb-4
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-white/35
                "
              >
                Today's selection
              </span>


              {/* Product name */}

              <h3
                className="
                  max-w-xl
                  text-3xl
                  font-semibold
                  leading-[1]
                  tracking-[-0.05em]
                  text-white

                  sm:text-4xl

                  md:text-5xl
                "
              >
                {dealDevice.DeviceName}
              </h3>


              {/* Price */}

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  items-baseline
                  gap-3
                "
              >

                <span
                  className="
                    text-4xl
                    font-semibold
                    tracking-[-0.04em]
                    text-white
                  "
                >
                  ${discountedPrice.toFixed(2)}
                </span>


                <span
                  className="
                    text-base
                    text-white/25
                    line-through
                  "
                >
                  ${dealDevice.Price.toFixed(2)}
                </span>


                <span
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-3
                    py-1
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white/60
                  "
                >
                  20% off
                </span>

              </div>


              {/* Divider */}

              <div
                className="
                  my-8
                  h-px
                  w-full
                  bg-white/[0.08]
                "
              />


              {/* Countdown */}

              <div>

                <div
                  className="
                    mb-4
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Clock
                    className="
                      h-4
                      w-4
                      text-white/40
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.25em]
                      text-white/40
                    "
                  >
                    Offer ends in
                  </span>

                </div>


                <div
                  className="
                    grid
                    grid-cols-4
                    gap-2
                    sm:max-w-md
                  "
                >

                  {Object.entries(timeLeft).map(
                    ([unit, value]) => (

                      <div
                        key={unit}
                        className="
                          rounded-xl
                          border
                          border-white/[0.08]
                          bg-white/[0.035]
                          px-2
                          py-3
                          text-center

                          sm:px-4
                          sm:py-4
                        "
                      >

                        <span
                          className="
                            block
                            font-mono
                            text-xl
                            font-medium
                            tracking-tight
                            text-white

                            sm:text-2xl
                          "
                        >
                          {formatTime(value)}
                        </span>


                        <span
                          className="
                            mt-1
                            block
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-white/25
                          "
                        >
                          {unit}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* CTA */}

              <button
                onClick={() =>
                  handleClick(dealDevice.DeviceId)
                }
                className="
                  group
                  mt-8
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-full
                  bg-white
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-black
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:shadow-[0_15px_40px_rgba(255,255,255,0.12)]

                  sm:max-w-md
                "
              >

                <span className="flex items-center gap-3">

                  <ShoppingCart className="h-4 w-4" />

                  Add to cart

                </span>


                <ArrowUpRight
                  className="
                    h-5
                    w-5
                    transition-transform
                    duration-300

                    group-hover:rotate-45
                  "
                />

              </button>

            </div>

          </div>

        </div>


        {/* ===============================================
            BOTTOM LABEL
        =============================================== */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-white/[0.07]
            pt-5
          "
        >

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-white/20
            "
          >
            Limited availability
          </span>


          <span
            className="
              font-mono
              text-[9px]
              tracking-widest
              text-white/20
            "
          >
            GZM / DEAL / 01
          </span>

        </div>

      </div>

    </section>
  )
}