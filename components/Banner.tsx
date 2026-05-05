import TypingText from "@/components/ui/typing-text";
import { getProfileData } from "@/services/getProfileData";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { IProfile } from "@/types";

export default async function Banner() {
  const res = await getProfileData();

  const profileData: IProfile = res?.data || {};

  // Prepare typing text array from specializations or use default
  const typingTexts = profileData?.specializations
    ? profileData.specializations
    : [
        "Paediatrician",
        "Paediatric Neurologist",
        "Neurological Disorder Expert",
        "Child Specialist",
        "Neurophysiologist( Electroencephalogram/EEG)",
      ];

  return (
    <div id="banner" className="bg-[#10172E] py-12 lg:py-0">
      <div className="mx-auto px-5 lg:px-0">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-0">
          {/* Content Section */}
          <div className="flex-1 container mx-auto flex items-center justify-center">
            <div className="max-w-2xl w-full mx-auto lg:mx-0 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 leading-tight">
                {profileData?.name?.bangla ||
                  "ডাঃ শেখ সারজিনা আনোয়ার"}{" "}
                <TypingText
                  text={typingTexts}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorClassName="text-[#F8F329]"
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold inline-block"
                  textColors={Array(typingTexts.length).fill(
                    "#F8F329",
                  )}
                  variableSpeed={{ min: 50, max: 120 }}
                />
              </h3>

              <p className="text-[#A4AEBE] mb-6 font-light leading-relaxed text-sm md:text-base max-w-120 whitespace-pre-line">
                {profileData.longDescription}
              </p>

              <div className="flex justify-center lg:justify-start">
                <Button
                  variant="primary"
                  className="bg-[#423D96] hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
                  asChild
                >
                  <Link href="/profile-detail">
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
              src={profileData?.profileImage || "/doctorImage.png"}
              alt={
                profileData?.name?.english ||
                "Dr. Sheikh Sarjina Anwar"
              }
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
