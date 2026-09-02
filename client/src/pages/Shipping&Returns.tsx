import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
    Mail,
    MapPin,
    Clock,
    Truck,
    Package,
    RefreshCw,
    CreditCard,
    AlertCircle,
    Check,
    X,
    ChevronDown,
    Gift,
    Wallet,
    ArrowRight,
} from "lucide-react"

/* =========================================================
   Shared bits — small helpers so the repeated Gizmo motifs
   stay consistent across every section.
   ========================================================= */

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
}

const Eyebrow = ({
    children,
    center = false,
    dark = false,
}: {
    children: React.ReactNode
    center?: boolean
    dark?: boolean
}) => (
    <div
        className={`mb-5 flex items-center gap-3 ${center ? "justify-center" : ""}`}
    >
        <span className={`h-px w-10 ${dark ? "bg-white/30" : "bg-black/25"}`} />
        <span
            className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${dark ? "text-white/40" : "text-black/40"
                }`}
        >
            {children}
        </span>
        {center && (
            <span className={`h-px w-10 ${dark ? "bg-white/30" : "bg-black/25"}`} />
        )}
    </div>
)

const Heading = ({
    line1,
    accent,
    dark = false,
    size = "text-4xl md:text-5xl",
}: {
    line1: string
    accent?: string
    dark?: boolean
    size?: string
}) => (
    <h2
        className={`${size} font-semibold leading-[1.02] tracking-[-0.045em] ${dark ? "text-white" : "text-black"
            }`}
    >
        {line1}
        {accent && (
            <>
                <br />
                <span
                    className={`font-light italic ${dark ? "text-white/35" : "text-black/35"
                        }`}
                >
                    {accent}
                </span>
            </>
        )}
    </h2>
)

type FaqItem = { id: string; question: string; answer: string }

const FaqList = ({
    items,
    open,
    onToggle,
    dark = false,
}: {
    items: FaqItem[]
    open: Record<string, boolean>
    onToggle: (id: string) => void
    dark?: boolean
}) => (
    <div className={`border-t ${dark ? "border-white/[0.08]" : "border-black/[0.08]"}`}>
        {items.map((faq, i) => {
            const isOpen = !!open[faq.id]
            return (
                <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className={`border-b ${dark ? "border-white/[0.08]" : "border-black/[0.08]"}`}
                >
                    <button
                        onClick={() => onToggle(faq.id)}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                        <h3 className={`text-[15px] font-medium tracking-[-0.01em] sm:text-base ${dark ? "text-white" : "text-black"}`}>
                            {faq.question}
                        </h3>
                        <ChevronDown
                            className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                } ${dark ? "text-white/40" : "text-black/40"}`}
                        />
                    </button>
                    <div
                        className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                    >
                        <div className="overflow-hidden">
                            <p className={`max-w-2xl text-sm leading-7 ${dark ? "text-white/45" : "text-black/45"}`}>
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )
        })}
    </div>
)

/* ========================================================= */

