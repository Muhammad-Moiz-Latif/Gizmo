"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Truck, Info } from 'lucide-react'
import { RootState } from "@/state/store"


export const ShoppingCart = () => {
  // Get data from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.list);
  const deviceData = useSelector((state: RootState) => state.device.devices);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Function to get device details by ID
  const getDeviceById = (deviceId: string) => {
    return deviceData.find(device => device.DeviceId === deviceId);
  };

  // Function to update quantity
  const updateQuantity = (deviceId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const device = getDeviceById(deviceId);
    if (!device) return;
    
    // Check if new quantity exceeds available stock
    if (newQuantity > device.Quantity) {
      alert(`Sorry, only ${device.Quantity} units available in stock.`);
      return;
    }
    
    // In a real implementation, this would dispatch an action to update Redux state
    // dispatch(updateCartItemQuantity({ deviceId, quantity: newQuantity }));
    console.log(`Update quantity for ${deviceId} to ${newQuantity}`);
  };

  // Function to remove item from cart
  const removeItem = (deviceId: string) => {
    // In a real implementation, this would dispatch an action to update Redux state
    // dispatch(removeCartItem(deviceId));
    console.log(`Remove item ${deviceId} from cart`);
  };

  // Function to toggle item details
  const toggleItemDetails = (deviceId: string) => {
    setExpandedItem(expandedItem === deviceId ? null : deviceId);
  };

  // Function to apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setPromoApplied(true);
      setDiscountAmount(calculateSubtotal() * 0.1); // 10% discount
    } else {
      alert("Invalid promo code");
      setPromoApplied(false);
      setDiscountAmount(0);
    }
  };

  // Calculate subtotal
  const calculateSubtotal = (): number => {
    return cartItems.reduce((total, item) => {
      const device = getDeviceById(item.DeviceId);
  
      return total + (device?.Price ? device.Price * (item.Quantity) : 0);
    }, 0);
  };
  
  // Calculate tax (assuming 8%)
  const calculateTax = (): number => {
    return calculateSubtotal() * 0.08;
  };

  // Calculate shipping (flat rate for demo)
  const calculateShipping = (): number => {
    return calculateSubtotal() > 0 ? 12.99 : 0;
  };

  // Calculate total
  const calculateTotal = (): number => {
    return calculateSubtotal() + calculateTax() + calculateShipping() - discountAmount;
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white min-h-screen font-sans pt-16">
      {/* Hero Section */}
      <section className="bg-black text-white py-12 px-4 relative z-20">
        <div className="absolute inset-0 w-full h-full bg-black opacity-70 z-10"></div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black to-transparent z-20"></div>

        <div className="max-w-6xl mx-auto relative z-30">
          <h1 className="text-3xl md:text-4xl font-bold">Your Shopping Cart</h1>
          <p className="text-lg mt-2 text-gray-300">
            Review your items and proceed to checkout
          </p>
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
                  <button className="text-black flex items-center hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-black">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item :any) => {
                      const device = getDeviceById(item.DeviceId);
                      if (!device) return null;
                      
                      return (
                        <div key={item.DeviceId} className="border-b border-gray-200 pb-6">
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
                                  <p className="text-gray-500">{device.Brand} | {device.Model}</p>
                                  <p className="text-sm text-gray-500 mt-1">Condition: {device.Condition}</p>
                                  <button 
                                    className="text-sm text-black mt-2 flex items-center hover:underline"
                                    onClick={() => toggleItemDetails(item.DeviceId)}
                                  >
                                    {expandedItem === item.DeviceId ? "Hide details" : "View details"}
                                    <Info className="w-4 h-4 ml-1" />
                                  </button>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                  <p className="text-lg font-semibold text-black">{formatCurrency(device.Price)}</p>
                                  <p className="text-sm text-gray-500">
                                    {device.Quantity} in stock
                                  </p>
                                </div>
                              </div>
                              
                              {/* Expanded Details */}
                              {expandedItem === item.DeviceId && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                                  <h4 className="font-medium text-black mb-2">Specifications:</h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(device.Specifications).map(([key, value]) => (
                                      <div key={key} className="text-sm">
                                        <span className="font-medium text-gray-700">{key}:</span> {JSON.stringify(value)}
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
                                    onClick={() => updateQuantity(item.DeviceId, item.Quantity - 1)}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="px-4 py-1 border-x border-gray-300">{item.Quantity}</span>
                                  <button 
                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    onClick={() => updateQuantity(item.DeviceId, item.Quantity + 1)}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="flex items-center mt-4 md:mt-0">
                                  <p className="font-semibold text-black mr-4">
                                    Subtotal: {formatCurrency(device.Price * item.Quantity)}
                                  </p>
                                  <button 
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => removeItem(item.DeviceId)}
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
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
                      .filter(device => !cartItems.some(item => item.DeviceId === device.DeviceId))
                      .slice(0, 2)
                      .map(device => (
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
                          <button className="bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800 transition-colors">
                            Add
                          </button>
                        </div>
                      ))
                    }
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
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="text-black font-medium">{formatCurrency(calculateTax())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-black font-medium">{formatCurrency(calculateShipping())}</span>
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
                      className={`px-4 py-2 font-medium rounded-r-md ${
                        promoApplied
                          ? "bg-green-600 text-white"
                          : "bg-black text-white hover:bg-gray-800"
                      } transition-colors ${
                        !promoCode && "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      {promoApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-green-600 mt-1">
                      Promo code applied successfully!
                    </p>
                  )}
                </div>
                
                {/* Checkout Button */}
                <button
                  disabled={cartItems.length === 0}
                  className={`w-full bg-black text-white py-3 px-4 rounded-md font-medium flex items-center justify-center ${
                    cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
                  } transition-colors mb-4`}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </button>
                
                {/* Shipping Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <div className="flex items-start">
                    <Truck className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-black">Free shipping on orders over $100</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Estimated delivery: 3-5 business days
                      </p>
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
