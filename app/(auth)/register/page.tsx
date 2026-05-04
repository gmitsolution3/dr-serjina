// app/register/page.tsx
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

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "নাম প্রয়োজন";
    }

    if (!formData.email.trim()) {
      newErrors.email = "ইমেল প্রয়োজন";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "সঠিক ইমেল ঠিকানা দিন";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "ফোন নম্বর প্রয়োজন";
    } else if (
      !/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "সঠিক ফোন নম্বর দিন";
    }

    if (!formData.password) {
      newErrors.password = "পাসওয়ার্ড প্রয়োজন";
    } else if (formData.password.length < 6) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle registration logic here
    console.log("Registration data:", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    // Redirect to login or dashboard
    // router.push("/login");
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="আপনার নাম"
                  className={`w-full pl-10 pr-4 py-3 bg-[#1a2332] border ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  } rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors`}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.name}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 bg-[#1a2332] border ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email}
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+8801XXXXXXXXX"
                  className={`w-full pl-10 pr-4 py-3 bg-[#1a2332] border ${
                    errors.phone
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.phone}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="কমপক্ষে ৬ অক্ষর"
                  className={`w-full pl-10 pr-12 py-3 bg-[#1a2332] border ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <HugeiconsIcon
                    icon={showPassword ? EyeIcon : ViewOffIcon}
                    size={18}
                    color="#A4AEBE"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password}
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                  className={`w-full pl-10 pr-12 py-3 bg-[#1a2332] border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
                <p className="text-red-400 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full bg-[#423D96] hover:bg-[#10172E] py-3 mt-6"
            >
              <span className="flex items-center justify-center gap-2">
                রেজিস্টার করুন
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  size={18}
                  color="currentColor"
                  strokeWidth={1.5}
                />
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
