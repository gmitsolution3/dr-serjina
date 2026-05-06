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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { notify } from "@/utils/notify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-context";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "ইমেইল প্রয়োজন")
    .email("সঠিক ইমেইল ফরম্যাট দিন (উদাহরণ: name@example.com)"),
  password: z.string().min(1, "পাসওয়ার্ড প্রয়োজন"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setSession } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await authClient.signIn.email(data);

    const session = await authClient.getSession();

    if (res.data) {
      setSession(session?.data);

      const user = res?.data?.user;
      notify.success("Login to successful!");

      router.push("/admin-dashboard");
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                ইমেল / ফোন নম্বর <span className="text-[#F8F329]">*</span>
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
                  className={`w-full pl-10 pr-4 py-3 bg-[#1a2332] border rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-700"
                  }`}
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

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                পাসওয়ার্ড <span className="text-[#F8F329]">*</span>
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
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-3 bg-[#1a2332] border rounded-xl focus:outline-none focus:border-[#F8F329] text-white placeholder-gray-500 transition-colors ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-700"
                  }`}
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
              {errors.password && (
                <p className="text-red-400 text-xs mt-1" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className="w-full bg-[#423D96] hover:bg-[#10172E] py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? "লগইন হচ্ছে..." : "লগইন করুন"}
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