export const Shipping = () => {
    const [activeTab, setActiveTab] = useState<"shipping" | "returns">("shipping")
    const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({})

    const toggleAccordion = (id: string) => {
        setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const shippingMethods = [
        {
            icon: Truck,
            title: "Standard",
            time: "3–5 business days",
            price: "$5.99",
            note: "Free on orders over $50",
            featured: false,
        },
        {
            icon: Package,
            title: "Express",
            time: "1–2 business days",
            price: "$12.99",
            note: "Free on orders over $100",
            featured: true,
        },
        {
            icon: Clock,
            title: "Same-day",
            time: "Available in select areas",
            price: "$19.99",
            note: "Order before 11am local time",
            featured: false,
        },
    ]

    const shippingSteps = [
        {
            title: "Order placed",
            text: "You'll receive a confirmation email with your order number and details.",
        },
        {
            title: "Order processing",
            text: "We verify payment and prepare your items. Typically 1–2 business days.",
        },
        {
            title: "Order shipped",
            text: "A shipping confirmation email arrives with tracking so you can follow along.",
        },
        {
            title: "Order delivered",
            text: "Your package has arrived. We'll send a delivery confirmation once it does.",
        },
    ]

    const internationalRates = [
        "Standard International — 7–14 business days ($19.99)",
        "Express International — 3–5 business days ($39.99)",
        "Free international shipping on orders over $200",
    ]

    const internationalNotes = [
        "Import duties and taxes are not included in the product price or shipping cost.",
        "The recipient is responsible for all customs duties, taxes, and fees.",
        "Delivery times may be affected by customs processing in your country.",
        "Some products may not be eligible for international shipping due to regulations.",
    ]

    const shippingFaqs: FaqItem[] = [
        {
            id: "track-order",
            question: "How can I track my order?",
            answer:
                "Once your order ships, you'll get a confirmation email with a tracking number. You can also track it from Order History in your account.",
        },
        {
            id: "shipping-address",
            question: "Can I change my shipping address after placing an order?",
            answer:
                "Within 1 hour of placing your order, yes — contact us immediately. After that window we usually can't change it once processing has started.",
        },
        {
            id: "shipping-restrictions",
            question: "Are there any shipping restrictions?",
            answer:
                "Some products can't ship to certain locations due to local regulations or carrier restrictions — this is noted on the product page. We also can't ship to P.O. boxes for express or same-day delivery.",
        },
        {
            id: "delivery-estimate",
            question: "Why is my delivery estimate longer than usual?",
            answer:
                "High order volume, weather, or carrier delays can extend delivery windows, especially around holidays. Your shipping confirmation always has the latest estimate.",
        },
    ]

    const returnStats = [
        { value: "30", label: "Day window", detail: "For most items, full refund" },
        { value: "3–5", label: "Days to refund", detail: "After we receive your return" },
        { value: "+10%", label: "Store credit bonus", detail: "If you skip the refund" },
    ]

    const returnSteps = [
        {
            title: "Initiate return",
            text: "Log in, find your order, and select “Return Items,” or contact us directly.",
        },
        {
            title: "Print label",
            text: "We'll email a prepaid return shipping label — just print it out.",
        },
        {
            title: "Package items",
            text: "Pack everything in its original packaging with all accessories and docs.",
        },
        {
            title: "Ship return",
            text: "Drop the package at any authorized location or schedule a pickup.",
        },
    ]

    const eligible = [
        "Unopened items in original packaging",
        "Defective or damaged products (reported within 48 hours)",
        "Items that don't match the product description",
        "Incorrect items received",
        "Gifts, with a gift receipt",
    ]

    const notEligible = [
        "Items marked as final sale or clearance",
        "Products with removed tags or packaging",
        "Items showing signs of use or wear",
        "Digital downloads or activated software",
        "Personalized or custom-made items",
    ]

    const refundMethods = [
        {
            icon: CreditCard,
            title: "Original payment method",
            text: "Card, PayPal, or other methods are refunded back to the original source.",
        },
        {
            icon: Wallet,
            title: "Store credit",
            text: "Choose store credit instead of a refund and get an extra 10% in value.",
        },
        {
            icon: Gift,
            title: "Gift returns",
            text: "Returns with a gift receipt are issued as a gift card at the current price.",
        },
    ]

    const returnFaqs: FaqItem[] = [
        {
            id: "return-shipping",
            question: "Do I have to pay for return shipping?",
            answer:
                "Standard returns get a prepaid label at no cost. Preference-based returns (not defects or our error) have a $5.99 fee deducted from the refund.",
        },
        {
            id: "exchange-process",
            question: "How do exchanges work?",
            answer:
                "Start a return and choose “Exchange” instead — pick the replacement during that flow. We ship the new item right away, without waiting for the original to arrive back.",
        },
        {
            id: "partial-returns",
            question: "Can I return part of my order?",
            answer:
                "Yes — select just the items you want to return during the process. The rest of the order is unaffected.",
        },
        {
            id: "late-returns",
            question: "What if my return is past the 30-day window?",
            answer:
                "Late returns may still be accepted case-by-case, usually as store credit or with a restocking fee. Contact support to talk it through.",
        },
    ]

    return (
        <div className="min-h-screen w-full bg-[#f7f7f5] font-roboto text-primary-dark antialiased">
            {/* =====================================================
                HERO
                ===================================================== */}
            <section className="relative flex min-h-[56vh] w-full items-end overflow-hidden bg-black text-white">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:80px_80px]" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none text-[20vw] font-black leading-none tracking-[-0.08em] text-white/[0.045]">
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
                        <Eyebrow dark>Shipping & Returns</Eyebrow>
                        <h1 className="max-w-2xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-[5rem]">
                            Fast to arrive,
                            <br />
                            <span className="font-light italic text-white/45">
                                easy to send back.
                            </span>
                        </h1>
                        <p className="mt-7 max-w-md text-sm leading-7 text-white/45 md:text-base">
                            Everything on delivery times, tracking, and how returns and
                            refunds actually work.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* =====================================================
                TAB SWITCH
                ===================================================== */}
            <section className="w-full py-14 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                    <div className="mx-auto flex w-full max-w-md rounded-full border border-black/10 bg-[#fafaf9] p-1.5">
                        {[
                            { id: "shipping" as const, label: "Shipping", icon: Truck },
                            { id: "returns" as const, label: "Returns", icon: RefreshCw },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${activeTab === tab.id
                                    ? "bg-black text-white shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
                                    : "text-black/45 hover:text-black/70"
                                    }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
                SHIPPING CONTENT
                ===================================================== */}
            {activeTab === "shipping" && (
                <>
                    {/* Methods */}
                    <section className="w-full py-6 sm:py-10">
                        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="mb-14"
                            >
                                <Eyebrow>Methods</Eyebrow>
                                <Heading line1="Choose your" accent="delivery speed." />
                            </motion.div>

                            <div className="grid gap-5 md:grid-cols-3">
                                {shippingMethods.map((method, i) => (
                                    <motion.div
                                        key={method.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.08 }}
                                        className={`group relative rounded-2xl border p-8 transition-colors duration-500 ${method.featured
                                            ? "border-black bg-black text-white"
                                            : "border-black/[0.07] bg-[#fafaf9] hover:bg-white"
                                            }`}
                                    >
                                        {method.featured && (
                                            <span className="mb-6 inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
                                                Most popular
                                            </span>
                                        )}
                                        <div
                                            className={`mb-6 flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ${method.featured
                                                ? "border-white/20 text-white"
                                                : "border-black/10 text-black/45 group-hover:border-black group-hover:bg-black group-hover:text-white"
                                                }`}
                                        >
                                            <method.icon className="h-4 w-4" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="mb-1 text-lg font-semibold tracking-[-0.02em]">
                                            {method.title}
                                        </h3>
                                        <p
                                            className={`mb-6 text-sm ${method.featured ? "text-white/50" : "text-black/45"
                                                }`}
                                        >
                                            {method.time}
                                        </p>
                                        <p className="text-2xl font-semibold tracking-[-0.03em]">
                                            {method.price}
                                        </p>
                                        <p
                                            className={`mt-2 text-xs ${method.featured ? "text-white/40" : "text-black/35"
                                                }`}
                                        >
                                            {method.note}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Process */}
                    <section className="w-full bg-[#EFEFEC] py-20 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="mb-14"
                            >
                                <Eyebrow>Process</Eyebrow>
                                <Heading line1="From click to" accent="doorstep." />
                            </motion.div>

                            <div className="border-t border-black/[0.08]">
                                {shippingSteps.map((step, i) => (
                                    <motion.div
                                        key={step.title}
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.55, delay: i * 0.06 }}
                                        className="grid items-center gap-4 border-b border-black/[0.08] py-7 sm:grid-cols-[70px_200px_1fr]"
                                    >
                                        <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-black/25">
                                            0{i + 1}
                                        </span>
                                        <span className="text-[15px] font-medium text-black/80">
                                            {step.title}
                                        </span>
                                        <p className="max-w-lg text-sm leading-relaxed text-black/45">
                                            {step.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* International */}
                    <section className="w-full py-20 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    className="lg:col-span-6"
                                >
                                    <Eyebrow>Worldwide</Eyebrow>
                                    <Heading
                                        line1="International"
                                        accent="shipping."
                                        size="text-3xl md:text-4xl"
                                    />
                                    <p className="mb-8 mt-6 max-w-md text-sm leading-7 text-black/50">
                                        We ship to over 50 countries. Transit time typically runs
                                        7–14 business days, and import duties or taxes may apply
                                        depending on your destination.
                                    </p>

                                    <div className="space-y-4">
                                        {internationalRates.map((line) => (
                                            <div key={line} className="flex items-start gap-3">
                                                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-black/30" />
                                                <p className="text-sm leading-relaxed text-black/60">
                                                    {line}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7 }}
                                    className="lg:col-span-6"
                                >
                                    <div className="rounded-2xl border border-black/[0.07] bg-[#fafaf9] p-8 sm:p-10">
                                        <h3 className="mb-6 text-[13px] font-medium uppercase tracking-[0.18em] text-black/40">
                                            Important information
                                        </h3>
                                        <div className="space-y-5">
                                            {internationalNotes.map((note) => (
                                                <div key={note} className="flex items-start gap-3">
                                                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-black/30" />
                                                    <p className="text-sm leading-relaxed text-black/55">
                                                        {note}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ - Light */}
                    <section className="w-full bg-[#EFEFEC] py-20 sm:py-24">
                        <div className="mx-auto max-w-4xl px-4 sm:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="mb-14 text-center"
                            >
                                <Eyebrow center>FAQ</Eyebrow>
                                <Heading line1="Shipping questions." />
                            </motion.div>

                            <FaqList
                                items={shippingFaqs}
                                open={openAccordions}
                                onToggle={toggleAccordion}
                                dark={false}
                            />
                        </div>
                    </section>
                </>
            )}

            {/* =====================================================
                RETURNS CONTENT
                ===================================================== */}
            {activeTab === "returns" && (
                <>
                    {/* Policy stats */}
                    <section className="w-full py-6 sm:py-10">
                        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="mb-14"
                            >
                                <Eyebrow>Policy</Eyebrow>
                                <Heading line1="Returns, made" accent="straightforward." />
                            </motion.div>

                            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-black/[0.07] bg-black/[0.07] sm:grid-cols-3">
                                {returnStats.map((stat, index) => (
                                    <div
                                        key={stat.label}
                                        className="bg-[#fafaf9] p-7 transition-colors duration-500 hover:bg-white sm:p-8 lg:p-10"
                                    >
                                        <span className="font-mono text-[9px] tracking-[0.2em] text-black/20">
                                            0{index + 1}
                                        </span>
                                        <p className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                                            {stat.value}
                                        </p>
                                        <p className="mt-2 text-sm font-medium text-black/70">
                                            {stat.label}
                                        </p>
                                        <p className="mt-1 text-xs text-black/35">{stat.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Return process */}
                    <section className="w-full bg-[#EFEFEC] py-20 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="mb-14"
                            >
                                <Eyebrow>Process</Eyebrow>
                                <Heading line1="How a return" accent="actually works." />
                            </motion.div>

                            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-black/[0.07] bg-black/[0.07] sm:grid-cols-2 lg:grid-cols-4">
                                {returnSteps.map((step, i) => (
                                    <motion.div
                                        key={step.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.55, delay: i * 0.07 }}
                                        className="bg-[#fafaf9] p-7 transition-colors duration-500 hover:bg-white sm:p-8"
                                    >
                                        <span className="font-mono text-[9px] tracking-[0.2em] text-black/20">
                                            0{i + 1}
                                        </span>
                                        <h3 className="mt-6 text-base font-semibold tracking-[-0.02em]">
                                            {step.title}
                                        </h3>
                                        <p className="mt-2 text-[13px] leading-relaxed text-black/45">
                                            {step.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Eligibility */}
                    <section className="w-full py-20 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="mb-14"
                            >
                                <Eyebrow>Eligibility</Eyebrow>
                                <Heading line1="What qualifies" accent="for a return." />
                            </motion.div>

                            <div className="grid gap-8 lg:grid-cols-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="rounded-2xl border border-black/[0.07] bg-[#fafaf9] p-8 sm:p-10"
                                >
                                    <h3 className="mb-6 border-b border-black/[0.08] pb-5 text-[13px] font-medium uppercase tracking-[0.18em] text-black/45">
                                        Eligible
                                    </h3>
                                    <ul className="space-y-4">
                                        {eligible.map((line) => (
                                            <li key={line} className="flex items-start gap-3">
                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/20 text-black/60">
                                                    <Check className="h-3 w-3" strokeWidth={2.5} />
                                                </span>
                                                <span className="text-sm leading-relaxed text-black/60">
                                                    {line}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.08 }}
                                    className="rounded-2xl border border-black/[0.07] bg-[#fafaf9] p-8 sm:p-10"
                                >
                                    <h3 className="mb-6 border-b border-black/[0.08] pb-5 text-[13px] font-medium uppercase tracking-[0.18em] text-black/45">
                                        Not eligible
                                    </h3>
                                    <ul className="space-y-4">
                                        {notEligible.map((line) => (
                                            <li key={line} className="flex items-start gap-3">
                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/15 text-black/30">
                                                    <X className="h-3 w-3" strokeWidth={2.5} />
                                                </span>
                                                <span className="text-sm leading-relaxed text-black/45">
                                                    {line}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Refund info */}
                    <section className="w-full bg-[#EFEFEC] py-20 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    className="lg:col-span-6"
                                >
                                    <Eyebrow>Refunds</Eyebrow>
                                    <Heading
                                        line1="How refunds"
                                        accent="work."
                                        size="text-3xl md:text-4xl"
                                    />
                                    <div className="mt-6 max-w-md space-y-5 text-sm leading-7 text-black/50">
                                        <p>
                                            Once we receive and inspect your return, we'll email
                                            you to confirm it arrived, then let you know if the
                                            refund was approved.
                                        </p>
                                        <p>
                                            If approved, the credit goes back to your original
                                            payment method within 3–5 business days — banks can
                                            take another 5–10 days to show it on your statement.
                                        </p>
                                    </div>
                                    <div className="mt-7 rounded-xl border-l-2 border-black bg-[#fafaf9] p-5">
                                        <p className="text-sm font-medium leading-relaxed text-black/70">
                                            Shipping costs are non-refundable. If your order shipped
                                            free, the standard shipping cost is deducted from the
                                            refund.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7 }}
                                    className="lg:col-span-6"
                                >
                                    <div className="rounded-2xl border border-black/[0.07] bg-white p-8 sm:p-10">
                                        <h3 className="mb-6 text-[13px] font-medium uppercase tracking-[0.18em] text-black/40">
                                            Refund methods
                                        </h3>
                                        <div className="space-y-6">
                                            {refundMethods.map((method) => (
                                                <div key={method.title} className="flex items-start gap-4">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/45">
                                                        <method.icon className="h-4 w-4" strokeWidth={1.5} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[15px] font-medium text-black">
                                                            {method.title}
                                                        </h4>
                                                        <p className="mt-0.5 text-sm leading-relaxed text-black/45">
                                                            {method.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ - Light */}
                    <section className="w-full py-20 sm:py-24">
                        <div className="mx-auto max-w-4xl px-4 sm:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="mb-14 text-center"
                            >
                                <Eyebrow center>FAQ</Eyebrow>
                                <Heading line1="Return questions." />
                            </motion.div>

                            <FaqList
                                items={returnFaqs}
                                open={openAccordions}
                                onToggle={toggleAccordion}
                                dark={false}
                            />
                        </div>
                    </section>
                </>
            )}

            {/* =====================================================
                SUPPORT SECTION — LIGHT (flows into Footer)
                ===================================================== */}
            <section className="w-full bg-[#EFEFEC] py-20 sm:py-24 lg:py-28 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">

                    {/* Header with editorial number */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-16"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <Eyebrow>Support</Eyebrow>
                                <Heading line1="We're here" accent="when you need us." />
                            </div>
                            <span className="hidden font-mono text-[11px] font-medium tracking-[0.2em] text-black/15 lg:block">
                                04 / 04
                            </span>
                        </div>
                    </motion.div>

                    {/* Creative grid with visual hierarchy */}
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {/* Visit Card — with map-like visual element */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.04 }}
                            className="group relative rounded-2xl border border-black/[0.06] bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
                        >
                            {/* Decorative element */}
                            <div className="absolute right-6 top-6 h-16 w-16 rounded-full bg-black/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-[#F7F7F5] text-black/45 transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white">
                                    <MapPin className="h-4.5 w-4.5" strokeWidth={1.5} />
                                </div>

                                <h3 className="mb-1 text-sm font-medium text-black">Visit us</h3>
                                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/25">
                                    Showroom
                                </p>

                                <div className="mt-4 space-y-0.5 text-[15px] leading-relaxed text-black/60">
                                    <p>123 Tech Avenue</p>
                                    <p>San Francisco, CA 94107</p>
                                </div>

                                {/* Direction indicator */}
                                <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-black/25 transition-colors duration-300 group-hover:text-black/60">
                                    <span>Get directions</span>
                                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Email Card — with gradient accent */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.08 }}
                            className="group relative rounded-2xl border border-black/[0.06] bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black/[0.01] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-[#F7F7F5] text-black/45 transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white">
                                    <Mail className="h-4.5 w-4.5" strokeWidth={1.5} />
                                </div>

                                <h3 className="mb-1 text-sm font-medium text-black">Email us</h3>
                                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/25">
                                    We reply within 24h
                                </p>

                                <div className="mt-4 space-y-1.5 text-[15px] leading-relaxed">
                                    <a
                                        href="mailto:returns@gizmostore.com"
                                        className="block text-black/60 transition-colors hover:text-black"
                                    >
                                        returns@gizmostore.com
                                    </a>
                                    <a
                                        href="mailto:shipping@gizmostore.com"
                                        className="block text-black/60 transition-colors hover:text-black"
                                    >
                                        shipping@gizmostore.com
                                    </a>
                                </div>

                                {/* Quick action */}
                                <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-black/25 transition-colors duration-300 group-hover:text-black/60">
                                    <span>Send a message</span>
                                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Hours Card — with timeline visual */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.12 }}
                            className="group relative rounded-2xl border border-black/[0.06] bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
                        >
                            <div className="relative">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-[#F7F7F5] text-black/45 transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white">
                                    <Clock className="h-4.5 w-4.5" strokeWidth={1.5} />
                                </div>

                                <h3 className="mb-1 text-sm font-medium text-black">Hours</h3>
                                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/25">
                                    When to find us
                                </p>

                                <div className="mt-4 space-y-2.5">
                                    <div className="flex items-center justify-between border-b border-black/[0.04] pb-2">
                                        <span className="text-sm text-black/40">Monday – Friday</span>
                                        <span className="text-sm font-medium text-black/70">9am – 6pm</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-black/[0.04] pb-2">
                                        <span className="text-sm text-black/40">Saturday</span>
                                        <span className="text-sm font-medium text-black/70">10am – 4pm</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-black/30">Sunday</span>
                                        <span className="text-sm font-light italic text-black/25">Closed</span>
                                    </div>
                                </div>

                                {/* Status indicator */}
                                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-50/80 px-3 py-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/60" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                                    </span>
                                    <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-green-600/70">
                                        Open now
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                FINAL CTA — LIGHT (not black, flows into Footer cleanly)
                ===================================================== */}
            <section className="relative w-full overflow-hidden bg-[#F7F7F5] py-20 sm:py-24 lg:py-28 border-t border-black/[0.06]">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="select-none whitespace-nowrap text-[24vw] font-black leading-none tracking-[-0.08em] text-black/[0.03]">
                        GIZMO
                    </span>
                </div>

                <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="mb-5 flex items-center justify-center gap-3">
                            <span className="h-px w-10 bg-black/20" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/30">
                                Still have questions?
                            </span>
                            <span className="h-px w-10 bg-black/20" />
                        </div>

                        <h2 className="mb-6 text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-black md:text-5xl">
                            We're here to
                            <br />
                            <span className="font-light italic text-black/30">
                                help.
                            </span>
                        </h2>
                        <p className="mx-auto mb-10 max-w-md text-sm leading-7 text-black/40 md:text-base">
                            Our support team is ready to help with any shipping or return
                            question.
                        </p>

                        <a
                            href="/contactus"
                            className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-black px-9 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.15)]"
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

export default Shipping