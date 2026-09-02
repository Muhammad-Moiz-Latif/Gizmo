"use client"

import { Mail, MapPin, Clock, Search, ChevronDown, ArrowRight, HelpCircle, BookOpen, Truck, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("general")
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({})

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const faqCategories = [
    {
      id: "general",
      name: "General",
      icon: HelpCircle,
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
      icon: BookOpen,
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
      icon: Truck,
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
      icon: RefreshCw,
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

  const filteredFAQs =
    searchQuery.trim() === ""
      ? faqCategories
      : faqCategories
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((category) => category.questions.length > 0)

  const popularQuestions = [
    {
      question: "Do you offer price matching?",
      answer:
        "Yes, we offer price matching on identical products from authorized retailers. To request a price match, contact our customer service team with proof of the competitor's current price. Some exclusions apply.",
    },
    {
      question: "How do I redeem a gift card?",
      answer:
        "You can redeem a gift card during checkout by entering the gift card code in the designated field. Any remaining balance will be saved to your account for future purchases.",
    },
    {
      question: "Do you offer technical support?",
      answer:
        "Yes, we offer basic technical support for all products purchased from Gizmo. For complex issues, we'll connect you with the manufacturer's specialized support team.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Orders can be canceled within 1 hour of placement if they haven't entered processing. Log into your account or contact support immediately.",
    },
  ]


  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#F7F7F5] font-sans antialiased">
      {/* ═══════════════════════════════════════════════════
          HERO — Cinematic, editorial
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:70px_70px]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[22vw] font-black leading-none tracking-[-0.09em] text-white/[0.035]">
            FAQ
          </div>
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[48vh] max-w-[1600px] flex-col justify-end px-5 pb-14 pt-28 sm:px-8 lg:px-14 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-white/30" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                Support
              </span>
              <span className="h-px w-8 bg-white/30" />
            </div>

            <h1 className="text-[2.5rem] font-medium leading-[0.92] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              Frequently
              <br />
              <span className="font-light italic text-white/40">
                asked questions.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/40">
              Clear answers about our products, shipping, returns, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SEARCH — Clean, minimal
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full border-b border-black/5 py-10 sm:py-12">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <Search
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/25"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full rounded-2xl border border-black/8 bg-white py-3.5 pl-11 pr-5 text-sm text-black placeholder:text-black/25 outline-none transition-all duration-300 focus:border-black/25 focus:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-medium uppercase tracking-[0.15em] text-black/25 transition-colors hover:text-black/50"
              >
                Clear
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FAQ CONTENT
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.015] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[900px] px-5 sm:px-8">
          {searchQuery.trim() !== "" ? (
            /* ─── Search Results ─── */
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-6 bg-black/25" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                  Results
                </span>
                <span className="text-[10px] text-black/20">
                  {filteredFAQs.reduce((acc, cat) => acc + cat.questions.length, 0)} found
                </span>
              </div>

              {filteredFAQs.length > 0 ? (
                <div className="space-y-10">
                  {filteredFAQs.map((category) => (
                    <div key={category.id}>
                      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-black/30">
                        {category.name}
                      </h3>
                      <div className="space-y-2.5">
                        {category.questions.map((faq, index) => (
                          <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.04 }}
                          >
                            <AccordionItem
                              id={faq.id}
                              question={faq.question}
                              answer={faq.answer}
                              isOpen={!!openAccordions[faq.id]}
                              onToggle={() => toggleAccordion(faq.id)}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-white mb-4">
                    <Search className="h-6 w-6 text-black/20" strokeWidth={1.5} />
                  </div>
                  <p className="text-base font-medium text-black/50">
                    No results for “{searchQuery}”
                  </p>
                  <p className="mt-1 text-sm text-black/30">
                    Try a different term or browse categories below.
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-black/90 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                  >
                    Clear search
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* ─── Category Tabs + Accordions ─── */
            <div>
              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-10 flex flex-wrap gap-2"
              >
                {faqCategories.map((category) => {
                  const isActive = activeTab === category.id
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium tracking-wide transition-all duration-300 ${isActive
                        ? "bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
                        : "border border-black/8 text-black/50 hover:border-black/20 hover:text-black"
                        }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white/70" : "text-black/30"}`} strokeWidth={1.5} />
                      {category.name}
                    </button>
                  )
                })}
              </motion.div>

              {/* Active category questions */}
              <AnimatePresence mode="wait">
                {faqCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{
                      opacity: activeTab === category.id ? 1 : 0,
                      y: activeTab === category.id ? 0 : 12,
                      display: activeTab === category.id ? "block" : "none"
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="space-y-2.5">
                      {category.questions.map((faq, i) => (
                        <motion.div
                          key={faq.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                        >
                          <AccordionItem
                            id={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={!!openAccordions[faq.id]}
                            onToggle={() => toggleAccordion(faq.id)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          POPULAR QUESTIONS — Editorial grid
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden border-t border-black/5 bg-[#EFEFEC] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-[-0.09em] text-black/[0.02]">
            POPULAR
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-black/25" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                Popular
              </span>
            </div>
            <h2 className="text-3xl font-medium tracking-[-0.04em] text-black sm:text-4xl">
              Most
              <span className="text-black/40 font-light italic ml-2">asked</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {popularQuestions.map((item, i) => (
              <motion.div
                key={item.question}
                variants={fadeUp}
                className="group rounded-2xl border border-black/5 bg-[#F7F7F5] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="text-[15px] font-medium tracking-tight text-black leading-snug">
                    {item.question}
                  </h3>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/10 text-[9px] font-medium text-black/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[14px] leading-relaxed text-black/45">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CONTACT CARDS — Premium support options
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden py-20 sm:py-24">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-black/20" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/30">
                Contact
              </span>
              <span className="h-px w-8 bg-black/20" />
            </div>
            <h2 className="text-3xl font-medium tracking-[-0.04em] text-black sm:text-4xl">
              Still have
              <span className="text-black/40 font-light italic ml-2">questions?</span>
            </h2>
            <p className="mt-3 text-sm text-black/40">
              Our support team is ready to help with anything else you need.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-5 md:grid-cols-3"
          >
            {[
              {
                icon: MapPin,
                title: "Visit",
                subtitle: "Our showroom",
                lines: ["123 Tech Avenue", "San Francisco, CA 94107"],
              },
              {
                icon: Mail,
                title: "Email",
                subtitle: "We reply within 24h",
                lines: ["support@gizmostore.com", "info@gizmostore.com"],
              },
              {
                icon: Clock,
                title: "Hours",
                subtitle: "When to find us",
                lines: ["Mon–Fri  9am – 6pm", "Sat  10am – 4pm"],
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group rounded-2xl border border-black/5 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-[#F7F7F5] text-black/40 transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                  <item.icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-medium text-black">{item.title}</h3>
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-black/25">
                  {item.subtitle}
                </p>
                <div className="space-y-0.5 text-[14px] leading-relaxed text-black/55">
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FINAL CTA — Light section flowing into Footer
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#EFEFEC] py-20 text-black sm:py-24 border-t border-black/5">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[20vw] font-black leading-none tracking-[-0.09em] text-black/[0.030]">
            GIZMO
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-5 text-center sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-black/20" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/30">
                Support
              </span>
              <span className="h-px w-8 bg-black/20" />
            </div>

            <h2 className="mb-4 text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-black sm:text-4xl">
              Couldn't find
              <br />
              <span className="text-black/40 font-light italic">your answer?</span>
            </h2>

            <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-black/40">
              Our support team is ready to help with anything else you need.
            </p>

            <a
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-black px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]"
            >
              Contact Support
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

/* ─── Accordion Item ─────────────────────────────────── */

function AccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  id: string
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-black/[0.01] sm:px-7 sm:py-5"
        aria-expanded={isOpen}
        aria-controls={`faq-${id}`}
      >
        <span className={`text-[14px] font-medium tracking-tight transition-colors sm:text-[15px] ${isOpen ? "text-black" : "text-black/70"
          }`}>
          {question}
        </span>
        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-black text-white" : "bg-black/5 text-black/30"
          }`}>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
              }`}
            strokeWidth={1.5}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-t border-black/5 px-5 pb-5 pt-4 sm:px-7 sm:pb-6 sm:pt-5">
              <p className="text-[14px] leading-7 text-black/50 sm:text-[15px]">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FAQ