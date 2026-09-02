"use client"

import { Mail, Clock, FileText, ChevronDown, ArrowRight, Shield, BookOpen, Scale, Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const TermsConditions = () => {
    const [activeSection, setActiveSection] = useState<string | null>("acceptance")

    const toggleSection = (id: string) => {
        setActiveSection(activeSection === id ? null : id)
    }

    const termsSections = [
        {
            id: "acceptance",
            title: "Acceptance of Terms",
            icon: FileText,
            content: `
        <p>By accessing or using the Gizmo website, mobile applications, or any other services provided by Gizmo (collectively, the "Services"), you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, you may not access or use our Services.</p>
        <p class="mt-4">These Terms and Conditions apply to all visitors, users, and others who access or use the Services. By accessing or using the Services, you agree to be bound by these Terms and Conditions.</p>
      `,
        },
        {
            id: "user-accounts",
            title: "User Accounts",
            icon: Shield,
            content: `
        <p>When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.</p>
        <p class="mt-4">You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.</p>
        <p class="mt-4">You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
      `,
        },
        {
            id: "intellectual-property",
            title: "Intellectual Property",
            icon: BookOpen,
            content: `
        <p>The Services and their original content, features, and functionality are and will remain the exclusive property of Gizmo and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
        <p class="mt-4">Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Gizmo.</p>
        <p class="mt-4">You may not duplicate, copy, or reuse any portion of the HTML/CSS, JavaScript, or visual design elements or concepts without express written permission from Gizmo.</p>
      `,
        },
        {
            id: "prohibited-activities",
            title: "Prohibited Activities",
            icon: Scale,
            content: `
        <p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
        <p class="mt-4">As a user of the Services, you agree not to:</p>
        <ul class="list-disc pl-5 mt-3 space-y-2">
          <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
          <li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
          <li>Use the Services to advertise or offer to sell goods and services.</li>
          <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
          <li>Engage in unauthorized framing of or linking to the Services.</li>
          <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
          <li>Attempt to impersonate another user or person or use the username of another user.</li>
        </ul>
      `,
        },
        {
            id: "privacy-policy",
            title: "Privacy Policy",
            icon: Eye,
            content: `
        <p>We care about data privacy and security. Please review our Privacy Policy at <a href="/privacy-policy" class="underline underline-offset-2 decoration-black/30 hover:decoration-black transition-colors">https://gizmostore.com/privacy-policy</a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Terms and Conditions.</p>
        <p class="mt-4">Further, we do not knowingly accept, request, or solicit information from children or knowingly market to children. Therefore, if we receive actual knowledge that anyone under the age of 13 has provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the Services as quickly as is reasonably practical.</p>
      `,
        },
        {
            id: "payment-terms",
            title: "Payment Terms",
            icon: FileText,
            content: `
        <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.</p>
        <p class="mt-4">We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address.</p>
        <p class="mt-4">Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in U.S. dollars.</p>
      `,
        },
        {
            id: "shipping-returns",
            title: "Shipping and Returns",
            icon: FileText,
            content: `
        <p>Please review our Shipping and Returns Policy at <a href="/shipping-returns" class="underline underline-offset-2 decoration-black/30 hover:decoration-black transition-colors">https://gizmostore.com/shipping-returns</a> for more information on shipping methods, delivery times, and return procedures.</p>
        <p class="mt-4">By making a purchase through the Services, you agree to be bound by our Shipping and Returns Policy, which is incorporated into these Terms and Conditions.</p>
      `,
        },
        {
            id: "limitation-liability",
            title: "Limitation of Liability",
            icon: Scale,
            content: `
        <p>In no event shall Gizmo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
        <ul class="list-disc pl-5 mt-3 space-y-2">
          <li>Your access to or use of or inability to access or use the Services;</li>
          <li>Any conduct or content of any third party on the Services;</li>
          <li>Any content obtained from the Services; and</li>
          <li>Unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</li>
        </ul>
        <p class="mt-4">In jurisdictions where the exclusion or limitation of liability for consequential or incidental damages is not allowed, our liability shall be limited to the maximum extent permitted by law.</p>
      `,
        },
        {
            id: "dispute-resolution",
            title: "Dispute Resolution",
            icon: Scale,
            content: `
        <p><strong class="text-black font-medium">Informal Negotiations</strong> — To expedite resolution and control the cost of any dispute, controversy, or claim related to these Terms and Conditions (each a "Dispute" and collectively, the "Disputes") brought by either you or us (individually, a "Party" and collectively, the "Parties"), the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration.</p>
        <p class="mt-4"><strong class="text-black font-medium">Binding Arbitration</strong> — If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute shall be determined by binding arbitration. The arbitration will be conducted in the State of California, San Francisco County, unless you and Gizmo agree otherwise. The arbitration shall be conducted confidentially by a single, neutral arbitrator.</p>
        <p class="mt-4"><strong class="text-black font-medium">Restrictions</strong> — The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.</p>
      `,
        },
        {
            id: "termination",
            title: "Termination",
            icon: FileText,
            content: `
        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        <p class="mt-4">Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services, or notify us that you wish to delete your account.</p>
        <p class="mt-4">All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
      `,
        },
        {
            id: "changes-to-terms",
            title: "Changes to Terms",
            icon: FileText,
            content: `
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        <p class="mt-4">By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Services.</p>
      `,
        },
        {
            id: "governing-law",
            title: "Governing Law",
            icon: Scale,
            content: `
        <p>These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.</p>
        <p class="mt-4">Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
      `,
        },
        {
            id: "contact-us",
            title: "Contact Us",
            icon: Mail,
            content: `
        <p>If you have any questions about these Terms and Conditions, please contact us:</p>
        <ul class="list-disc pl-5 mt-3 space-y-2">
          <li>By email: <a href="mailto:legal@gizmostore.com" class="underline underline-offset-2 decoration-black/30 hover:decoration-black transition-colors">legal@gizmostore.com</a></li>
          <li>By phone: (555) 123-4567</li>
          <li>By mail: 123 Tech Avenue, San Francisco, CA 94107, United States</li>
        </ul>
      `,
        },
    ]

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

    return (
        <div className="min-h-screen w-full overflow-hidden bg-[#F7F7F5] font-sans antialiased">
            {/* ═══════════════════════════════════════════════════
                HERO — Cinematic, architectural, editorial
            ═══════════════════════════════════════════════════ */}
            <section className="relative w-full overflow-hidden bg-black text-white">
                {/* Background treatments */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:70px_70px]" />

                    {/* Giant background typography */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[22vw] font-black leading-none tracking-[-0.09em] text-white/[0.035]">
                        LEGAL
                    </div>

                    {/* Soft radial glow */}
                    <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />

                    {/* Architectural line */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
                </div>

                <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 lg:px-14 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-3xl"
                    >
                        {/* Eyebrow */}
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-8 bg-white/30" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                                Legal
                            </span>
                            <span className="h-px w-8 bg-white/30" />
                        </div>

                        <h1 className="text-[2.8rem] font-medium leading-[0.9] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[4.8rem]">
                            Terms &amp;
                            <br />
                            <span className="font-light italic text-white/40">
                                Conditions
                            </span>
                        </h1>

                        <p className="mt-6 max-w-md text-sm leading-7 text-white/40 sm:text-base">
                            Please read these terms carefully before using our services.
                        </p>
                    </motion.div>

                    {/* Bottom metadata strip */}
                    <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/25">
                        <span>Last Updated</span>
                        <span className="hidden h-3 w-px bg-white/10 sm:block" />
                        <span>March 15, 2025</span>
                        <span className="hidden h-3 w-px bg-white/10 sm:block" />
                        <span>Version 2.4</span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                INTRODUCTION — Editorial overview
            ═══════════════════════════════════════════════════ */}
            <section className="relative w-full overflow-hidden py-20 sm:py-24">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 opacity-[0.015] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-8 bg-black/25" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                                Overview
                            </span>
                        </div>

                        <h2 className="mb-6 text-3xl font-medium tracking-[-0.04em] text-black sm:text-4xl">
                            Welcome to
                            <br />
                            <span className="text-black/40">Gizmo.</span>
                        </h2>

                        <div className="space-y-4 text-[15px] leading-7 text-black/50">
                            <p>
                                These Terms and Conditions govern your use of the Gizmo website
                                and services, including any content, functionality, and services
                                offered on or through gizmostore.com.
                            </p>
                            <p>
                                By using our Website, you accept and agree to be bound by these
                                Terms and Conditions and our Privacy Policy. If you do not agree
                                to these Terms and Conditions, you must not access or use our
                                Website.
                            </p>
                        </div>

                        {/* Highlight box */}
                        <div className="mt-8 rounded-2xl border border-black/5 bg-[#EFEFEC] px-6 py-5">
                            <div className="flex items-start gap-4">
                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white">
                                    <FileText className="h-3.5 w-3.5 text-black/50" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-black/70">Legal Agreement</p>
                                    <p className="text-sm leading-relaxed text-black/45">
                                        This document contains important information about your legal
                                        rights, remedies, and obligations. By using our services, you
                                        agree to these terms.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                MAIN CONTENT — Two-column layout with TOC + Accordion
            ═══════════════════════════════════════════════════ */}
            <section className="relative w-full overflow-hidden border-t border-black/5 py-20 sm:py-24">
                {/* Background ghost number */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-24 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-[-0.09em] text-black/[0.015]">
                        01–13
                    </div>
                </div>

                <div className="relative z-10 mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
                    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Sticky Table of Contents */}
                        <div className="lg:col-span-4">
                            <div className="lg:sticky lg:top-28">
                                <div className="mb-6 flex items-center gap-3">
                                    <span className="h-px w-6 bg-black/25" />
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                                        Contents
                                    </span>
                                </div>

                                <nav className="space-y-0.5">
                                    {termsSections.map((section, index) => {
                                        const isActive = activeSection === section.id

                                        return (
                                            <button
                                                key={section.id}
                                                onClick={() => {
                                                    setActiveSection(section.id)
                                                    document
                                                        .getElementById(section.id)
                                                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                                                }}
                                                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-300 ${isActive
                                                    ? "bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
                                                    : "text-black/50 hover:bg-black/[0.04] hover:text-black"
                                                    }`}
                                            >
                                                <span
                                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-medium transition-all duration-300 ${isActive
                                                        ? "bg-white/15 text-white"
                                                        : "bg-black/[0.06] text-black/40 group-hover:bg-black/10"
                                                        }`}
                                                >
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                                <span className="text-[12px] font-medium leading-tight">
                                                    {section.title}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </nav>
                            </div>
                        </div>

                        {/* Accordion sections */}
                        <div className="lg:col-span-8">
                            <div className="space-y-3">
                                {termsSections.map((section, index) => {
                                    const isOpen = activeSection === section.id
                                    const Icon = section.icon

                                    return (
                                        <motion.div
                                            key={section.id}
                                            id={section.id}
                                            initial={{ opacity: 0, y: 12 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-40px" }}
                                            transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.2) }}
                                            className="scroll-mt-28 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                                        >
                                            <button
                                                onClick={() => toggleSection(section.id)}
                                                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-black/[0.01] sm:px-7 sm:py-5"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="hidden text-[11px] font-medium tracking-tight text-black/20 sm:block">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen
                                                        ? "bg-black text-white"
                                                        : "bg-black/5 text-black/30"
                                                        }`}>
                                                        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                                                    </div>
                                                    <h3 className={`text-[14px] font-medium tracking-tight transition-colors sm:text-[15px] ${isOpen ? "text-black" : "text-black/70"
                                                        }`}>
                                                        {section.title}
                                                    </h3>
                                                </div>

                                                <ChevronDown
                                                    className={`h-4 w-4 shrink-0 transition-all duration-300 ${isOpen
                                                        ? "rotate-180 text-black"
                                                        : "text-black/30"
                                                        }`}
                                                    strokeWidth={1.5}
                                                />
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                                    >
                                                        <div className="border-t border-black/5 px-5 pb-5 pt-4 sm:px-7 sm:pb-6 sm:pt-5">
                                                            <div
                                                                className="prose-sm max-w-none text-[13.5px] leading-7 text-black/50 sm:text-[14px] [&_strong]:font-medium [&_strong]:text-black/70 [&_ul]:text-black/50 [&_a]:text-black/70 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-black/20 [&_a]:transition-colors hover:[&_a]:decoration-black/60"
                                                                dangerouslySetInnerHTML={{ __html: section.content }}
                                                            />
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                LEGAL DISCLAIMER — Full-width editorial block
            ═══════════════════════════════════════════════════ */}
            <section className="relative w-full overflow-hidden border-t border-black/5 py-20 sm:py-24">
                <div className="mx-auto max-w-3xl px-5 sm:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="rounded-2xl border border-black/5 bg-[#EFEFEC] p-8 sm:p-10"
                    >
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-6 bg-black/25" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                                Disclaimer
                            </span>
                        </div>

                        <h2 className="mb-5 text-2xl font-medium tracking-[-0.03em] text-black">
                            Legal Disclaimer
                        </h2>

                        <div className="space-y-4 text-[14px] leading-7 text-black/50">
                            <p>
                                The information provided on this Website is for general
                                informational purposes only. All information on the Website is
                                provided in good faith; however, we make no representation or
                                warranty of any kind, express or implied, regarding the accuracy,
                                adequacy, validity, reliability, availability, or completeness of
                                any information on the Website.
                            </p>
                            <p>
                                Under no circumstance shall we have any liability to you for any
                                loss or damage of any kind incurred as a result of the use of the
                                Website or reliance on any information provided on the Website.
                                Your use of the Website and your reliance on any information on
                                the Website is solely at your own risk.
                            </p>
                        </div>

                        <div className="mt-6 rounded-xl border border-black/5 bg-white/60 px-5 py-4">
                            <p className="text-xs font-medium uppercase tracking-[0.15em] text-black/30">
                                ⚠️ For informational purposes only
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-black/45">
                                This content does not constitute legal advice. Please consult a
                                qualified legal professional for advice specific to your situation.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                CONTACT / LEGAL INQUIRIES — Creative support grid
            ═══════════════════════════════════════════════════ */}
            <section className="relative w-full overflow-hidden bg-[#EFEFEC] py-20 sm:py-24">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-[-0.09em] text-black/[0.02]">
                        LEGAL
                    </div>
                </div>

                <div className="relative z-10 mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
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
                                Inquiries
                            </span>
                            <span className="h-px w-8 bg-black/20" />
                        </div>
                        <h2 className="text-3xl font-medium tracking-[-0.04em] text-black sm:text-4xl">
                            Legal
                            <span className="text-black/40"> Inquiries</span>
                        </h2>
                        <p className="mt-3 text-sm text-black/40">
                            Have questions about our terms? Reach out to our legal team.
                        </p>
                    </motion.div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {[
                            {
                                icon: FileText,
                                title: "Legal Department",
                                subtitle: "Formal notices & inquiries",
                                lines: [
                                    "legal@gizmostore.com",
                                    "(555) 123-4567 ext. 123",
                                ],
                            },
                            {
                                icon: Mail,
                                title: "Mailing Address",
                                subtitle: "Send correspondence here",
                                lines: [
                                    "Gizmo Legal Department",
                                    "123 Tech Avenue",
                                    "San Francisco, CA 94107",
                                ],
                            },
                            {
                                icon: Clock,
                                title: "Response Time",
                                subtitle: "When to expect a reply",
                                lines: [
                                    "3–5 business days",
                                    "Monday – Friday",
                                    "9am – 5pm PT",
                                ],
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                className="group rounded-2xl border border-black/5 bg-[#F7F7F5] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
                            >
                                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white text-black/40 transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
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
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                FINAL CTA — Light section that flows into Footer
            ═══════════════════════════════════════════════════ */}
            <section className="relative w-full overflow-hidden bg-[#F7F7F5] py-20 text-black sm:py-24 border-t border-black/5">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[20vw] font-black leading-none tracking-[-0.09em] text-black/[0.015]">
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
                            Questions about
                            <br />
                            <span className="text-black/40">our terms?</span>
                        </h2>

                        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-black/40">
                            Our team is ready to help clarify any part of these Terms and
                            Conditions.
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

export default TermsConditions