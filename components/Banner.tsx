"use client";

import DoctorImage from "@/assets/doctorImage.png";
import TypingText from "@/components/ui/typing-text";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Banner() {
  return (
    <div id="banner" className="bg-[#10172E] py-12 lg:py-0">
      <div className="mx-auto px-5 lg:px-0">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-0">
          {/* Content Section */}
          <div className="flex-1 container mx-auto flex items-center justify-center">
            <div className="max-w-2xl w-full mx-auto lg:mx-0 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 leading-tight">
                ডাঃ শেখ সারজিনা আনোয়ার{" "}
                <TypingText
                  text={[
                    "Paediatrician",
                    "Paediatric Neurologist",
                    "Neurological Disorder Expert",
                    "Child Specialist",
                    "Neurophysiologist( Electroencephalogram/EEG)",
                  ]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorClassName="text-[#F8F329]"
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold inline-block"
                  textColors={[
                    "#F8F329",
                    "#F8F329",
                    "#F8F329",
                    "#F8F329",
                    "#F8F329",
                  ]}
                  variableSpeed={{ min: 50, max: 120 }}
                />
              </h3>

              <p className="text-[#A4AEBE] mb-6 font-light leading-relaxed text-sm md:text-base max-w-120 whitespace-pre-line">
                {`ডাঃ শেখ সারজিনা আনোয়ার 
Child specialist, Paediatric Neurologiest, Neuro Development Specialist, Neurophysiology. বাচ্চাদের সর্দি, জ্বর শাসকস্ট, বমি, কোষ্ঠকাঠিন্য সহ শিশু দের বিকাশ জনিত সমস্যা নিরাময়ে দক্ষ ডাঃ শেখ সারজিনা আনোয়ার এমবিবিএস,
বিসিএস (স্বাস্থ্য), এফসিপিএস (শিশু রোগ), এমডি(পেডিয়াট্রিক নিউরোলোজি এন্ড নিউরো ডেভেলপমেন্ট)। \n
কুর্মিটোলা জেনারেল হাসপাতাল, ঢাকা।`}
              </p>

              <div className="flex justify-center lg:justify-start">
                <Button
                  variant="primary"
                  className="bg-[#423D96] hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
                  asChild
                >
                  <Link href="/doctor-profile">
                    বিস্তারিত{" "}
                    <HugeiconsIcon
                      icon={ArrowRight02Icon}
                      size={24}
                      color="currentColor"
                      strokeWidth={1.5}
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <img
              src="/doctorImage.png"
              alt="Dr. Sheikh Sarjina Anwar"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
