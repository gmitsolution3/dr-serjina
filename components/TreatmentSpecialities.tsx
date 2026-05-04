import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function TreatmentSpecialities() {
  return (
    <section
      id="services"
      className="py-12 md:py-16 lg:py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 place-items-center">
          {/* Left side - Images Grid */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left Image */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-48 md:h-64 lg:h-80">
                <img
                  src="/child.jpg"
                  alt="Child diagnosis consultation"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Top Right Image */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-48 md:h-64 lg:h-80">
                <img
                  src="/medicine.jpg"
                  alt="Paediatric medicine care"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom full-width image */}
              <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg h-48 md:h-64 lg:h-72">
                <img
                  src="/treatment.jpg"
                  alt="Child treatment procedure"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-4 md:space-y-6">
            <p className="text-[#423D96] font-medium text-sm md:text-base">
              ডাঃ শেখ সারজিনা আনোয়ার
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-tight whitespace-pre-line">
              পেডিয়াট্রিক নিউরোলজি ও ডেভেলপমেন্ট চিকিৎসায় প্রায়
              {"\n"}১৮+ বছরের অভিজ্ঞতা
            </h2>

            <div className="space-y-3 md:space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                ডাঃ শেখ সারজিনা আনোয়ার একজন অভিজ্ঞ শিশু রোগ বিশেষজ্ঞ
                ও শিশু নিউরোলজিস্ট।
              </p>
              <p>
                শিশুদের স্নায়ুজনিত সমস্যা, খিঁচুনি, অটিজম, বিকাশজনিত
                বিলম্ব এবং সাধারণ শিশু রোগের আধুনিক ও নির্ভুল চিকিৎসা
                প্রদান করে থাকেন।
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              {/* Services List */}
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                  বিশেষত্ব
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2 md:gap-y-3">
                  {/* Neurology & Development Services */}
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      মৃগী ও খিঁচুনি রোগ
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      অটিজম স্পেকট্রাম ডিজঅর্ডার (ASD)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      এডিএইচডি ও বিকাশজনিত বিলম্ব
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      সেরিব্রাল পালসি ব্যবস্থাপনা
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      নিউরোডেভেলপমেন্টাল ডিজঅর্ডার
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      মুভমেন্ট ডিসঅর্ডার (টিকস, ডিস্টোনিয়া,
                      এটাক্সিয়া)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      নিউরোমাসকুলার রোগ (SMA, মাসকুলার ডিস্ট্রফি)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      নিউরোজেনেটিক ও নিউরোমেটাবলিক রোগ
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      ডেভেলপমেন্টাল রিগ্রেশন
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      নবজাতকের স্নায়ুরোগ (HIE, নবজাতক খিঁচুনি)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      নিউরো ইনফেকশন ও প্রদাহজনিত রোগ
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      ইইজি ও ভিডিও ইইজি মূল্যায়ন
                    </span>
                  </div>

                  {/* General Child Health Services */}
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      জ্বর, সর্দি, কাশি
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      শ্বাসকষ্ট
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      বমি ও পাতলা পায়খানা
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      কোষ্ঠকাঠিন্য
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      খাবারে অরুচি
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      কৃমির সমস্যা
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      দুর্বলতা ও শরীর ফ্যাকাসে হওয়া
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      শরীর হলুদ হয়ে যাওয়া
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      বয়স অনুযায়ী সঠিক বৃদ্ধি না হওয়া
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      পেট ব্যথা
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      প্রস্রাবের সময় জ্বালাপোড়া ও ঘনঘন প্রস্রাব
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      চোখ-মুখ ও শরীর ফুলে যাওয়া
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      শরীরে চুলকানি ও লাল দাগ
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      শিশুদের মানসিক ও আচরণগত সমস্যা
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      শিশুদের মোবাইল, টিভি ও কম্পিউটার আসক্তি
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      শিশুদের চোখের সমস্যা
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      ভ্যাকসিন সংক্রান্ত পরামর্শ
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#4285f4]"
                    />
                    <span className="text-gray-700 text-sm md:text-base leading-snug">
                      শিশুদের কোভিড–১৯ সংক্রান্ত সমস্যা
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 md:pt-4">
              <Button
                variant="primary"
                className="bg-primary hover:bg-[#10172E]"
                asChild
              >
                <Link href="/profile-detail">বিস্তারিত জানতে</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
