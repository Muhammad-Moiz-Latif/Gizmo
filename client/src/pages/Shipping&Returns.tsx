
import { Mail, MapPin, Clock, Truck, Package, RefreshCw, CreditCard, AlertCircle } from 'lucide-react'
import { useEffect, useState } from "react"

export const Shipping = () => {
    const [activeTab, setActiveTab] = useState("shipping")
    const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({})

    // Toggle accordion open/close state
    const toggleAccordion = (id: string) => {
        setOpenAccordions(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    useEffect(()=>{
        window.scroll(0,0);
    })

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <section className="bg-black text-white py-20 px-4 relative z-20">
                <div className="absolute inset-0 w-full h-full bg-black opacity-70 z-10"></div>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black to-transparent z-20"></div>

                <div className="max-w-6xl mx-auto text-center relative z-30">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Shipping & Returns</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                        Everything you need to know about our shipping methods, delivery times, and return policies.
                    </p>
                </div>
            </section>

            {/* Tabs Section */}
            <section className="py-12 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                            onClick={() => setActiveTab("shipping")}
                            className={`py-4 px-6 text-center font-medium rounded-lg transition-colors ${
                                activeTab === "shipping"
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-gray-200 hover:bg-gray-100"
                            }`}
                        >
                            <Truck className="w-5 h-5 mx-auto mb-2" />
                            Shipping Information
                        </button>
                        <button
                            onClick={() => setActiveTab("returns")}
                            className={`py-4 px-6 text-center font-medium rounded-lg transition-colors ${
                                activeTab === "returns"
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-gray-200 hover:bg-gray-100"
                            }`}
                        >
                            <RefreshCw className="w-5 h-5 mx-auto mb-2" />
                            Returns & Refunds
                        </button>
                    </div>
                </div>
            </section>

            {/* Shipping Content */}
            <div className={activeTab === "shipping" ? "block" : "hidden"}>
                {/* Shipping Methods Section */}
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-black">Our Shipping Methods</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                                    <Truck className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-black">Standard Shipping</h3>
                                <p className="text-gray-700 mb-4">3-5 business days</p>
                                <p className="text-2xl font-bold text-black">$5.99</p>
                                <p className="text-gray-500 text-sm mt-2">Free on orders over $50</p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md text-center border-2 border-black relative">
                                <div className="absolute top-0 right-0 left-0 bg-black text-white py-1 text-sm font-medium">
                                    MOST POPULAR
                                </div>
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                                    <Package className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-black">Express Shipping</h3>
                                <p className="text-gray-700 mb-4">1-2 business days</p>
                                <p className="text-2xl font-bold text-black">$12.99</p>
                                <p className="text-gray-500 text-sm mt-2">Free on orders over $100</p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-black">Same-Day Delivery</h3>
                                <p className="text-gray-700 mb-4">Available in select areas</p>
                                <p className="text-2xl font-bold text-black">$19.99</p>
                                <p className="text-gray-500 text-sm mt-2">Order before 11 AM local time</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Shipping Process Section */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-black">Shipping Process</h2>
                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 hidden md:block"></div>

                            {/* Timeline items */}
                            <div className="space-y-12">
                                {/* Order Placed */}
                                <div className="relative flex items-center justify-between flex-col md:flex-row">
                                    <div className="md:w-5/12 mb-8 md:mb-0 md:pr-8 md:text-right">
                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <h3 className="text-xl font-bold mb-2 text-black">Order Placed</h3>
                                            <p className="text-gray-600">
                                                You'll receive an order confirmation email with your order number and details.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center hidden md:flex">
                                        <div className="w-8 h-8 rounded-full bg-black"></div>
                                    </div>
                                    <div className="md:w-5/12 md:pl-8"></div>
                                </div>

                                {/* Order Processing */}
                                <div className="relative flex items-center justify-between flex-col md:flex-row">
                                    <div className="md:w-5/12 mb-8 md:mb-0"></div>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center hidden md:flex">
                                        <div className="w-8 h-8 rounded-full bg-black"></div>
                                    </div>
                                    <div className="md:w-5/12 md:pl-8">
                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <h3 className="text-xl font-bold mb-2 text-black">Order Processing</h3>
                                            <p className="text-gray-600">
                                                We verify your payment and prepare your items for shipment. This typically takes 1-2 business days.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Shipped */}
                                <div className="relative flex items-center justify-between flex-col md:flex-row">
                                    <div className="md:w-5/12 mb-8 md:mb-0 md:pr-8 md:text-right">
                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <h3 className="text-xl font-bold mb-2 text-black">Order Shipped</h3>
                                            <p className="text-gray-600">
                                                You'll receive a shipping confirmation email with tracking information so you can monitor your delivery.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center hidden md:flex">
                                        <div className="w-8 h-8 rounded-full bg-black"></div>
                                    </div>
                                    <div className="md:w-5/12 md:pl-8"></div>
                                </div>

                                {/* Order Delivered */}
                                <div className="relative flex items-center justify-between flex-col md:flex-row">
                                    <div className="md:w-5/12 mb-8 md:mb-0"></div>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center hidden md:flex">
                                        <div className="w-8 h-8 rounded-full bg-black"></div>
                                    </div>
                                    <div className="md:w-5/12 md:pl-8">
                                        <div className="bg-white p-6 rounded-lg shadow-md">
                                            <h3 className="text-xl font-bold mb-2 text-black">Order Delivered</h3>
                                            <p className="text-gray-600">
                                                Your package has been delivered! We'll send a delivery confirmation email once your order arrives.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* International Shipping Section */}
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 text-black">International Shipping</h2>
                                <p className="text-gray-700 mb-6">
                                    We ship to over 50 countries worldwide. International shipping times vary by location, typically ranging from 7-14 business days. Import duties and taxes may apply depending on your country's regulations.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-5 h-5 rounded-full bg-black"></div>
                                        </div>
                                        <p className="ml-3 text-gray-700">Standard International: 7-14 business days ($19.99)</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-5 h-5 rounded-full bg-black"></div>
                                        </div>
                                        <p className="ml-3 text-gray-700">Express International: 3-5 business days ($39.99)</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-5 h-5 rounded-full bg-black"></div>
                                        </div>
                                        <p className="ml-3 text-gray-700">Free international shipping on orders over $200</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-100 p-8 rounded-lg">
                                <h3 className="text-xl font-bold mb-4 text-black">Important Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <AlertCircle className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                                        <p className="ml-3 text-gray-700">
                                            Import duties and taxes are not included in the product price or shipping cost.
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <AlertCircle className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                                        <p className="ml-3 text-gray-700">
                                            The recipient is responsible for all customs duties, taxes, and fees.
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <AlertCircle className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                                        <p className="ml-3 text-gray-700">
                                            Delivery times may be affected by customs processing in your country.
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <AlertCircle className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                                        <p className="ml-3 text-gray-700">
                                            Some products may not be eligible for international shipping due to regulations.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Shipping FAQs Section */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-black">Common Shipping Questions</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    id: "track-order",
                                    question: "How can I track my order?",
                                    answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order by logging into your account and visiting the 'Order History' section."
                                },
                                {
                                    id: "shipping-address",
                                    question: "Can I change my shipping address after placing an order?",
                                    answer: "You can change your shipping address within 1 hour of placing your order. Please contact our customer service team immediately. After this window, we may not be able to modify the shipping address if the order has entered processing."
                                },
                                {
                                    id: "shipping-restrictions",
                                    question: "Are there any shipping restrictions?",
                                    answer: "Yes, certain products cannot be shipped to specific locations due to local regulations or shipping carrier restrictions. This information will be noted on the product page. Additionally, we cannot ship to P.O. boxes for express or same-day delivery."
                                },
                                {
                                    id: "delivery-estimate",
                                    question: "Why is my delivery estimate longer than usual?",
                                    answer: "Delivery times may be extended due to high order volume, weather conditions, or carrier delays. During holiday seasons, please allow for additional processing and transit time. We'll always provide the most up-to-date delivery estimate in your shipping confirmation."
                                }
                            ].map((faq) => (
                                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                                    <button
                                        onClick={() => toggleAccordion(faq.id)}
                                        className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-black focus:outline-none"
                                    >
                                        <span>{faq.question}</span>
                                        <svg
                                            className={`w-5 h-5 text-gray-500 transform transition-transform ${openAccordions[faq.id] ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div
                                        className={`px-6 pb-4 pt-0 text-gray-700 transition-all duration-200 ease-in-out ${
                                            openAccordions[faq.id] ? 'block' : 'hidden'
                                        }`}
                                    >
                                        <div className="pt-2">{faq.answer}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Returns Content */}
            <div className={activeTab === "returns" ? "block" : "hidden"}>
                {/* Return Policy Overview */}
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-black">Our Return Policy</h2>
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="grid md:grid-cols-3 gap-8 text-center">
                                <div>
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-4">
                                        <span className="text-2xl font-bold">30</span>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-black">Day Return Window</h3>
                                    <p className="text-gray-600">
                                        Return most items within 30 days of delivery for a full refund.
                                    </p>
                                </div>
                                <div>
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-4">
                                        <RefreshCw className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-black">Easy Exchanges</h3>
                                    <p className="text-gray-600">
                                        Exchange for a different size, color, or even a different product.
                                    </p>
                                </div>
                                <div>
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-4">
                                        <CreditCard className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-black">Fast Refunds</h3>
                                    <p className="text-gray-600">
                                        Refunds are processed within 3-5 business days after we receive your return.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Return Process Section */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-black">Return Process</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
                                    1
                                </div>
                                <h3 className="text-lg font-semibold mb-4 text-black mt-4">Initiate Return</h3>
                                <p className="text-gray-600">
                                    Log into your account, find your order, and select "Return Items" or contact customer service.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
                                    2
                                </div>
                                <h3 className="text-lg font-semibold mb-4 text-black mt-4">Print Label</h3>
                                <p className="text-gray-600">
                                    Print the prepaid return shipping label that we'll email to you.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
                                    3
                                </div>
                                <h3 className="text-lg font-semibold mb-4 text-black mt-4">Package Items</h3>
                                <p className="text-gray-600">
                                    Pack the items in their original packaging with all accessories and documentation.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
                                    4
                                </div>
                                <h3 className="text-lg font-semibold mb-4 text-black mt-4">Ship Return</h3>
                                <p className="text-gray-600">
                                    Drop off the package at any authorized shipping location or schedule a pickup.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Return Eligibility Section */}
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-black">Return Eligibility</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-6 text-black border-b pb-4">Eligible for Returns</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">Unopened items in original packaging</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">Defective or damaged products (reported within 48 hours)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">Items that don't match the product description</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">Incorrect items received</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">Gifts (with gift receipt)</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-6 text-black border-b pb-4">Not Eligible for Returns</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span className="text-gray-700">Items marked as final sale or clearance</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span className="text-gray-700">Products with removed tags or packaging</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span className="text-gray-700">Items showing signs of use or wear</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span className="text-gray-700">Digital downloads or software that has been activated</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span className="text-gray-700">Personalized or custom-made items</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Refund Information Section */}
                <section className="py-16 px-4 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-black">Refund Information</h2>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-xl font-bold mb-6 text-black">How Refunds Work</h3>
                                <p className="text-gray-700 mb-6">
                                    Once we receive and inspect your return, we'll send you an email to notify you that we've received your returned item. We'll also notify you of the approval or rejection of your refund.
                                </p>
                                <p className="text-gray-700 mb-6">
                                    If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 3-5 business days. Depending on your credit card company or bank, it may take an additional 5-10 business days for the refund to appear on your statement.
                                </p>
                                <div className="bg-white p-4 rounded-lg border-l-4 border-black">
                                    <p className="text-gray-700 font-medium">
                                        Please note: Shipping costs are non-refundable. If you received free shipping on your order, the standard shipping cost will be deducted from your refund.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-6 text-black">Refund Methods</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <CreditCard className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                                        <div className="ml-3">
                                            <h4 className="font-semibold text-black">Original Payment Method</h4>
                                            <p className="text-gray-600">Credit/debit card, PayPal, or other payment methods will be refunded to the original source.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 text-black flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                        </svg>
                                        <div className="ml-3">
                                            <h4 className="font-semibold text-black">Store Credit</h4>
                                            <p className="text-gray-600">You may choose to receive store credit instead of a refund, with an additional 10% bonus value.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 text-black flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="ml-3">
                                            <h4 className="font-semibold text-black">Gift Returns</h4>
                                            <p className="text-gray-600">Returns with a gift receipt will be issued as a gift card at the current selling price.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Return FAQs Section */}
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-black">Common Return Questions</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    id: "return-shipping",
                                    question: "Do I have to pay for return shipping?",
                                    answer: "For standard returns, we provide a prepaid return shipping label at no cost to you. However, for returns due to preference (not defects or errors), a shipping fee of $5.99 will be deducted from your refund."
                                },
                                {
                                    id: "exchange-process",
                                    question: "How do exchanges work?",
                                    answer: "To exchange an item, simply start the return process and select 'Exchange' instead of 'Return'. You can choose the replacement item during this process. We'll ship the new item as soon as we process your exchange request, without waiting for the original item to arrive back at our warehouse."
                                },
                                {
                                    id: "partial-returns",
                                    question: "Can I return part of my order?",
                                    answer: "Yes, you can return individual items from a multi-item order. Simply select which items you wish to return during the return process. The rest of your order will not be affected."
                                },
                                {
                                    id: "late-returns",
                                    question: "What if my return is past the 30-day window?",
                                    answer: "Returns initiated after the 30-day window may be accepted on a case-by-case basis and may be subject to a restocking fee or store credit only. Please contact our customer service team to discuss late returns."
                                }
                            ].map((faq) => (
                                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                                    <button
                                        onClick={() => toggleAccordion(faq.id)}
                                        className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-black focus:outline-none"
                                    >
                                        <span>{faq.question}</span>
                                        <svg
                                            className={`w-5 h-5 text-gray-500 transform transition-transform ${openAccordions[faq.id] ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div
                                        className={`px-6 pb-4 pt-0 text-gray-700 transition-all duration-200 ease-in-out ${
                                            openAccordions[faq.id] ? 'block' : 'hidden'
                                        }`}
                                    >
                                        <div className="pt-2">{faq.answer}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Contact Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-black">Need Help?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-black">Visit Us</h3>
                            <p className="text-gray-600">
                                123 Tech Avenue
                                <br />
                                San Francisco, CA 94107
                                <br />
                                United States
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-black">Email Us</h3>
                            <p className="text-gray-600">
                                returns@gizmostore.com
                                <br />
                                shipping@gizmostore.com
                                <br />
                                support@gizmostore.com
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-black">Support Hours</h3>
                            <p className="text-gray-600">
                                Monday - Friday: 9am - 6pm
                                <br />
                                Saturday: 10am - 4pm
                                <br />
                                Sunday: Closed
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-black text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
                    <p className="text-xl mb-8 text-gray-300">
                        Our customer support team is ready to help you with any shipping or return questions.
                    </p>
                    <button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                        Contact Support
                    </button>
                </div>
            </section>
        </div>
    )
}
