"use client"

import type React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../state/store"
import { useParams, useNavigate } from "react-router-dom"
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import { deleteFromWishListAsync } from "../state/features/wishSlice"
import { removefromLocalStorage, updateLocalStorage } from "@/state/features/localwishSlice"
import { addToCartAsync, updateCartAsync } from "../state/features/cartSlice"
import { addCartItemtoLocalStorage, updateLocalCart, updateLocalCartItem } from "@/state/features/localcartSlice"
import toast from "react-hot-toast"

export const WishlistPage: React.FC = () => {
  const { UserId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get data from Redux store
  const allDevices = useSelector((state: RootState) => state.device.devices)
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
    <div className="bg-white min-h-screen pt-20 px-4 sm:px-6 lg:px-16 font-roboto">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate(UserId ? `/dashboard/${UserId}` : "/dashboard")}
              className="flex items-center text-gray-600 hover:text-black transition-colors mb-4"
            >
              <ArrowLeft size={18} className="mr-2" />
              <span>Back to Shopping</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-500 mt-1">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((device) => (
              <div
                key={device.DeviceId}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg flex flex-col"
              >
                {/* Image */}
                <div
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => viewProductDetails(device.DeviceId)}
                >
                  <img
                    src={device.Images[0] || "/placeholder.svg"}
                    alt={device.DeviceName}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromWishlist(device.DeviceId)
                    }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={16} className="text-gray-700" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-gray-500 uppercase">{device.Brand}</span>
                    <h2
                      className="text-lg font-semibold text-gray-900 line-clamp-1 cursor-pointer hover:text-gray-700 transition-colors"
                      onClick={() => viewProductDetails(device.DeviceId)}
                    >
                      {device.DeviceName}
                    </h2>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{device.Description}</p>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-gray-900">${device.Price.toFixed(2)}</span>
                      {device.Condition === "New" && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">New</span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(device.DeviceId)}
                      className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save items you love to your wishlist and find them here anytime.</p>
            <button
              onClick={() => navigate(UserId ? `/dashboard/${UserId}` : "/dashboard")}
              className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

