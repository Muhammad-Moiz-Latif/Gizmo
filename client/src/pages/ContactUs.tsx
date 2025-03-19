"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  ShoppingBag,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Check,
} from "lucide-react"

export const ContactUs = () => {
  const [activeTab, setActiveTab] = useState<string>("general")
  const [activeFaq, setActiveFaq] = useState<string | null>(null)
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Toggle FAQ visibility
  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id)
  }

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success")
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus("idle")
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  // FAQ data
  const faqs = [
    {
      id: "response-time",
      question: "What is your typical response time?",
      answer:
        "We strive to respond to all inquiries within 24 hours during business days. For urgent matters, please call our customer service line for immediate assistance.",
    },
    {
      id: "business-hours",
      question: "What are your business hours?",
      answer:
        "Our customer service team is available Monday through Friday from 9:00 AM to 6:00 PM EST, and Saturday from 10:00 AM to 4:00 PM EST. We are closed on Sundays and major holidays.",
    },
    {
      id: "order-status",
      question: "How can I check my order status?",
      answer:
        "You can check your order status by logging into your account on our website and navigating to the 'Orders' section. Alternatively, you can contact our customer service team with your order number.",
    },
    {
      id: "bulk-orders",
      question: "Do you offer special pricing for bulk orders?",
      answer:
        "Yes, we offer special pricing for bulk orders. Please contact our sales team with details about your requirements, and they will provide you with a custom quote.",
    },
    {
      id: "international-support",
      question: "Do you provide international customer support?",
      answer:
        "Yes, we provide international customer support. Our team is available via email and phone. Please note that response times may vary depending on time zone differences.",
    },
  ]

  // Department contact information
  const departments = [
    {
      id: "general",
      name: "General Inquiries",
      icon: <MessageSquare className="w-6 h-6" />,
      email: "info@gizmostore.com",
      phone: "+1 (555) 123-4567",
      description: "For general questions about our products, services, or company.",
    },
    {
      id: "sales",
      name: "Sales Department",
      icon: <ShoppingBag className="w-6 h-6" />,
      email: "sales@gizmostore.com",
      phone: "+1 (555) 234-5678",
      description: "For inquiries about pricing, bulk orders, or business partnerships.",
    },
    {
      id: "support",
      name: "Customer Support",
      icon: <HelpCircle className="w-6 h-6" />,
      email: "support@gizmostore.com",
      phone: "+1 (555) 345-6789",
      description: "For technical assistance, product troubleshooting, or order issues.",
    },
    {
      id: "careers",
      name: "Careers",
      icon: <Users className="w-6 h-6" />,
      email: "careers@gizmostore.com",
      phone: "+1 (555) 456-7890",
      description: "For job opportunities and information about working at Gizmo.",
    },
  ];

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            We're here to help. Reach out to us with any questions, concerns, or feedback.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Call Us</h3>
              <p className="text-gray-600 mb-4">Our friendly team is here to help.</p>
              <a href="tel:+15551234567" className="text-lg font-medium text-black hover:underline">
                +1 (555) 123-4567
              </a>
              <p className="text-sm text-gray-500 mt-2">Monday-Friday: 9am-6pm EST</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Email Us</h3>
              <p className="text-gray-600 mb-4">We'll respond as soon as possible.</p>
              <a href="mailto:info@gizmostore.com" className="text-lg font-medium text-black hover:underline">
                info@gizmostore.com
              </a>
              <p className="text-sm text-gray-500 mt-2">24/7 email support</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Visit Us</h3>
              <p className="text-gray-600 mb-4">Come say hello at our office.</p>
              <p className="text-lg font-medium text-black">
                123 Tech Avenue
                <br />
                San Francisco, CA 94107
              </p>
              <p className="text-sm text-gray-500 mt-2">Get directions →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Department Tabs and Contact Form */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Department Tabs */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-black">Contact Departments</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    className={`w-full text-left p-4 border-b border-gray-200 flex items-center ${
                      activeTab === dept.id ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab(dept.id)}
                  >
                    <div
                      className={`mr-4 p-2 rounded-full ${
                        activeTab === dept.id ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {dept.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-black">{dept.name}</h3>
                      <p className="text-sm text-gray-500">{dept.email}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Department Details */}
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                {departments.map(
                  (dept) =>
                    activeTab === dept.id && (
                      <div key={`details-${dept.id}`}>
                        <h3 className="text-xl font-semibold mb-3 text-black">{dept.name}</h3>
                        <p className="text-gray-600 mb-4">{dept.description}</p>

                        <div className="flex items-center mb-3">
                          <Mail className="w-5 h-5 text-gray-500 mr-2" />
                          <a href={`mailto:${dept.email}`} className="text-black hover:underline">
                            {dept.email}
                          </a>
                        </div>

                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-gray-500 mr-2" />
                          <a href={`tel:${dept.phone.replace(/\D/g, "")}`} className="text-black hover:underline">
                            {dept.phone}
                          </a>
                        </div>

                        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                          <div className="flex items-start">
                            <Clock className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-black">Response Time</p>
                              <p className="text-sm text-gray-600">
                                We typically respond within 24 hours during business days.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold mb-6 text-black">Send Us a Message</h2>
              <div className="bg-white p-8 rounded-lg shadow-md">
                {formStatus === "success" ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-black">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Product Question">Product Question</option>
                        <option value="Order Status">Order Status</option>
                        <option value="Return Request">Return Request</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>

                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="privacy"
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                        I agree to the{" "}
                        <a href="/privacy-policy" className="text-black underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className={`w-full bg-black text-white py-3 px-4 rounded-md font-medium flex items-center justify-center ${
                        formStatus === "submitting" ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
                      }`}
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours & Location */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Office Hours */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black">Office Hours</h2>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <Clock className="w-8 h-8 text-black mr-4" />
                  <h3 className="text-xl font-semibold text-black">When We're Available</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-black">Monday - Friday</span>
                    <span className="text-gray-600">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-black">Saturday</span>
                    <span className="text-gray-600">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-black">Sunday</span>
                    <span className="text-gray-600">Closed</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-black">Holiday Hours:</span> We observe major holidays and may
                    have limited hours or be closed. Please check our website for holiday schedules.
                  </p>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black">Our Location</h2>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <MapPin className="w-8 h-8 text-black mr-4" />
                  <h3 className="text-xl font-semibold text-black">Headquarters</h3>
                </div>

                <div className="bg-gray-200 h-64 rounded-lg mb-6 flex items-center justify-center">
                  {/* This would be replaced with an actual map component */}
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-black mx-auto mb-2" />
                    <p className="text-gray-600">Map view would appear here</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-gray-600">
                    <span className="font-medium text-black">Address:</span>
                    <br />
                    123 Tech Avenue
                    <br />
                    San Francisco, CA 94107
                    <br />
                    United States
                  </p>

                  <p className="text-gray-600">
                    <span className="font-medium text-black">Directions:</span>
                    <br />
                    Located in the SoMa district, two blocks from the Caltrain station.
                  </p>

                  <button className="mt-2 inline-flex items-center px-4 py-2 border border-black text-black rounded-md hover:bg-gray-100 transition-colors">
                    Get Directions
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-black">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <h3 className="text-lg font-medium text-black">{faq.question}</h3>
                  {activeFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <div className={`px-6 pb-6 ${activeFaq === faq.id ? "block" : "hidden"}`}>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-black">Connect With Us</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Follow us on social media for the latest updates, promotions, and behind-the-scenes content.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Need Immediate Assistance?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Our customer support team is available to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+15551234567"
              className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </a>
            <a
              href="#"
              className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Live Chat
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactUs

