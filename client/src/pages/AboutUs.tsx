import { Mail, MapPin, Clock, Zap } from "lucide-react"
import wallpaper1 from '../assets/pexels-danbuilds-633409.jpg';
import wallpaper2 from '../assets/pexels-pixabay-265125.jpg';
import wallpaper3 from '../assets/pexels-tima-miroshnichenko-6914034.jpg';
import person1 from '../assets/ceo.jpg';
import person2 from '../assets/writing-down-plan.jpg';
import person3 from '../assets/young-japanese-influencer-recording-vlog.jpg';
import person4 from '../assets/eastern-woman.jpg';


export const AboutUs = () => {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <section className="bg-black text-white py-20 px-4 relative z-20">
                <img src={wallpaper1} className="absolute inset-0 w-full h-full object-cover opacity-30 z-10" />

                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About Gizmo</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                        Empowering people through innovative technology solutions since 2015.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 px-4 relative">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-black">Our Story</h2>
                            <p className="text-gray-700 mb-4">
                                Founded in 2015, Gizmo began with a simple mission: to make cutting-edge technology accessible to
                                everyone. What started as a small online store has grown into a trusted destination for tech enthusiasts
                                and everyday consumers alike.
                            </p>
                            <p className="text-gray-700 mb-4">
                                Our journey has been driven by a passion for innovation and a commitment to exceptional customer
                                service. We've carefully curated our product selection to offer only the highest quality devices that
                                enhance and simplify your daily life.
                            </p>
                            <p className="text-gray-700">
                                Today, we continue to expand our offerings while staying true to our founding principles of quality,
                                affordability, and outstanding customer experience.
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                            <img src={wallpaper2} className="absolute w-full h-full object-cover inset-0"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Milestones Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-black">Our Journey</h2>
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>

                        {/* Timeline items */}
                        <div className="space-y-12">
                            {/* 2015 */}
                            <div className="relative flex items-center justify-between flex-col md:flex-row">
                                <div className="md:w-5/12 mb-8 md:mb-0 md:pr-8 md:text-right">
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-bold mb-2 text-black">2015</h3>
                                        <p className="text-gray-600">
                                            Gizmo was founded with a small online store offering a curated selection of smartphones and
                                            accessories.
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-black"></div>
                                </div>
                                <div className="md:w-5/12 md:pl-8"></div>
                            </div>

                            {/* 2017 */}
                            <div className="relative flex items-center justify-between flex-col md:flex-row">
                                <div className="md:w-5/12 mb-8 md:mb-0"></div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-black"></div>
                                </div>
                                <div className="md:w-5/12 md:pl-8">
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-bold mb-2 text-black">2017</h3>
                                        <p className="text-gray-600">
                                            Expanded our product line to include laptops, tablets, and smart home devices. Opened our first
                                            physical showroom.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 2019 */}
                            <div className="relative flex items-center justify-between flex-col md:flex-row">
                                <div className="md:w-5/12 mb-8 md:mb-0 md:pr-8 md:text-right">
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-bold mb-2 text-black">2019</h3>
                                        <p className="text-gray-600">
                                            Launched our premium tech support service and loyalty program. Reached 25,000 customers milestone.
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-black"></div>
                                </div>
                                <div className="md:w-5/12 md:pl-8"></div>
                            </div>

                            {/* 2021 */}
                            <div className="relative flex items-center justify-between flex-col md:flex-row">
                                <div className="md:w-5/12 mb-8 md:mb-0"></div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-black"></div>
                                </div>
                                <div className="md:w-5/12 md:pl-8">
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-bold mb-2 text-black">2021</h3>
                                        <p className="text-gray-600">
                                            Expanded to three new locations and introduced our exclusive line of Gizmo-branded accessories.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 2023 */}
                            <div className="relative flex items-center justify-between flex-col md:flex-row">
                                <div className="md:w-5/12 mb-8 md:mb-0 md:pr-8 md:text-right">
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-bold mb-2 text-black">2023</h3>
                                        <p className="text-gray-600">
                                            Launched our redesigned website with enhanced shopping experience and AR product previews.
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-black"></div>
                                </div>
                                <div className="md:w-5/12 md:pl-8"></div>
                            </div>

                            {/* Today */}
                            <div className="relative flex items-center justify-between flex-col md:flex-row">
                                <div className="md:w-5/12 mb-8 md:mb-0"></div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-black"></div>
                                </div>
                                <div className="md:w-5/12 md:pl-8">
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-bold mb-2 text-black">Today</h3>
                                        <p className="text-gray-600">
                                            Continuing to innovate and expand our offerings while staying committed to our founding
                                            principles.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 bg-black text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-bold mb-2">8+</p>
                            <p className="text-gray-400">Years in Business</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-2">50K+</p>
                            <p className="text-gray-400">Happy Customers</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-2">1000+</p>
                            <p className="text-gray-400">Products</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-2">24/7</p>
                            <p className="text-gray-400">Customer Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-black">Meet Our Leadership Team</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { name: "Alex Johnson", title: "Founder & CEO", image: person1 },
                            { name: "Sarah Chen", title: "CTO", image: person2 },
                            { name: "Michael Rodriguez", title: "Head of Product", image: person3 },
                            {
                                name: "Priya Patel",
                                title: "Customer Experience Director",
                                image: person4,
                            },
                        ].map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                                    <img src={member.image} className="object-cover w-full h-full"/>
                                </div>
                                <h3 className="text-xl font-bold text-black">{member.name}</h3>
                                <p className="text-gray-600">{member.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-bold mb-6 text-black">Our Mission</h2>
                            <p className="text-gray-700 mb-6">
                                At Gizmo, we're on a mission to democratize access to technology. We believe that innovative devices
                                should be available to everyone, regardless of technical expertise or budget constraints.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Curate the best tech products from around the world",
                                    "Provide clear, jargon-free information to help you make informed decisions",
                                    "Offer competitive pricing without compromising on quality",
                                    "Deliver exceptional customer service at every touchpoint",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <Zap className="w-5 h-5 text-black" />
                                        </div>
                                        <p className="ml-3 text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 md:order-2 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                            <img src={wallpaper3} className="w-full h-full object-cover"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-black">Get In Touch</h2>
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
                    <h2 className="text-3xl font-bold mb-6">Ready to Explore the Future of Technology?</h2>
                    <p className="text-xl mb-8 text-gray-300">
                        Browse our collection of cutting-edge devices and find the perfect tech to enhance your life.
                    </p>
                    <button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                        Shop Now
                    </button>
                </div>
            </section>
        </div>
    )
}

export default AboutUs

