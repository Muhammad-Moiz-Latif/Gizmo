import { useEffect, useState } from 'react';
import checked from '../assets/checked.png';
import home from '../assets/home.png';
import reciept from '../assets/receipt.png';
import { format } from "date-fns";
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from "jspdf";

export const SuccessTransaction = () => {
    const { UserId } = useParams();
    const { SessionId } = useParams();
    const [price, setPrice] = useState(0);
    const [created, setCreated] = useState("");
    const [refNo, setrefNo] = useState("");
    const [name, setName] = useState("");
    const [IsLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:3000/transactionData/${SessionId}`);
                setPrice(response.data.data.price);
                setrefNo(response.data.data.TransactionId.substring(0, 8));
                setCreated(format(new Date(response.data.data.createdAt), "dd/MM/yyyy, HH:mm:ss"));
                setName(response.data.User.username);
            } catch (error) {
                console.error("Error fetching transaction data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, [SessionId]);

    // Function to generate and download a PDF receipt
    const downloadReceipt = () => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("Payment Receipt", 20, 20);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.text(`Reference ID: ${refNo}`, 20, 40);
        doc.text(`Payment Time: ${created}`, 20, 50);
        doc.text(`Payment Method: Bank Transfer`, 20, 60);
        doc.text(`Sender Name: ${name}`, 20, 70);
        doc.text(`Total Payment: $${price}`, 20, 80);

        doc.save(`Receipt_${refNo}.pdf`);
    };

    if (IsLoading) {
        return (
            <div className="max-w-screen min-h-screen flex justify-center items-center font-roboto">
                <div className="h-[33rem] w-[30rem] rounded-3xl flex flex-col items-center justify-center px-10 py-4 border border-green-200 bg-green-50">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="rounded-full bg-green-300 h-24 w-24 mb-4"></div>
                        <div className="h-6 bg-green-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-green-200 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-screen min-h-screen flex justify-center items-center font-roboto">
            <div className="h-[33rem] w-[30rem] rounded-3xl flex flex-col items-center px-10 py-4 border border-green-200 bg-green-50">
                <div className='bg-green-300 rounded-full p-2 mb-2'>
                    <div className='bg-green-400 rounded-full p-2'>
                        <div className='bg-green-500 rounded-full p-2'>
                            <img src={checked || "/placeholder.svg"} className='w-20 h-20' />
                        </div>
                    </div>
                </div>
                <h1 className='text-2xl font-roboto pb-3 text-green-800 font-medium'>Payment Successful!</h1>
                <hr className='bg-green-600 w-[360px] h-[2px] mb-3' />
                <h2 className='text-green-800'>Total Payment</h2>
                <p className='text-justify mb-1 text-5xl font-afacad font-medium text-green-700'>${price}</p>
                <div className='grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-3 mb-4'>
                    <div className='flex flex-col border border-green-700 bg-green-100 w-44 h-16 items-start justify-center rounded-lg px-2'>
                        <h1 className='text-green-600'>Reference Id</h1>
                        <h1 className='text-green-900'>{refNo}</h1>
                    </div>
                    <div className='flex flex-col border border-green-700 bg-green-100 w-44 h-16 items-start justify-center rounded-lg px-2'>
                        <h1 className='text-green-600'>Payment Time</h1>
                        <h1 className='text-green-900'>{created}</h1>
                    </div>
                    <div className='flex flex-col border border-green-700 bg-green-100 w-44 h-16 items-start justify-center rounded-lg px-2'>
                        <h1 className='text-green-600'>Payment Method</h1>
                        <h1 className='text-green-900'>Bank Transfer</h1>
                    </div>
                    <div className='flex flex-col border border-green-700 bg-green-100 w-44 h-16 items-start justify-center rounded-lg px-2'>
                        <h1 className='text-green-600'>Sender Name</h1>
                        <h1 className='text-green-900'>{name}</h1>
                    </div>
                </div>
                <hr className='bg-green-600 w-[360px] h-[2px] mb-5' />
                <div className='flex gap-3'>
                    <NavLink to={`/dashboard/${UserId}`} className='w-44 h-10 border border-green-700 rounded-md text-green-700 overflow-hidden group relative active:opacity-50'>
                        <span className="flex items-center justify-center absolute inset-0 transition-transform duration-300 transform group-hover:-translate-x-full">
                            Continue Shopping
                        </span>
                        <span className="flex items-center justify-center absolute inset-0 transition-transform duration-300 transform translate-x-full group-hover:translate-x-0">
                            <img src={home} className="w-6 h-6" />
                        </span>
                    </NavLink>
                    <button
                        onClick={downloadReceipt}
                        className='w-44 h-10 border rounded-md text-white bg-green-700 overflow-hidden group relative active:opacity-50'
                    >
                        <span className="flex items-center justify-center absolute inset-0 transition-transform duration-300 transform group-hover:-translate-x-full">
                            Get Receipt
                        </span>
                        <span className="flex items-center justify-center absolute inset-0 transition-transform duration-300 transform translate-x-full group-hover:translate-x-0">
                            <img src={reciept} className="w-6 h-6" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};
