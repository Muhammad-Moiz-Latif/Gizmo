import React from "react";
import { motion } from "framer-motion";
import asus from "../assets/Asus-Logo-1995.png";
import apple from "../assets/apple.jpg";
import logitech from "../assets/logitech.png";
import hp from "../assets/HP.png";
import sony from "../assets/Sony-logo.png";
import samsung from "../assets/samsung.png";
import { Star, Award, Users } from "lucide-react";

const partners = [
  { id: 1, name: "Apple", logo: apple },
  { id: 2, name: "Samsung", logo: samsung },
  { id: 3, name: "Logitech", logo: logitech },
  { id: 4, name: "Sony", logo: sony },
  { id: 5, name: "HP", logo: hp },
  { id: 6, name: "Asus", logo: asus },
];

const trustStats = [
  {
    icon: Star,
    value: "4.9 / 5",
    label: "Customer rating",
    detail: "10k+ verified reviews",
  },
  {
    icon: Award,
    value: "2025",
    label: "Award winning",
    detail: "Best Tech Retailer",
  },
  {
    icon: Users,
    value: "500k+",
    label: "Gizmo community",
    detail: "And still growing",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white py-20 sm:py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none text-[22vw] font-black leading-none tracking-[-0.09em] text-white/[0.025]">
          GIZMO
        </div>

        <div className="absolute left-[-200px] top-1/3 h-[500px] w-[500px] rounded-full bg-white/[0.025] blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-150px] h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-white/30" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/35">
                Trusted by the best
              </span>
            </div>

            <h2 className="max-w-4xl text-5xl font-semibold leading-[0.88] tracking-[-0.065em] sm:text-6xl md:text-7xl lg:text-[6rem]">
              Good company.
              <br />

              <span className="font-light italic text-white/30">
                Great technology.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/35 lg:justify-self-end">
            We work with the brands shaping the future of technology —
            and bring their best products together in one place.
          </p>
        </motion.div>

        {/* Brand Wall */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-16 border-y border-white/[0.08] sm:mt-20"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                }}
                className="
                  group relative flex h-32 items-center justify-center
                  border-white/[0.08]
                  px-6
                  sm:h-36
                  lg:border-r
                  last:lg:border-r-0
                  [&:nth-child(2)]:border-r
                  [&:nth-child(4)]:border-r
                  [&:nth-child(6)]:border-r-0
                  sm:[&:nth-child(2)]:border-r
                  sm:[&:nth-child(3)]:border-r-0
                  lg:[&:nth-child(3)]:border-r
                  lg:[&:nth-child(4)]:border-r
                  lg:[&:nth-child(6)]:border-r-0
                "
              >
                <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-[0.025]" />

                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="
                    relative z-10
                    max-h-10
                    w-auto
                    max-w-[110px]
                    object-contain
                    grayscale
                    opacity-40
                    brightness-0
                    invert
                    transition-all
                    duration-500
                    group-hover:scale-105
                    group-hover:opacity-90
                  "
                />

                <span className="absolute bottom-3 text-[8px] font-medium uppercase tracking-[0.25em] text-white/15 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Stats */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
          {trustStats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.08,
                }}
                className="group bg-white/[0.025] p-7 transition-colors duration-500 hover:bg-white/[0.05] sm:p-8 lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-500 group-hover:border-white/30 group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </div>

                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/15">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-8">
                  <p className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-sm font-medium text-white/70">
                    {stat.label}
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    {stat.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-20 text-center sm:mt-24"
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/20">
            The community behind Gizmo
          </span>

          <p className="mx-auto mt-5 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] text-white/85 sm:text-4xl lg:text-5xl">
            Technology is better when
            <span className="font-light italic text-white/30">
              {" "}we experience it together.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  );
};