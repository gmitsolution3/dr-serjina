import {
  Award,
  Award01FreeIcons,
  Award01Icon,
  Hand,
  InjectionIcon,
  Syringe,
  UserCircleIcon,
  WavingHand02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";

export default function WhyChooseUs() {
  return (
    <section
      id="faq"
      className="py-12 md:py-16 lg:py-20"
      style={{ backgroundColor: "#0f1621" }}
    >
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <p
              className="font-medium text-base md:text-lg"
              style={{ color: "#28B9DA" }}
            >
              পেডিয়াট্রিক ও নিউরোলজি আধুনিক চিকিৎসা
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight whitespace-pre-line">
              সবচেয়ে সেরা উপায়ে এবং যত্নের সাথে
              {"\n"}অত্যন্ত নির্ভরতাবে সেবা প্রদান করা হয়
            </h2>

            <div className="pt-2 md:pt-4">
              <Button
                asChild
                variant="primary"
                className="bg-primary hover:bg-[#10172E]"
              >
                <a
                  href="https://forms.gle/hRaBxfPtMFmPVXuW8"
                  target="_blank"
                >
                  অ্যাপয়েন্টমেন্ট বুক করুন
                </a>
              </Button>
            </div>
          </div>

          {/* Right side - Features Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-8">
            {/* Feature 1 - Advanced Technology */}
            <div className="bg-gradient-to-br from-primary to-[#4a1835] rounded-tl-[40px] p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-3 md:space-y-4 min-h-[160px] md:min-h-[200px] hover:scale-105 transition-transform">
              <div className="flex items-center justify-center">
                <div className="scale-75 md:scale-100">
                  <HugeiconsIcon
                    icon={InjectionIcon}
                    size={48}
                    strokeWidth={1.5}
                    className="text-yellow-400"
                  />
                </div>
              </div>
              <h3 className="text-white text-base md:text-lg lg:text-xl font-semibold leading-snug">
                উন্নত প্রযুক্তি
              </h3>
            </div>

            {/* Feature 2 - Satisfaction Guarantee */}
            <div className="bg-[#1a2332] rounded-tr-[40px] border-2 border-gray-700 p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-3 md:space-y-4 min-h-[160px] md:min-h-[200px] hover:scale-105 transition-transform">
              <div className="flex items-center justify-center">
                <div className="scale-75 md:scale-100">
                  <HugeiconsIcon
                    icon={Award01Icon}
                    size={48}
                    strokeWidth={1.5}
                    className="text-yellow-400"
                  />
                </div>
              </div>
              <h3 className="text-white text-base md:text-lg lg:text-xl font-semibold leading-snug">
                সন্তুষ্টির নিশ্চয়তা
              </h3>
            </div>

            {/* Feature 3 - Professional Doctor */}
            <div className="bg-[#1a2332] rounded-bl-[40px] border-2 border-gray-700 p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-3 md:space-y-4 min-h-[160px] md:min-h-[200px] hover:scale-105 transition-transform">
              <div className="flex items-center justify-center">
                <div className="scale-75 md:scale-100">
                  <HugeiconsIcon
                    icon={UserCircleIcon}
                    size={48}
                    strokeWidth={1.5}
                    className="text-yellow-400"
                  />
                </div>
              </div>
              <h3 className="text-white text-base md:text-lg lg:text-xl font-semibold leading-snug">
                পেশাদার চিকিৎসক
              </h3>
            </div>

            {/* Feature 4 - Guaranteed Safety Service */}
            <div className="bg-gradient-to-br from-primary to-[#4a1835] rounded-br-[40px] p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-3 md:space-y-4 min-h-[160px] md:min-h-[200px] hover:scale-105 transition-transform">
              <div className="flex items-center justify-center">
                <div className="scale-75 md:scale-100">
                  <HugeiconsIcon
                    icon={WavingHand02Icon}
                    size={48}
                    strokeWidth={1.5}
                    className="text-yellow-400"
                  />
                </div>
              </div>
              <h3 className="text-white text-base md:text-lg lg:text-xl font-semibold leading-snug">
                নিশ্চিত সুরক্ষা সেবা
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
