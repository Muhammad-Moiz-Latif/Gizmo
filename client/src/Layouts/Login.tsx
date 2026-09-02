"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminLogin } from "../pages/AdminLogin";
import logo from "../assets/blockchain.png";
import img from "../assets/sarah-dorweiler-QeVmJxZOv3k-unsplash.jpg";
import adminImg from "../assets/admin-background.jpg";
import { UserLogin } from "../pages/UserLogin";
import { UserSignup } from "../pages/UserSignup";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsAdmin(false);
  };

  const toggleAdminUser = () => {
    setIsAdmin(!isAdmin);
    setIsLogin(true);
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#f7f7f5] font-roboto text-black">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:80px_80px]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[24vw] font-black leading-none tracking-[-0.08em] text-black/[0.03]">
          GIZMO
        </div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2.5rem] border border-black/[0.06] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.08)] md:flex-row"
        >
          {/* ---------------------------------------------
              VISUAL PANEL
          --------------------------------------------- */}
          <div className="relative h-64 w-full overflow-hidden md:h-auto md:w-1/2">
            <img
              src={isAdmin ? adminImg : img}
              className="h-full w-full object-cover"
              alt=""
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />

            {/* Logo */}
            <img src={logo} className="absolute left-6 top-6 z-10 w-10" alt="Gizmo" />

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-white/40" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60">
                  {isAdmin ? "Admin console" : "Buy · Sell · Discover"}
                </span>
              </div>

              <h1 className="max-w-md text-3xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-4xl lg:text-[2.75rem]">
                {isAdmin ? (
                  <>
                    Built for
                    <br />
                    <span className="font-light italic text-white/50">oversight.</span>
                  </>
                ) : (
                  <>
                    From devices
                    <br />
                    <span className="font-light italic text-white/50">to dreams.</span>
                  </>
                )}
              </h1>

              <p className="mt-4 max-w-xs text-[13px] leading-5 text-white/40">
                {isAdmin
                  ? "Manage listings, orders and the people who keep Gizmo running."
                  : "Your marketplace for the technology worth owning."}
              </p>
            </div>

            <div className="absolute bottom-7 right-7 hidden font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 sm:block">
              GZM / ACCESS
            </div>
          </div>

          {/* ---------------------------------------------
              FORM PANEL
          --------------------------------------------- */}
          <div className="flex w-full flex-col overflow-auto md:w-1/2">
            <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 md:px-14">
              <div className="mb-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 text-[13px] text-black/45 transition-colors hover:text-black"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to shopping
                </button>

                {!isAdmin && (
                  <button
                    type="button"
                    onClick={toggleAdminUser}
                    className="flex items-center gap-1.5 text-[13px] text-black/35 transition-colors hover:text-black"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Admin
                  </button>
                )}

                {isAdmin && (
                  <button
                    type="button"
                    onClick={toggleAdminUser}
                    className="text-[13px] text-black/35 underline underline-offset-4 transition-colors hover:text-black"
                  >
                    Back to customer login
                  </button>
                )}
              </div>

              {isAdmin ? (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-8 bg-black/25" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
                      Restricted access
                    </span>
                  </div>
                  <h2 className="mb-8 text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl">
                    Admin
                    <br />
                    <span className="font-light italic text-black/35">console.</span>
                  </h2>
                  <AdminLogin />
                </motion.div>
              ) : isLogin ? (
                <UserLogin toggleForm={toggleForm} />
              ) : (
                <UserSignup toggleForm={toggleForm} />
              )}
            </div>

            {/* Bottom signature */}
            <div className="flex items-center justify-between border-t border-black/[0.06] px-6 py-5 sm:px-10 md:px-14">
              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-black/30">
                Secure sign-in
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-black/30">
                Gizmo © 2026
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};