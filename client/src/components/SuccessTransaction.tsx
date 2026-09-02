"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { jsPDF } from "jspdf"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Check, Home, Receipt } from "lucide-react"
import { clearCartAsync } from "@/state/features/cartSlice"

export const SuccessTransaction = () => {
  const { UserId } = useParams()
  const { SessionId } = useParams()
  const [price, setPrice] = useState(0)
  const [created, setCreated] = useState("")
  const [refNo, setrefNo] = useState("")
  const [name, setName] = useState("")
  const [IsLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/transactionData/${SessionId}`)
        setPrice(response.data.data.price)
        setrefNo(response.data.data.TransactionId.substring(0, 8))
        setCreated(format(new Date(response.data.data.createdAt), "dd/MM/yyyy, HH:mm:ss"))
        setName(response.data.User.username)
      } catch (error) {
        console.error("Error fetching transaction data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [SessionId])

  // Function to generate and download a PDF receipt
  const downloadReceipt = () => {
    const doc = new jsPDF()

    doc.setFont("helvetica", "bold")
    doc.setFontSize(22)
    doc.text("Payment Receipt", 20, 20)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(14)
    doc.text(`Reference ID: ${refNo}`, 20, 40)
    doc.text(`Payment Time: ${created}`, 20, 50)
    doc.text(`Payment Method: Bank Transfer`, 20, 60)
    doc.text(`Sender Name: ${name}`, 20, 70)
    doc.text(`Total Payment: $${price}`, 20, 80)

    doc.save(`Receipt_${refNo}.pdf`)
  }

  function handleNavigation() {
    //@ts-ignore
    dispatch(clearCartAsync({ UserId }));
    navigate(`/dashboard/${UserId}`);
  }

  if (IsLoading) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center bg-[#f7f7f5] p-4 font-roboto">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[20vw] font-black leading-none tracking-[-0.08em] text-black/[0.02]">
          GIZMO
        </div>
        <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-black/[0.06] bg-white px-7 py-10">
          <div className="flex animate-pulse flex-col items-center">
            <div className="mb-5 h-16 w-16 rounded-full bg-black/[0.06]" />
            <div className="mb-2 h-5 w-2/3 rounded-full bg-black/[0.06]" />
            <div className="mb-6 h-9 w-1/3 rounded-full bg-black/[0.06]" />
            <div className="grid w-full grid-cols-2 gap-3">
              <div className="h-16 rounded-2xl bg-black/[0.04]" />
              <div className="h-16 rounded-2xl bg-black/[0.04]" />
              <div className="h-16 rounded-2xl bg-black/[0.04]" />
              <div className="h-16 rounded-2xl bg-black/[0.04]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#f7f7f5] p-4 py-12 font-roboto">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[20vw] font-black leading-none tracking-[-0.08em] text-black/[0.02]">
          GIZMO
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md rounded-[2rem] border border-black/[0.06] bg-white px-6 py-9 sm:px-8"
      >
        {/* Success icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black">
            <Check className="h-7 w-7 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Eyebrow + title */}
        <div className="mb-1 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-black/20" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">Order confirmed</span>
          <span className="h-px w-6 bg-black/20" />
        </div>
        <h1 className="mb-6 text-center text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          Payment <span className="font-light italic text-black/35">successful.</span>
        </h1>

        <div className="mb-6 h-px w-full bg-black/[0.07]" />

        {/* Amount */}
        <div className="mb-6 text-center">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.2em] text-black/40">Total payment</h2>
          <p className="mt-2 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">${price}</p>
        </div>

        {/* Details */}
        <div className="mb-6 grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl border border-black/[0.06] bg-[#fafaf9] p-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/35">Reference ID</h3>
            <p className="mt-1 truncate text-[13px] font-medium">{refNo}</p>
          </div>
          <div className="rounded-2xl border border-black/[0.06] bg-[#fafaf9] p-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/35">Payment time</h3>
            <p className="mt-1 truncate text-[13px] font-medium">{created}</p>
          </div>
          <div className="rounded-2xl border border-black/[0.06] bg-[#fafaf9] p-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/35">Payment method</h3>
            <p className="mt-1 text-[13px] font-medium">Bank transfer</p>
          </div>
          <div className="rounded-2xl border border-black/[0.06] bg-[#fafaf9] p-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/35">Sender name</h3>
            <p className="mt-1 truncate text-[13px] font-medium">{name}</p>
          </div>
        </div>

        <div className="mb-6 h-px w-full bg-black/[0.07]" />

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleNavigation}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-black/15 bg-white text-[13px] font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:border-black/30"
          >
            <Home className="h-4 w-4" />
            Continue shopping
          </button>
          <button
            onClick={downloadReceipt}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
          >
            <Receipt className="h-4 w-4" />
            Get receipt
          </button>
        </div>
      </motion.div>
    </div>
  )
}