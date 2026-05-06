"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  LockPasswordIcon,
  PasswordValidationIcon,
  Settings01Icon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Change Password Schema
const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "বর্তমান পাসওয়ার্ড প্রয়োজন"),
    newPassword: z
      .string()
      .min(1, "নতুন পাসওয়ার্ড প্রয়োজন")
      .min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!.])[A-Za-z\d@#$%^&*!.]{8,}$/,
        "পাসওয়ার্ডে কমপক্ষে ১টি বড় হাতের অক্ষর, কমপক্ষে ১টি সংখ্যা ও ১টি বিশেষ অক্ষর (@#$%^&*.) থাকতে হবে",
      ),
    confirmPassword: z.string().min(1, "পাসওয়ার্ড নিশ্চিত করুন"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "নতুন পাসওয়ার্ড দুটি মিলছে না",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "নতুন পাসওয়ার্ড বর্তমান পাসওয়ার্ড থেকে ভিন্ন হতে হবে",
    path: ["newPassword"],
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

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Watch new password field for real-time strength feedback
  const newPassword = watch("newPassword");
  const score = getPasswordStrength(newPassword || "");
  const { label, color } = getStrengthMeta(score);

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      notify.success("পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!");
      reset(); // Clear the form
    } catch (error: any) {
      console.error(error);
      notify.error(
        error?.message || "পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ হয়েছে",
      );
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-[#423D96] to-[#5B4FC8] rounded-t-2xl p-4 mb-4 shadow-lg">
            <HugeiconsIcon
              icon={Settings01Icon}
              size={40}
              color="#FFFFFF"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            সেটিংস
          </h1>
          <p className="text-gray-500 text-sm">
            আপনার অ্যাকাউন্ট সেটিংস পরিচালনা করুন
          </p>
        </div>

        <div className="flex items-center justify-center gap-6">
          {/* Change Password Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  পাসওয়ার্ড পরিবর্তন করুন
                </h2>
                <p className="text-gray-500 text-sm">
                  আপনার অ্যাকাউন্টের নিরাপত্তার জন্য পাসওয়ার্ড আপডেট
                  করুন
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Current Password Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    বর্তমান পাসওয়ার্ড{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HugeiconsIcon
                        icon={LockPasswordIcon}
                        size={18}
                        color="#9CA3AF"
                        strokeWidth={1.5}
                      />
                    </div>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="আপনার বর্তমান পাসওয়ার্ড লিখুন"
                      className={`w-full pl-10 pr-12 py-3 bg-gray-50 border ${
                        errors.currentPassword
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-[#423D96]"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#423D96]/20 text-gray-800 placeholder-gray-400 transition-all`}
                      {...register("currentPassword")}
                      aria-invalid={
                        errors.currentPassword ? "true" : "false"
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      aria-label={
                        showCurrentPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      <HugeiconsIcon
                        icon={
                          showCurrentPassword ? EyeIcon : ViewOffIcon
                        }
                        size={18}
                        color="#9CA3AF"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p
                      className="text-red-500 text-xs mt-1"
                      role="alert"
                    >
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>

                {/* New Password Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    নতুন পাসওয়ার্ড{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HugeiconsIcon
                        icon={PasswordValidationIcon}
                        size={18}
                        color="#9CA3AF"
                        strokeWidth={1.5}
                      />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="কমপক্ষে ৮ অক্ষর"
                      className={`w-full pl-10 pr-12 py-3 bg-gray-50 border ${
                        errors.newPassword
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-[#423D96]"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#423D96]/20 text-gray-800 placeholder-gray-400 transition-all`}
                      {...register("newPassword")}
                      aria-invalid={
                        errors.newPassword ? "true" : "false"
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword(!showNewPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      aria-label={
                        showNewPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      <HugeiconsIcon
                        icon={showNewPassword ? EyeIcon : ViewOffIcon}
                        size={18}
                        color="#9CA3AF"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    পাসওয়ার্ডে কমপক্ষে ১টি বড় হাতের অক্ষর, কমপক্ষে
                    ১টি সংখ্যা ও ১টি বিশেষ অক্ষর (@#$%^&*.) ব্যবহার
                    করুন
                  </p>
                  {errors.newPassword && (
                    <p
                      className="text-red-500 text-xs mt-1"
                      role="alert"
                    >
                      {errors.newPassword.message}
                    </p>
                  )}

                  {/* Password strength indicator */}
                  {newPassword && (
                    <div className="mt-2 space-y-2">
                      <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                        <div
                          className={`h-2 rounded transition-all duration-300 ${color}`}
                          style={{ width: `${(score / 5) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">
                        পাসওয়ার্ড শক্তি:{" "}
                        <span className="font-medium">{label}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    নতুন পাসওয়ার্ড নিশ্চিত করুন{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HugeiconsIcon
                        icon={PasswordValidationIcon}
                        size={18}
                        color="#9CA3AF"
                        strokeWidth={1.5}
                      />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="আবার নতুন পাসওয়ার্ড লিখুন"
                      className={`w-full pl-10 pr-12 py-3 bg-gray-50 border ${
                        errors.confirmPassword
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-[#423D96]"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#423D96]/20 text-gray-800 placeholder-gray-400 transition-all`}
                      {...register("confirmPassword")}
                      aria-invalid={
                        errors.confirmPassword ? "true" : "false"
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      <HugeiconsIcon
                        icon={
                          showConfirmPassword ? EyeIcon : ViewOffIcon
                        }
                        size={18}
                        color="#9CA3AF"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p
                      className="text-red-500 text-xs mt-1"
                      role="alert"
                    >
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="flex-1 bg-gradient-to-r from-[#423D96] to-[#5B4FC8] hover:from-[#362A7A] hover:to-[#4A3FA8] text-white py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting
                        ? "পরিবর্তন হচ্ছে..."
                        : "পাসওয়ার্ড পরিবর্তন করুন"}
                      {!isSubmitting && (
                        <HugeiconsIcon
                          icon={Settings01Icon}
                          size={18}
                          color="currentColor"
                          strokeWidth={1.5}
                        />
                      )}
                    </span>
                  </Button>

                  <Button
                    type="button"
                    onClick={() => reset()}
                    variant="outline"
                    className="px-6 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 cursor-pointer rounded-xl transition-all"
                  >
                    বাতিল করুন
                  </Button>
                </div>
              </form>

              {/* Security Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h4 className="text-blue-800 text-sm font-medium mb-2">
                  🔒 নিরাপত্তা টিপস:
                </h4>
                <ul className="text-gray-600 text-xs space-y-1">
                  <li>• কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড ব্যবহার করুন</li>
                  <li>• বড় হাতের ও ছোট হাতের অক্ষরের সমন্বয় করুন</li>
                  <li>• সংখ্যা ও বিশেষ অক্ষর (@#$%^&*.) যোগ করুন</li>
                  <li>
                    • অন্যান্য অ্যাকাউন্টের সাথে একই পাসওয়ার্ড
                    ব্যবহার করবেন না
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
