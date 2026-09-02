import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Truck,
  Shield,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { NavLink, useParams } from "react-router-dom";

export const Footer: React.FC = () => {
  const { UserId } = useParams();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  const quickLinks = [
    {
      name: "Home",
      path: UserId === undefined ? "/" : `/dashboard/${UserId}`,
    },
    { name: "Shop", path: "Category" },
    { name: "About Us", path: "aboutus" },
    { name: "Contact", path: "contactus" },
  ];

  const serviceLinks = [
    { name: "FAQ", path: "faq" },
    { name: "Shipping & Returns", path: "shipping&returns" },
    { name: "Terms & Conditions", path: "terms&conditions" },
    { name: "Privacy Policy", path: "privacypolicy" },
  ];

  const features = [
    { icon: Truck, text: "Free Shipping" },
    { icon: Shield, text: "Secure Payments" },
    { icon: RefreshCw, text: "Easy Returns" },
    { icon: Sparkles, text: "24/7 Support" },
  ];

  return (
    <footer className="relative overflow-hidden bg-black text-white">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="absolute bottom-[-4vw] left-1/2 -translate-x-1/2 whitespace-nowrap select-none text-[25vw] font-black leading-none tracking-[-0.1em] text-white/[0.025]">
          GIZMO
        </div>

        <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 xl:px-20">

        {/* Main CTA */}
        <div className="border-b border-white/[0.08] py-20 sm:py-24 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-white/25" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/25">
                  Stay curious
                </span>
              </div>

              <h2 className="max-w-4xl text-5xl font-semibold leading-[0.88] tracking-[-0.065em] sm:text-6xl md:text-7xl lg:text-[7rem]">
                Keep exploring.
                <br />
                <span className="font-light italic text-white/25">
                  Keep discovering.
                </span>
              </h2>
            </div>

            <NavLink
              to={UserId === undefined ? "/" : `/dashboard/${UserId}`}
              className="group flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-500 hover:scale-105 sm:h-20 sm:w-20"
              aria-label="Explore Gizmo"
            >
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </NavLink>

          </div>
        </div>

        {/* Footer Navigation */}
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr] lg:gap-16">

          {/* Brand */}
          <div>
            <div className="text-3xl font-semibold tracking-[-0.06em]">
              Gizmo
            </div>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/30">
              Technology, thoughtfully selected.
              Products worth discovering, service
              worth remembering.
            </p>

            {/* Socials */}
            <div className="mt-7 flex gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-white/30 hover:bg-white"
                  >
                    <Icon className="h-4 w-4 text-white/30 transition-colors duration-300 group-hover:text-black" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="mb-6 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/20">
              Explore
            </p>

            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className="group flex items-center gap-2 text-sm text-white/40 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-white/40 transition-all duration-300 group-hover:w-4" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="mb-6 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/20">
              Support
            </p>

            <ul className="space-y-4">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className="group flex items-center gap-2 text-sm text-white/40 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-white/40 transition-all duration-300 group-hover:w-4" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-6 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/20">
              Get in touch
            </p>

            <div className="space-y-5">

              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/20" />

                <p className="text-sm leading-6 text-white/35">
                  123 Tech Street,
                  <br />
                  Gadget City, TC 12345
                </p>
              </div>

              <a
                href="mailto:info@gizmo.com"
                className="flex items-center gap-3 text-sm text-white/35 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-white/20" />
                info@gizmo.com
              </a>

              <a
                href="tel:+11234567890"
                className="flex items-center gap-3 text-sm text-white/35 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-white/20" />
                (123) 456-7890
              </a>

            </div>
          </div>
        </div>

        {/* Service Strip */}
        <div className="border-y border-white/[0.07] py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:justify-between">

            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/25"
                >
                  <Icon className="h-3.5 w-3.5 text-white/20" />
                  {item.text}
                </div>
              );
            })}

          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[10px] text-white/15">
            © {new Date().getFullYear()} Gizmo. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <NavLink
              to="/terms"
              className="text-[10px] text-white/15 transition-colors hover:text-white/40"
            >
              Terms
            </NavLink>

            <NavLink
              to="/privacy"
              className="text-[10px] text-white/15 transition-colors hover:text-white/40"
            >
              Privacy
            </NavLink>

            <NavLink
              to="/cookies"
              className="text-[10px] text-white/15 transition-colors hover:text-white/40"
            >
              Cookies
            </NavLink>
          </div>

          <span className="font-mono text-[9px] tracking-[0.25em] text-white/10">
            GZM / 2026
          </span>

        </div>

      </div>
    </footer>
  );
};