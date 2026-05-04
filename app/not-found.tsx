import { Button } from "@/components/ui/button";
import {
  Home01Icon,
  Sad01Icon,
  TelephoneIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#10172E] to-[#1a2332] flex items-center justify-center px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          {/* 404 Number with Animation Effect */}
          <div className="relative mb-8 md:mb-12">
            <h1 className="text-8xl md:text-9xl lg:text-[150px] font-bold text-[#423D96] opacity-20">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <HugeiconsIcon
                icon={Sad01Icon}
                size={80}
                color="#F8F329"
                strokeWidth={1.5}
                className="md:w-24 md:h-24"
              />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              পৃষ্ঠাটি পাওয়া যায়নি
            </h2>
            <p className="text-[#A4AEBE] text-base md:text-lg max-w-2xl mx-auto">
              আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, নাম পরিবর্তন
              করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ।
            </p>
            <p className="text-[#A4AEBE] text-sm md:text-base">
              The page you are looking for might have been removed,
              had its name changed, or is temporarily unavailable.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Button
              asChild
              variant="primary"
              className="bg-[#423D96] hover:bg-[#10172E] transition-all duration-300 px-6 md:px-8 py-3 md:py-4"
            >
              <Link href="/" className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Home01Icon}
                  size={18}
                  color="currentColor"
                  strokeWidth={1.5}
                />
                হোমপেজে ফিরে যান
              </Link>
            </Button>
          </div>

          {/* Contact Section */}
          <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-700">
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-400 text-sm md:text-base">
                জরুরী প্রয়োজনে যোগাযোগ করুন
              </p>
              <a
                href="tel:+8801339511108"
                className="flex items-center gap-2 text-[#F8F329] hover:text-yellow-400 transition-colors text-lg md:text-xl font-semibold"
              >
                <HugeiconsIcon
                  icon={TelephoneIcon}
                  size={20}
                  color="#F8F329"
                  strokeWidth={1.5}
                />
                +8801339511108
              </a>
              <p className="text-gray-500 text-xs md:text-sm mt-2">
                সিরিয়ালের জন্য কল করুন | শনি, সোম, বুধবার (সন্ধ্যা
                ৭টা - রাত ৯টা)
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-[#423D96] rounded-full filter blur-3xl opacity-10 -z-10" />
        <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-[#F8F329] rounded-full filter blur-3xl opacity-5 -z-10" />
      </div>
    </div>
  );
}
