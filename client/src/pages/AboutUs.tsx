import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    MapPin,
    Clock,
    Sparkles,
    ShieldCheck,
    Users,
    ArrowRight,
} from "lucide-react";

// Replace with your actual asset imports
import wallpaper1 from "../assets/pexels-danbuilds-633409.jfif";
import wallpaper2 from "../assets/pexels-pixabay-265125.jpg";
import wallpaper3 from "../assets/pexels-tima-miroshnichenko-6914034.jfif";
import person1 from "../assets/ceo.jpg";
import person2 from "../assets/writing-down-plan.jpg";
import person3 from "../assets/young-japanese-influencer-recording-vlog.jpg";
import person4 from "../assets/eastern-woman.jpg";

export const AboutUs = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsVisible(true);
    }, []);

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
    };

    const milestones = [
        {
            year: "2015",
            title: "Foundation",
            text: "A small online store with a clear filter: only technology worth living with.",
        },
        {
            year: "2017",
            title: "Expansion",
            text: "Laptops, tablets, and smart home. First physical showroom opened.",
        },
        {
            year: "2019",
            title: "Service layer",
            text: "Premium support and a loyalty program. 25,000 customers.",
        },
        {
            year: "2021",
            title: "Presence",
            text: "Three new locations. Introduction of Gizmo-branded accessories.",
        },
        {
            year: "2023",
            title: "Experience",
            text: "A complete redesign, AR previews, a quieter and more intentional interface.",
        },
        {
            year: "Today",
            title: "Continuing",
            text: "Still guided by the same principle: fewer, better things.",
        },
    ];

    const principles = [
        {
            icon: <Sparkles className="h-4 w-4" />,
            number: "01",
            title: "Editorial",
            label: "standard",
            description:
                "Only products that pass an internal bar for design, durability, and honest utility.",
        },
        {
            icon: <ShieldCheck className="h-4 w-4" />,
            number: "02",
            title: "Honest",
            label: "pricing",
            description:
                "Clear information, transparent availability, and no technical theater at checkout.",
        },
        {
            icon: <Users className="h-4 w-4" />,
            number: "03",
            title: "Real",
            label: "people",
            description:
                "Support that feels human, from setup questions to the rare thing going wrong.",
        },
    ];

    const team = [
        { name: "Alex Johnson", title: "Founder & CEO", image: person1 },
        { name: "Sarah Chen", title: "CTO", image: person2 },
        { name: "Michael Rodriguez", title: "Head of Product", image: person3 },
        { name: "Priya Patel", title: "Customer Experience", image: person4 },
    ];

    return (
        <div className="min-h-screen w-full bg-[#f7f7f5] font-roboto text-primary-dark antialiased">
            {/* =====================================================
                HERO
                ===================================================== */}
            <section className="relative flex min-h-[92vh] w-full items-end overflow-hidden bg-black text-white">
                <div className="absolute inset-0">
                    <img
                        src={wallpaper1}
                        alt=""
                        className="h-full w-full object-cover opacity-[0.32]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                    <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:80px_80px]" />
                </div>

                <div
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-[1500ms] ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
                        }`}
                >
                    <span className="select-none whitespace-nowrap text-[24vw] font-black leading-none tracking-[-0.08em] text-white/[0.045]">
                        GIZMO
                    </span>
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
                                About Gizmo
                            </span>
                        </div>

                        <h1 className="max-w-2xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-[5.5rem]">
                            Technology as
                            <br />
                            <span className="font-light italic text-white/45">
                                an object of desire.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-md text-sm leading-7 text-white/45 md:text-base">
                            A carefully curated marketplace for people who believe the best
                            technology should feel inevitable, not overwhelming.
                        </p>
                    </motion.div>

                    <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.22em] text-white/30">
                        <span>Est. 2015</span>
                        <span className="hidden h-3 w-px bg-white/15 sm:block" />
                        <span>Premium technology</span>
                        <span className="hidden h-3 w-px bg-white/15 sm:block" />
                        <span>Curated collection</span>
                    </div>
                </div>
            </section>

            {/* =====================================================
                STORY
                ===================================================== */}
            <section className="relative w-full overflow-hidden py-24 sm:py-28 lg:py-32">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[-180px] top-1/4 h-[500px] w-[500px] rounded-full bg-white blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:70px_70px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                    <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={fadeUp}
                            className="lg:col-span-5"
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <span className="h-px w-10 bg-black/25" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                                    Our story
                                </span>
                            </div>
                            <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-5xl lg:text-[3.4rem]">
                                Built with
                                <br />
                                <span className="font-light italic text-black/35">
                                    restraint.
                                </span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={fadeUp}
                            className="lg:col-span-7 lg:pt-2"
                        >
                            <div className="max-w-xl space-y-5 text-sm leading-7 text-black/50 sm:text-[15px]">
                                <p>
                                    Founded in 2015, Gizmo began with a quiet conviction: that
                                    technology should feel considered, not overwhelming. What
                                    started as a small curated store has grown into a
                                    destination for people who care about both performance and
                                    presence.
                                </p>
                                <p>
                                    Every product we offer is selected with the same editorial
                                    eye we bring to the interface itself — fewer options,
                                    higher standards, clearer decisions.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stat strip — matches the trust-stat block language */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-black/[0.07] bg-black/[0.07] sm:mt-20 sm:grid-cols-3"
                    >
                        {[
                            { value: "8+", label: "Years", detail: "Since our first storefront" },
                            { value: "50K+", label: "Customers", detail: "Across every showroom" },
                            { value: "120+", label: "Brands", detail: "Held to one standard" },
                        ].map((stat, index) => (
                            <div
                                key={stat.label}
                                className="group bg-[#fafaf9] p-7 transition-colors duration-500 hover:bg-white sm:p-8 lg:p-10"
                            >
                                <div className="flex items-start justify-between">
                                    <span className="font-mono text-[9px] tracking-[0.2em] text-black/20">
                                        0{index + 1}
                                    </span>
                                </div>
                                <p className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                                    {stat.value}
                                </p>
                                <p className="mt-2 text-sm font-medium text-black/70">
                                    {stat.label}
                                </p>
                                <p className="mt-1 text-xs text-black/35">{stat.detail}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-20 md:mt-24"
                    >
                        <div className="relative overflow-hidden rounded-[1.5rem] bg-[#EFEFEC]">
                            <img
                                src={wallpaper2}
                                alt="Gizmo environment"
                                className="h-[42vh] w-full object-cover md:h-[55vh]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* =====================================================
                TIMELINE — a real sequence, numbering earns its keep
                ===================================================== */}
            <section className="relative w-full overflow-hidden bg-black py-24 text-white sm:py-28 lg:py-32">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px]" />
                    <div className="absolute bottom-[-200px] right-[-150px] h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-3xl" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-16 max-w-2xl sm:mb-20"
                    >
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-white/30" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/35">
                                Journey
                            </span>
                        </div>
                        <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                            Milestones,
                            <br />
                            <span className="font-light italic text-white/35">
                                not noise.
                            </span>
                        </h2>
                    </motion.div>

                    <div className="border-t border-white/[0.08]">
                        {milestones.map((item, i) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.55, delay: i * 0.05 }}
                                className="group relative border-b border-white/[0.08]"
                            >
                                <div className="grid items-center gap-4 py-7 sm:py-8 lg:grid-cols-[90px_140px_1fr] lg:gap-8">
                                    <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-white/30">
                                        {item.year}
                                    </span>
                                    <span className="text-sm font-medium text-white/60">
                                        {item.title}
                                    </span>
                                    <p className="max-w-lg text-[15px] leading-relaxed text-white/35 transition-colors duration-300 group-hover:text-white/60">
                                        {item.text}
                                    </p>
                                </div>
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white transition-transform duration-700 group-hover:scale-x-100" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
                MISSION
                ===================================================== */}
            <section className="w-full py-24 sm:py-28 lg:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                    <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="relative lg:col-span-5"
                        >
                            <div className="overflow-hidden rounded-[1.5rem] bg-[#EFEFEC]">
                                <img
                                    src={wallpaper3}
                                    alt="Technology in context"
                                    className="aspect-[4/5] w-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-5 -right-5 -z-10 hidden h-32 w-32 rounded-[1.25rem] border border-black/6 md:block" />
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="lg:col-span-7"
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <span className="h-px w-10 bg-black/25" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                                    Mission
                                </span>
                            </div>
                            <h2 className="mb-6 text-4xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                                Access without
                                <br />
                                <span className="font-light italic text-black/35">
                                    compromise.
                                </span>
                            </h2>
                            <p className="mb-10 max-w-md text-sm leading-7 text-black/50 sm:text-[15px]">
                                We believe the best technology should be understandable,
                                well-supported, and available to people who simply want
                                things that work beautifully.
                            </p>

                            <div className="border-t border-black/[0.07]">
                                {principles.map((item, index) => (
                                    <motion.div
                                        key={item.number}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.6, delay: index * 0.06 }}
                                        className="group flex items-center gap-5 border-b border-black/[0.07] py-6"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/45 transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold tracking-[-0.02em]">
                                                {item.title}{" "}
                                                <span className="font-light italic text-black/35">
                                                    {item.label}
                                                </span>
                                            </h3>
                                            <p className="mt-0.5 text-[13px] leading-relaxed text-black/40">
                                                {item.description}
                                            </p>
                                        </div>
                                        <span className="ml-auto hidden font-mono text-[9px] tracking-[0.2em] text-black/20 sm:block">
                                            {item.number}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                TEAM
                ===================================================== */}
            <section className="w-full bg-[#EFEFEC] py-24 sm:py-28 lg:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-16 max-w-xl sm:mb-20"
                    >
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-black/25" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                                Leadership
                            </span>
                        </div>
                        <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                            The people who
                            <br />
                            <span className="font-light italic text-black/35">
                                shape the experience.
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {team.map((member) => (
                            <motion.div key={member.name} variants={fadeUp} className="group">
                                <div className="mb-5 overflow-hidden rounded-2xl bg-[#F7F7F5]">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                    />
                                </div>
                                <h3 className="text-[15px] font-medium tracking-[-0.01em] text-black">
                                    {member.name}
                                </h3>
                                <p className="mt-0.5 text-[13px] text-black/40">
                                    {member.title}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* =====================================================
                CONTACT
                ===================================================== */}
            <section className="w-full py-24 sm:py-28 lg:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-16 text-center sm:mb-20"
                    >
                        <div className="mb-5 flex items-center justify-center gap-3">
                            <span className="h-px w-10 bg-black/25" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                                Contact
                            </span>
                            <span className="h-px w-10 bg-black/25" />
                        </div>
                        <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                            Get in touch.
                        </h2>
                    </motion.div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {[
                            {
                                icon: MapPin,
                                title: "Visit",
                                lines: ["123 Tech Avenue", "San Francisco, CA 94107"],
                            },
                            {
                                icon: Mail,
                                title: "Email",
                                lines: ["info@gizmostore.com", "support@gizmostore.com"],
                            },
                            {
                                icon: Clock,
                                title: "Hours",
                                lines: ["Mon–Fri  9am – 6pm", "Sat  10am – 4pm"],
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                className="group rounded-2xl border border-black/[0.06] bg-[#fafaf9] p-8 transition-colors duration-500 hover:bg-white"
                            >
                                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/45 transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white">
                                    <item.icon className="h-4 w-4" strokeWidth={1.5} />
                                </div>
                                <h3 className="mb-3 text-[13px] font-medium uppercase tracking-[0.18em] text-black/40">
                                    {item.title}
                                </h3>
                                <div className="space-y-1 text-[15px] leading-relaxed text-black/70">
                                    {item.lines.map((line) => (
                                        <p key={line}>{line}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
                FINAL CTA
                ===================================================== */}
            <section className="relative w-full overflow-hidden bg-black py-24 text-white sm:py-28 lg:py-32">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="select-none whitespace-nowrap text-[26vw] font-black leading-none tracking-[-0.08em] text-white/[0.04]">
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
                        <div className="mb-6 flex items-center justify-center gap-3">
                            <span className="h-px w-8 bg-white/30" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/35">
                                Explore
                            </span>
                            <span className="h-px w-8 bg-white/30" />
                        </div>
                        <h2 className="mb-6 text-4xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                            Discover technology
                            <br />
                            <span className="font-light italic text-white/40">
                                worth keeping.
                            </span>
                        </h2>
                        <p className="mx-auto mb-10 max-w-md text-sm leading-7 text-white/40 md:text-base">
                            Browse a collection chosen for performance, design, and
                            longevity.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <a
                                href="/shop"
                                className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-white px-9 text-sm font-semibold tracking-wide text-black shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.3)] sm:w-auto"
                            >
                                Shop Collection
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                            <a
                                href="/dashboard/contactus"
                                className="flex h-14 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-9 text-sm font-semibold tracking-wide text-white/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:text-white sm:w-auto"
                            >
                                Contact Us
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;