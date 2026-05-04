"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight02Icon,
  EyeIcon,
  LockPasswordIcon,
  Mail01Icon,
  UserCircleIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#10172E] to-[#1a2332] flex items-center justify-center px-4 py-12">
      <div className="container mx-auto max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#423D96] rounded-t-2xl p-4 mb-4">
            <HugeiconsIcon
              icon={UserCircleIcon}
              size={40}
              color="#F8F329"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            সাইন ইন
          </h1>
          <p className="text-[#A4AEBE] text-sm">
            আপনার অ্যাকাউন্টে লগইন করুন
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                ইমেল / ফোন নম্বর
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
                  className="w-full pl-10 pr-4 py-3 bg-[#1a2332] border border-gray-700 rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                পাসওয়ার্ড
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
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-[#1a2332] border border-gray-700 rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors"
                  required
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
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full bg-[#423D96] hover:bg-[#10172E] py-3"
            >
              <span className="flex items-center justify-center gap-2">
                লগইন করুন
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  size={18}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </span>
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-gray-500">
                  অথবা
                </span>
              </div>
            </div>

            {/* Register Link */}
            <p className="text-center text-gray-400 text-sm mt-6">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/register"
                className="text-[#F8F329] hover:underline font-medium"
              >
                রেজিস্টার করুন
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
