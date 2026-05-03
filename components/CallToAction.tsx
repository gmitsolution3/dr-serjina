// components/CallToAction.tsx
import { CallAddIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function CallToAction() {
  return (
    <section
      id="contact"
      className="py-12 md:py-16 lg:py-20 bg-[#1a2332]"
    >
      <div className="container mx-auto px-4 lg:px-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left side - Text */}
          <div className="text-white text-center lg:text-left flex-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed">
              শিশুদের বিভিন্ন সমসা সমাধানের জন্য যোগায়োগ করুন
            </h2>
          </div>

          {/* Right side - CTA Buttons */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="relative flex items-stretch">
              {/* Phone Button */}
              <a
                href="tel:+8801339511108"
                className="flex items-center justify-center gap-2 md:gap-3 flex-1 lg:flex-initial font-medium text-sm md:text-base bg-primary text-white rounded-tl-2xl py-3 md:py-4 px-4 md:px-6 lg:px-8 hover:bg-primary/60 transition-colors"
              >
                <HugeiconsIcon
                  icon={CallAddIcon}
                  size={18}
                  color="currentColor"
                  strokeWidth={1.5}
                />
                <span className="whitespace-nowrap">
                  +8801339511108
                </span>
              </a>

              {/* "Or" Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <span
                  className="flex items-center justify-center text-xs md:text-sm font-medium shadow-lg border-2 text-white border-[#1a2332] rounded-full w-14 h-14 md:w-14 md:h-14"
                  style={{ backgroundColor: "#10172E" }}
                >
                  অথবা
                </span>
              </div>

              {/* Appointment Button */}
              <a
                href="https://forms.gle/hRaBxfPtMFmPVXuW8"
                target="_blank"
                className="flex items-center justify-center gap-2 flex-1 lg:flex-initial font-bold text-sm md:text-base text-gray-900 rounded-tr-2xl py-3 md:py-4 px-4 md:px-6 lg:px-8 hover:bg-[#e6e024] transition-colors"
                style={{ backgroundColor: "#F8F329" }}
              >
                অ্যাপয়েন্টমেন্ট বুক করুন
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
