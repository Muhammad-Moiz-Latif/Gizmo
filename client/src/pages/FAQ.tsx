"use client"

import { Mail, MapPin, Clock, Search, ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("general")
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({})

  // Toggle accordion open/close state
  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  };

//to scroll to the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // FAQ data organized by categories
  const faqCategories = [
    {
      id: "general",
      name: "General",
      questions: [
        {
          id: "what-is-gizmo",
          question: "What is Gizmo?",
          answer:
            "Gizmo is a technology retailer founded in 2015 with a mission to make cutting-edge technology accessible to everyone. We offer a curated selection of smartphones, laptops, tablets, smart home devices, and accessories.",
        },
        {
          id: "business-hours",
          question: "What are your business hours?",
          answer:
            "Our online store is available 24/7. Our physical locations are open Monday - Friday from 9am to 6pm, Saturday from 10am to 4pm, and closed on Sundays.",
        },
        {
          id: "contact-support",
          question: "How can I contact customer support?",
          answer:
            "You can reach our customer support team via email at support@gizmostore.com, by phone at (555) 123-4567, or through the live chat feature on our website. Our support team is available 24/7 to assist you.",
        },
      ],
    },
    {
      id: "products",
      name: "Products",
      questions: [
        {
          id: "product-warranty",
          question: "Do your products come with a warranty?",
          answer:
            "Yes, all our products come with a minimum 1-year manufacturer warranty. We also offer extended warranty options at checkout for additional peace of mind.",
        },
        {
          id: "product-authenticity",
          question: "How do you ensure product authenticity?",
          answer:
            "We source our products directly from authorized manufacturers and distributors. Each product undergoes a rigorous quality check before being listed on our store to ensure authenticity and optimal performance.",
        },
        {
          id: "product-compatibility",
          question: "How can I check if a product is compatible with my device?",
          answer:
            "Product pages include detailed compatibility information. You can also use our compatibility checker tool or contact our support team for personalized assistance.",
        },
      ],
    },
    {
      id: "orders",
      name: "Orders & Shipping",
      questions: [
        {
          id: "order-tracking",
          question: "How can I track my order?",
          answer:
            "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order by logging into your account and visiting the 'Order History' section.",
        },
        {
          id: "shipping-time",
          question: "How long does shipping take?",
          answer:
            "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) and same-day delivery options are available in select areas.",
        },
        {
          id: "international-shipping",
          question: "Do you offer international shipping?",
          answer:
            "Yes, we ship to over 50 countries worldwide. International shipping times vary by location, typically ranging from 7-14 business days. Import duties and taxes may apply depending on your country's regulations.",
        },
      ],
    },
    {
      id: "returns",
      name: "Returns & Refunds",
      questions: [
        {
          id: "return-policy",
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most products. Items must be in their original condition with all packaging and accessories. Some products may have specific return conditions, which are noted on the product page.",
        },
        {
          id: "refund-process",
          question: "How long does the refund process take?",
          answer:
            "Once we receive your returned item, we'll inspect it and process your refund within 3-5 business days. The funds may take an additional 3-7 business days to appear in your account, depending on your payment method and financial institution.",
        },
        {
          id: "damaged-items",
          question: "What if I receive a damaged item?",
          answer:
            "If you receive a damaged item, please contact our support team within 48 hours of delivery. We'll arrange for a return and replacement at no additional cost to you.",
        },
      ],
    },
  ]

  // Filter questions based on search query
  const filteredFAQs =
    searchQuery.trim() === ""
      ? faqCategories
      : faqCategories
          .map((category) => ({
            ...category,
            questions: category.questions.filter(
              (q) =>
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
          }))
          .filter((category) => category.questions.length > 0)

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-4 relative z-20">
        <div className="absolute inset-0 w-full h-full bg-black opacity-70 z-10"></div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black to-transparent z-20"></div>

        <div className="max-w-6xl mx-auto text-center relative z-30">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our products, services, and policies.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-10 py-4 text-lg rounded-lg shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Custom Tabs */}
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`text-sm md:text-base py-3 px-4 rounded-md font-medium transition-colors ${
                    activeTab === category.id ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {searchQuery.trim() !== "" ? (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-black mb-6">Search Results</h2>
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map(
                    (category) =>
                      category.questions.length > 0 && (
                        <div key={category.id} className="mb-8">
                          <h3 className="text-xl font-semibold text-black mb-4">{category.name}</h3>
                          <div className="space-y-4">
                            {category.questions.map((faq) => (
                              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                  onClick={() => toggleAccordion(faq.id)}
                                  className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-black focus:outline-none"
                                >
                                  <span>{faq.question}</span>
                                  {openAccordions[faq.id] ? (
                                    <ChevronUp className="w-5 h-5 text-gray-500" />
                                  ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                  )}
                                </button>
                                <div
                                  className={`px-6 pb-4 pt-0 text-gray-700 transition-all duration-200 ease-in-out ${
                                    openAccordions[faq.id] ? "block" : "hidden"
                                  }`}
                                >
                                  <div className="pt-2">{faq.answer}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ),
                  )
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No results found for "{searchQuery}"</p>
                    <p className="text-gray-500 mt-2">Try a different search term or browse categories</p>
                  </div>
                )}
              </div>
            ) : (
              faqCategories.map((category) => (
                <div key={category.id} className={`space-y-4 ${activeTab === category.id ? "block" : "hidden"}`}>
                  <div className="space-y-4">
                    {category.questions.map((faq) => (
                      <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleAccordion(faq.id)}
                          className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-black focus:outline-none"
                        >
                          <span>{faq.question}</span>
                          {openAccordions[faq.id] ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                        <div
                          className={`px-6 pb-4 pt-0 text-gray-700 transition-all duration-200 ease-in-out ${
                            openAccordions[faq.id] ? "block" : "hidden"
                          }`}
                        >
                          <div className="pt-2">{faq.answer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Popular Questions Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-black">Popular Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-black">Do you offer price matching?</h3>
              <p className="text-gray-700">
                Yes, we offer price matching on identical products from authorized retailers. To request a price match,
                contact our customer service team with proof of the competitor's current price. Some exclusions apply,
                such as limited-time sales, clearance items, and marketplace sellers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-black">How do I redeem a gift card?</h3>
              <p className="text-gray-700">
                You can redeem a gift card during checkout by entering the gift card code in the designated field. The
                gift card amount will be applied to your order total. Any remaining balance on the gift card will be
                saved to your account for future purchases.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-black">Do you offer technical support for products?</h3>
              <p className="text-gray-700">
                Yes, we offer basic technical support for all products purchased from Gizmo. Our support team can help
                with setup, troubleshooting, and general usage questions. For more complex issues, we'll connect you
                with the manufacturer's specialized support team.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-black">Can I cancel my order after it's been placed?</h3>
              <p className="text-gray-700">
                Orders can be canceled within 1 hour of placement if they haven't entered the processing stage. To
                cancel an order, log into your account and select "Cancel Order" from the order details page, or contact
                our customer service team immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-black">Still Have Questions?</h2>
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
                info@gizmostore.com
                <br />
                support@gizmostore.com
                <br />
                sales@gizmostore.com
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">Business Hours</h3>
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
          <h2 className="text-3xl font-bold mb-6">Couldn't Find Your Answer?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Our customer support team is ready to help you with any questions you may have.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
            Contact Support
          </button>
        </div>
      </section>
    </div>
  )
}

export default FAQ

