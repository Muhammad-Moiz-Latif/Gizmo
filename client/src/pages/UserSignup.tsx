import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import googleicon from "../assets/google.png";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const signupSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "Username must be at least 6 characters long" })
      .max(35, { message: "Username should be 35 characters long at max" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

interface UserSignupProps {
  toggleForm: () => void;
}

export function UserSignup({ toggleForm }: UserSignupProps) {
  const [isHidden, setIsHidden] = useState(true);
  const [Hidden, setHidden] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleTogglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetInputName = e.currentTarget.getAttribute("data-name");

    if (targetInputName === "password") {
      setIsHidden(!isHidden);
    } else {
      setHidden(!Hidden);
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_API_URL}/Signup`, data);
      if (response) {
        toast.success("Account created successfully!");
        reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Eyebrow */}
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-8 bg-black/25" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40">
          Join Gizmo
        </span>
      </div>

      {/* Headline */}
      <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-black sm:text-5xl">
        Create your
        <br />
        <span className="font-light italic text-black/35">account.</span>
      </h2>

      <p className="mt-5 text-sm leading-6 text-black/45">
        Already shopping with us?{" "}
        <button
          type="button"
          onClick={toggleForm}
          className="font-medium text-black underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black"
        >
          Log in
        </button>
      </p>

      <form className="mt-8 space-y-5 font-roboto" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Username */}
        <div>
          <label
            htmlFor="signup-username"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40"
          >
            Username
          </label>
          <input
            id="signup-username"
            type="text"
            {...register("username")}
            className="w-full rounded-xl border border-black/10 bg-[#fafaf9] px-4 py-3 text-[15px] text-black outline-none transition-colors focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
          />
          {errors.username && (
            <p className="mt-1.5 text-[13px] text-red-600">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="signup-email"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40"
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            {...register("email")}
            className="w-full rounded-xl border border-black/10 bg-[#fafaf9] px-4 py-3 text-[15px] text-black outline-none transition-colors focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
          />
          {errors.email && (
            <p className="mt-1.5 text-[13px] text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="signup-password"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={isHidden ? "password" : "text"}
              {...register("password")}
              className="w-full rounded-xl border border-black/10 bg-[#fafaf9] px-4 py-3 pr-11 text-[15px] text-black outline-none transition-colors focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
            />
            <button
              onClick={handleTogglePasswordVisibility}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/35 transition-colors hover:text-black"
              aria-label={isHidden ? "Show password" : "Hide password"}
              data-name="password"
            >
              {isHidden ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-[13px] text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label
            htmlFor="signup-confirm"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="signup-confirm"
              type={Hidden ? "password" : "text"}
              {...register("confirmpassword")}
              className="w-full rounded-xl border border-black/10 bg-[#fafaf9] px-4 py-3 pr-11 text-[15px] text-black outline-none transition-colors focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
            />
            <button
              onClick={handleTogglePasswordVisibility}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/35 transition-colors hover:text-black"
              aria-label={Hidden ? "Show password" : "Hide password"}
              data-name="confirmpassword"
            >
              {Hidden ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmpassword && (
            <p className="mt-1.5 text-[13px] text-red-600">{errors.confirmpassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex h-14 w-full items-center justify-between rounded-full bg-black px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          <span className="flex items-center gap-2">
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {isSubmitting ? "Creating account" : "Create account"}
          </span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </button>

        <div className="flex items-center gap-3 pt-1">
          <div className="h-px flex-1 bg-black/10" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/30">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-black/10" />
        </div>

        <button
          type="button"
          onClick={() =>
            (window.location.href = `${import.meta.env.VITE_PUBLIC_API_URL}/auth/google`)
          }
          className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-black/10 bg-white text-[15px] font-medium text-black/70 transition-all duration-300 hover:border-black/20 hover:bg-black/[0.03] hover:text-black"
        >
          <img src={googleicon} className="h-[18px] w-[18px]" alt="" />
          Google
        </button>
      </form>
    </motion.div>
  );
}