"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
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
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Check,
  ArrowUpRight,
} from "lucide-react"

export const ContactUs = () => {
  const [activeTab, setActiveTab] = useState<string>("general")
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")
    setTimeout(() => {
      setFormStatus("success")
      setTimeout(() => {
        setFormStatus("idle")
        setFormData({ name: "", email: "", subject: "", message: "" })
      }, 3000)
    }, 1500)
  }


  const departments = [
    {
      id: "general",
      name: "General Inquiries",
      icon: <MessageSquare className="h-4 w-4" />,
      email: "info@gizmostore.com",
      phone: "+1 (555) 123-4567",
      description: "For general questions about our products, services, or company.",
    },
    {
      id: "sales",
      name: "Sales Department",
      icon: <ShoppingBag className="h-4 w-4" />,
      email: "sales@gizmostore.com",
      phone: "+1 (555) 234-5678",
      description: "For pricing, bulk orders, or business partnerships.",
    },
    {
      id: "support",
      name: "Customer Support",
      icon: <HelpCircle className="h-4 w-4" />,
      email: "support@gizmostore.com",
      phone: "+1 (555) 345-6789",
      description: "For technical assistance, troubleshooting, or order issues.",
    },
    {
      id: "careers",
      name: "Careers",
      icon: <Users className="h-4 w-4" />,
      email: "careers@gizmostore.com",
      phone: "+1 (555) 456-7890",
      description: "For job opportunities and life at Gizmo.",
    },
  ]

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const activeDept = departments.find((d) => d.id === activeTab) ?? departments[0]

  const inputBase =
    "peer w-full border-b border-black/15 bg-transparent px-0 py-3 text-[15px] text-black placeholder-transparent outline-none transition-colors duration-300 focus:border-black"
  const labelBase =
    "pointer-events-none absolute left-0 top-3 text-[15px] text-black/35 transition-all duration-300 peer-focus:-translate-y-5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-black/50 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em] peer-[:not(:placeholder-shown)]:text-black/50"

  return (
    <div className="min-h-screen w-full bg-[#f7f7f5] font-roboto text-primary-dark antialiased">
      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="relative flex min-h-[56vh] w-full items-end overflow-hidden bg-black text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:80px_80px]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none text-[22vw] font-black leading-none tracking-[-0.08em] text-white/[0.045]">
            GIZMO
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-16 pt-32 sm:px-8 lg:px-14 lg:pb-20 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-white/30" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/45">
                Contact
              </span>
            </div>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-[5rem]">
              We're here
              <br />
              <span className="font-light italic text-white/45">to help.</span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/45 md:text-base">
              Questions, feedback, or something gone wrong — reach out and a real
              person on our team will get back to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          QUICK CONTACT CARDS
          ===================================================== */}
      <section className="w-full py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Phone,
                title: "Call us",
                description: "Our team picks up during business hours.",
                primary: "+1 (555) 123-4567",
                href: "tel:+15551234567",
                meta: "Mon–Fri, 9am–6pm EST",
              },
              {
                icon: Mail,
                title: "Email us",
                description: "We answer every message we get.",
                primary: "info@gizmostore.com",
                href: "mailto:info@gizmostore.com",
                meta: "24/7 email support",
              },
              {
                icon: MapPin,
                title: "Visit us",
                description: "Come say hello at our showroom.",
                primary: "123 Tech Avenue, San Francisco, CA 94107",
                href: "#location",
                meta: "Get directions",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group rounded-2xl border border-black/[0.06] bg-[#fafaf9] p-8 transition-colors duration-500 hover:bg-white"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/45 transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white">
                  <card.icon className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-[13px] font-medium uppercase tracking-[0.18em] text-black/40">
                  {card.title}
                </h3>
                <p className="mb-4 text-sm text-black/45">{card.description}</p>
                <a
                  href={card.href}
                  className="block text-[15px] font-medium leading-relaxed text-black hover:underline"
                >
                  {card.primary}
                </a>
                <p className="mt-2 text-xs text-black/35">{card.meta}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          DEPARTMENTS + FORM
          ===================================================== */}
      <section className="w-full bg-[#EFEFEC] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Departments */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="lg:col-span-5"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-black/25" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                  Departments
                </span>
              </div>
              <h2 className="mb-8 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-4xl">
                Talk to the
                <br />
                <span className="font-light italic text-black/35">right team.</span>
              </h2>

              <div className="border-t border-black/[0.08]">
                {departments.map((dept) => {
                  const isActive = activeTab === dept.id
                  return (
                    <button
                      key={dept.id}
                      onClick={() => setActiveTab(dept.id)}
                      className="group flex w-full items-center gap-4 border-b border-black/[0.08] py-5 text-left transition-colors"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isActive
                          ? "border-black bg-black text-white"
                          : "border-black/10 text-black/40 group-hover:border-black/30"
                          }`}
                      >
                        {dept.icon}
                      </div>
                      <div>
                        <h3
                          className={`text-[15px] font-medium tracking-[-0.01em] transition-colors ${isActive ? "text-black" : "text-black/60"
                            }`}
                        >
                          {dept.name}
                        </h3>
                        <p className="text-xs text-black/35">{dept.email}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <motion.div
                key={activeDept.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 rounded-2xl border border-black/[0.07] bg-white p-7"
              >
                <p className="mb-5 text-sm leading-6 text-black/50">
                  {activeDept.description}
                </p>
                <div className="space-y-3 text-[14px]">
                  <a
                    href={`mailto:${activeDept.email}`}
                    className="flex items-center gap-3 text-black/70 hover:text-black"
                  >
                    <Mail className="h-4 w-4 text-black/35" />
                    {activeDept.email}
                  </a>
                  <a
                    href={`tel:${activeDept.phone.replace(/\D/g, "")}`}
                    className="flex items-center gap-3 text-black/70 hover:text-black"
                  >
                    <Phone className="h-4 w-4 text-black/35" />
                    {activeDept.phone}
                  </a>
                </div>
                <div className="mt-6 flex items-start gap-3 border-t border-black/[0.07] pt-5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-black/30" />
                  <p className="text-xs leading-relaxed text-black/40">
                    We typically respond within 24 hours on business days.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="lg:col-span-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-black/25" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                  Message
                </span>
              </div>
              <h2 className="mb-8 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-4xl">
                Send us a
                <br />
                <span className="font-light italic text-black/35">note.</span>
              </h2>

              <div className="rounded-2xl border border-black/[0.07] bg-white p-8 sm:p-10">
                {formStatus === "success" ? (
                  <div className="flex flex-col items-center py-10 text-center">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-black bg-black text-white">
                      <Check className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold tracking-[-0.02em]">
                      Message sent.
                    </h3>
                    <p className="max-w-xs text-sm leading-relaxed text-black/45">
                      Thank you for reaching out — we'll get back to you as soon as
                      possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className={inputBase}
                        />
                        <label htmlFor="name" className={labelBase}>
                          Your name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          required
                          className={inputBase}
                        />
                        <label htmlFor="email" className={labelBase}>
                          Your email
                        </label>
                      </div>
                    </div>

                    <div className="mt-8">
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-black/40"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-black/15 bg-transparent py-3 text-[15px] text-black outline-none transition-colors duration-300 focus:border-black"
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

                    <div className="relative mt-8">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="How can we help?"
                        required
                        className={`${inputBase} resize-none`}
                      />
                      <label htmlFor="message" className={labelBase}>
                        How can we help?
                      </label>
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="privacy"
                        required
                        className="h-4 w-4 rounded border-black/20 text-black focus:ring-black/30"
                      />
                      <label htmlFor="privacy" className="text-sm text-black/50">
                        I agree to the{" "}
                        <a href="/privacy-policy" className="text-black underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className={`group mt-10 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black px-9 text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] sm:w-auto ${formStatus === "submitting" ? "cursor-not-allowed opacity-70" : ""
                        }`}
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin text-white"
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
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOURS + LOCATION
          ===================================================== */}
      <section id="location" className="w-full py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-black/25" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                  Hours
                </span>
              </div>
              <h2 className="mb-8 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                When we're
                <br />
                <span className="font-light italic text-black/35">available.</span>
              </h2>

              <div className="border-t border-black/[0.08]">
                {[
                  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM EST" },
                  { day: "Saturday", hours: "10:00 AM – 4:00 PM EST" },
                  { day: "Sunday", hours: "Closed" },
                ].map((row) => (
                  <div
                    key={row.day}
                    className="flex items-center justify-between border-b border-black/[0.08] py-5"
                  >
                    <span className="text-[15px] font-medium text-black/75">
                      {row.day}
                    </span>
                    <span className="text-sm text-black/40">{row.hours}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs leading-relaxed text-black/35">
                We observe major holidays and may run limited hours — check the site
                for the current schedule.
              </p>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-black/25" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                  Headquarters
                </span>
              </div>
              <h2 className="mb-8 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                Come say
                <br />
                <span className="font-light italic text-black/35">hello.</span>
              </h2>

              <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#EFEFEC] sm:h-72">
                <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <MapPin className="h-7 w-7 text-black/30" strokeWidth={1.5} />
                  <p className="text-xs uppercase tracking-[0.2em] text-black/30">
                    Map view
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
                <div className="space-y-3 text-sm leading-relaxed text-black/50">
                  <p>
                    <span className="font-medium text-black">Address</span>
                    <br />
                    123 Tech Avenue, San Francisco, CA 94107
                  </p>
                  <p>
                    <span className="font-medium text-black">Directions</span>
                    <br />
                    SoMa district, two blocks from the Caltrain station.
                  </p>
                </div>

                <a
                  href="#"
                  className="group flex h-12 items-center gap-2 rounded-full border border-black/15 px-6 text-sm font-medium text-black/70 transition-all duration-300 hover:-translate-y-1 hover:border-black hover:text-black"
                >
                  Get Directions
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* =====================================================
          SOCIAL
          ===================================================== */}
      <section className="w-full py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-black/25" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                Follow
              </span>
              <span className="h-px w-10 bg-black/25" />
            </div>
            <h2 className="mb-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              Connect with us.
            </h2>
            <p className="mx-auto mb-10 max-w-md text-sm leading-7 text-black/45">
              Updates, promotions, and the occasional behind-the-scenes look.
            </p>

            <div className="flex justify-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-black/45 transition-all duration-300 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  )
}

export default ContactUs