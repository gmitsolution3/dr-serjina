import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IProfile } from "@/types";
import {
  AiBrain01Icon,
  Clock01Icon,
  Hospital02Icon,
  Menu01Icon,
  TelephoneIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function HeaderSideMenu({ profileData }: {
  profileData: IProfile
}) {
  // Get primary chamber and other chambers
  const primaryChamber = profileData?.chamber?.find(c => c.isPrimary);
  const otherChambers = profileData?.chamber?.filter(c => !c.isPrimary);

  // Get primary contact number and other numbers
  const primaryContact = profileData?.contactNumbers?.find(c => c.isPrimary);
  const otherContacts = profileData?.contactNumbers?.filter(c => !c.isPrimary);

  return (
    <Sheet>
      <SheetTrigger>
        <HugeiconsIcon
          icon={Menu01Icon}
          size={24}
          color="currentColor"
          strokeWidth={1.5}
        />
      </SheetTrigger>

      <SheetContent className="bg-[#10172E] text-white border-l-0 overflow-y-auto">
        <SheetHeader>
          {/* Doctor Profile */}
          <div className="flex flex-col items-center text-center mt-8">
            <img
              src={profileData?.profileImage || "/doctorImage.png"}
              alt={profileData?.name?.english || "Doctor"}
              className="w-28 h-36 object-cover rounded-xl shadow mb-4"
            />
            <SheetTitle className="text-white text-2xl">
              {profileData?.name?.bangla || profileData?.name?.english || "ডাঃ এস. কে. সারজিনা আনোয়ার"}
            </SheetTitle>

            <p className="mt-2 text-sm font-light text-gray-300">
              {profileData?.specializedIn || "শিশু রোগ বিশেষজ্ঞ ও শিশু নিউরোলজিস্ট"}
            </p>
          </div>

          <SheetDescription>
            <div className="space-y-6 mt-8">
              {/* Centers / Hospitals */}
              {profileData?.chamber && profileData.chamber.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <span>
                      <HugeiconsIcon
                        icon={Hospital02Icon}
                        size={20}
                        strokeWidth={1.5}
                        className="text-primary"
                      />
                    </span>
                    চেম্বার / হাসপাতাল
                  </h3>

                  <div className="space-y-3">
                    {/* Primary Chamber */}
                    {primaryChamber && (
                      <div>
                        <p className="font-medium text-sm">
                          {primaryChamber.name}
                        </p>
                        <p className="text-xs text-gray-300">{primaryChamber.location}</p>
                        {primaryChamber.designation && (
                          <p className="text-xs text-gray-400 mt-1">
                            {primaryChamber.designation}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Other Chambers */}
                    {otherChambers?.map((chamber) => (
                      <div key={chamber.name}>
                        <p className="font-medium text-sm">
                          {chamber.name}
                        </p>
                        <p className="text-xs text-gray-300">{chamber.location}</p>
                        {chamber.designation && (
                          <p className="text-xs text-gray-400 mt-1">
                            {chamber.designation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Numbers */}
              {profileData?.contactNumbers && profileData.contactNumbers.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <span>
                      <HugeiconsIcon
                        icon={TelephoneIcon}
                        size={20}
                        strokeWidth={1.5}
                        className="text-primary"
                      />
                    </span>
                    যোগাযোগ
                  </h3>

                  <div className="text-sm text-gray-300 flex flex-col gap-2">
                    {/* Primary Contact */}
                    {primaryContact && (
                      <a
                        href={`tel:${primaryContact.number}`}
                        className="hover:text-white transition-colors"
                      >
                        {primaryContact.number.replace('+880', '+৮৮০ ').replace(/(\d{4})(\d{3})(\d{4})/, '$১-$২$৩') || primaryContact.number}
                      </a>
                    )}
                    
                    {/* Other Contacts */}
                    {otherContacts?.map((contact) => (
                      <a
                        key={contact.number}
                        href={`tel:${contact.number}`}
                        className="hover:text-white transition-colors"
                      >
                        {contact.number.replace('+880', '+৮৮০ ').replace(/(\d{4})(\d{3})(\d{4})/, '$১-$২$৩') || contact.number}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Chamber Time */}
              {profileData?.chamberTime && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <span>
                      <HugeiconsIcon
                        icon={Clock01Icon}
                        size={20}
                        strokeWidth={1.5}
                        className="text-primary"
                      />
                    </span>
                    চেম্বার সময়
                  </h3>

                  <p className="text-sm text-gray-300">
                    {profileData.chamberTime}
                  </p>
                </div>
              )}

              {/* Appointment Time */}
              {profileData?.appointmentTime && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <span>📅</span>
                    অ্যাপয়েন্টমেন্ট সময়
                  </h3>
                  <p className="text-sm text-gray-300">
                    {profileData.appointmentTime}
                  </p>
                </div>
              )}

              {/* Online Consultation */}
              {profileData?.onlineConsultancyTime && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <span>💻</span>
                    অনলাইন কন্সাল্টেন্সি
                  </h3>
                  <p className="text-sm text-gray-300">
                    {profileData.onlineConsultancyTime}
                  </p>
                </div>
              )}

              {/* Specialties */}
              {profileData?.specializations && profileData.specializations.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <span>
                      <HugeiconsIcon
                        icon={AiBrain01Icon}
                        size={20}
                        strokeWidth={1.5}
                        className="text-primary"
                      />
                    </span>
                    বিশেষ দক্ষতা
                  </h3>

                  <ul className="text-sm text-gray-300 list-disc pl-5 space-y-2">
                    {profileData.specializations.map((specialty, index) => (
                      <li key={index}>{specialty}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Call to Action */}
              {primaryContact && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-center text-sm text-gray-300 mb-2">
                    অ্যাপয়েন্টমেন্টের জন্য কল করুন
                  </p>
                  <a
                    href={`tel:${primaryContact.number}`}
                    className="text-center font-semibold text-lg text-white hover:text-primary transition-colors block"
                  >
                    {primaryContact.number.replace('+880', '+৮৮০ ').replace(/(\d{4})(\d{3})(\d{4})/, '$১-$২$৩') || primaryContact.number}
                  </a>
                </div>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}