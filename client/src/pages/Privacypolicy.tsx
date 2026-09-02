"use client"

import {
  Mail,
  Shield,
  Lock,
  Eye,
  Database,
  Globe,
  UserCheck,
  FileText,
  ChevronDown,
  ArrowRight,
  Key,
  Server,
  Cookie
} from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState<string | null>("introduction")

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id)
  }

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
      transition: { staggerChildren: 0.06 },
    },
  }

  const privacySections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: Shield,
      content: `
        <p>At Gizmo, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website gizmostore.com, including any other media form, media channel, mobile website, or mobile application related or connected to Gizmo (collectively, the "Site").</p>
        <p class="mt-4">Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site.</p>
        <p class="mt-4">We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the Site, and you waive the right to receive specific notice of each such change or modification.</p>
      `,
    },
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: `
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-0">Personal Data</h3>
        <p>Personally identifiable information, such as your name, shipping address, email address, telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</p>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">Derivative Data</h3>
        <p>Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</p>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">Financial Data</h3>
        <p>Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site. All financial information is stored by our payment processor.</p>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">Mobile Device Data</h3>
        <p>Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the Site from a mobile device.</p>
      `,
    },
    {
      id: "use-of-information",
      title: "Use of Your Information",
      icon: Eye,
      content: `
        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
        <ul class="list-disc pl-5 mt-3 space-y-1.5">
          <li>Create and manage your account.</li>
          <li>Process your orders and manage your transactions.</li>
          <li>Send you a newsletter or promotional materials.</li>
          <li>Email you regarding your account or order.</li>
          <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          <li>Notify you of updates to the Site.</li>
          <li>Offer new products, services, mobile applications, and/or recommendations to you.</li>
          <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
        </ul>
      `,
    },
    {
      id: "disclosure-of-information",
      title: "Disclosure of Your Information",
      icon: Globe,
      content: `
        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">By Law or to Protect Rights</h3>
        <p>If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law.</p>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">Third-Party Service Providers</h3>
        <p>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</p>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">Business Transfers</h3>
        <p>We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</p>
      `,
    },
    {
      id: "tracking-technologies",
      title: "Tracking Technologies",
      icon: Cookie,
      content: `
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-0">Cookies and Web Beacons</h3>
        <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.</p>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">Internet-Based Advertising</h3>
        <p>Additionally, we may use third-party software to serve ads on the Site, implement email marketing campaigns, and manage other interactive marketing initiatives. This third-party software may use cookies or similar tracking technology to help manage and optimize your online experience with us.</p>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">Website Analytics</h3>
        <p>We may also partner with selected third-party vendors, such as Google Analytics, to allow tracking technologies and remarketing services on the Site through the use of first party cookies and third-party cookies, to, among other things, analyze and track users' use of the Site, determine the popularity of certain content and better understand online activity.</p>
      `,
    },
    {
      id: "third-party-websites",
      title: "Third-Party Websites",
      icon: Globe,
      content: `
        <p>The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices (if any) of the third party responsible for that website.</p>
      `,
    },
    {
      id: "security-of-information",
      title: "Security of Your Information",
      icon: Lock,
      content: `
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">Security Measures We Implement</h3>
        <ul class="list-disc pl-5 mt-2 space-y-1.5">
          <li>Secure Socket Layer (SSL) technology to ensure that your information is encrypted and sent across the Internet securely.</li>
          <li>PCI Compliance for all financial transactions.</li>
          <li>Regular security assessments and penetration testing.</li>
          <li>Limited access to personal information to authorized personnel only.</li>
          <li>Physical security measures at our data centers.</li>
        </ul>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">Data Retention</h3>
        <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law. When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it.</p>
      `,
    },
    {
      id: "policy-for-children",
      title: "Policy for Children",
      icon: Shield,
      content: `
        <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">COPPA (Children Online Privacy Protection Act)</h3>
        <p>When it comes to the collection of personal information from children under the age of 13 years old, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, United States' consumer protection agency, enforces the COPPA Rule.</p>
        
        <p class="mt-3">We do not specifically market to children under the age of 13 years old.</p>
      `,
    },
    {
      id: "your-privacy-rights",
      title: "Your Privacy Rights",
      icon: UserCheck,
      content: `
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-0">Account Information</h3>
        <p>You may at any time review or change the information in your account or terminate your account by logging into your account settings or contacting us.</p>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">Emails and Communications</h3>
        <p>If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1.5">
          <li>Noting your preferences at the time you register your account with the Site</li>
          <li>Logging into your account settings and updating your preferences</li>
          <li>Following the opt-out instructions in the promotional emails we send you</li>
        </ul>
      `,
    },
    {
      id: "california-privacy-rights",
      title: "California Privacy Rights",
      icon: Key,
      content: `
        <p>California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes.</p>
        
        <h3 class="text-sm font-medium text-black/80 mb-2 mt-4">CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>
        <p>Under the CCPA, among other rights, California consumers have the right to:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1.5">
          <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
          <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
          <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
        </ul>
        <p class="mt-3">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
      `,
    },
    {
      id: "gdpr-data-protection-rights",
      title: "GDPR Data Protection Rights",
      icon: Server,
      content: `
        <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1.5">
          <li><strong class="text-black/70">The right to access</strong> – You have the right to request copies of your personal data.</li>
          <li><strong class="text-black/70">The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
          <li><strong class="text-black/70">The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
          <li><strong class="text-black/70">The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data.</li>
          <li><strong class="text-black/70">The right to object to processing</strong> – You have the right to object to our processing of your personal data.</li>
          <li><strong class="text-black/70">The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</li>
        </ul>
        <p class="mt-3">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
      `,
    },
    {
      id: "contact-us",
      title: "Contact Us",
      icon: Mail,
      content: `
        <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
        <p class="mt-3 leading-relaxed">
          Gizmo<br />
          <span class="text-black/50">123 Tech Avenue</span><br />
          <span class="text-black/50">San Francisco, CA 94107</span><br />
          <span class="text-black/50">United States</span><br />
          <span class="text-black/50">Phone: (555) 123-4567</span><br />
          <a href="mailto:privacy@gizmostore.com" class="text-black underline underline-offset-2 decoration-black/30 hover:decoration-black transition-colors">privacy@gizmostore.com</a>
        </p>
      `,
    },
  ]

  useEffect(() => {
    window.scroll(0, 0)
  }, [])


  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] font-sans antialiased">
      {/* ═══════════════════════════════════════════════════
          HERO — Cinematic, architectural, editorial
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:70px_70px]" />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[22vw] font-black leading-none tracking-[-0.09em] text-white/[0.035]">
            PRIVACY
          </div>

          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />

          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 lg:px-14 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-white/30" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                Privacy
              </span>
              <span className="h-px w-8 bg-white/30" />
            </div>

            <h1 className="text-[2.8rem] font-medium leading-[0.9] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-[4.8rem]">
              Your data,
              <br />
              <span className="font-light italic text-white/40">
                your trust.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/40 sm:text-base">
              Learn how we collect, use, and protect your personal information.
            </p>
          </motion.div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/25">
            <span>Last Updated</span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <span>March 15, 2025</span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <span>Version 2.1</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          INTRODUCTION — Editorial overview with principles
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
              Protecting your
              <br />
              <span className="text-black/40">privacy is our priority.</span>
            </h2>

            <div className="space-y-4 text-[15px] leading-7 text-black/50">
              <p>
                At Gizmo, we take your privacy seriously. This Privacy Policy describes how we collect, use, and share
                information about you when you use our website, mobile applications, and other online products and
                services (collectively, the "Services") or when you otherwise interact with us.
              </p>
              <p>
                We encourage you to read this Privacy Policy carefully to understand our practices regarding your
                information. By accessing or using our Services, you acknowledge that you have read and understood this
                Privacy Policy.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-black/5 bg-[#EFEFEC] px-6 py-5">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white">
                  <Shield className="h-3.5 w-3.5 text-black/50" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-black/70">Our Commitment</p>
                  <p className="text-sm leading-relaxed text-black/45">
                    This Privacy Policy applies to all visitors, users, and others who access or use the Gizmo Services.
                    We are committed to transparency and user control over personal data.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRIVACY PRINCIPLES — Four pillars
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#EFEFEC] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-14 xl:px-20">
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
                Our Principles
              </span>
              <span className="h-px w-8 bg-black/20" />
            </div>
            <h2 className="text-3xl font-medium tracking-[-0.04em] text-black sm:text-4xl">
              Built on
              <span className="text-black/40"> trust.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: Lock, title: "Security First", description: "Robust measures to protect your personal information from unauthorized access." },
              { icon: Eye, title: "Transparency", description: "Clear about what data we collect, how we use it, and who we share it with." },
              { icon: UserCheck, title: "User Control", description: "You control your personal information with easy access to privacy settings." },
              { icon: Database, title: "Data Minimization", description: "We only collect what we need to provide and improve our services." },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group rounded-2xl border border-black/5 bg-[#F7F7F5] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white text-black/40 transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                  <item.icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-medium text-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/45">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          MAIN CONTENT — TOC + Accordion
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden border-t border-black/5 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-24 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-[-0.09em] text-black/[0.015]">
            01–12
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
                  {privacySections.map((section, index) => {
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
                {privacySections.map((section, index) => {
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
                                className="prose-sm max-w-none text-[13.5px] leading-7 text-black/50 sm:text-[14px] [&_strong]:font-medium [&_strong]:text-black/70 [&_ul]:text-black/50 [&_a]:text-black/70 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-black/20 [&_a]:transition-colors hover:[&_a]:decoration-black/60 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:text-black/80"
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
          LEGAL DISCLAIMER
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
              Privacy Disclaimer
            </h2>

            <div className="space-y-4 text-[14px] leading-7 text-black/50">
              <p>
                This Privacy Policy is provided for informational purposes only and does not constitute legal advice.
                We recommend that you consult with a qualified legal professional to understand your rights and
                obligations regarding data privacy and protection.
              </p>
              <p>
                While we strive to keep our Privacy Policy up to date and accurate, we make no representations or
                warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability,
                or availability of the information contained herein.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-black/5 bg-white/60 px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-black/30">
                ⚠️ For informational purposes only
              </p>
              <p className="mt-1 text-sm leading-relaxed text-black/45">
                This content does not constitute legal advice. Please consult a qualified legal professional for
                advice specific to your situation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CONTACT / PRIVACY INQUIRIES
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#EFEFEC] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-[-0.09em] text-black/[0.02]">
            PRIVACY
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
              Privacy
              <span className="text-black/40"> Inquiries</span>
            </h2>
            <p className="mt-3 text-sm text-black/40">
              Have questions about your privacy? Reach out to our privacy team.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Mail,
                title: "Email Us",
                subtitle: "Privacy-related questions",
                lines: [
                  "privacy@gizmostore.com",
                  "We respond within 48 hours",
                ],
              },
              {
                icon: FileText,
                title: "Data Requests",
                subtitle: "Request a copy of your data",
                lines: [
                  "datarequest@gizmostore.com",
                  "Please allow up to 30 days",
                ],
              },
              {
                icon: Globe,
                title: "International",
                subtitle: "EU/GDPR specific inquiries",
                lines: [
                  "gdpr@gizmostore.com",
                  "Our DPO will assist you",
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
              Have questions about
              <br />
              <span className="text-black/40">your privacy?</span>
            </h2>

            <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-black/40">
              Our privacy team is ready to help you understand how we protect your personal information.
            </p>

            <a
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-black px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]"
            >
              Contact Privacy Team
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy