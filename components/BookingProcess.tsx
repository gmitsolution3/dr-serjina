import { getProfileData } from "@/services/getProfileData";
import { IProfile } from "@/types";
import {
  Calendar01Icon,
  File01Icon,
  InjectionIcon,
  LaptopIcon,
  StethoscopeIcon,
  TelephoneIcon,
  UserGroupIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default async function BookingProcess() {
  const res = await getProfileData();

  const profileData: IProfile = res?.data || {};

  // Get primary chamber info
  const primaryChamber = profileData?.chamber?.find(
    (c) => c.isPrimary,
  );

  // Get contact numbers
  const contactNumbers = profileData?.contactNumbers || [];

  return (
    <section id="blog" className="py-10 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left side - Process Steps */}
          <div className="space-y-5 md:space-y-8">
            {/* Header */}
            <div className="space-y-2 sm:space-y-3">
              <p
                className="font-medium text-sm md:text-base"
                style={{ color: "#423D96" }}
              >
                বুকিং সিস্টেম
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
                মাত্র ৪টি সহজ পদক্ষেপ এর মাধ্যমে সেবা নিন
              </h2>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
              {/* Step 1 */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="relative inline-block">
                  <div className="bg-primary rounded-t-2xl p-3 sm:p-4 md:p-5 lg:p-6 inline-block">
                    <HugeiconsIcon
                      icon={File01Icon}
                      size={24}
                      color="white"
                      strokeWidth={1.5}
                      className="sm:w-7 sm:h-7 md:w-8 md:h-8"
                    />
                  </div>
                  <div className="absolute top-3 sm:top-4 -right-6 sm:-right-8 bg-[#1a2332] text-white rounded-t-xl w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-sm sm:text-base md:text-lg">
                    01
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-xl lg:text-xl font-light text-gray-900 leading-snug max-w-[10rem] sm:max-w-[12rem] md:max-w-52">
                  অ্যাপয়েন্টমেন্ট বুকিং এর আবেদন করুন
                </h3>
              </div>

              {/* Step 2 */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="relative inline-block">
                  <div className="bg-primary rounded-t-2xl p-3 sm:p-4 md:p-5 lg:p-6 inline-block">
                    <HugeiconsIcon
                      icon={UserGroupIcon}
                      size={24}
                      color="white"
                      strokeWidth={1.5}
                      className="sm:w-7 sm:h-7 md:w-8 md:h-8"
                    />
                  </div>
                  <div className="absolute top-3 sm:top-4 -right-6 sm:-right-8 bg-[#1a2332] text-white rounded-t-xl w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-sm sm:text-base md:text-lg">
                    02
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-xl lg:text-xl font-light text-gray-900 leading-snug max-w-[10rem] sm:max-w-[12rem] md:max-w-52">
                  অ্যাপয়েন্টমেন্ট বুকিং ফর্ম পুরন করুন
                </h3>
              </div>

              {/* Step 3 */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="relative inline-block">
                  <div className="bg-primary rounded-t-2xl p-3 sm:p-4 md:p-5 lg:p-6 inline-block">
                    <HugeiconsIcon
                      icon={UserIcon}
                      size={24}
                      color="white"
                      strokeWidth={1.5}
                      className="sm:w-7 sm:h-7 md:w-8 md:h-8"
                    />
                  </div>
                  <div className="absolute top-3 sm:top-4 -right-6 sm:-right-8 bg-[#1a2332] text-white rounded-t-xl w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-sm sm:text-base md:text-lg">
                    03
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-xl lg:text-xl font-light text-gray-900 leading-snug max-w-[10rem] sm:max-w-[12rem] md:max-w-52">
                  ফোন করে আপনাকে কনফার্ম করা হবে
                </h3>
              </div>

              {/* Step 4 */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="relative inline-block">
                  <div className="bg-primary rounded-t-2xl p-3 sm:p-4 md:p-5 lg:p-6 inline-block">
                    <HugeiconsIcon
                      icon={InjectionIcon}
                      size={24}
                      color="white"
                      strokeWidth={1.5}
                      className="sm:w-7 sm:h-7 md:w-8 md:h-8"
                    />
                  </div>
                  <div className="absolute top-3 sm:top-4 -right-6 sm:-right-8 bg-[#1a2332] text-white rounded-t-xl w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-sm sm:text-base md:text-lg">
                    04
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-xl lg:text-xl font-light text-gray-900 leading-snug max-w-[10rem] sm:max-w-[12rem] md:max-w-52">
                  সরাসরি চেম্বারে এসে বা অনলাইনে সেবা নিন
                </h3>
              </div>
            </div>
          </div>

          {/* Right side - Images and Contact Card */}
          <div className="space-y-3 sm:space-y-4 sm:space-y-6">
            {/* Top Images */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <div className="rounded-tl-2xl overflow-hidden aspect-square">
                <img
                  src="/treatment-two.jpg"
                  alt="Booking step"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-tr-2xl overflow-hidden aspect-square">
                <img
                  src="/autism.jpg"
                  alt="Booking step"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Contact Card */}
            <div className="rounded-b-2xl p-4 sm:p-6 md:p-8 text-white bg-[#1a2332]">
              <div className="flex flex-col justify-between space-y-4 sm:space-y-5 md:space-y-6">
                {/* Working Hours */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                    রোগী দেখার সময়
                  </h3>

                  {/* Date */}
                  <div
                    className="flex items-center gap-2 sm:gap-3"
                    style={{ color: "#A4AEBE" }}
                  >
                    <HugeiconsIcon
                      icon={Calendar01Icon}
                      size={18}
                      color="#A4AEBE"
                      strokeWidth={1.5}
                      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                    />
                    <p className="text-sm sm:text-base md:text-lg leading-snug">
                      {profileData?.chamberTime ||
                        "শনি, সোম এবং বুধবার"}
                    </p>
                  </div>

                  {/* Serial */}
                  <div
                    className="flex items-center gap-2 sm:gap-3"
                    style={{ color: "#A4AEBE" }}
                  >
                    <HugeiconsIcon
                      icon={StethoscopeIcon}
                      size={18}
                      color="#A4AEBE"
                      strokeWidth={1.5}
                      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                    />
                    <p className="text-sm sm:text-base md:text-lg leading-snug">
                      সিরিয়ালঃ{" "}
                      {profileData?.appointmentTime ||
                        "সকাল ১১টা থেকে রাত ১১ টা"}
                    </p>
                  </div>

                  {/* Online Consultation */}
                  <div
                    className="flex items-center gap-2 sm:gap-3"
                    style={{ color: "#A4AEBE" }}
                  >
                    <HugeiconsIcon
                      icon={LaptopIcon}
                      size={18}
                      color="#A4AEBE"
                      strokeWidth={1.5}
                      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                    />
                    <p className="text-sm sm:text-base md:text-lg leading-snug whitespace-pre-line">
                      অনলাইন কন্সাল্টেন্সিঃ{" "}
                      {profileData?.onlineConsultancyTime ||
                        "সকাল ১১টা থেকে রাত ১১ টা (শনি - শুক্র)"}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-600"></div>

                {/* Contact Button */}
                <div className="flex flex-row-reverse items-center justify-between gap-2">
                  <div className="text-center">
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">
                      সিরিয়ালের জন্য
                    </p>
                    <p className="text-base sm:text-lg font-semibold break-all flex flex-col">
                      {contactNumbers.length > 0 ? (
                        contactNumbers.map((contact) => (
                          <span key={contact.number}>
                            {contact.number}
                          </span>
                        ))
                      ) : (
                        <span>০১৩৩৯৫১১১০৮</span>
                      )}
                    </p>
                  </div>
                  <a
                    href={`tel:${contactNumbers[0]?.number || "01339511108"}`}
                    className="transition-colors rounded-t-2xl p-3 sm:p-4 bg-primary inline-flex items-center justify-center hover:bg-primary/80"
                  >
                    <HugeiconsIcon
                      icon={TelephoneIcon}
                      size={24}
                      color="white"
                      strokeWidth={1.5}
                      className="sm:w-7 sm:h-7"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
