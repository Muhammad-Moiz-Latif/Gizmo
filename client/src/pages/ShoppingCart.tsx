"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Truck, Info, Shield, Clock } from "lucide-react"
import type { RootState } from "@/state/store"
import { updateCartAsync, addToCartAsync } from "@/state/features/cartSlice"
import { updateLocalCartItem, updateLocalCart, removeCartItemfromLocalStorage } from "@/state/features/localcartSlice"
import { RemoveFromCartAsync } from "@/state/features/cartSlice"
import toast from "react-hot-toast"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"

export const ShoppingCart = () => {
  const { UserId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get data from Redux store
  const Cart = useSelector((state: RootState) => state.cart.list)
  const localCart = useSelector((state: RootState) => state.localCart.list)
  const deviceData = useSelector((state: RootState) => state.device.devices)

  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [promoCode, setPromoCode] = useState<string>("")
  const [promoApplied, setPromoApplied] = useState<boolean>(false)
  const [discountAmount, setDiscountAmount] = useState<number>(0)

  // Determine which cart to use based on login status
  const cartItems = UserId ? Cart : localCart

  // Function to get device details by ID
  const getDeviceById = (deviceId: string) => {
    return deviceData.find((device) => device.DeviceId === deviceId)
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
    const payDevices = deviceData.filter((device) =>
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
    <div className="bg-white min-h-screen font-sans pt-16">
      {/* Hero Section */}
      <section className="bg-black text-white py-12 px-4 relative z-20">
        <div className="absolute inset-0 w-full h-full bg-black opacity-70 z-10"></div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black to-transparent z-20"></div>

        <div className="max-w-6xl mx-auto relative z-30">
          <h1 className="text-3xl md:text-4xl font-bold">Your Shopping Cart</h1>
          <p className="text-lg mt-2 text-gray-300">Review your items and proceed to checkout</p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Cart Items ({cartItems.length})</h2>
                  <button className="text-black flex items-center hover:underline" onClick={continueShopping}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-black">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <button
                      className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                      onClick={continueShopping}
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item: any) => {
                      const deviceId = UserId ? item.DeviceId : item.deviceId
                      const quantity = UserId ? item.Quantity : item.quantity
                      const device = getDeviceById(deviceId)
                      if (!device) return null

                      return (
                        <div key={deviceId} className="border-b border-gray-200 pb-6">
                          <div className="flex flex-col md:flex-row items-start">
                            {/* Product Image */}
                            <div className="w-full md:w-32 h-32 bg-gray-100 rounded-md overflow-hidden mb-4 md:mb-0 flex-shrink-0">
                              <img
                                src={device.Images[0] || "/placeholder.svg"}
                                alt={device.DeviceName}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="md:ml-6 flex-grow">
                              <div className="flex flex-col md:flex-row justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold text-black">{device.DeviceName}</h3>
                                  <p className="text-gray-500">
                                    {device.Brand} | {device.Model}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">Condition: {device.Condition}</p>
                                  <button
                                    className="text-sm text-black mt-2 flex items-center hover:underline"
                                    onClick={() => toggleItemDetails(deviceId)}
                                  >
                                    {expandedItem === deviceId ? "Hide details" : "View details"}
                                    <Info className="w-4 h-4 ml-1" />
                                  </button>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                  <p className="text-lg font-semibold text-black">{formatCurrency(device.Price)}</p>
                                  <p className="text-sm text-gray-500">{device.Quantity} in stock</p>
                                </div>
                              </div>

                              {/* Expanded Details */}
                              {expandedItem === deviceId && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                                  <h4 className="font-medium text-black mb-2">Specifications:</h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(device.Specifications).map(([key, value]) => (
                                      <div key={key} className="text-sm">
                                        <span className="font-medium text-gray-700">{key}:</span>{" "}
                                        {JSON.stringify(value)}
                                      </div>
                                    ))}
                                  </div>
                                  <p className="text-sm mt-3">{device.Description}</p>
                                </div>
                              )}

                              {/* Quantity and Actions */}
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
                                <div className="flex items-center border border-gray-300 rounded-md">
                                  <button
                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    onClick={() => toggleDecrementCart(deviceId)}
                                    disabled={quantity <= 1}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                                  <button
                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    onClick={() => toggleIncrementCart(deviceId)}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="flex items-center mt-4 md:mt-0">
                                  <p className="font-semibold text-black mr-4">
                                    Subtotal: {formatCurrency(device.Price * quantity)}
                                  </p>
                                  <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleRemoval(deviceId)}
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Recommended Products */}
              {cartItems.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-black mb-4">You Might Also Like</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {deviceData
                      .filter(
                        (device) =>
                          !cartItems.some((item: any) => (UserId ? item.DeviceId : item.deviceId) === device.DeviceId),
                      )
                      .slice(0, 2)
                      .map((device) => (
                        <div key={device.DeviceId} className="flex items-center p-3 border border-gray-200 rounded-md">
                          <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={device.Images[0] || "/placeholder.svg"}
                              alt={device.DeviceName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-grow">
                            <h3 className="font-medium text-black">{device.DeviceName}</h3>
                            <p className="text-black font-semibold mt-1">{formatCurrency(device.Price)}</p>
                          </div>
                          <button className="bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800 transition-colors" onClick={() => addItem(device.DeviceId)}>
                            Add
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-bold text-black mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-black font-medium">{formatCurrency(calculateSubtotal())}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-black">Total</span>
                      <span className="text-lg font-bold text-black">{formatCurrency(calculateTotal())}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Final price will be calculated at checkout</p>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-1">
                    Promo Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-black focus:border-black"
                      placeholder="Enter code"
                      disabled={promoApplied}
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                      className={`px-4 py-2 font-medium rounded-r-md ${promoApplied ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"
                        } transition-colors ${!promoCode && "opacity-50 cursor-not-allowed"}`}
                    >
                      {promoApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {promoApplied && <p className="text-sm text-green-600 mt-1">Promo code applied successfully!</p>}
                </div>

                {/* Checkout Button */}
                <button
                  disabled={cartItems.length === 0}
                  className={`w-full bg-black text-white py-3 px-4 rounded-md font-medium flex items-center justify-center ${cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
                    } transition-colors mb-4`}
                  onClick={proceedToCheckout}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </button>

                {/* Benefits Section (replacing tax and shipping) */}
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md flex items-start">
                    <Truck className="w-5 h-5 text-gray-700 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-black">Fast & Reliable Shipping</p>
                      <p className="text-xs text-gray-500 mt-1">Most orders delivered within 3-5 business days</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-md flex items-start">
                    <Shield className="w-5 h-5 text-gray-700 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-black">Secure Payment</p>
                      <p className="text-xs text-gray-500 mt-1">Your payment information is processed securely</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-md flex items-start">
                    <Clock className="w-5 h-5 text-gray-700 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-black">30-Day Returns</p>
                      <p className="text-xs text-gray-500 mt-1">Return any item within 30 days for a full refund</p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-2">We accept:</p>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
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

