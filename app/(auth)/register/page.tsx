"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight02Icon,
  EyeIcon,
  ViewOffIcon,
  LockPasswordIcon,
  Mail01Icon,
  CallIcon,
  UserIcon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { notify } from "@/utils/notify";
import { useRouter } from "next/navigation";

// Define validation schema with Zod
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "নাম প্রয়োজন")
      .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে")
      .max(50, "নাম সর্বোচ্চ ৫০ অক্ষরের হতে পারে"),
    email: z
      .string()
      .min(1, "ইমেইল প্রয়োজন")
      .email("সঠিক ইমেইল ফরম্যাট দিন (উদাহরণ: name@example.com)"),
    phone: z
      .string()
      .min(1, "মোবাইল নাম্বার প্রয়োজন")
      .min(11, "মোবাইল নাম্বার কমপক্ষে ১১ অক্ষরের হতে হবে")
      .max(11, "মোবাইল নাম্বার সর্বচ্চ ১১ অক্ষরের হতে হবে")
      .regex(
        /^(01)[3-9]\d{8}$/,
        "সঠিক মোবাইল নাম্বার দিন (উদাহরণ: 01XXXXXXXXX)",
      ),
    password: z
      .string()
      .min(1, "পাসওয়ার্ড প্রয়োজন")
      .min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!.])[A-Za-z\d@#$%^&*!.]{8,}$/,
        "পাসওয়ার্ডে কমপক্ষে ১টি বড় হাতের অক্ষর, কমপক্ষে ১টি সংখ্যা ও ১টি বিশেষ অক্ষর (@#$%^&*.) থাকতে হবে",
      ),
    confirmPassword: z.string().min(1, "পাসওয়ার্ড নিশ্চিত করুন"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "পাসওয়ার্ড দুটি মিলছে না",
    path: ["confirmPassword"],
  });

const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@#$%^&*.]/.test(password)) score++;

  return score;
};

const getStrengthMeta = (score: number) => {
  if (score <= 2) {
    return { label: "দুর্বল", color: "bg-red-500" };
  }
  if (score === 3 || score === 4) {
    return { label: "মাঝারি", color: "bg-yellow-500" };
  }
  return { label: "শক্তিশালী", color: "bg-green-500" };
};

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password field for real-time validation feedback
  const password = watch("password");

  const score = getPasswordStrength(password || "");
  const { label, color } = getStrengthMeta(score);

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...submitData } = data;

    const res = await authClient.signUp.email(submitData);

    if (res.data) {
      notify.success("Registration successful! Login to continue.");
      router.push("/login");
    } else {
      notify.error(res?.error?.message as string);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#10172E] to-[#1a2332] flex items-center justify-center px-4 py-12">
      <div className="container mx-auto max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#423D96] rounded-t-2xl p-4 mb-4">
            <HugeiconsIcon
              icon={UserAdd01Icon}
              size={40}
              color="#F8F329"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            রেজিস্ট্রেশন
          </h1>
          <p className="text-[#A4AEBE] text-sm">
            একটি নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                পূর্ণ নাম <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HugeiconsIcon
                    icon={UserIcon}
                    size={18}
                    color="#A4AEBE"
                    strokeWidth={1.5}
                  />
                </div>
                <input
                  type="text"
                  placeholder="আপনার নাম"
                  className={`w-full pl-10 pr-4 py-3 bg-[#1a2332] border ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  } rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors`}
                  {...register("name")}
                  aria-invalid={errors.name ? "true" : "false"}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                ইমেল ঠিকানা <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    size={18}
                    color="#A4AEBE"
                    strokeWidth={1.5}
                  />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 bg-[#1a2332] border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors`}
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                ফোন নম্বর <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HugeiconsIcon
                    icon={CallIcon}
                    size={18}
                    color="#A4AEBE"
                    strokeWidth={1.5}
                  />
                </div>
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className={`w-full pl-10 pr-4 py-3 bg-[#1a2332] border ${
                    errors.phone ? "border-red-500" : "border-gray-700"
                  } rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors`}
                  {...register("phone")}
                  aria-invalid={errors.phone ? "true" : "false"}
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                পাসওয়ার্ড <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HugeiconsIcon
                    icon={LockPasswordIcon}
                    size={18}
                    color="#A4AEBE"
                    strokeWidth={1.5}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className={`w-full pl-10 pr-12 py-3 bg-[#1a2332] border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors`}
                  {...register("password")}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <HugeiconsIcon
                    icon={showPassword ? EyeIcon : ViewOffIcon}
                    size={18}
                    color="#A4AEBE"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-1">
                পাসওয়ার্ডে কমপক্ষে ১টি বড় হাতের অক্ষর, কমপক্ষে ১টি সংখ্যা ও ১টি বিশেষ অক্ষর (@#$%^&*.) ব্যবহার করুন
              </p>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                পাসওয়ার্ড নিশ্চিত করুন{" "}
                <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HugeiconsIcon
                    icon={LockPasswordIcon}
                    size={18}
                    color="#A4AEBE"
                    strokeWidth={1.5}
                  />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                  className={`w-full pl-10 pr-12 py-3 bg-[#1a2332] border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-700"
                  } rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors`}
                  {...register("confirmPassword")}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <HugeiconsIcon
                    icon={showConfirmPassword ? EyeIcon : ViewOffIcon}
                    size={18}
                    color="#A4AEBE"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1" role="alert">
                  {errors.confirmPassword.message}
                </p>
              )}

              {/* Password strength indicator */}
              {password && (
                <div className="mt-2 space-y-2">
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                      className={`h-2 rounded transition-all duration-300 ${color}`}
                      style={{ width: `${(score / 5) * 100}%` }}
                    />
                  </div>

                  {/* Label */}
                  <p className="text-xs text-gray-400">
                    পাসওয়ার্ড শক্তি:{" "}
                    <span className="font-medium">{label}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className="w-full bg-[#423D96] hover:bg-[#10172E] py-3 mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? "নিবন্ধন হচ্ছে..." : "রেজিস্টার করুন"}
                {!isSubmitting && (
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    size={18}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                )}
              </span>
            </Button>

            {/* Login Link */}
            <p className="text-center text-gray-400 text-sm mt-6">
              ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/login"
                className="text-[#F8F329] hover:underline font-medium"
              >
                লগইন করুন
              </Link>
            </p>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#423D96] rounded-full filter blur-3xl opacity-10 -z-10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F8F329] rounded-full filter blur-3xl opacity-5 -z-10" />
      </div>
    </div>
  );
}