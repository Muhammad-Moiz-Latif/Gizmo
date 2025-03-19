"use client"

import { Mail, Shield, Lock, Eye, Database, Globe, UserCheck, FileText, ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"

export const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Toggle section visibility
  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id)
  }

  // Privacy policy sections data
  const privacySections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: `
                <p>At Gizmo, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website gizmostore.com, including any other media form, media channel, mobile website, or mobile application related or connected to Gizmo (collectively, the "Site").</p>
                <p class="mt-4">Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site.</p>
                <p class="mt-4">We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the Site, and you waive the right to receive specific notice of each such change or modification.</p>
                <p class="mt-4">You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Site after the date such revised Privacy Policy is posted.</p>
            `,
    },
    {
      id: "information-collection",
      title: "2. Information We Collect",
      content: `
                <h3 class="text-lg font-semibold mb-2 text-black">Personal Data</h3>
                <p>Personally identifiable information, such as your name, shipping address, email address, telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Derivative Data</h3>
                <p>Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site. If you are using our mobile application, this information may also include your device name and type, your operating system, your phone number, your country, your likes and replies, and other interactions with the application and other users via server log files, as well as any other information you choose to provide.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Financial Data</h3>
                <p>Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, and you are encouraged to review their privacy policy and contact them directly for responses to your questions.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Mobile Device Data</h3>
                <p>Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the Site from a mobile device.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Third-Party Data</h3>
                <p>Information from third parties, such as personal information or network friends, if you connect your account to the third party and grant the Site permission to access this information.</p>
            `,
    },
    {
      id: "use-of-information",
      title: "3. Use of Your Information",
      content: `
                <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                <ul class="list-disc pl-6 mt-2 space-y-2">
                    <li>Create and manage your account.</li>
                    <li>Process your orders and manage your transactions.</li>
                    <li>Send you a newsletter or promotional materials.</li>
                    <li>Email you regarding your account or order.</li>
                    <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                    <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                    <li>Notify you of updates to the Site.</li>
                    <li>Offer new products, services, mobile applications, and/or recommendations to you.</li>
                    <li>Perform other business activities as needed.</li>
                    <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                    <li>Process payments and refunds.</li>
                    <li>Request feedback and contact you about your use of the Site.</li>
                    <li>Resolve disputes and troubleshoot problems.</li>
                    <li>Respond to product and customer service requests.</li>
                </ul>
            `,
    },
    {
      id: "disclosure-of-information",
      title: "4. Disclosure of Your Information",
      content: `
                <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">By Law or to Protect Rights</h3>
                <p>If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation. This includes exchanging information with other entities for fraud protection and credit risk reduction.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Third-Party Service Providers</h3>
                <p>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Marketing Communications</h3>
                <p>With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Interactions with Other Users</h3>
                <p>If you interact with other users of the Site, those users may see your name, profile photo, and descriptions of your activity, including sending invitations to other users, chatting with other users, liking posts, following blogs.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Online Postings</h3>
                <p>When you post comments, contributions or other content to the Site, your posts may be viewed by all users and may be publicly distributed outside the Site in perpetuity.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Business Transfers</h3>
                <p>We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</p>
            `,
    },
    {
      id: "tracking-technologies",
      title: "5. Tracking Technologies",
      content: `
                <h3 class="text-lg font-semibold mb-2 text-black">Cookies and Web Beacons</h3>
                <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site. You may not decline web beacons. However, they can be rendered ineffective by declining all cookies or by modifying your web browser's settings to notify you each time a cookie is tendered, permitting you to accept or decline cookies on an individual basis.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Internet-Based Advertising</h3>
                <p>Additionally, we may use third-party software to serve ads on the Site, implement email marketing campaigns, and manage other interactive marketing initiatives. This third-party software may use cookies or similar tracking technology to help manage and optimize your online experience with us. For more information about opting-out of interest-based ads, visit the <a href="http://www.networkadvertising.org/choices/" class="text-black underline">Network Advertising Initiative Opt-Out Tool</a> or <a href="http://www.aboutads.info/choices/" class="text-black underline">Digital Advertising Alliance Opt-Out Tool</a>.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Website Analytics</h3>
                <p>We may also partner with selected third-party vendors, such as Google Analytics, to allow tracking technologies and remarketing services on the Site through the use of first party cookies and third-party cookies, to, among other things, analyze and track users' use of the Site, determine the popularity of certain content and better understand online activity. By accessing the Site, you consent to the collection and use of your information by these third-party vendors. You are encouraged to review their privacy policy and contact them directly for responses to your questions. We do not transfer personal information to these third-party vendors.</p>
                <p class="mt-2">You should be aware that getting a new computer, installing a new browser, upgrading an existing browser, or erasing or otherwise altering your browser's cookies files may also clear certain opt-out cookies, plug-ins, or settings.</p>
            `,
    },
    {
      id: "third-party-websites",
      title: "6. Third-Party Websites",
      content: `
                <p>The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices (if any) of the third party responsible for that website, and should take those steps necessary to, in your discretion, protect the privacy of your information. We are not responsible for the content or privacy and security practices and policies of any third parties, including other sites, services or applications that may be linked to or from the Site.</p>
            `,
    },
    {
      id: "security-of-information",
      title: "7. Security of Your Information",
      content: `
                <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Security Measures We Implement</h3>
                <ul class="list-disc pl-6 mt-2 space-y-2">
                    <li>Secure Socket Layer (SSL) technology to ensure that your information is encrypted and sent across the Internet securely.</li>
                    <li>PCI Compliance for all financial transactions.</li>
                    <li>Regular security assessments and penetration testing.</li>
                    <li>Limited access to personal information to authorized personnel only.</li>
                    <li>Physical security measures at our data centers.</li>
                    <li>Employee training on the importance of data security and privacy.</li>
                </ul>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Data Retention</h3>
                <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it.</p>
            `,
    },
    {
      id: "policy-for-children",
      title: "8. Policy for Children",
      content: `
                <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">COPPA (Children Online Privacy Protection Act)</h3>
                <p>When it comes to the collection of personal information from children under the age of 13 years old, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, United States' consumer protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online.</p>
                
                <p class="mt-4">We do not specifically market to children under the age of 13 years old.</p>
            `,
    },
    {
      id: "your-privacy-rights",
      title: "9. Your Privacy Rights",
      content: `
                <h3 class="text-lg font-semibold mb-2 text-black">Account Information</h3>
                <p>You may at any time review or change the information in your account or terminate your account by:</p>
                <ul class="list-disc pl-6 mt-2 space-y-2">
                    <li>Logging into your account settings and updating your account</li>
                    <li>Contacting us using the contact information provided below</li>
                </ul>
                <p class="mt-4">Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">Emails and Communications</h3>
                <p>If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:</p>
                <ul class="list-disc pl-6 mt-2 space-y-2">
                    <li>Noting your preferences at the time you register your account with the Site</li>
                    <li>Logging into your account settings and updating your preferences</li>
                    <li>Contacting us using the contact information provided below</li>
                    <li>Following the opt-out instructions in the promotional emails we send you</li>
                </ul>
                <p class="mt-4">If you no longer wish to receive correspondence, emails, or other communications from third parties, you are responsible for contacting the third party directly.</p>
            `,
    },
    {
      id: "california-privacy-rights",
      title: "10. California Privacy Rights",
      content: `
                <p>California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>
                
                <p class="mt-4">If you are under 18 years of age, reside in California, and have a registered account with the Site, you have the right to request removal of unwanted data that you publicly post on the Site. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Site, but please be aware that the data may not be completely or comprehensively removed from our systems.</p>
                
                <h3 class="text-lg font-semibold mb-2 mt-4 text-black">CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>
                <p>Under the CCPA, among other rights, California consumers have the right to:</p>
                <ul class="list-disc pl-6 mt-2 space-y-2">
                    <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                    <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                    <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
                </ul>
                <p class="mt-4">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
            `,
    },
    {
      id: "gdpr-data-protection-rights",
      title: "11. GDPR Data Protection Rights",
      content: `
                <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
                <ul class="list-disc pl-6 mt-2 space-y-2">
                    <li><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                    <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                    <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                    <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                    <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
                    <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                </ul>
                <p class="mt-4">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
            `,
    },
    {
      id: "contact-us",
      title: "12. Contact Us",
      content: `
                <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                <p class="mt-4">
                    Gizmo<br>
                    123 Tech Avenue<br>
                    San Francisco, CA 94107<br>
                    United States<br>
                    Phone: (555) 123-4567<br>
                    Email: privacy@gizmostore.com
                </p>
            `,
    },
  ]

  useEffect(()=>{
    window.scroll(0,0)
  },[])

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-4 relative z-20">
        <div className="absolute inset-0 w-full h-full bg-black opacity-70 z-10"></div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black to-transparent z-20"></div>

        <div className="max-w-6xl mx-auto text-center relative z-30">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="mt-4 text-gray-300">Last Updated: March 15, 2025</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Shield className="w-10 h-10 text-black mr-4" />
              <h2 className="text-2xl font-bold text-black">Our Commitment to Privacy</h2>
            </div>
            <p className="text-gray-700">
              At Gizmo, we take your privacy seriously. This Privacy Policy describes how we collect, use, and share
              information about you when you use our website, mobile applications, and other online products and
              services (collectively, the "Services") or when you otherwise interact with us.
            </p>
            <p className="text-gray-700 mt-4">
              We encourage you to read this Privacy Policy carefully to understand our practices regarding your
              information. By accessing or using our Services, you acknowledge that you have read and understood this
              Privacy Policy.
            </p>
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                This Privacy Policy applies to all visitors, users, and others who access or use the Gizmo Services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-black">Table of Contents</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {privacySections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center p-3 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(section.id)
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                      toggleSection(section.id)
                    }
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-800">{section.title.split(". ")[1]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-6">
          {privacySections.map((section) => (
            <div key={section.id} id={section.id} className="bg-white p-6 rounded-lg shadow-md">
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => toggleSection(section.id)}
              >
                <h2 className="text-xl font-bold text-black">{section.title}</h2>
                {activeSection === section.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <div className={`mt-4 text-gray-700 ${activeSection === section.id ? "block" : "hidden"}`}>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-black">Our Privacy Principles</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">Security First</h3>
              <p className="text-gray-600">
                We implement robust security measures to protect your personal information from unauthorized access and
                disclosure.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">Transparency</h3>
              <p className="text-gray-600">
                We are clear about what data we collect, how we use it, and who we share it with.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">User Control</h3>
              <p className="text-gray-600">
                We give you control over your personal information with easy access to your privacy settings.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">Data Minimization</h3>
              <p className="text-gray-600">
                We only collect the information we need to provide and improve our services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-black">Privacy Inquiries</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">Email Us</h3>
              <p className="text-gray-600">
                For privacy-related questions
                <br />
                privacy@gizmostore.com
                <br />
                We respond within 48 hours
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">Data Requests</h3>
              <p className="text-gray-600">
                To request a copy of your data
                <br />
                datarequest@gizmostore.com
                <br />
                Please allow up to 30 days
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">International</h3>
              <p className="text-gray-600">
                For EU/GDPR specific inquiries
                <br />
                gdpr@gizmostore.com
                <br />
                Our DPO will assist you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Print Version */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <button className="inline-flex items-center px-6 py-3 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Privacy Policy
          </button>
          <p className="text-sm text-gray-500 mt-2">Last Updated: March 15, 2025</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Have Questions About Your Privacy?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Our privacy team is ready to help you understand how we protect your personal information.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
            Contact Privacy Team
          </button>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy

