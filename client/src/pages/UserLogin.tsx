import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import googleicon from "../assets/google.png";
import toast from "react-hot-toast";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface UserLoginProps {
  toggleForm: () => void;
}

export function UserLogin({ toggleForm }: UserLoginProps) {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(true);
  const [incorrectData, setIncorrectData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleTogglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsHidden(!isHidden);
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setIncorrectData(false);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/UserLogin`,
        data,
        { withCredentials: true }
      );
      if (response.data.user) {
        reset();
        toast.success("Logged in successfully!", { position: "top-center" });
        setTimeout(() => {
          navigate(`/dashboard/${response.data.user.id}`);
        }, 900);
      } else {
        setIncorrectData(true);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setIncorrectData(true);
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
          Account access
        </span>
      </div>

      {/* Headline */}
      <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-black sm:text-5xl">
        Welcome
        <br />
        <span className="font-light italic text-black/35">back.</span>
      </h2>

      <p className="mt-5 text-sm leading-6 text-black/45">
        New to Gizmo?{" "}
        <button
          type="button"
          onClick={toggleForm}
          className="font-medium text-black underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black"
        >
          Create an account
        </button>
      </p>

      <form className="mt-8 space-y-5 font-roboto" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            className="w-full rounded-xl border border-black/10 bg-[#fafaf9] px-4 py-3 text-[15px] text-black outline-none transition-colors focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
          />
          {errors.username && (
            <p className="mt-1.5 text-[13px] text-red-600">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={isHidden ? "password" : "text"}
              {...register("password")}
              className="w-full rounded-xl border border-black/10 bg-[#fafaf9] px-4 py-3 pr-11 text-[15px] text-black outline-none transition-colors focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
            />
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/35 transition-colors hover:text-black"
              aria-label={isHidden ? "Show password" : "Hide password"}
            >
              {isHidden ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-[13px] text-red-600">{errors.password.message}</p>
          )}
        </div>

        {incorrectData && (
          <p className="rounded-xl bg-red-50 px-4 py-2.5 text-[13px] text-red-600">
            That username or password isn't right. Try again.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex h-14 w-full items-center justify-between rounded-full bg-black px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          <span className="flex items-center gap-2">
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {isSubmitting ? "Logging in" : "Log in"}
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