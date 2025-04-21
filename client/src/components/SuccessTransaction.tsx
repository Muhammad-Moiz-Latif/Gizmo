"use client"

import { useEffect, useState } from "react"
import checked from "../assets/checked.png"
import home from "../assets/home.png"
import reciept from "../assets/receipt.png"
import { format } from "date-fns"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { jsPDF } from "jspdf"
import { useDispatch } from "react-redux"
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
        const response = await axios.get(`http://localhost:3000/transactionData/${SessionId}`)
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

  if (IsLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center font-roboto p-4">
        <div className="w-full max-w-md rounded-3xl flex flex-col items-center justify-center px-6 py-8 border border-green-200 bg-green-50">
          <div className="animate-pulse flex flex-col items-center w-full">
            <div className="rounded-full bg-green-300 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 mb-4"></div>
            <div className="h-6 bg-green-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-green-200 rounded w-3/4 mb-4"></div>
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="h-14 bg-green-200 rounded"></div>
              <div className="h-14 bg-green-200 rounded"></div>
              <div className="h-14 bg-green-200 rounded"></div>
              <div className="h-14 bg-green-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function handleNavigation(){
    //@ts-ignore
    dispatch(clearCartAsync({ UserId }));
    navigate(`/dashboard/${UserId}`);
  }
  
  return (
    <div className="w-full min-h-screen flex justify-center items-center font-roboto p-4 py-8">
      <div className="w-full max-w-md rounded-3xl flex flex-col items-center px-4 sm:px-6 md:px-8 py-6 border border-green-200 bg-green-50">
        {/* Success Icon */}
        <div className="bg-green-300 rounded-full p-2 mb-4">
          <div className="bg-green-400 rounded-full p-2">
            <div className="bg-green-500 rounded-full p-2">
              <img
                src={checked || "/placeholder.svg"}
                alt="Success"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-medium pb-3 text-green-800 text-center">Payment Successful!</h1>

        {/* Divider */}
        <hr className="bg-green-600 w-full h-[2px] mb-3" />

        {/* Payment Amount */}
        <h2 className="text-green-800 text-sm sm:text-base">Total Payment</h2>
        <p className="text-3xl sm:text-4xl md:text-5xl font-medium text-green-700 mb-4">${price}</p>

        {/* Transaction Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mb-4">
          <div className="flex flex-col border border-green-700 bg-green-100 p-2 items-start justify-center rounded-lg">
            <h1 className="text-green-600 text-xs sm:text-sm">Reference Id</h1>
            <h1 className="text-green-900 text-xs sm:text-sm font-medium truncate w-full">{refNo}</h1>
          </div>
          <div className="flex flex-col border border-green-700 bg-green-100 p-2 items-start justify-center rounded-lg">
            <h1 className="text-green-600 text-xs sm:text-sm">Payment Time</h1>
            <h1 className="text-green-900 text-xs sm:text-sm font-medium truncate w-full">{created}</h1>
          </div>
          <div className="flex flex-col border border-green-700 bg-green-100 p-2 items-start justify-center rounded-lg">
            <h1 className="text-green-600 text-xs sm:text-sm">Payment Method</h1>
            <h1 className="text-green-900 text-xs sm:text-sm font-medium">Bank Transfer</h1>
          </div>
          <div className="flex flex-col border border-green-700 bg-green-100 p-2 items-start justify-center rounded-lg">
            <h1 className="text-green-600 text-xs sm:text-sm">Sender Name</h1>
            <h1 className="text-green-900 text-xs sm:text-sm font-medium truncate w-full">{name}</h1>
          </div>
        </div>

        {/* Divider */}
        <hr className="bg-green-600 w-full h-[2px] mb-5" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row w-full gap-3 mt-2">
          <button
            onClick={handleNavigation}
            className="w-full h-12 border border-green-700 rounded-md text-green-700 flex items-center justify-center hover:bg-green-50 transition-colors"
          >
            <img src={home || "/placeholder.svg"} alt="Home" className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
          <button
            onClick={downloadReceipt}
            className="w-full h-12 border rounded-md text-white bg-green-700 flex items-center justify-center hover:bg-green-800 transition-colors"
          >
            <img src={reciept || "/placeholder.svg"} alt="Receipt" className="w-5 h-5 mr-2" />
            Get Receipt
          </button>
        </div>
      </div>
    </div>
  )
}

