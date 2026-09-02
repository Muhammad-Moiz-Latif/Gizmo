"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Truck, Info, Shield, Clock, ArrowUpRight } from "lucide-react"
import type { RootState } from "@/state/store"
import { updateCartAsync, addToCartAsync } from "@/state/features/cartSlice"
import { updateLocalCartItem, updateLocalCart, removeCartItemfromLocalStorage } from "@/state/features/localcartSlice"
import { RemoveFromCartAsync } from "@/state/features/cartSlice"
import toast from "react-hot-toast"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { Skeleton } from "../components/Skeleton"

export const ShoppingCart = () => {
  const { UserId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get data from Redux store
  const Cart = useSelector((state: RootState) => state.cart.list)
  const localCart = useSelector((state: RootState) => state.localCart.list)
  const deviceData = useSelector((state: RootState) => state.device.devices)
  const devicesLoading = useSelector((state: RootState) => state.device.isLoading)
  const devicesFetched = useSelector((state: RootState) => state.device.hasFetched)
  const deviceDataArray = Array.isArray(deviceData) ? deviceData : []

  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [promoCode, setPromoCode] = useState<string>("")
  const [promoApplied, setPromoApplied] = useState<boolean>(false)
  const [discountAmount, setDiscountAmount] = useState<number>(0)

  // Determine which cart to use based on login status
  const cartItems = UserId ? Cart : localCart

  // Function to get device details by ID
  const getDeviceById = (deviceId: string) => {
    return deviceDataArray.find((device) => device.DeviceId === deviceId)
  }

  // Function to increment cart item quantity
  function toggleIncrementCart(deviceId: string) {
    if (UserId == undefined) {
      const CartItem = localCart.find((item) => item.deviceId == deviceId)
      if (CartItem) {
        const Quantity = CartItem.quantity + 1
        dispatch(updateLocalCartItem({ deviceId: deviceId, quantity: Quantity }))
        dispatch(updateLocalCart())
        toast.success("Cart updated")
      }
    } else {
      const CartItem = Cart.find((item) => item.DeviceId === deviceId)
      if (CartItem) {
        const Quantity = CartItem.Quantity + 1
        //@ts-ignore
        dispatch(updateCartAsync({ UserId, Quantity: Quantity, DeviceId: deviceId }))
        toast.success("Cart updated")
      }
    }
  }

  // Function to decrement cart item quantity
  function toggleDecrementCart(deviceId: string) {
    if (UserId == undefined) {
      const CartItem = localCart.find((item) => item.deviceId == deviceId)
      if (CartItem && CartItem.quantity > 1) {
        const Quantity = CartItem.quantity - 1
        dispatch(updateLocalCartItem({ deviceId: deviceId, quantity: Quantity }))
        dispatch(updateLocalCart())
        toast.success("Cart updated")
      }
    } else {
      const CartItem = Cart.find((item) => item.DeviceId === deviceId)
      if (CartItem && CartItem.Quantity > 1) {
        const Quantity = CartItem.Quantity - 1
        //@ts-ignore
        dispatch(updateCartAsync({ UserId, Quantity: Quantity, DeviceId: deviceId }))
        toast.success("Cart updated")
      }
    }
  }

  // Function to remove item from cart
  function handleRemoval(DeviceId: string) {
    if (UserId == undefined) {
      dispatch(removeCartItemfromLocalStorage({ deviceId: DeviceId }))
      dispatch(updateLocalCart())
      toast.success("Item removed from cart")
    } else {
      //@ts-ignore
      dispatch(RemoveFromCartAsync({ DeviceId: DeviceId, UserId: UserId }))
      toast.success("Item removed from cart")
    }
  }

  function addItem(deviceId: string) {
    const cartItem = Cart.find((item) => item.DeviceId === deviceId);
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

  // Function to toggle item details
  const toggleItemDetails = (deviceId: string) => {
    setExpandedItem(expandedItem === deviceId ? null : deviceId)
  }

  // Function to apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setPromoApplied(true)
      setDiscountAmount(calculateSubtotal() * 0.1) // 10% discount
      toast.success("Promo code applied successfully!")
    } else {
      toast.error("Invalid promo code")
      setPromoApplied(false)
      setDiscountAmount(0)
    }
  }

  // Calculate subtotal
  const calculateSubtotal = (): number => {
    return cartItems.reduce((total, item: any) => {
      const device = getDeviceById(UserId ? item.DeviceId : item.deviceId)
      const quantity = UserId ? item.Quantity : item.quantity
      return total + (device?.Price ? device.Price * quantity : 0)
    }, 0)
  }

  // Calculate total
  const calculateTotal = (): number => {
    return calculateSubtotal() - discountAmount
  }

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Continue shopping function
  const continueShopping = () => {
    navigate(UserId ? `/dashboard/${UserId}` : "/dashboard")
  }

  // Proceed to checkout
  const proceedToCheckout = async () => {
    const payDevices = deviceDataArray.filter((device) =>
      Cart.some((item: any) => item.DeviceId === device.DeviceId)
    ).map((device) => {
      const CartItem = Cart.find((item) => item.DeviceId == device.DeviceId)
      return {
        ...device,
        Quantity: CartItem?.Quantity
      }
    });


    if (UserId == undefined) {
      navigate('/Login');
      return;
    }

    const stripe = await loadStripe("pk_test_51QlxBiRq46mJj6NwaS3TFwq9HbiC1lzMdaNwLP1Le6qRngqtreZkxaEzGEQkaufspjRKNiWvM0h6geJJZTvhf8ds00hjD7d4xT");

    try {
      toast.success('Proceeding to checkout...');
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/dashboard/${UserId}/create-checkout-session`,
        payDevices
      );

      const { id: sessionId } = response.data;

      if (!stripe) {
        console.error("Stripe failed to initialize.");
        return;
      }

      // ✅ Correct function to redirect
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error("Stripe Checkout Error:", result.error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  }

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#f7f7f5] font-roboto text-black">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-black py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-[-0.08em] text-white/[0.04]">
          GIZMO
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 lg:px-14">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-white/30" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          </div>
          <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl">
            Your <span className="font-light italic text-white/40">cart.</span>
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/45">
            Review what you've picked, then head to checkout when you're ready.
          </p>
        </div>
      </section>

      {/* =====================================================
          BODY
      ===================================================== */}
      <section className="relative py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 lg:px-14">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* =================================================
                CART ITEMS
            ================================================= */}
            <div className="lg:w-2/3">
              <div className="rounded-[2rem] border border-black/[0.06] bg-white p-6 sm:p-8">
                <div className="mb-7 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                    Cart items <span className="text-black/30">({cartItems.length})</span>
                  </h2>
                  <button
                    className="flex items-center gap-2 text-[13px] font-medium text-black/50 transition-colors hover:text-black"
                    onClick={continueShopping}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Continue shopping
                  </button>
                </div>

                {!devicesFetched || devicesLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton key={index} className="h-24 w-full rounded-2xl" />
                    ))}
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="flex flex-col items-center py-16 text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-[#fafaf9]">
                      <ShoppingBag className="h-7 w-7 text-black/30" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">Your cart is empty</h3>
                    <p className="mt-2 max-w-xs text-sm text-black/45">
                      Looks like you haven't added anything yet.
                    </p>
                    <button
                      className="mt-6 flex h-12 items-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
                      onClick={continueShopping}
                    >
                      Start shopping
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item: any) => {
                      const deviceId = UserId ? item.DeviceId : item.deviceId
                      const quantity = UserId ? item.Quantity : item.quantity
                      const device = getDeviceById(deviceId)
                      if (!device) return null

                      return (
                        <motion.div
                          key={deviceId}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="rounded-2xl border border-black/[0.06] bg-[#fafaf9] p-5"
                        >
                          <div className="flex flex-col items-start gap-5 md:flex-row">
                            {/* Product Image */}
                            <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-white">
                              <img
                                src={device.Images[0] || "/placeholder.svg"}
                                alt={device.DeviceName}
                                className="h-full w-full object-contain p-2"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="w-full flex-grow">
                              <div className="flex flex-col justify-between gap-3 md:flex-row">
                                <div>
                                  <h3 className="text-[17px] font-semibold tracking-[-0.02em]">
                                    {device.DeviceName}
                                  </h3>
                                  <p className="mt-0.5 text-sm text-black/45">
                                    {device.Brand} · {device.Model}
                                  </p>
                                  <p className="mt-1 text-[13px] text-black/35">Condition: {device.Condition}</p>
                                  <button
                                    className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-black/60 transition-colors hover:text-black"
                                    onClick={() => toggleItemDetails(deviceId)}
                                  >
                                    <Info className="h-3.5 w-3.5" />
                                    {expandedItem === deviceId ? "Hide details" : "View details"}
                                  </button>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-semibold tracking-[-0.02em]">
                                    {formatCurrency(device.Price)}
                                  </p>
                                  <p className="text-[12px] text-black/35">{device.Quantity} in stock</p>
                                </div>
                              </div>

                              {/* Expanded Details */}
                              {expandedItem === deviceId && (
                                <div className="mt-4 rounded-xl border border-black/[0.06] bg-white p-4">
                                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/35">
                                    Specifications
                                  </span>
                                  <div className="mt-3 grid grid-cols-2 gap-2">
                                    {Object.entries(device.Specifications).map(([key, value]) => (
                                      <div key={key} className="text-[13px]">
                                        <span className="font-medium text-black/60">{key}:</span>{" "}
                                        <span className="text-black/45">{JSON.stringify(value)}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <p className="mt-3 text-[13px] leading-5 text-black/50">{device.Description}</p>
                                </div>
                              )}

                              {/* Quantity and Actions */}
                              <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-2">
                                  <button
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/60 transition-all duration-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black/60"
                                    onClick={() => toggleDecrementCart(deviceId)}
                                    disabled={quantity <= 1}
                                  >
                                    <Minus className="h-3.5 w-3.5" />
                                  </button>
                                  <span className="min-w-[28px] text-center text-sm font-semibold">{quantity}</span>
                                  <button
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/60 transition-all duration-300 hover:bg-black hover:text-white"
                                    onClick={() => toggleIncrementCart(deviceId)}
                                  >
                                    <Plus className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <div className="flex items-center gap-4">
                                  <p className="text-[13px] font-medium text-black/50">
                                    Subtotal:{" "}
                                    <span className="font-semibold text-black">
                                      {formatCurrency(device.Price * quantity)}
                                    </span>
                                  </p>
                                  <button
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-red-500 transition-all duration-300 hover:border-red-200 hover:bg-red-50"
                                    onClick={() => handleRemoval(deviceId)}
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Recommended Products */}
              {cartItems.length > 0 && (
                <div className="mt-6 rounded-[2rem] border border-black/[0.06] bg-white p-6 sm:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-px w-8 bg-black/25" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                      You might also like
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {deviceData
                      .filter(
                        (device) =>
                          !cartItems.some((item: any) => (UserId ? item.DeviceId : item.deviceId) === device.DeviceId),
                      )
                      .slice(0, 2)
                      .map((device) => (
                        <div
                          key={device.DeviceId}
                          className="flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-[#fafaf9] p-4"
                        >
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-white">
                            <img
                              src={device.Images[0] || "/placeholder.svg"}
                              alt={device.DeviceName}
                              className="h-full w-full object-contain p-1.5"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-sm font-semibold tracking-[-0.01em]">{device.DeviceName}</h3>
                            <p className="mt-1 text-sm font-semibold text-black/70">{formatCurrency(device.Price)}</p>
                          </div>
                          <button
                            className="flex h-9 items-center rounded-full bg-black px-4 text-[12px] font-semibold text-white transition-colors hover:bg-zinc-800"
                            onClick={() => addItem(device.DeviceId)}
                          >
                            Add
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* =================================================
                ORDER SUMMARY
            ================================================= */}
            <div className="lg:w-1/3">
              <div className="sticky top-6 rounded-[2rem] border border-black/[0.06] bg-white p-6 sm:p-8">
                <h2 className="mb-6 text-xl font-semibold tracking-[-0.03em]">Order summary</h2>

                <div className="mb-6 space-y-3.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-black/50">Subtotal</span>
                    <span className="font-medium">{formatCurrency(calculateSubtotal())}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-sm text-emerald-700">
                      <span>Discount (10%)</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}

                  <div className="border-t border-black/[0.07] pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-semibold">{formatCurrency(calculateTotal())}</span>
                    </div>
                    <p className="mt-1 text-[12px] text-black/35">Final price calculated at checkout</p>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label htmlFor="promo" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">
                    Promo code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow rounded-l-xl border border-r-0 border-black/10 bg-[#fafaf9] px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-black focus:bg-white"
                      placeholder="Enter code"
                      disabled={promoApplied}
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                      className={`rounded-r-xl px-5 text-[13px] font-semibold transition-colors ${promoApplied ? "bg-emerald-600 text-white" : "bg-black text-white hover:bg-zinc-800"
                        } ${!promoCode && !promoApplied ? "opacity-40" : ""}`}
                    >
                      {promoApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="mt-2 text-[13px] text-emerald-700">Promo code applied successfully!</p>
                  )}
                </div>

                {/* Checkout Button */}
                <button
                  disabled={cartItems.length === 0}
                  className={`group mb-5 flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-black text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 ${cartItems.length === 0
                      ? "cursor-not-allowed opacity-40"
                      : "hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
                    }`}
                  onClick={proceedToCheckout}
                >
                  <CreditCard className="h-4 w-4" />
                  Proceed to checkout
                </button>

                {/* Benefits */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-[#fafaf9] p-4">
                    <Truck className="mt-0.5 h-4.5 w-4.5 text-black/45" />
                    <div>
                      <p className="text-[13px] font-medium">Fast & reliable shipping</p>
                      <p className="mt-0.5 text-[12px] text-black/40">Most orders arrive in 3–5 business days</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-[#fafaf9] p-4">
                    <Shield className="mt-0.5 h-4.5 w-4.5 text-black/45" />
                    <div>
                      <p className="text-[13px] font-medium">Secure payment</p>
                      <p className="mt-0.5 text-[12px] text-black/40">Your payment details are processed securely</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-[#fafaf9] p-4">
                    <Clock className="mt-0.5 h-4.5 w-4.5 text-black/45" />
                    <div>
                      <p className="text-[13px] font-medium">30-day returns</p>
                      <p className="mt-0.5 text-[12px] text-black/40">Return any item within 30 days, full refund</p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 flex items-center justify-between border-t border-black/[0.07] pt-5">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-black/30">We accept</span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-6 w-9 rounded-md border border-black/10 bg-[#fafaf9]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShoppingCart