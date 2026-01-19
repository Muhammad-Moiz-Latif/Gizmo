"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Clock, ShoppingCart } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../state/store"
import { useParams } from "react-router-dom"
import { updateLocalCart, addCartItemtoLocalStorage, updateLocalCartItem } from "@/state/features/localcartSlice"
import { updateCartAsync, addToCartAsync } from "@/state/features/cartSlice"
import toast from "react-hot-toast"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const DealOfTheDay: React.FC = () => {
  const devices = useSelector((state: RootState) => state.device.devices);
  const devicesArray = Array.isArray(devices) ? devices : []
  const cart = useSelector((state: RootState) => state.cart.list);
  const localCart = useSelector((state: RootState) => state.localCart.list);
  const dispatch = useDispatch();
  const dealDevice = devicesArray[0]
  const { UserId } = useParams();
  const endTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(endTime) - +new Date()
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => time.toString().padStart(2, "0")

  const discountedPrice = dealDevice ? dealDevice.Price * 0.8 : 0


  const handleClick = (deviceId: string) => {
    if (UserId == undefined) {
      const cartItem = localCart.find((item) => item.deviceId === deviceId);
      if (cartItem) {
        //@ts-ignore
        dispatch(updateLocalCartItem({ deviceId: deviceId, quantity: cartItem.quantity }))
        dispatch(updateLocalCart());
        toast.success('Cart updated');
      } else {
        //@ts-ignore
        dispatch(addCartItemtoLocalStorage({ deviceId: deviceId }))
        dispatch(updateLocalCart());
        toast.success("Item added to Cart!");

      }
    } else {
      const cartItem = cart.find((item) => item.DeviceId === deviceId);
      if (cartItem) {
        //@ts-ignore
        dispatch(updateCartAsync({ UserId, Quantity: cartItem.Quantity + 1, DeviceId: deviceId }));
        toast.success('Cart updated');
      } else {
        //@ts-ignore
        dispatch(addToCartAsync({ UserId, Quantity: 1, DeviceId: deviceId }));
        toast.success("Item added to Cart!");
      }
    }
  };


  if (!dealDevice) return null

  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gray-50 rounded-full transform scale-90"></div>
              <img
                src={dealDevice.Images && dealDevice.Images.length > 1 ? dealDevice.Images[0] : (dealDevice.Images && dealDevice.Images.length > 0 ? dealDevice.Images[0] : "/placeholder.svg")}
                alt={dealDevice.DeviceName}
                className="w-full max-w-md h-auto relative z-10"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <h2 className="text-sm font-medium tracking-wider text-gray-500 mb-1">LIMITED TIME OFFER</h2>
              <h1 className="text-3xl md:text-4xl font-bold text-black">DEAL OF THE DAY</h1>
              <p className="text-lg text-gray-700 mt-2">{dealDevice.DeviceName}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-black">${discountedPrice.toFixed(2)}</span>
              <span className="text-lg text-gray-400 line-through">${dealDevice.Price.toFixed(2)}</span>
              <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">20% OFF</span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-700" />
              <div className="flex gap-3">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="flex flex-col items-center bg-gray-100 px-3 py-2 rounded">
                    <span className="text-xl font-bold text-black">{formatTime(value)}</span>
                    <span className="text-xs uppercase text-gray-600">{unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full md:w-auto px-6 py-3 bg-black text-white font-bold rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2" onClick={() => handleClick(dealDevice.DeviceId)}>
              <ShoppingCart className="w-5 h-5" />
              <span>ADD TO CART</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// function dispatch(arg0: { payload: undefined; type: "cart/updateLocalCart" }) {
//   throw new Error("Function not implemented.")
// }

