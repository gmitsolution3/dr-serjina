import { getProfileData } from "@/services/getProfileData";
import { IProfile } from "@/types";
import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function TreatmentSpecialities() {
  const res = await getProfileData();
  const profileData: IProfile = res?.data || {};

  const experties = profileData?.treatmentAndExperties || [];

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
              {profileData?.name?.bangla || "ডাঃ শেখ সারজিনা আনোয়ার"}
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-tight whitespace-pre-line">
              পেডিয়াট্রিক নিউরোলজি ও ডেভেলপমেন্ট চিকিৎসায় প্রায়
              {"\n"}
              {profileData?.stats?.yearsOfExperience || "১৮"}+ বছরের
              অভিজ্ঞতা
            </h2>

            <div className="space-y-3 md:space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                {profileData?.name?.bangla ||
                  "ডাঃ শেখ সারজিনা আনোয়ার"} 
                {" "} একজন অভিজ্ঞ শিশু রোগ বিশেষজ্ঞ ও শিশু নিউরোলজিস্ট।
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

                {experties.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2 md:gap-y-3">
                    {experties.map((expert) => (
                      <div
                        key={expert}
                        className="flex items-start gap-3"
                      >
                        <HugeiconsIcon
                          icon={CheckmarkCircle01Icon}
                          size={18}
                          strokeWidth={1.5}
                          className="text-[#4285f4] shrink-0 mt-0.5"
                        />
                        <span className="text-gray-700 text-sm md:text-base leading-snug">
                          {expert}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-blue-700 text-sm md:text-base">
                      বিশেষত্বের তথ্য শীঘ্রই যোগ করা হবে।
                    </p>
                    <p className="text-blue-600 text-xs md:text-sm mt-1">
                      চিকিৎসার বিস্তারিত জানতে আমাদের সাথে যোগাযোগ
                      করুন।
                    </p>
                  </div>
                )}
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
