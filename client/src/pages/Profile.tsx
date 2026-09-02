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
  ArrowUpRight,
  Settings,
} from "lucide-react"
import { motion } from "framer-motion"
import axios from "axios"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { getAvatarUrl, handleAvatarError } from "../utils/avatar"

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
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-black/10 border-t-black"></div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#f7f7f5] text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/30">Gizmo</span>
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">User not found</h2>
        <p className="text-sm text-black/45">The requested profile could not be found.</p>
      </div>
    )
  }

  function handleSignOut() {
    toast.success("Signed out successfully");
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

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "transactions", label: "Transactions" },
    { id: "wishlist", label: "Wishlist" },
    { id: "settings", label: "Settings" },
  ]

  return (
    <div className="min-h-screen bg-[#f7f7f5] font-roboto text-black">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-black py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-[-0.08em] text-white/[0.035]">
          GIZMO
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 lg:px-14">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="relative">
              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white/90 bg-white/10">
                <img
                  src={getAvatarUrl(userData.img)}
                  onError={handleAvatarError}
                  alt={userData.username}
                  className="h-full w-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-colors hover:bg-black hover:text-white">
                <Edit className="h-4 w-4" />
              </button>
            </div>

            <div className="text-center md:text-left">
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">Account</span>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{userData.username}</h1>

              <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/50 md:justify-start">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{userData.identifier}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Member since {memberSince}</span>
                </div>
              </div>
            </div>

            <div className="md:ml-auto">
              <button
                className="flex h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black"
                onClick={handleSignOut}
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TABS
      ===================================================== */}
      <section className="border-b border-black/[0.06] bg-[#f7f7f5]">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-8 lg:px-14">
          <div className="flex flex-wrap gap-2.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`rounded-full px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${activeTab === tab.id
                  ? "bg-black text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
                  : "border border-black/10 bg-white text-black/60 hover:border-black/25 hover:text-black"
                  }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-14">
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Account Statistics */}
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-black/25" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                    Account statistics
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <div className="rounded-[2rem] border border-black/[0.06] bg-white p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[13px] text-black/45">Total transactions</p>
                        <h3 className="mt-1 text-3xl font-bold tracking-[-0.03em]">{userData.transactions?.length || 0}</h3>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="mt-4 border-t border-black/[0.06] pt-4">
                      <p className="text-[13px] text-black/40">Completed purchases</p>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-black/[0.06] bg-white p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[13px] text-black/45">Total spent</p>
                        <h3 className="mt-1 text-3xl font-bold tracking-[-0.03em]">{formatCurrency(totalSpent)}</h3>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black">
                        <CreditCard className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="mt-4 border-t border-black/[0.06] pt-4">
                      <p className="text-[13px] text-black/40">Across all transactions</p>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-black/[0.06] bg-white p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[13px] text-black/45">Average transaction</p>
                        <h3 className="mt-1 text-3xl font-bold tracking-[-0.03em]">{formatCurrency(averageOrder)}</h3>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black">
                        <ShoppingBag className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="mt-4 border-t border-black/[0.06] pt-4">
                      <p className="text-[13px] text-black/40">Per transaction value</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wishlist Summary */}
              <div className="mb-12">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black p-7 text-white sm:p-9">
                  <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/[0.06]" />
                  <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/[0.06]" />

                  <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="text-center md:text-left">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                        Wishlist status
                      </span>
                      <h3 className="mt-2 flex items-center justify-center gap-2.5 text-2xl font-semibold tracking-[-0.03em] md:justify-start">
                        <Heart className="h-5 w-5" />
                        {userData.WishListDevices?.length || 0} items saved
                      </h3>
                      <p className="mt-2 text-sm text-white/45">
                        Devices you've saved for later, all in one place.
                      </p>
                    </div>
                    <NavLink
                      to={UserId == undefined ? "/dashboard/wishlist" : `/dashboard/${UserId}/wishlist`}
                      className="group flex h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold text-black transition-all duration-300 hover:-translate-y-0.5"
                    >
                      View wishlist
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-black/25" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                      Recent transactions
                    </span>
                  </div>
                  <button
                    className="flex items-center gap-1 text-[13px] font-semibold text-black/60 transition-colors hover:text-black"
                    onClick={() => setActiveTab("transactions")}
                  >
                    View all <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {userData.transactions?.slice(0, 3).map((transaction: any) => (
                    <div key={transaction.TransactionId} className="rounded-2xl border border-black/[0.06] bg-white p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
                          Transaction #{transaction.TransactionId.substring(0, 8)}
                        </h3>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-emerald-700">
                          {transaction.paymentStatus}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between text-[13px]">
                        <span className="text-black/40">{formatDate(transaction.createdAt)}</span>
                        <span className="font-medium">{formatCurrency(transaction.price)}</span>
                      </div>
                      <div className="mt-3 border-t border-black/[0.06] pt-3">
                        <span className="text-[12px] text-black/35">
                          Session: {transaction.sessionId.substring(0, 15)}...
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "transactions" && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-black/25" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                  Transaction history
                </span>
              </div>

              {userData.transactions?.length > 0 ? (
                <div className="space-y-3">
                  {userData.transactions.map((transaction: any) => (
                    <div key={transaction.TransactionId} className="rounded-2xl border border-black/[0.06] bg-white p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
                          Transaction #{transaction.TransactionId.substring(0, 8)}
                        </h3>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-emerald-700">
                          {transaction.paymentStatus}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between text-[13px]">
                        <span className="text-black/40">{formatDate(transaction.createdAt)}</span>
                        <span className="font-medium">{formatCurrency(transaction.price)}</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] pt-3">
                        <span className="text-[12px] text-black/35">
                          Session: {transaction.sessionId.substring(0, 15)}...
                        </span>
                        <button className="text-[13px] font-semibold text-black/60 underline underline-offset-4 transition-colors hover:text-black">
                          View details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center rounded-[2rem] border border-black/[0.06] bg-white py-16 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-[#fafaf9]">
                    <ShoppingBag className="h-6 w-6 text-black/30" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">No transactions yet</h3>
                  <p className="mt-1 text-sm text-black/45">You haven't made any purchases yet.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "wishlist" && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-black/25" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">Your wishlist</span>
              </div>

              {userData.WishListDevices?.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {userData.WishListDevices.map((deviceId: string) => (
                    <div key={deviceId} className="rounded-2xl border border-black/[0.06] bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
                            Device ID: {deviceId.substring(0, 8)}...
                          </h3>
                          <p className="mt-1 text-[13px] text-black/40">Added to wishlist</p>
                        </div>
                        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black/50 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500">
                          <Heart className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-3">
                        <button className="text-[13px] font-semibold text-black/60 underline underline-offset-4 transition-colors hover:text-black">
                          View device
                        </button>
                        <button className="rounded-full bg-black px-4 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-zinc-800">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center rounded-[2rem] border border-black/[0.06] bg-white py-16 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-[#fafaf9]">
                    <Heart className="h-6 w-6 text-black/30" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">Your wishlist is empty</h3>
                  <p className="mt-1 text-sm text-black/45">Save items to find them easily later.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-black/25" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                  Account settings
                </span>
              </div>

              <div className="mb-5 rounded-[2rem] border border-black/[0.06] bg-white p-6 sm:p-7">
                <h3 className="mb-5 text-lg font-semibold tracking-[-0.02em]">Personal information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">
                        Username
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-xl border border-black/10 bg-[#fafaf9] px-4 py-2.5 text-[14px] text-black/70 outline-none"
                        value={userData.username}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full rounded-xl border border-black/10 bg-[#fafaf9] px-4 py-2.5 text-[14px] text-black/70 outline-none"
                        value={userData.identifier}
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">
                      Authentication type
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-black/10 bg-[#fafaf9] px-4 py-2.5 text-[14px] text-black/70 outline-none"
                      value={userData.authType}
                      readOnly
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="flex h-11 items-center gap-2 rounded-full bg-black px-5 text-[13px] font-semibold text-white transition-colors hover:bg-zinc-800">
                    <Settings className="h-3.5 w-3.5" />
                    Edit profile
                  </button>
                </div>
              </div>

              <div className="rounded-[2rem] border border-black/[0.06] bg-white p-6 sm:p-7">
                <h3 className="mb-5 text-lg font-semibold tracking-[-0.02em]">Account security</h3>
                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-xl border border-black/10 bg-[#fafaf9] px-4 py-2.5 text-[14px] text-black/70 outline-none"
                    value="••••••••••"
                    readOnly
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="flex h-11 items-center gap-2 rounded-full bg-black px-5 text-[13px] font-semibold text-white transition-colors hover:bg-zinc-800">
                    Change password
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}