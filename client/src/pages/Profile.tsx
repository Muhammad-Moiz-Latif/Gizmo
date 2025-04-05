"use client"

import { useEffect, useState } from "react"
import {
  Mail,
  Calendar,
  CreditCard,
  Edit,
  LogOut,
  ShoppingBag,
  Heart,
  ChevronRight,
  Package,
} from "lucide-react"
import axios from "axios"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"

export default function UserProfile() {
  const { UserId } = useParams();
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Calculate total spent from transactions
  const calculateTotalSpent = (transactions: any[]) => {
    return transactions.reduce((total, transaction) => total + transaction.price, 0)
  }

  // Calculate average order value
  const calculateAverageOrder = (transactions: any[]) => {
    if (transactions.length === 0) return 0
    return calculateTotalSpent(transactions) / transactions.length
  }

  useEffect(() => {
    window.scroll(0, 0);
    async function getData() {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/UserDashboard/${UserId}`)
        if (response && response.data) {
          setUserData(response.data.UserInfo);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (UserId) {
      getData()
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
          <p className="text-gray-500">The requested user profile could not be found.</p>
        </div>
      </div>
    )
  }

  function handleSignOut() {
      toast.success("SignOut successful", {
        style: {}
      });
      localStorage.removeItem('Cart');
      localStorage.removeItem('WishList');
      setTimeout(() => {
        navigate('/dashboard', { replace: true })
        window.location.reload();
      }, 1000);
    }
  


  const totalSpent = calculateTotalSpent(userData.transactions || [])
  const averageOrder = calculateAverageOrder(userData.transactions || [])
  const memberSince = userData.createdAt ? formatDate(userData.createdAt) : "N/A"

  return (
    <div className="bg-white min-h-screen font-sans pt-10">
      {/* Hero Section */}
      <section className="bg-black text-white py-16 px-4 relative z-20">
        <div className="absolute inset-0 w-full h-full bg-black opacity-70 z-10"></div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black to-transparent z-20"></div>

        <div className="max-w-6xl mx-auto relative z-30">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white">
                <img
                  src={userData.img || "/placeholder.svg?height=200&width=200"}
                  alt={userData.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full border-2 border-white">
                <Edit className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold">{userData.username}</h1>
              <p className="text-gray-300 mt-1">{userData.identifier}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{userData.identifier}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Member since {memberSince}</span>
                </div>
              </div>
            </div>

            <div className="md:ml-auto flex gap-3">
              <button className="bg-transparent border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black transition-colors" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 inline mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === "overview" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === "transactions" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"}`}
              onClick={() => setActiveTab("transactions")}
            >
              Transactions
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === "wishlist" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"}`}
              onClick={() => setActiveTab("wishlist")}
            >
              Wishlist
            </button>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {activeTab === "overview" && (
            <div>
              {/* Account Statistics */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-black">Account Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Total Transactions</p>
                        <h3 className="text-3xl font-bold text-black mt-1">{userData.transactions?.length || 0}</h3>
                      </div>
                      <div className="p-3 bg-black rounded-full">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500">Completed purchases</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Total Spent</p>
                        <h3 className="text-3xl font-bold text-black mt-1">{formatCurrency(totalSpent)}</h3>
                      </div>
                      <div className="p-3 bg-black rounded-full">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500">Across all transactions</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Average Transaction</p>
                        <h3 className="text-3xl font-bold text-black mt-1">{formatCurrency(averageOrder)}</h3>
                      </div>
                      <div className="p-3 bg-black rounded-full">
                        <ShoppingBag className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500">Per transaction value</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wishlist Summary */}
              <div className="mb-12">
                <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg shadow-lg text-white">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <p className="text-gray-300 text-sm">Wishlist Status</p>
                      <h3 className="text-2xl font-bold mt-1 flex items-center">
                        <Heart className="w-6 h-6 mr-2" />
                        {userData.WishListDevices?.length || 0} Items in Wishlist
                      </h3>
                      <p className="mt-2 text-gray-300">
                        You have {userData.WishListDevices?.length || 0} devices saved to your wishlist
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <NavLink to={(UserId == undefined ? "/dashboard/wishlist" : `/dashboard/${UserId}/wishlist`)} className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors">
                        View Wishlist
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Recent Transactions</h2>
                  <button
                    className="text-sm text-black font-medium flex items-center hover:underline"
                    onClick={() => setActiveTab("transactions")}
                  >
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>

                <div className="space-y-4">
                  {userData.transactions?.slice(0, 3).map((transaction: any) => (
                    <div
                      key={transaction.TransactionId}
                      className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-black">
                          Transaction #{transaction.TransactionId.substring(0, 8)}
                        </h3>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {transaction.paymentStatus}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-gray-500">{formatDate(transaction.createdAt)}</span>
                        <span className="text-black font-medium">{formatCurrency(transaction.price)}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Session: {transaction.sessionId.substring(0, 15)}...
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black">Transaction History</h2>

              {userData.transactions?.length > 0 ? (
                <div className="space-y-4">
                  {userData.transactions.map((transaction: any) => (
                    <div
                      key={transaction.TransactionId}
                      className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-black">
                          Transaction #{transaction.TransactionId.substring(0, 8)}
                        </h3>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {transaction.paymentStatus}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-gray-500">{formatDate(transaction.createdAt)}</span>
                        <span className="text-black font-medium">{formatCurrency(transaction.price)}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Session: {transaction.sessionId.substring(0, 15)}...
                        </span>
                        <button className="text-sm text-black font-medium hover:underline">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Yet</h3>
                  <p className="text-gray-500">You haven't made any purchases yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black">Your Wishlist</h2>

              {userData.WishListDevices?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userData.WishListDevices.map((deviceId: string) => (
                    <div key={deviceId} className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-black">Device ID: {deviceId.substring(0, 8)}...</h3>
                          <p className="text-sm text-gray-500 mt-1">Added to wishlist</p>
                        </div>
                        <button className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100">
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <button className="text-sm text-black font-medium hover:underline">View Device</button>
                        <button className="text-sm bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your Wishlist is Empty</h3>
                  <p className="text-gray-500">Save items to your wishlist to find them easily later.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black">Account Settings</h2>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={userData.username}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={userData.identifier}
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Authentication Type</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={userData.authType}
                      readOnly
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Account Security</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value="••••••••••"
                      readOnly
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

