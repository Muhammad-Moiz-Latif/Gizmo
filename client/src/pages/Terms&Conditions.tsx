"use client"

import { Mail, Clock, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from "react"

export const TermsConditions = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null)

    // Toggle section visibility
    const toggleSection = (id: string) => {
        setActiveSection(activeSection === id ? null : id)
    }

    // Terms sections data
    const termsSections = [
        {
            id: "acceptance",
            title: "1. Acceptance of Terms",
            content: `
                <p>By accessing or using the Gizmo website, mobile applications, or any other services provided by Gizmo (collectively, the "Services"), you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, you may not access or use our Services.</p>
                <p class="mt-4">These Terms and Conditions apply to all visitors, users, and others who access or use the Services. By accessing or using the Services, you agree to be bound by these Terms and Conditions.</p>
            `
        },
        {
            id: "user-accounts",
            title: "2. User Accounts",
            content: `
                <p>When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.</p>
                <p class="mt-4">You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.</p>
                <p class="mt-4">You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
            `
        },
        {
            id: "intellectual-property",
            title: "3. Intellectual Property",
            content: `
                <p>The Services and their original content, features, and functionality are and will remain the exclusive property of Gizmo and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
                <p class="mt-4">Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Gizmo.</p>
                <p class="mt-4">You may not duplicate, copy, or reuse any portion of the HTML/CSS, JavaScript, or visual design elements or concepts without express written permission from Gizmo.</p>
            `
        },
        {
            id: "prohibited-activities",
            title: "4. Prohibited Activities",
            content: `
                <p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
                <p class="mt-4">As a user of the Services, you agree not to:</p>
                <ul class="list-disc pl-6 mt-2 space-y-2">
                    <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                    <li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                    <li>Use the Services to advertise or offer to sell goods and services.</li>
                    <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
                    <li>Engage in unauthorized framing of or linking to the Services.</li>
                    <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                    <li>Attempt to impersonate another user or person or use the username of another user.</li>
                </ul>
            `
        },
        {
            id: "privacy-policy",
            title: "5. Privacy Policy",
            content: `
                <p>We care about data privacy and security. Please review our Privacy Policy at <a href="/privacy-policy" class="text-black underline">https://gizmostore.com/privacy-policy</a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Terms and Conditions.</p>
                <p class="mt-4">Further, we do not knowingly accept, request, or solicit information from children or knowingly market to children. Therefore, if we receive actual knowledge that anyone under the age of 13 has provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the Services as quickly as is reasonably practical.</p>
            `
        },
        {
            id: "payment-terms",
            title: "6. Payment Terms",
            content: `
                <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.</p>
                <p class="mt-4">We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address.</p>
                <p class="mt-4">Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in U.S. dollars.</p>
            `
        },
        {
            id: "shipping-returns",
            title: "7. Shipping and Returns",
            content: `
                <p>Please review our Shipping and Returns Policy at <a href="/shipping-returns" class="text-black underline">https://gizmostore.com/shipping-returns</a> for more information on shipping methods, delivery times, and return procedures.</p>
                <p class="mt-4">By making a purchase through the Services, you agree to be bound by our Shipping and Returns Policy, which is incorporated into these Terms and Conditions.</p>
            `
        },
        {
            id: "limitation-liability",
            title: "8. Limitation of Liability",
            content: `
                <p>In no event shall Gizmo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                <ul class="list-disc pl-6 mt-2 space-y-2">
                    <li>Your access to or use of or inability to access or use the Services;</li>
                    <li>Any conduct or content of any third party on the Services;</li>
                    <li>Any content obtained from the Services; and</li>
                    <li>Unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</li>
                </ul>
                <p class="mt-4">In jurisdictions where the exclusion or limitation of liability for consequential or incidental damages is not allowed, our liability shall be limited to the maximum extent permitted by law.</p>
            `
        },
        {
            id: "dispute-resolution",
            title: "9. Dispute Resolution",
            content: `
                <p><strong>Informal Negotiations</strong>: To expedite resolution and control the cost of any dispute, controversy, or claim related to these Terms and Conditions (each a "Dispute" and collectively, the "Disputes") brought by either you or us (individually, a "Party" and collectively, the "Parties"), the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration.</p>
                <p class="mt-4"><strong>Binding Arbitration</strong>: If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute shall be determined by binding arbitration. The arbitration will be conducted in the State of California, San Francisco County, unless you and Gizmo agree otherwise. The arbitration shall be conducted confidentially by a single, neutral arbitrator.</p>
                <p class="mt-4"><strong>Restrictions</strong>: The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.</p>
            `
        },
        {
            id: "termination",
            title: "10. Termination",
            content: `
                <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                <p class="mt-4">Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services, or notify us that you wish to delete your account.</p>
                <p class="mt-4">All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
            `
        },
        {
            id: "changes-to-terms",
            title: "11. Changes to Terms",
            content: `
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                <p class="mt-4">By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Services.</p>
            `
        },
        {
            id: "governing-law",
            title: "12. Governing Law",
            content: `
                <p>These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.</p>
                <p class="mt-4">Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
            `
        },
        {
            id: "contact-us",
            title: "13. Contact Us",
            content: `
                <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                <ul class="list-disc pl-6 mt-2 space-y-2">
                    <li>By email: legal@gizmostore.com</li>
                    <li>By phone: (555) 123-4567</li>
                    <li>By mail: 123 Tech Avenue, San Francisco, CA 94107, United States</li>
                </ul>
            `
        }
    ];

    useEffect(()=>{
        window.scroll(0,0);
    },[])

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <section className="bg-black text-white py-20 px-4 relative z-20">
                <div className="absolute inset-0 w-full h-full bg-black opacity-70 z-10"></div>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black to-transparent z-20"></div>

                <div className="max-w-6xl mx-auto text-center relative z-30">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms and Conditions</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                        Please read these terms carefully before using our services.
                    </p>
                    <p className="mt-4 text-gray-300">Last Updated: March 15, 2025</p>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-12 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-black">Welcome to Gizmo</h2>
                        <p className="text-gray-700">
                            These Terms and Conditions govern your use of the Gizmo website and services, including any content, functionality, and services offered on or through gizmostore.com (the "Website").
                        </p>
                        <p className="text-gray-700 mt-4">
                            By using our Website, you accept and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these Terms and Conditions, you must not access or use our Website.
                        </p>
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                            <p className="text-sm text-gray-600 italic">
                                This document contains important information about your legal rights, remedies, and obligations. By using our services, you agree to these terms, so please read them carefully.
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
                            {termsSections.map((section, index) => (
                                <a 
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="flex items-center p-3 rounded-md hover:bg-gray-100 transition-colors"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const element = document.getElementById(section.id);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-3 flex-shrink-0">
                                        <span className="text-sm">{index + 1}</span>
                                    </div>
                                    <span className="text-gray-800">{section.title.split('. ')[1]}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-12 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto space-y-6">
                    {termsSections.map((section) => (
                        <div 
                            key={section.id} 
                            id={section.id}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
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
                            <div className={`mt-4 text-gray-700 ${activeSection === section.id ? 'block' : 'hidden'}`}>
                                <div dangerouslySetInnerHTML={{ __html: section.content }} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Legal Disclaimer */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-black">
                        <h2 className="text-2xl font-bold mb-4 text-black">Legal Disclaimer</h2>
                        <p className="text-gray-700">
                            The information provided on this Website is for general informational purposes only. All information on the Website is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Website.
                        </p>
                        <p className="text-gray-700 mt-4">
                            Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the Website or reliance on any information provided on the Website. Your use of the Website and your reliance on any information on the Website is solely at your own risk.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-black">Legal Inquiries</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-black">Legal Department</h3>
                            <p className="text-gray-600">
                                For legal inquiries and formal notices
                                <br />
                                legal@gizmostore.com
                                <br />
                                (555) 123-4567 ext. 123
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-black">Mailing Address</h3>
                            <p className="text-gray-600">
                                Gizmo Legal Department
                                <br />
                                123 Tech Avenue
                                <br />
                                San Francisco, CA 94107
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-black">Response Time</h3>
                            <p className="text-gray-600">
                                We respond to legal inquiries
                                <br />
                                within 3-5 business days
                                <br />
                                Monday - Friday: 9am - 5pm PT
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print Terms and Conditions
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                        Last Updated: March 15, 2025
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-black text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Have Questions About Our Terms?</h2>
                    <p className="text-xl mb-8 text-gray-300">
                        Our customer support team is ready to help clarify any part of our terms and conditions.
                    </p>
                    <button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                        Contact Support
                    </button>
                </div>
            </section>
        </div>
    )
}

export default TermsConditions
