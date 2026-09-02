import React from "react"
import { motion } from "framer-motion"
import {
  FaRocket,
  FaCubes,
  FaShieldAlt,
  FaHeadset,
  FaExchangeAlt,
  FaUserFriends,
} from "react-icons/fa"

export const Features: React.FC = () => {
  const features = [
    {
      icon: <FaRocket />,
      number: "01",
      title: "Fast",
      label: "Delivery",
      description:
        "From checkout to doorstep without the unnecessary wait. Selected products can arrive the same day.",
    },
    {
      icon: <FaCubes />,
      number: "02",
      title: "More",
      label: "Choice",
      description:
        "From everyday essentials to the latest gadgets, everything you need lives under one roof.",
    },
    {
      icon: <FaShieldAlt />,
      number: "03",
      title: "Safe",
      label: "Shopping",
      description:
        "Buy with confidence through our guarantee, warranty options, and straightforward customer care.",
    },
    {
      icon: <FaHeadset />,
      number: "04",
      title: "Real",
      label: "Support",
      description:
        "Questions, setup help, or something went wrong? Our support team is here whenever you need it.",
    },
    {
      icon: <FaExchangeAlt />,
      number: "05",
      title: "Easy",
      label: "Returns",
      description:
        "Plans change. Returning something shouldn't become a project. We've kept the process simple.",
    },
    {
      icon: <FaUserFriends />,
      number: "06",
      title: "Your",
      label: "Community",
      description:
        "Reviews, recommendations, conversations and discoveries from people who love technology too.",
    },
  ]

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f7f5] py-20 text-black sm:py-24 lg:py-32">

      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-[-180px] top-1/4 h-[500px] w-[500px] rounded-full bg-white blur-3xl" />

        <div className="absolute bottom-[-200px] right-[-120px] h-[550px] w-[550px] rounded-full bg-black/[0.025] blur-3xl" />

        <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[21vw] font-black leading-none tracking-[-0.09em] text-black/[0.025]">
          GIZMO
        </div>

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">

        {/* =====================================================
            INTRO
            ===================================================== */}

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-10 bg-black/25" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                The Gizmo standard
              </span>

            </div>

            <h2 className="max-w-3xl text-5xl font-semibold leading-[0.88] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-[6rem]">

              More than
              <br />

              <span className="font-light italic text-black/35">
                just tech.
              </span>

            </h2>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-sm lg:justify-self-end"
          >

            <p className="text-sm leading-7 text-black/45 sm:text-base">
              Great technology isn't only about what's inside
              the box. It's about everything around it —
              finding it, buying it, receiving it, and knowing
              we're here when you need us.
            </p>

            <div className="mt-6 flex items-center gap-3">

              <span className="h-px w-8 bg-black/20" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-black/30">
                Designed around you
              </span>

            </div>

          </motion.div>

        </div>

        {/* =====================================================
            FEATURE LIST
            ===================================================== */}

        <div className="mt-16 border-t border-black/[0.07] sm:mt-20">

          {features.map((feature, index) => (

            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.06,
              }}
              className="group relative border-b border-black/[0.07]"
            >

              <div className="grid items-center gap-6 py-7 sm:py-8 lg:grid-cols-[80px_0.8fr_1.1fr_70px] lg:gap-8 lg:py-9">

                {/* NUMBER */}

                <div className="flex items-center gap-4">

                  <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-black/25">
                    {feature.number}
                  </span>

                  <div className="h-px w-7 bg-black/10 transition-all duration-500 group-hover:w-12 group-hover:bg-black/30 lg:hidden" />

                </div>

                {/* TITLE */}

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-sm text-black/45 transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white group-hover:scale-105">
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">

                    {feature.title}

                    <span className="ml-2 font-light italic text-black/30">
                      {feature.label.toLowerCase()}.
                    </span>

                  </h3>

                </div>

                {/* DESCRIPTION */}

                <p className="max-w-lg text-sm leading-6 text-black/40 transition-colors duration-300 group-hover:text-black/60 sm:text-[15px]">
                  {feature.description}
                </p>

                {/* ARROW */}

                <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-black/10 transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white lg:flex">

                  <span className="text-lg transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>

                </div>

              </div>

              {/* Hover sweep */}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-black transition-transform duration-700 group-hover:scale-x-100" />

            </motion.div>

          ))}

        </div>

        {/* =====================================================
            BOTTOM STATEMENT
            ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 flex flex-col gap-7 sm:mt-16 sm:flex-row sm:items-end sm:justify-between"
        >

          <div>

            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-black/25">
              The experience
            </span>

            <p className="mt-3 max-w-xl text-2xl font-medium leading-tight tracking-[-0.04em] text-black/80 sm:text-3xl">
              Technology should feel
              <span className="font-light italic text-black/35">
                {" "}effortless.
              </span>
            </p>

          </div>

          <div className="flex items-center gap-3">

            <span className="h-px w-10 bg-black/15" />

            <span className="font-mono text-[9px] tracking-[0.2em] text-black/20">
              GZM / STANDARD / 06
            </span>

          </div>

        </motion.div>

      </div>
    </section>
  )
}
